const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/locationController");
const {
  validateLocation,
  validateSearch,
  validateTripCost,
} = require("../middlewares/validator");

router.post("/locations", validateLocation, LocationController.createLocation);
router.get("/locations/:category", LocationController.getLocationsByCategory);
router.post(
  "/search",
  validateSearch,
  LocationController.searchNearbyLocations
);
// router.post(
//   "/trip-cost/:location_id",
//   validateTripCost,
//   LocationController.getTripCost
// );

module.exports = router;
