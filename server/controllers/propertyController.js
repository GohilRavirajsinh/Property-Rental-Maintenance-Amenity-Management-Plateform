const Property = require('../models/PropertyModel');

// 1. Add New Property (Protected - For Owners/Admins)
exports.addProperty = async (req, res) => {
    try {
        const { title, address, rentAmount } = req.body;
        
        // Owner ID automatically comes from the Token (authMiddleware)
        const newProperty = new Property({
            title,
            address,
            rentAmount,
            owner: req.user.id 
        });

        await newProperty.save();
        res.status(201).json({ message: "Property Added Successfully", property: newProperty });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Get All Properties (Public or Protected)
exports.getProperties = async (req, res) => {
    try {
        // Find properties and populate owner details instead of just showing ID
        const properties = await Property.find().populate('owner', 'name email');
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
