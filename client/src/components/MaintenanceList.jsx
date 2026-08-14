import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MaintenanceList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/maintenance/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load maintenance requests');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    const handleDeleteMaintenance = async (id) => {
        if (!window.confirm("Are you sure you want to delete this maintenance request?")) return;
        
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/maintenance/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(requests.filter(req => req._id !== id));
        } catch (err) {
            console.error("Failed to delete request", err);
            alert("Failed to delete request");
        }
    };

    const markAsResolved = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/maintenance/${id}/status`, 
                { status: 'Completed' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Refresh list after update
            fetchRequests();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <p className="text-gray-500 font-semibold mt-4">Loading requests...</p>;
    if (error) return <p className="text-red-500 font-semibold mt-4">{error}</p>;

    return (
        <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Maintenance Requests</h3>
            
            {requests.length === 0 ? (
                <p className="text-gray-500 font-semibold">No maintenance requests found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((req) => (
                        <div key={req._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
                            {/* Status Badge */}
                            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                                req.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {req.status}
                            </span>
                            
                            <h4 className="font-bold text-lg text-gray-900 pr-20">{req.property?.title || 'Unknown Property'}</h4>
                            <p className="text-gray-500 text-sm mb-3">📍 {req.property?.address}</p>
                            
                            <div className="bg-gray-50 p-3 rounded-lg mb-4 text-gray-700 text-sm italic">
                                "{req.description}"
                            </div>
                            
                            <div className="flex justify-between items-end border-t pt-3 mt-auto">
                                <div>
                                    <p className="text-xs text-gray-400">Raised by</p>
                                    <p className="text-sm font-bold text-gray-700">{req.tenant?.name || 'Unknown'}</p>
                                </div>
                                
                                
                                <div className="flex gap-2">
                                    {req.status !== 'Completed' && (
                                        <button 
                                            onClick={() => markAsResolved(req._id)}
                                            className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-1.5 rounded-lg text-sm font-bold transition"
                                        >
                                            Mark Resolved
                                        </button>
                                    )}
                                    {currentUser && (currentUser.role === 'Admin' || currentUser.role === 'admin' || currentUser.role === 'Owner') && (
                                        <button 
                                            onClick={() => handleDeleteMaintenance(req._id)}
                                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-900 px-3 py-1.5 rounded-lg text-sm font-bold transition"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MaintenanceList;
