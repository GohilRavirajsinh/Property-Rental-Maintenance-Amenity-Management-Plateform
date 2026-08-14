import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null);

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
                        onClick={() => setSelectedProperty(property)}
                        className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer opacity-0 animate-fade-in-up stagger-${(index % 3) + 1}`}
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
                                        onClick={(e) => { e.stopPropagation(); handleDeleteProperty(property._id); }}
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

            {/* Property Details Modal */}
            {selectedProperty && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProperty(null)}>
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fade-in-up relative" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={() => setSelectedProperty(null)}
                            className="absolute top-4 right-4 bg-white/50 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition backdrop-blur-md font-bold"
                        >
                            ✕
                        </button>
                        
                        {selectedProperty.imageUrl ? (
                            <img src={selectedProperty.imageUrl} alt={selectedProperty.title} className="w-full h-72 object-cover" />
                        ) : (
                            <div className="w-full h-72 bg-gradient-to-r from-indigo-200 to-purple-200 flex items-center justify-center">
                                <span className="text-white font-bold opacity-50 text-xl">No Image Available</span>
                            </div>
                        )}

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedProperty.title}</h3>
                                    <p className="text-gray-500 flex items-center gap-2">
                                        <span className="text-xl">📍</span> {selectedProperty.address}
                                    </p>
                                </div>
                                <span className="bg-green-100 text-green-700 font-extrabold px-4 py-2 rounded-xl text-lg shadow-sm border border-green-200">
                                    ₹{selectedProperty.rentAmount} <span className="text-sm font-medium">/ month</span>
                                </span>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h4 className="text-lg font-bold text-gray-800 mb-3">Property Overview</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    This is a beautiful property located at {selectedProperty.address}. It offers premium living spaces and modern amenities, making it an ideal choice for tenants seeking comfort and convenience. Contact the owner or book amenities directly through your dashboard!
                                </p>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button onClick={() => setSelectedProperty(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl transition">
                                    Close Details
                                </button>
                                <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg transform hover:scale-[1.02]">
                                    Contact Owner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyList;
