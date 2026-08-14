import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/bookings/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch bookings", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const handleDeleteBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(bookings.filter(b => b._id !== bookingId));
        } catch (err) {
            console.error("Failed to cancel booking", err);
            alert("Failed to cancel booking");
        }
    };

    if (loading) return <p className="text-gray-500 font-semibold mt-4">Loading bookings...</p>;
    if (bookings.length === 0) return <p className="text-gray-500 font-semibold mt-4">No amenity bookings found.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map(booking => (
                <div key={booking._id} className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-indigo-900">{booking.amenity}</h4>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Confirmed</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold text-gray-800">Property:</span> {booking.property?.title || 'Unknown Property'}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold text-gray-800">Tenant:</span> {booking.tenant?.name || 'Unknown Tenant'}
                    </p>
                    
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-4 text-sm flex justify-between items-end">
                        <div>
                            <p className="text-gray-700">📅 {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            <p className="text-gray-700">⏰ {booking.startTime} - {booking.endTime}</p>
                        </div>
                        {currentUser && (currentUser.role === 'Admin' || currentUser.role === 'admin' || currentUser.role === 'Owner') && (
                            <button 
                                onClick={() => handleDeleteBooking(booking._id)}
                                className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-bold transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingList;
