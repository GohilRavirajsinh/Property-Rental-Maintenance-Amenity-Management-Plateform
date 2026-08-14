import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddPropertyForm from '../components/AddPropertyForm'
import PropertyList from '../components/PropertyList'
import MaintenanceForm from '../components/MaintenanceForm'
import MaintenanceList from '../components/MaintenanceList'
import AmenityBooking from '../components/AmenityBooking'
import AddAmenityForm from '../components/AddAmenityForm'
import ManageAmenities from '../components/ManageAmenities'
import UserManagement from '../components/UserManagement'
import BookingList from '../components/BookingList'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [activeTenantTab, setActiveTenantTab] = useState('properties')
    const [activeOwnerTab, setActiveOwnerTab] = useState('add_property')
    const [activeAdminTab, setActiveAdminTab] = useState('users')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    // Jab ye page khulega, toh ye code chalega
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (!token) {
            // Agar token nahi hai, toh bina login ke koi andar nahi aa sakta (Security Guard)
            navigate('/')
        } else {
            setUser(JSON.parse(storedUser))
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.clear() // Sab kuch delete kardo
        navigate('/') // Wapas login par bhej do
    }

    if (!user) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                <div className="p-4 flex justify-between items-center max-w-7xl mx-auto">
                    <h1 className="text-xl font-bold">🏢 Property Platform</h1>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <span className="font-medium text-indigo-100">Welcome, {user.name} ({user.role})</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold shadow-md transition transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile Hamburger Icon */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-indigo-700 px-4 py-3 border-t border-indigo-500 flex flex-col space-y-3">
                        <span className="font-medium text-indigo-100 block">Welcome, {user.name} ({user.role})</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold w-full text-left"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <div className="p-4 md:p-10 max-w-7xl mx-auto">

                {/* Yahan Jadoo Hoga: Role ke hisaab se UI badal jayega! */}
                {user.role === 'Tenant' && (

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-0 animate-fade-in-up">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Tenant Dashboard</h2>

                        {/* Tenant Navigation Tabs */}
                        <div className="flex space-x-4 border-b border-gray-200 mb-6 pb-2 overflow-x-auto">
                            <button 
                                onClick={() => setActiveTenantTab('properties')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeTenantTab === 'properties' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >Available Properties</button>
                            <button 
                                onClick={() => setActiveTenantTab('booking')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeTenantTab === 'booking' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >Amenity Booking</button>
                            <button 
                                onClick={() => setActiveTenantTab('maintenance')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeTenantTab === 'maintenance' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >Maintenance / Complaints</button>
                        </div>

                        {/* Tab Content */}
                        {activeTenantTab === 'properties' && <PropertyList onBookAmenity={() => setActiveTenantTab('booking')} />}
                        
                        {activeTenantTab === 'booking' && <AmenityBooking />}

                        {activeTenantTab === 'maintenance' && (
                            <div className="pt-2">
                                <MaintenanceForm />
                                <MaintenanceList />
                            </div>
                        )}
                    </div>

                )}

                {user.role === 'Owner' && (

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-0 animate-fade-in-up">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Owner Dashboard</h2>

                        {/* Owner Navigation Tabs */}
                        <div className="flex space-x-4 border-b border-gray-200 mb-6 pb-2 overflow-x-auto">
                            <button 
                                onClick={() => setActiveOwnerTab('manage_assets')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeOwnerTab === 'manage_assets' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >Manage My Assets</button>
                            <button 
                                onClick={() => setActiveOwnerTab('add_property')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeOwnerTab === 'add_property' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >Add Property</button>
                            <button 
                                onClick={() => setActiveOwnerTab('maintenance')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeOwnerTab === 'maintenance' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >Maintenance Requests</button>
                            <button 
                                onClick={() => setActiveOwnerTab('bookings')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeOwnerTab === 'bookings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >Amenity Bookings</button>
                        </div>

                        {/* Tab Content */}
                        {activeOwnerTab === 'manage_assets' && (
                            <div className="pt-2">
                                <PropertyList ownerOnly={true} />
                                <ManageAmenities />
                            </div>
                        )}
                        {activeOwnerTab === 'add_property' && <AddPropertyForm />}
                        
                        {activeOwnerTab === 'maintenance' && (
                            <div className="pt-2">
                                <MaintenanceList />
                            </div>
                        )}

                        {activeOwnerTab === 'bookings' && (
                            <div className="pt-2">
                                <BookingList />
                            </div>
                        )}
                    </div>

                )}

                {(user.role === 'Admin' || user.role === 'admin') && (

                    <div className="p-8 rounded-2xl shadow-lg border border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 animate-fade-in-up">
                        <h2 className="text-4xl font-extrabold text-indigo-900 mb-6">Master Admin Dashboard</h2>

                        {/* Admin Navigation Tabs */}
                        <div className="flex space-x-4 border-b border-indigo-200 mb-6 pb-2 overflow-x-auto">
                            <button 
                                onClick={() => setActiveAdminTab('users')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeAdminTab === 'users' ? 'text-indigo-800 border-b-2 border-indigo-800' : 'text-indigo-400 hover:text-indigo-600'}`}
                            >Manage Users</button>
                            <button 
                                onClick={() => setActiveAdminTab('properties')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeAdminTab === 'properties' ? 'text-indigo-800 border-b-2 border-indigo-800' : 'text-indigo-400 hover:text-indigo-600'}`}
                            >All Properties</button>
                            <button 
                                onClick={() => setActiveAdminTab('maintenance')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeAdminTab === 'maintenance' ? 'text-indigo-800 border-b-2 border-indigo-800' : 'text-indigo-400 hover:text-indigo-600'}`}
                            >All Complaints</button>
                            <button 
                                onClick={() => setActiveAdminTab('bookings')}
                                className={`font-bold px-4 py-2 rounded-t-lg transition ${activeAdminTab === 'bookings' ? 'text-indigo-800 border-b-2 border-indigo-800' : 'text-indigo-400 hover:text-indigo-600'}`}
                            >Amenity Bookings</button>
                        </div>

                        {/* Admin Tab Content */}
                        <div className="space-y-4">
                            {activeAdminTab === 'users' && <UserManagement />}
                            
                            {activeAdminTab === 'properties' && (
                                <div className="pt-2">
                                    <h3 className="text-2xl font-bold text-indigo-900 mb-4">All Properties Overview</h3>
                                    <PropertyList />
                                </div>
                            )}

                            {activeAdminTab === 'maintenance' && (
                                <div className="pt-2">
                                    <h3 className="text-2xl font-bold text-indigo-900 mb-4">All Maintenance Requests</h3>
                                    <MaintenanceList />
                                </div>
                            )}

                            {activeAdminTab === 'bookings' && (
                                <div className="pt-2">
                                    <h3 className="text-2xl font-bold text-indigo-900 mb-4">All Amenity Bookings</h3>
                                    <BookingList />
                                </div>
                            )}
                        </div>
                    </div>

                )}

            </div>
        </div>
    )
}

export default Dashboard