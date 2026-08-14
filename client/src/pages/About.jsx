import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-4xl mx-auto p-6 md:p-10 w-full animate-fade-in-up">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <h2 className="text-4xl font-extrabold text-indigo-900 mb-6 text-center">About This Project</h2>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center">
                        This Property Rental, Maintenance, and Amenity Management Platform is a full-stack MERN application designed to streamline the operations of real estate properties. It acts as a bridge between Property Owners, Tenants, and Admins.
                    </p>

                    <div className="space-y-10">
                        <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">🚀 Key Features</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg ml-2 marker:text-indigo-500">
                                <li><strong>Role-based Access Control:</strong> Distinct dashboards for Tenants, Owners, and Admins.</li>
                                <li><strong>Property Management:</strong> Owners can add, edit, and delete their properties and amenities securely.</li>
                                <li><strong>Amenity Booking:</strong> Tenants can seamlessly book slots for Gyms, Pools, etc. without scheduling conflicts.</li>
                                <li><strong>Maintenance Portal:</strong> Tenants can raise repair requests that Owners/Admins can track.</li>
                                <li><strong>Cloud Image Uploads:</strong> Direct integration with Cloudinary for robust property image hosting.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">💻 Technologies Used</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm border border-indigo-100 hover:-translate-y-1 transition">
                                    <span className="font-bold text-indigo-800 block text-lg">React</span>
                                    <span className="text-sm text-gray-500">Frontend UI</span>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm border border-indigo-100 hover:-translate-y-1 transition">
                                    <span className="font-bold text-indigo-800 block text-lg">Tailwind CSS</span>
                                    <span className="text-sm text-gray-500">Styling</span>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm border border-indigo-100 hover:-translate-y-1 transition">
                                    <span className="font-bold text-indigo-800 block text-lg">Node.js / Express</span>
                                    <span className="text-sm text-gray-500">Backend Server</span>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm border border-indigo-100 hover:-translate-y-1 transition">
                                    <span className="font-bold text-indigo-800 block text-lg">MongoDB</span>
                                    <span className="text-sm text-gray-500">Database</span>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm border border-indigo-100 hover:-translate-y-1 transition">
                                    <span className="font-bold text-indigo-800 block text-lg">Axios</span>
                                    <span className="text-sm text-gray-500">API Requests</span>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm border border-indigo-100 hover:-translate-y-1 transition">
                                    <span className="font-bold text-indigo-800 block text-lg">Multer</span>
                                    <span className="text-sm text-gray-500">File Parsing</span>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm border border-indigo-100 hover:-translate-y-1 transition">
                                    <span className="font-bold text-indigo-800 block text-lg">Cloudinary</span>
                                    <span className="text-sm text-gray-500">Image Storage</span>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm border border-indigo-100 hover:-translate-y-1 transition">
                                    <span className="font-bold text-indigo-800 block text-lg">JWT & bcrypt</span>
                                    <span className="text-sm text-gray-500">Security / Auth</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">👨‍💻 About Developer</h3>
                            <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-8 rounded-2xl border border-indigo-100">
                                <p className="text-gray-800 text-lg leading-relaxed">
                                    Hi! I'm <strong className="text-indigo-700">Ravirajsinh Gohil</strong>. I am a passionate Full-Stack Developer specializing in MERN stack applications. This project demonstrates my ability to build complex, role-based, real-world systems with modern UI/UX principles, focusing on secure file handling, relational database schemas, and responsive web design.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
