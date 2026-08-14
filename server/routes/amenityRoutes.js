const express = require('express');
const router = express.Router();
const { addAmenity, getAmenitiesByProperty } = require('../controllers/amenityController');
const { protect } = require('../middleware/authMiddleware');

// Define Routes
router.post('/add', protect, addAmenity);
router.get('/property/:propertyId', protect, getAmenitiesByProperty);

module.exports = router;
