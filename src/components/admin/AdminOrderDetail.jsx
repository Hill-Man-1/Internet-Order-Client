/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/Icon/back.svg';

const AdminOrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [teknisiList, setTeknisiList] = useState([]);
    const [selectedTeknisi, setSelectedTeknisi] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [showInvalidForm, setShowInvalidForm] = useState(false);
    const [showValidForm, setShowValidForm] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await fetch(`http://localhost:3003/v1/order/list/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setOrder(data.data);
                } else {
                    setError(`Error fetching order detail: ${data.message}`);
                    console.error('Error fetching order detail:', data.message);
                }
            } catch (error) {
                setError('Error fetching order detail: ' + error.message);
                console.error('Error fetching order detail:', error);
            }
        };

        fetchOrderDetail();
    }, [id]);

    useEffect(() => {
        const fetchTeknisiList = async () => {
            try {
                const response = await fetch('http://localhost:3003/v1/teknisi/list', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setTeknisiList(data.data);
                } else {
                    setError(`Error fetching teknisi list: ${data.message}`);
                    console.error('Error fetching teknisi list:', data.message);
                }
            } catch (error) {
                setError('Error fetching teknisi list: ' + error.message);
                console.error('Error fetching teknisi list:', error);
            }
        };

        fetchTeknisiList();
    }, []);

    const handleDownload = async () => {
        try {
            const response = await fetch(`http://localhost:3003/v1/order/list/${id}/download`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'identity_file';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            setError('Error downloading file: ' + error.message);
            console.error('Error downloading file:', error);
        }
    };

    const handleInvalid = () => {
        setShowInvalidForm(true);
        setShowValidForm(false);
    };

    const handleValid = () => {
        setShowValidForm(true);
        setShowInvalidForm(false);
    };

    const handleInvalidSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3003/v1/order/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    status_id: 4, 
                    reject_reason: rejectReason 
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Order updated successfully!');
                navigate('/admin/orders');
            } else {
                setError(`Error updating order: ${data.message}`);
                console.error('Error updating order:', data.message);
            }
        } catch (error) {
            setError('Error updating order: ' + error.message);
            console.error('Error updating order:', error);
        }
    };

    const handleValidSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3003/v1/order/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    status_id: 6, 
                    teknisi_id: selectedTeknisi.id 
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Order updated successfully!');
                navigate('/admin/orders');
            } else {
                setError(`Error updating order: ${data.message}`);
                console.error('Error updating order:', data.message);
            }
        } catch (error) {
            setError('Error updating order: ' + error.message);
            console.error('Error updating order:', error);
        }
    };

    const handleTeknisiChange = (e) => {
        const teknisi = teknisiList.find(tek => tek.id === parseInt(e.target.value));
        setSelectedTeknisi(teknisi);
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-10 py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold underline">Order Detail</h2>
                <button onClick={() => navigate('/admin/orders')}>
                    <img src={backIcon} alt="Back" className="w-8 h-8"/>
                </button>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="table-auto w-full">
                <tbody>
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <td className="border px-4 py-2">{order.id}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Nama</th>
                        <td className="border px-4 py-2">{order.nama}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Email</th>
                        <td className="border px-4 py-2">{order.email}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Kota</th>
                        <td className="border px-4 py-2">{order.kota}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Kecamatan</th>
                        <td className="border px-4 py-2">{order.kecamatan}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Jalan</th>
                        <td className="border px-4 py-2">{order.jalan}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Status</th>
                        <td className="border px-4 py-2">{order.Status.name}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Package</th>
                        <td className="border px-4 py-2">{order.Package.nama}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Deskripsi</th>
                        <td className="border px-4 py-2">{order.Package.deskripsi}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Harga</th>
                        <td className="border px-4 py-2">{order.Package.harga}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">File Identitas</th>
                        <td className="border px-4 py-2">
                            <button onClick={handleDownload} className="text-blue-500 hover:underline">Download</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-4 flex justify-center space-x-4">
                <button onClick={handleInvalid} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Invalid</button>
                <button onClick={handleValid} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Valid</button>
            </div>
            {showInvalidForm && (
                <div className="mt-4 flex flex-col items-center">
                    <textarea
                        className="border rounded p-2 w-full max-w-md"
                        placeholder="Masukkan alasan penolakan"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <button onClick={handleInvalidSubmit} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 w-full max-w-md">Submit Invalid</button>
                </div>
            )}
            {showValidForm && (
                <div className="mt-4 flex flex-col items-center">
                    <label className="block text-gray-700 mb-2 mt-4 w-full max-w-md">Pilih Nama Teknisi</label>
                    <select
                        className="border rounded p-2 w-full max-w-md"
                        value={selectedTeknisi ? selectedTeknisi.id : ''}
                        onChange={handleTeknisiChange}
                    >
                        <option value="">Pilih Teknisi</option>
                        {teknisiList.map(teknisi => (
                            <option key={teknisi.id} value={teknisi.id}>{teknisi.nama}</option>
                        ))}
                    </select>
                    {selectedTeknisi && (
                        <div className="mt-4 w-full max-w-md">
                            <div className="mb-2">
                                <label className="block text-gray-700">NIP</label>
                                <input
                                    className="border rounded p-2 w-full"
                                    type="text"
                                    value={selectedTeknisi.nip}
                                    disabled
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">No. Telpon</label>
                                <input
                                    className="border rounded p-2 w-full"
                                    type="text"
                                    value={selectedTeknisi.no_telp}
                                    disabled
                                />
                            </div>
                        </div>
                    )}
                    <button onClick={handleValidSubmit} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 w-full max-w-md">Submit Valid</button>
                </div>
            )}
        </div>
    );
};

export default AdminOrderDetail;
