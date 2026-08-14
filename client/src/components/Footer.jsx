import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 text-center mt-auto border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">🏢 Property Platform</h3>
                <p className="text-sm text-gray-400 mb-4">
                    Developed with ❤️ by <span className="text-indigo-400 font-bold text-base">Ravirajsinh Gohil</span>
                </p>
                
                <div className="flex justify-center items-center space-x-6 mb-6">
                    <Link to="/about" className="text-gray-400 hover:text-indigo-400 transition font-medium">
                        About Project
                    </Link>
                    <a href="https://github.com/GohilRavirajsinh" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400 transition font-medium">
                        GitHub Profile
                    </a>
                </div>
                
                <p className="text-xs text-gray-500 font-medium">
                    © {new Date().getFullYear()} Property Rental & Maintenance Management Platform. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
