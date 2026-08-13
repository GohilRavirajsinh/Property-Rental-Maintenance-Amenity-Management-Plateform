const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    amenity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenity',
        required: true
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String, // e.g., "10:00 AM"
        required: true
    },
    endTime: {
        type: String, // e.g., "11:00 AM"
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
