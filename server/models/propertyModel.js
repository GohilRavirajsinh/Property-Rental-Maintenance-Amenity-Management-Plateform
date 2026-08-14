const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This links the Property to a specific User (the Owner)
        require: true
    },
    rentAmount: {
        type: Number,
        require: true
    },
    isAvailable: {
        type: Boolean,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);