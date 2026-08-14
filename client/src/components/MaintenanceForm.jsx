import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceForm = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch properties for the dropdown
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/properties/all`);
                setProperties(response.data);
                if(response.data.length > 0) {
                    setSelectedProperty(response.data[0]._id);
                }
            } catch (err) {
                console.error("Failed to fetch properties");
            }
        };
        fetchProperties();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
            const token = localStorage.getItem('token');
            // 'propertyId' should match the backend expectation. 
            // In backend: const { propertyId, description } = req.body;
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/maintenance/request`, 
                { propertyId: selectedProperty, description },
                { headers: { Authorization: `Bearer ${token}` } } 
            );

            setMessage('Complain submitted successfully! 🛠️');
            setDescription('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit complain.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Submit Maintenance Complain</h3>
            
            {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}
            {error && <p className="mb-4 text-red-500 font-semibold">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Select Property</label>
                    <select 
                        value={selectedProperty} 
                        onChange={e => setSelectedProperty(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        {properties.map(prop => (
                            <option key={prop._id} value={prop._id}>{prop.title} ({prop.address})</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Issue Description</label>
                    <textarea 
                        required value={description} onChange={e => setDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. The AC is not cooling properly in the master bedroom..."
                        rows="3"
                    ></textarea>
                </div>
                <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition">
                    Submit Complain
                </button>
            </form>
        </div>
    );
};

export default MaintenanceForm;
