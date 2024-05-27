/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3003/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Login successful:", data);
                localStorage.setItem('user', JSON.stringify(data.data));

                if (data.data.role === 'ADMIN') {
                    navigate('/admin');
                } else if (data.data.role === 'TEKNISI') {
                    if (data.data.teknisiId) {
                        navigate('/order-list');
                    } else {
                        navigate('/create-teknisi');
                    }
                } else if (data.data.role === 'CUSTOMER') {
                    try {
                        const orderResponse = await fetch('http://localhost:3003/v1/order/my-order', {
                            method: 'GET',
                            credentials: 'include'
                        });
                        const orderData = await orderResponse.json();
                        if (orderResponse.ok && orderData.data.length > 0) {
                            navigate('/verification');
                        } else {
                            navigate('/packages');
                        }
                    } catch (error) {
                        setError('Unable to check order status.');
                        console.error('Order check error:', error);
                    }
                } else {
                    navigate('/not-found');
                }
            } else {
                throw new Error(data.message || "Unable to login");
            }
        } catch (error) {
            setError(error.message);
            console.error("Login error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword => !showPassword);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-xl font-semibold mb-4">Welcome back!</h1>
                <h2 className="text-sm text-gray-600 mb-8">Please login to your account</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <button type="button" onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6">
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login to BlackLink
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm">Don't have an account yet? <Link to="/register" className="text-blue-500 hover:text-blue-800">Create a BlackLink account</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
