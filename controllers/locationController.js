const Location = require("../db/models/location");
const { validationResult } = require("express-validator");

/**
 * Helper function to measure execution time and format response
 * @param {Function}
 * @returns {Function}
 */
const withTiming = (handler) => async (req, res) => {
  const startTime = process.hrtime();

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        time_ns: seconds * 1e9 + nanoseconds,
      });
    }

    const result = await handler(req, res);
    const [seconds, nanoseconds] = process.hrtime(startTime);

    return res.status(result.status).json({
      ...result.data,
      time_ns: seconds * 1e9 + nanoseconds,
    });
  } catch (error) {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    return res.status(error.status || 500).json({
      success: false,
      error: error.message,
      time_ns: seconds * 1e9 + nanoseconds,
    });
  }
};

const createLocation = withTiming(async (req) => {
  const location = await Location.create(req.body);
  return {
    status: 201,
    data: {
      success: true,
      data: { id: location.location_id },
    },
  };
});

const getLocationsByCategory = withTiming(async (req) => {
  const { category } = req.params;

  if (!category) {
    const error = new Error("Category Name is required.");
    error.status = 401;
    throw error;
  }

  const locations = await Location.findAll({
    where: { category },
    attributes: [
      "location_id",
      "name",
      "address",
      "latitude",
      "longitude",
      "category",
    ],
  });

  return {
    status: 200,
    data: { locations },
  };
});

const searchNearbyLocations = withTiming(async (req) => {
  const { latitude, longitude, category, radius_km } = req.body;

  const locations = await Location.sequelize.query(
    `
    SELECT 
      location_id,
      name,
      address,
      category,
      earth_distance(
        ll_to_earth($1, $2),
        ll_to_earth(latitude, longitude)
      ) / 1000 as distance
    FROM "Location"
    WHERE category = $3
    AND earth_distance(
      ll_to_earth($1, $2),
      ll_to_earth(latitude, longitude)
    ) / 1000 <= $4
    ORDER BY distance;
    `,
    {
      bind: [latitude, longitude, category, radius_km],
      type: Location.sequelize.QueryTypes.SELECT,
    }
  );

  return {
    status: 200,
    data: { locations },
  };
});

// api is not working because i did not tollguru api key 


// const getTripCost = withTiming(async (req) => {
//   const { location_id } = req.params;
//   const { latitude, longitude } = req.body;

//   const destination = await Location.findByPk(location_id);
//   if (!destination) {
//     const error = new Error("Location not found");
//     error.status = 404;
//     throw error;
//   }


//   const tollGuruResponse = await fetch(
//     "https://apis.tollguru.com/toll/v2/complete-route",
//     {
//       method: "POST",
//       headers: {
//         "x-api-key": process.env.TOLLGURU_API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         from: { lat: latitude, lng: longitude },
//         to: { lat: destination.latitude, lng: destination.longitude },
//         vehicleType: "2AxlesAuto",
//       }),
//     }
//   );

//   if (!tollGuruResponse.ok) {
//     const error = new Error("Failed to fetch toll data");
//     error.status = 502;
//     throw error;
//   }

//   const tollData = await tollGuruResponse.json();

//   return {
//     status: 200,
//     data: {
//       total_cost: tollData.summary.totalCost,
//       fuel_cost: tollData.summary.fuelCost,
//       toll_cost: tollData.summary.tollCost,
//     },
//   };
// });

module.exports = {
  createLocation,
  getLocationsByCategory,
  searchNearbyLocations,
  // getTripCost,
};
