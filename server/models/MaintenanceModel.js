const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // Links to the Property where the issue is
        require: true
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Links to the Tenant who raised the issue
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'], // Strictly tracking status
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);