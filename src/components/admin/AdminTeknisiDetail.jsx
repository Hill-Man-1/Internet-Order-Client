/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/Icon/back.svg';

const AdminTeknisiDetail = () => {
    const { id } = useParams();
    const [technician, setTechnician] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminTeknisiDetail = async () => {
            try {
                const response = await fetch(`http://localhost:3003/v1/teknisi/list/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setTechnician(data.data);
                } else {
                    setError(`Error fetching technician detail: ${data.message}`);
                    console.error('Error fetching technician detail:', data.message);
                }
            } catch (error) {
                setError('Error fetching technician detail: ' + error.message);
                console.error('Error fetching technician detail:', error);
            }
        };

        fetchAdminTeknisiDetail();
    }, [id]);

    if (!technician) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-10 py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold underline">Technician Detail</h2>
                <button onClick={() => navigate('/admin/technicians')}>
                    <img src={backIcon} alt="Home" className="w-8 h-8"/>
                </button>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="table-auto w-full border-collapse">
                <tbody>
                    <tr>
                        <th className="border px-4 py-2 text-left">ID</th>
                        <td className="border px-4 py-2">{technician.id}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2 text-left">Nama</th>
                        <td className="border px-4 py-2">{technician.nama}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2 text-left">NIP</th>
                        <td className="border px-4 py-2">{technician.nip}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2 text-left">No. Telp</th>
                        <td className="border px-4 py-2">{technician.no_telp}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2 text-left">Total Handling</th>
                        <td className="border px-4 py-2">{technician.total_handling}</td>
                    </tr>
                    <tr>
                        <th className="border px-4 py-2 text-left">User ID</th>
                        <td className="border px-4 py-2">{technician.user_id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdminTeknisiDetail;
