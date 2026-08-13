const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // e.g., "Swimming Pool", "Gym", "Clubhouse"
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // Which property does this amenity belong to?
        required: true
    },
    isOperational: {
        type: Boolean,
        default: true // If the pool is under cleaning, owner can set this to false
    }
}, { timestamps: true });

module.exports = mongoose.model('Amenity', amenitySchema);
