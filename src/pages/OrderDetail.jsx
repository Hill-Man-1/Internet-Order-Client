/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
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

    const handleFinish = async () => {
        try {
            const response = await fetch(`http://localhost:3003/v1/teknisi/update-status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ status_id: 7 }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Order status updated successfully!');
                navigate('/order-list');
            } else {
                setError(`Error updating order status: ${data.message}`);
                console.error('Error updating order status:', data.message);
            }
        } catch (error) {
            setError('Error updating order status: ' + error.message);
            console.error('Error updating order status:', error);
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-10 py-8">
            <h2 className="text-2xl font-bold mb-4 text-center underline">ORDER DETAIL!</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="table-auto w-full">
                <tbody>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <td className="border px-4 py-2">{order.id}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Nama</th>
                        <td className="border px-4 py-2">{order.nama}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Email</th>
                        <td className="border px-4 py-2">{order.email}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Kota</th>
                        <td className="border px-4 py-2">{order.kota}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Kecamatan</th>
                        <td className="border px-4 py-2">{order.kecamatan}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Jalan</th>
                        <td className="border px-4 py-2">{order.jalan}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Status</th>
                        <td className="border px-4 py-2">{order.Status.name}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Package</th>
                        <td className="border px-4 py-2">{order.Package.nama}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Harga</th>
                        <td className="border px-4 py-2">{order.Package.harga}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Deskripsi</th>
                        <td className="border px-4 py-2">{order.Package.deskripsi}</td>
                    </tr>
                </tbody>
            </table>
            {order.Status.name !== 'Finish' && (
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={handleFinish}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black"
                    >
                        Finish
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderDetail;
