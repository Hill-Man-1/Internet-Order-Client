/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3003/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            
            const data = await response.json();
            if (response.ok) {
                console.log("Registration successful:", data);
                navigate('/login');
            } else {
                throw new Error(data.info || "Unable to register");
            }
        } catch (error) {
            setError(error.message);
            console.error("Registration error:", error);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-xl font-semibold mb-4">Create your account</h1>
                <h2 className="text-sm text-gray-600 mb-8">Please register to continue</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <button type="button" onClick={togglePasswordVisibility} className="text-gray-700">
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-800">Login here</a></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;

