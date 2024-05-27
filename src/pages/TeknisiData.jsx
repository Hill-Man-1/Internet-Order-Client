/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeknisiData = () => {
    const [formData, setFormData] = useState({
        nama: '',
        nip: '',
        no_telp: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3003/v1/auth/teknisi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                alert('Teknisi info created successfully!');
                navigate('/order-list');
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.info}`);
            }
        } catch (error) {
            setError('There was an error creating teknisi info!');
            console.error('There was an error creating teknisi info!', error);
        }
    };

    return (
        <div className="container mx-auto px-10 py-8 min-h-screen flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-4">Create Teknisi Info</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                        <input type="text" name="nama" id="nama" value={formData.nama} onChange={handleInputChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nip" className="block text-sm font-medium text-gray-700">NIP</label>
                        <input type="number" name="nip" id="nip" value={formData.nip} onChange={handleInputChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 no-spinner" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="no_telp" className="block text-sm font-medium text-gray-700">No. Telephone</label>
                        <input type="number" name="no_telp" id="no_telp" value={formData.no_telp} onChange={handleInputChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 no-spinner" />
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 ">Create Teknisi Info</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeknisiData;
