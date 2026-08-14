const Property = require('../models/PropertyModel');
const Amenity = require('../models/AmenityModel');

// 1. Add New Property (Protected - For Owners/Admins)
exports.addProperty = async (req, res) => {
    try {
        const { title, address, rentAmount, amenities } = req.body;
        
        // Agar multer/cloudinary ne image upload ki hai, toh uska URL req.file.path me aayega
        const imageUrl = req.file ? req.file.path : null;

        // Owner ID automatically comes from the Token (authMiddleware)
        const newProperty = new Property({
            title,
            address,
            rentAmount,
            owner: req.user.id,
            imageUrl: imageUrl
        });

        await newProperty.save();

        if (amenities) {
            const amenitiesList = amenities.split(',').map(a => a.trim()).filter(a => a);
            for (let name of amenitiesList) {
                const newAmenity = new Amenity({ name, property: newProperty._id });
                await newAmenity.save();
            }
        }

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

// 3. Delete Property (Admin or Owner)
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });

        if (property.owner.toString() !== req.user.id && req.user.role !== 'Admin' && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Not authorized to delete this property" });
        }

        await Property.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 4. Update Property (Owner/Admin)
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });

        if (property.owner.toString() !== req.user.id && req.user.role !== 'Admin' && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Not authorized to update this property" });
        }

        const { title, address, rentAmount } = req.body;
        if (title) property.title = title;
        if (address) property.address = address;
        if (rentAmount) property.rentAmount = rentAmount;
        
        if (req.file) {
            property.imageUrl = req.file.path;
        }

        await property.save();
        res.status(200).json({ message: "Property updated successfully", property });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
