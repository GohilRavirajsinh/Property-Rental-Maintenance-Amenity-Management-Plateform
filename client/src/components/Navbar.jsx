import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
            <div className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
                <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                    🏢 Property Platform
                </h1>
                <div className="flex space-x-3">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-bold shadow-sm transition text-sm md:text-base"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate('/about')}
                        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-bold shadow-sm transition text-sm md:text-base"
                    >
                        About
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
