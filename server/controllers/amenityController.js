const Amenity = require('../models/AmenityModel');
const Property = require('../models/PropertyModel');

// 1. Add Amenity (Owner Only)
exports.addAmenity = async (req, res) => {
    try {
        if (req.user.role !== 'Owner') {
            return res.status(403).json({ message: "Access Denied. Only Owners can add amenities." });
        }

        const { name, propertyId } = req.body;

        if (!name || !propertyId) {
            return res.status(400).json({ message: "Name and Property are required." });
        }

        // Check if the owner actually owns this property
        const property = await Property.findById(propertyId);
        if (!property) return res.status(404).json({ message: "Property not found." });
        
        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "You don't own this property." });
        }

        const newAmenity = new Amenity({
            name,
            property: propertyId
        });

        const savedAmenity = await newAmenity.save();
        res.status(201).json({ message: "Amenity added successfully", amenity: savedAmenity });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Get Amenities by Property
exports.getAmenitiesByProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const amenities = await Amenity.find({ property: propertyId, isOperational: true });
        res.status(200).json(amenities);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
