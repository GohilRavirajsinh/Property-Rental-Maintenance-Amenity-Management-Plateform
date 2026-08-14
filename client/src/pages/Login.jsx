import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    // 1. Data store karne ke liye state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate() // Ek page se dusre page bhejne ke liye

    // 2. Jab user 'Sign In' dabayega tab ye chalega
    const handleLogin = async (e) => {
        e.preventDefault() // Page ko reload hone se rokna
        setError('') // Purana error hata do

        try {
            // 3. Backend ko Postman ki tarah request bhejna
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })

            // 4. Agar login success hua, toh Backend se aaya Token local tijori (localStorage) me save kar lo
            const token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(response.data.user))

            // 5. Dashboard par bhej do!
            navigate('/dashboard')
        } catch (err) {
            // Agar password galat hai ya user nahi mila, toh Error dikhao
            setError(err.response?.data?.message || 'Login Failed!')
        }
    }

    return (
        // Tailwind classes se ekdum Premium look banaya hai
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50">
            <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/50">

                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">
                    Welcome Back
                </h1>

                {/* Agar error hai toh yahan Laal rang me dikhega */}
                {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}

                <form onSubmit={handleLogin} className="flex flex-col space-y-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Jo type karega wo State me save hoga
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-95"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Sign Up</Link>
                </p>

            </div>
        </div>
    )
}

export default Login
