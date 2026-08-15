import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAmenities = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(${ import.meta.env.VITE_API_URL || 'http://localhost:5000' } / api / properties / all, {
                    headers: { Authorization: Bearer }
                });
                const user = JSON.parse(localStorage.getItem('user'));
                // Filter properties to only show those owned by the current user
                const currentUserId = user.id || user._id; const ownerProps = response.data.filter(p => p.owner?._id === currentUserId || p.owner === currentUserId);
                setProperties(ownerProps);
                if (ownerProps.length > 0) setSelectedProperty(ownerProps[0]._id);
            } catch (err) {
                console.error("Failed to fetch properties", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    useEffect(() => {
        const fetchAmenities = async () => {
            if (!selectedProperty) return;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(${ import.meta.env.VITE_API_URL || 'http://localhost:5000' } / api / amenities / property / s {
                    headers: { Authorization: Bearer }
                });
                setAmenities(response.data);
            } catch (err) {
                console.error("Failed to fetch amenities", err);
            }
        };
        fetchAmenities();
    }, [selectedProperty]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this amenity?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(${ import.meta.env.VITE_API_URL || 'http://localhost:5000' } / api / amenities /, {
                headers: { Authorization: Bearer }
            });
            setAmenities(amenities.filter(a => a._id !== id));
        } catch (err) {
            alert("Failed to delete amenity");
        }
    };

    if (loading || properties.length === 0) return null;

    return (
        <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Manage Property Amenities</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Select Property</label>
                    <select
                        value={selectedProperty}
                        onChange={e => setSelectedProperty(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 font-medium"
                    >
                        {properties.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {amenities.length === 0 ? (
                        <p className="text-gray-500 italic col-span-full">No amenities for this property.</p>
                    ) : (
                        amenities.map(a => (
                            <div key={a._id} className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center shadow-sm hover:shadow transition">
                                <span className="font-bold text-indigo-900">{a.name}</span>
                                <button onClick={() => handleDelete(a._id)} className="bg-red-100 text-red-600 hover:bg-red-200 font-bold px-3 py-1 rounded-md transition text-sm">
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageAmenities;

