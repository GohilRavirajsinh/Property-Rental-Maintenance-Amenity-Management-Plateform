const Maintenance = require('../models/MaintenanceModel');
const Property = require('../models/PropertyModel');

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
        let requests;
        if (req.user.role === 'Tenant') {
            requests = await Maintenance.find({ tenant: req.user.id })
                .populate('property', 'title address')
                .populate('tenant', 'name email');
        } else if (req.user.role === 'Owner') {
            // Owner should only see requests for THEIR properties
            const myProperties = await Property.find({ owner: req.user.id }).select('_id');
            const myPropertyIds = myProperties.map(p => p._id);
            
            requests = await Maintenance.find({ property: { $in: myPropertyIds } })
                .populate('property', 'title address')
                .populate('tenant', 'name email');
        } else {
            // Admin can see ALL requests
            requests = await Maintenance.find()
                .populate('property', 'title address')
                .populate('tenant', 'name email');
        }
            
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 3. Update Status (Owner/Admin)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (req.user.role === 'Tenant') {
            return res.status(403).json({ message: "Tenants cannot update status" });
        }

        const request = await Maintenance.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!request) return res.status(404).json({ message: "Request not found" });

        res.status(200).json({ message: "Status updated", request });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 4. Delete Maintenance Request (Admin or Owner)
exports.deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id).populate('property');
        if (!maintenance) return res.status(404).json({ message: "Maintenance request not found" });

        // Admin or the Owner of the property can delete
        if (req.user.role !== 'Admin' && req.user.role !== 'admin' && maintenance.property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this request" });
        }

        await Maintenance.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Maintenance request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
