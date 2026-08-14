const express = require('express');
const router = express.Router();
const { createBooking, getBookings, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Define Routes
router.post('/book', protect, createBooking);
router.get('/all', protect, getBookings);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
