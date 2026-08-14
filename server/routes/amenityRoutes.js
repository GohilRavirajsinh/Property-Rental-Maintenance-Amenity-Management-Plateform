const express = require('express');
const router = express.Router();
const { addAmenity, getAmenitiesByProperty, deleteAmenity } = require('../controllers/amenityController');
const { protect } = require('../middleware/authMiddleware');

// Define Routes
router.post('/add', protect, addAmenity);
router.get('/property/:propertyId', protect, getAmenitiesByProperty);
router.delete('/:id', protect, deleteAmenity);

module.exports = router;
