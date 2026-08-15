import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyList from '../components/PropertyList';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                        Find Your Perfect Home
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Browse premium properties, book world-class amenities, and experience hassle-free living. 
                        Join our community today!
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition transform hover:scale-105"
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <PropertyList onBookAmenity={() => {
                        alert('Please login to book amenities or view owner details!');
                        navigate('/login');
                    }} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
