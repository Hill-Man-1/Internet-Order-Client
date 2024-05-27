/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/Icon/back.svg';

const AdminTeknisiList = () => {
    const [technicians, setTechnicians] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await fetch('http://localhost:3003/v1/teknisi/list-desc', {
                    method: 'GET',
                    credentials: 'include'
                });

                console.log('Fetch Response:', response);

                const data = await response.json();
                console.log('Fetch Data:', data);

                if (response.ok) {
                    setTechnicians(data.data);
                } else {
                    setError(`Error fetching technicians: ${data.message}`);
                    console.error('Error fetching technicians:', data.message);
                }
            } catch (error) {
                setError('Error fetching technicians: ' + error.message);
                console.error('Error fetching technicians:', error);
            }
        };

        fetchTechnicians();
    }, []);

    return (
        <div className="container mx-auto px-10 py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-center underline">Technician List</h2>
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
                        <th className="px-4 py-2">NIP</th>
                        <th className="px-4 py-2">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map((technician, index) => (
                        <tr key={technician.id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{technician.nama}</td>
                            <td className="border px-4 py-2">{technician.nip}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/admin/technician-detail/${technician.id}`} className="text-blue-500 hover:underline">Detail</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTeknisiList;
