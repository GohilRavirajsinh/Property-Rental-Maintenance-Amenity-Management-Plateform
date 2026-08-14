import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Backend se sari properties manga rahe hain
                const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/properties/all`);
                setProperties(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load properties');
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Get current user to show delete button for Admin/Owner
    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const handleDeleteProperty = async (propertyId) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/properties/${propertyId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(properties.filter(p => p._id !== propertyId));
        } catch (err) {
            console.error("Failed to delete property", err);
            alert("Failed to delete property");
        }
    };

    if (loading) return <p className="text-gray-500 font-semibold mt-4">Loading properties...</p>;
    if (error) return <p className="text-red-500 font-semibold mt-4">{error}</p>;
    if (properties.length === 0) return <p className="text-gray-500 font-semibold mt-4">No properties available right now.</p>;

    return (
        <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Properties</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                    <div 
                        key={property._id} 
                        className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-in-up stagger-${(index % 3) + 1}`}
                    >
                        {/* Show actual image or placeholder */}
                        {property.imageUrl ? (
                            <img src={property.imageUrl} alt={property.title} className="h-48 w-full object-cover" />
                        ) : (
                            <div className="h-48 bg-gradient-to-r from-indigo-200 to-purple-200 flex items-center justify-center">
                                <span className="text-white font-bold opacity-50">No Image</span>
                            </div>
                        )}
                        
                        <div className="p-5">
                            <h4 className="font-bold text-xl text-gray-900 mb-1">{property.title}</h4>
                            <p className="text-gray-500 text-sm mb-3">📍 {property.address}</p>
                            
                            <div className="flex justify-between items-center mt-4">
                                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                                    ₹{property.rentAmount} / month
                                </span>
                                {currentUser && (currentUser.role === 'Admin' || currentUser.role === 'admin' || currentUser._id === property.owner?._id) && (
                                    <button 
                                        onClick={() => handleDeleteProperty(property._id)}
                                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-bold transition"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyList;
