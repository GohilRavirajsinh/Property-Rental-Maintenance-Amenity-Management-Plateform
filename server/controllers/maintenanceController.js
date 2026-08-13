const Maintenance = require('../models/MaintenanceModel');

// 1. Create Maintenance Request (Tenant)
exports.createRequest = async (req, res) => {
    try {
        const { propertyId, description } = req.body;
        
        const newRequest = new Maintenance({
            property: propertyId,
            tenant: req.user.id, // User ID comes from Token
            description
        });

        await newRequest.save();
        res.status(201).json({ message: "Maintenance Request Submitted", request: newRequest });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Get All Requests (Owner/Admin)
exports.getRequests = async (req, res) => {
    try {
        // Bring full Property and Tenant data using populate
        const requests = await Maintenance.find()
            .populate('property', 'title address')
            .populate('tenant', 'name email');
            
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
