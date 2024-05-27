/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/Icon/back.svg';

const AdminPackageUpdate = () => {
    const { id } = useParams();
    const [packageData, setPackageData] = useState({ nama: '', harga: '', deskripsi: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackageDetail = async () => {
            try {
                const response = await fetch(`http://localhost:3003/v1/package/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPackageData(data.data);
            } catch (error) {
                setError('Error fetching package detail: ' + error.message);
                console.error('Error fetching package detail:', error);
            }
        };

        fetchPackageDetail();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPackageData({ ...packageData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, ...updateData } = packageData; // Remove the `id` field

        try {
            const response = await fetch(`http://localhost:3003/v1/package/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updateData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Package updated successfully!');
                navigate('/admin/packages');
            } else {
                setError(`Error updating package: ${data.message}`);
                console.error('Error updating package:', data.message);
            }
        } catch (error) {
            setError('Error updating package: ' + error.message);
            console.error('Error updating package:', error);
        }
    };

    return (
        <div className="container mx-auto px-10 py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold underline">Update Package</h2>
                <button onClick={() => navigate('/admin/packages')}>
                    <img src={backIcon} alt="Back" className="w-8 h-8"/>
                </button>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                    <input type="text" name="nama" id="nama" value={packageData.nama} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100" />
                </div>
                <div className="mb-4">
                    <label htmlFor="harga" className="block text-sm font-medium text-gray-700">Harga</label>
                    <input type="number" name="harga" id="harga" value={packageData.harga} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100" />
                </div>
                <div className="mb-4">
                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                    <textarea name="deskripsi" id="deskripsi" value={packageData.deskripsi} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"></textarea>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Update</button>
                </div>
            </form>
        </div>
    );
};

export default AdminPackageUpdate;
