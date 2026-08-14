const mongoose = require('mongoose');

// Define the rules for a User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['Tenant', 'Owner', 'Admin'],
        default: 'Tenant'
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);