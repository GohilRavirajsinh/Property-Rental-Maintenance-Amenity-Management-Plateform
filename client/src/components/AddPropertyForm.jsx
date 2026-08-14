import React, { useState } from 'react';
import axios from 'axios';

const AddPropertyForm = () => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [rentAmount, setRentAmount] = useState('1000');
    const [amenities, setAmenities] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
            setIsUploading(true);
            // 1. Tijori (localStorage) se token nikalna
            const token = localStorage.getItem('token');
            
            // 2. FormData banana kyunki hume file (image) bhejni hai
            const formData = new FormData();
            formData.append('title', title);
            formData.append('address', address);
            formData.append('rentAmount', rentAmount);
            if (amenities) {
                formData.append('amenities', amenities);
            }
            if (image) {
                formData.append('image', image);
            }
            
            // 3. Backend ko Request bhejna (sath me token bhi)
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/properties/add`, 
                formData,
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                } 
            );

            // 3. Success message dikhana
            setMessage('Property Added Successfully! 🎉');
            
            // 4. Form ko wapas khali (clear) kar dena
            setTitle('');
            setAddress('');
            setRentAmount('1000');
            setAmenities('');
            setImage(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add property.');
        } finally {
            setIsUploading(false);
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
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Amenities (Comma separated)</label>
                    <input 
                        type="text" value={amenities} onChange={e => setAmenities(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. Gym, Swimming Pool, Parking"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Property Image</label>
                    <input 
                        type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>
                <button type="submit" disabled={isUploading} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition disabled:bg-indigo-400">
                    {isUploading ? 'Uploading...' : 'Submit Property'}
                </button>
            </form>
        </div>
    );
};

export default AddPropertyForm;
