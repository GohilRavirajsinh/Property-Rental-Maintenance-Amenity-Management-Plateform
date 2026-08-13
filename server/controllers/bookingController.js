const Booking = require('../models/BookingModel');

// 1. Create a new Amenity Booking
exports.createBooking = async (req, res) => {
    try {
        const { amenityId, bookingDate, startTime, endTime } = req.body;

        // Simple Conflict Logic: Check if same amenity is booked on same date at same time
        const conflict = await Booking.findOne({
            amenity: amenityId,
            bookingDate,
            startTime
        });

        if (conflict) {
            return res.status(400).json({ message: "Time slot already booked by another user!" });
        }

        const newBooking = new Booking({
            amenity: amenityId,
            tenant: req.user.id,
            bookingDate,
            startTime,
            endTime
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking Confirmed", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
