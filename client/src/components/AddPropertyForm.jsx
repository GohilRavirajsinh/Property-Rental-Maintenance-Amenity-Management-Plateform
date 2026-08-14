import React, { useState } from 'react';
import axios from 'axios';

const AddPropertyForm = () => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [rentAmount, setRentAmount] = useState('1000');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
            // 1. Tijori (localStorage) se token nikalna
            const token = localStorage.getItem('token');
            
            // 2. Backend ko Request bhejna (sath me token bhi)
            const response = await axios.post('http://localhost:5000/api/properties/add', 
                { title, address, rentAmount },
                { 
                    headers: { Authorization: `Bearer ${token}` } // Ye humare Backend Guard ke liye hai
                } 
            );

            // 3. Success message dikhana
            setMessage('Property Added Successfully! 🎉');
            
            // 4. Form ko wapas khali (clear) kar dena
            setTitle('');
            setAddress('');
            setRentAmount('1000');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add property.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Add New Property</h3>
            
            {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}
            {error && <p className="mb-4 text-red-500 font-semibold">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Property Title</label>
                    <input 
                        type="text" required value={title} onChange={e => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. Luxury 2BHK Apartment"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Address</label>
                    <input 
                        type="text" required value={address} onChange={e => setAddress(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. 123 Main Street"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Rent Amount (₹)</label>
                    <input 
                        type="number" required value={rentAmount} onChange={e => setRentAmount(e.target.value)}
                        min="1000"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="15000"
                    />
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
                    Submit Property
                </button>
            </form>
        </div>
    );
};

export default AddPropertyForm;
