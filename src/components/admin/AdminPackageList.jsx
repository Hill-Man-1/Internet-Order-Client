/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/Icon/back.svg';

const AdminPackageList = () => {
    const [packages, setPackages] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch('http://localhost:3003/v1/package/list-desc', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error Data:', errorData);
                    throw new Error(errorData.message || 'Failed to fetch packages');
                }

                const data = await response.json();
                setPackages(data.data);
            } catch (error) {
                setError('Error fetching packages: ' + error.message);
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, []);

    return (
        <div className="container mx-auto px-10 py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-center underline">Package List</h2>
                <button onClick={() => navigate('/admin')}>
                    <img src={backIcon} alt="Back" className="w-8 h-8"/>
                </button>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">No</th>
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Harga</th>
                        <th className="px-4 py-2">Deskripsi</th>
                        <th className="px-4 py-2">Jumlah Penjualan</th>
                        <th className="px-4 py-2">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((pkg, index) => (
                        <tr key={pkg.id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{pkg.nama}</td>
                            <td className="border px-4 py-2">{pkg.harga}</td>
                            <td className="border px-4 py-2">{pkg.deskripsi}</td>
                            <td className="border px-4 py-2">{pkg.jumlah_penjualan}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/admin/package-update/${pkg.id}`} className="text-blue-500 hover:underline">Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPackageList;
