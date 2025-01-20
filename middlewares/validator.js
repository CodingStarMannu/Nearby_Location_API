const { body, param } = require('express-validator');

const validateLocation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180'),
  body('category').notEmpty().withMessage('Category is required'),
];

const validateSearch = [
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180'),
  body('category').notEmpty().withMessage('Category is required'),
  body('radius_km')
    .isFloat({ min: 0 })
    .withMessage('Radius must be a positive number'),
];

const validateTripCost = [
  param('location_id').isInt().withMessage('Location ID must be an integer'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180'),
];

module.exports = {
  validateLocation,
  validateSearch,
  validateTripCost,
};
