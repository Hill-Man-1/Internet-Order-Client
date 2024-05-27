/* eslint-disable no-unused-vars */
import React from 'react';
import BlackLine from '../assets/BlackLine.webp';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3003/v1/auth/logout', {
                method: 'POST',
                credentials: 'include' 
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                localStorage.removeItem('user');
                navigate('/');
            } else {
                throw new Error(data.message || "Unable to logout");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="bg-white py-4 sticky top-0 z-50">
            <div className="container mx-auto px-10">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={BlackLine} alt="Logo" className="h-12 w-12" />
                        <span className="text-xl font-bold text-black">BlackLine</span>
                    </Link>
                    <div className="flex-1 text-center">
                        {user ? (
                            <span className="mx-2 py-2 text-lg font-bold text-black">Welcome Back, {user.username}!</span>
                        ) : (
                            <>
                                <Link to="/" className="mx-2 py-2 text-lg text-black transition-colors duration-300">Home</Link>
                                <a href="#about" className="mx-2 py-2 text-lg text-black hover:text-gray-500 transition-colors duration-300">About Us</a>
                                <a href="#services" className="mx-2 py-2 text-lg text-black hover:text-gray-500 transition-colors duration-300">Services</a>
                                <a href="#packages" className="mx-2 py-2 text-lg text-black hover:text-gray-500 transition-colors duration-300">Packages</a>
                            </>
                        )}
                    </div>
                    <div>
                        {user ? (
                            <button onClick={handleLogout} className="mx-2 py-2 px-4 bg-black text-white rounded-lg">Logout</button>
                        ) : (
                            <>
                                <Link to="/register" className="mx-2 py-2 px-4 bg-black text-white rounded-lg">Register</Link>
                                <Link to="/login" className="mx-2 py-2 px-4 bg-black text-white rounded-lg">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

