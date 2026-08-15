import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
            <div className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
                <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                    🏢 Property Platform
                </h1>
                <div className="flex space-x-3 items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg font-bold shadow-sm transition text-sm md:text-base hidden sm:block"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate('/about')}
                        className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg font-bold shadow-sm transition text-sm md:text-base hidden sm:block"
                    >
                        About
                    </button>

                    {token ? (
                        <>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-bold shadow-sm transition text-sm md:text-base"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold shadow-sm transition text-sm md:text-base"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-bold shadow-sm transition text-sm md:text-base"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-indigo-800 hover:bg-indigo-900 px-4 py-2 rounded-lg font-bold shadow-sm transition text-sm md:text-base"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

