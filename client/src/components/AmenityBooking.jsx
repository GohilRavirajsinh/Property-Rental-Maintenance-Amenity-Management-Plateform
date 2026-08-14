import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AmenityBooking = () => {
    const [amenity, setAmenity] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [properties, setProperties] = useState([]);
    const [availableAmenities, setAvailableAmenities] = useState([]);
    const [bookingDate, setBookingDate] = useState('');
    const [startTime, setStartTime] = useState('07:00 AM');
    const [endTime, setEndTime] = useState('08:00 AM');
    const [bookings, setBookings] = useState([]);
    
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/bookings/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(response.data);
        } catch (err) {
            console.error("Failed to fetch bookings", err);
        }
    };

    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/properties/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(response.data);
        } catch (err) {
            console.error("Failed to fetch properties", err);
        }
    };

    useEffect(() => {
        fetchBookings();
        fetchProperties();
    }, []);

    useEffect(() => {
        const fetchAmenitiesForProperty = async () => {
            if (!propertyId) return;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/amenities/property/${propertyId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAvailableAmenities(response.data);
                setAmenity(''); // Reset amenity selection when property changes
            } catch (err) {
                console.error("Failed to fetch amenities", err);
            }
        };

        fetchAmenitiesForProperty();
    }, [propertyId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!propertyId || !amenity) {
            setError("Please select both a property and an amenity.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/bookings/book', 
                { propertyId, amenity, bookingDate, startTime, endTime },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage('Booking confirmed successfully! 🎉');
            fetchBookings(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to book amenity.');
        }
    };

    return (
        <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Amenity Booking (Gym / Pool)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-lg mb-4 text-gray-700">Book an Amenity</h4>
                    
                    {message && <p className="mb-4 text-green-600 font-semibold bg-green-50 p-2 rounded">{message}</p>}
                    {error && <p className="mb-4 text-red-500 font-semibold bg-red-50 p-2 rounded">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Select Property</label>
                            <select 
                                value={propertyId} onChange={e => setPropertyId(e.target.value)} required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="" disabled>Select Property</option>
                                {properties.map(p => (
                                    <option key={p._id} value={p._id}>{p.title} ({p.address})</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Select Amenity</label>
                            <select 
                                value={amenity} onChange={e => setAmenity(e.target.value)} required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                disabled={!propertyId || availableAmenities.length === 0}
                            >
                                <option value="" disabled>
                                    {!propertyId ? "Select a property first" : 
                                     availableAmenities.length === 0 ? "No amenities available for this property" : 
                                     "Select Amenity"}
                                </option>
                                {availableAmenities.map(a => (
                                    <option key={a._id} value={a.name}>{a.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Date</label>
                            <input 
                                type="date" required value={bookingDate} onChange={e => setBookingDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-1">Start Time</label>
                                <select 
                                    value={startTime} onChange={e => setStartTime(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                >
                                    <option value="06:00 AM">06:00 AM</option>
                                    <option value="07:00 AM">07:00 AM</option>
                                    <option value="08:00 AM">08:00 AM</option>
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="05:00 PM">05:00 PM</option>
                                    <option value="06:00 PM">06:00 PM</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-1">End Time</label>
                                <select 
                                    value={endTime} onChange={e => setEndTime(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                >
                                    <option value="07:00 AM">07:00 AM</option>
                                    <option value="08:00 AM">08:00 AM</option>
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="06:00 PM">06:00 PM</option>
                                    <option value="07:00 PM">07:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                            Confirm Booking
                        </button>
                    </form>
                </div>

                {/* List Section */}
                <div>
                    <h4 className="font-bold text-lg mb-4 text-gray-700">My Bookings</h4>
                    <div className="space-y-4">
                        {bookings.length === 0 ? (
                            <p className="text-gray-500">No bookings yet.</p>
                        ) : (
                            bookings.map(booking => (
                                <div key={booking._id} className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-indigo-900">{booking.amenity} <span className="text-sm font-normal text-gray-500">at {booking.property?.title}</span></p>
                                        <p className="text-sm text-indigo-700">
                                            📅 {new Date(booking.bookingDate).toLocaleDateString()} 
                                            <br />
                                            ⏰ {booking.startTime} - {booking.endTime}
                                        </p>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                        Confirmed
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmenityBooking;
