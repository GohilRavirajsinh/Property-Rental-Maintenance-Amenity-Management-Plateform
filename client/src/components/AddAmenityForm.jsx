import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAmenityForm = () => {
    const [properties, setProperties] = useState([]);
    const [propertyId, setPropertyId] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/properties/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProperties(response.data);
            } catch (err) {
                console.error("Failed to fetch properties", err);
            }
        };
        fetchProperties();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!propertyId || !name) {
            setError('Please select a property and enter an amenity name.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/amenities/add`, 
                { propertyId, name },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage('Amenity added successfully!');
            setName('');
            setPropertyId('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add amenity');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Amenity</h3>
            
            {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg font-medium">{message}</div>}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Select Your Property</label>
                    <select 
                        value={propertyId} onChange={e => setPropertyId(e.target.value)} required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="" disabled>Select Property</option>
                        {properties.map(p => (
                            <option key={p._id} value={p._id}>{p.title}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Amenity Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g., Rooftop BBQ, Yoga Studio"
                        value={name} onChange={e => setName(e.target.value)} required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-md">
                    Add Amenity
                </button>
            </form>
        </div>
    );
};

export default AddAmenityForm;
