import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Tenant') // Default role Tenant set kiya hai
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
                name,
                email,
                password,
                role
            })
            
            // Registration ke baad Token aur User data tijori me save karke sidha Dashboard bhej do!
            const token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(response.data.user))

            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration Failed!')
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50">
            <Navbar />
            <div className="flex-1 flex justify-center items-center p-4">
                <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/50 opacity-0 animate-fade-in-up">

                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">
                    Create Account
                </h1>

                {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}

                <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder="Your Password"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white"
                        >
                            <option value="Tenant">Tenant</option>
                            <option value="Owner">Property Owner</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-95"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account? <Link to="/" className="text-indigo-600 font-bold hover:underline">Login</Link>
                </p>

                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default Register
