/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/Icon/back.svg';

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3003/v1/order/list', {
                    method: 'GET',
                    credentials: 'include'
                });

                const data = await response.json();
                if (response.ok) {
                    setOrders(data.data);
                } else {
                    setError(`Error fetching orders: ${data.message}`);
                    console.error('Error fetching orders:', data.message);
                }
            } catch (error) {
                setError('Error fetching orders: ' + error.message);
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto px-10 py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-center underline">Order List</h2>
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
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{order.nama}</td>
                            <td className="border px-4 py-2">{order.email}</td>
                            <td className="border px-4 py-2">{order.Status.name}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/admin/order-detail/${order.id}`} className="text-blue-500 hover:underline">Detail</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrderList;
