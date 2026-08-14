import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(u => u._id !== userId));
        } catch (err) {
            console.error("Failed to delete user", err);
            alert("Failed to delete user");
        }
    };

    if (loading) return <p className="text-gray-500 font-semibold mt-4">Loading users...</p>;

    return (
        <div className="mt-8 border-t border-indigo-200 pt-6">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6">User Management (Admin Only)</h3>
            
            <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 overflow-hidden overflow-x-auto">
                <table className="min-w-full divide-y divide-indigo-100">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Joined</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-indigo-50">
                        {users.map((u, index) => (
                            <tr key={u._id} className={`hover:bg-indigo-50/50 transition-all opacity-0 animate-fade-in-up stagger-${(index % 3) + 1}`}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{u.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{u.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                                        u.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                        u.role === 'Owner' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => handleDeleteUser(u._id)}
                                        className="text-red-600 hover:text-red-900 font-bold bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
