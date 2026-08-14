const Booking = require('../models/BookingModel');

// 1. Create a new Amenity Booking
exports.createBooking = async (req, res) => {
    try {
        const { propertyId, amenity, bookingDate, startTime, endTime } = req.body;

        // Simple Conflict Logic: Check if same amenity is booked on same date at same time for the SAME property
        const conflict = await Booking.findOne({
            property: propertyId,
            amenity,
            bookingDate,
            startTime
        });

        if (conflict) {
            return res.status(400).json({ message: "Time slot already booked by another user!" });
        }

        const newBooking = new Booking({
            property: propertyId,
            amenity,
            tenant: req.user.id,
            bookingDate,
            startTime,
            endTime
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking Confirmed", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const Property = require('../models/PropertyModel');

// 2. Get All Bookings
exports.getBookings = async (req, res) => {
    try {
        let bookings;
        if (req.user.role === 'Tenant') {
            bookings = await Booking.find({ tenant: req.user.id })
                .populate('property', 'title address')
                .populate('tenant', 'name email');
        } else if (req.user.role === 'Owner') {
            // Owner should only see bookings for THEIR properties
            const myProperties = await Property.find({ owner: req.user.id }).select('_id');
            const myPropertyIds = myProperties.map(p => p._id);
            
            bookings = await Booking.find({ property: { $in: myPropertyIds } })
                .populate('property', 'title address')
                .populate('tenant', 'name email');
        } else {
            // Admin sees all
            bookings = await Booking.find()
                .populate('property', 'title address')
                .populate('tenant', 'name email');
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 3. Delete Booking (Admin or Owner)
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (req.user.role !== 'Admin' && req.user.role !== 'admin' && req.user.role !== 'Owner') {
            return res.status(403).json({ message: "Not authorized to delete this booking" });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
