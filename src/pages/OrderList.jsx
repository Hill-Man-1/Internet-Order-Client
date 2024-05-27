/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3003/v1/order/teknisi-order', {
                    method: 'GET',
                    credentials: 'include'
                });

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    if (response.ok) {
                        const sortedOrders = data.data.sort((a, b) => {
                            if (a.Status.name === 'Finish' && b.Status.name !== 'Finish') return 1;
                            if (a.Status.name !== 'Finish' && b.Status.name === 'Finish') return -1;
                            return a.id - b.id;
                        });
                        setOrders(sortedOrders);
                    } else {
                        setError(`Error fetching orders: ${data.message}`);
                        console.error('Error fetching orders:', data.message);
                    }
                } else {
                    const text = await response.text();
                    setError(`Unexpected response: ${text}`);
                    console.error('Unexpected response:', text);
                }
            } catch (error) {
                setError('Error fetching orders: ' + error.message);
                console.error('Error fetching orders:', error);
            }
        };

        if (user && user.role === 'TEKNISI') {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="container mx-auto px-10">
            <h2 className="text-2xl font-bold mb-4 text-center pt-4 underline">ORDER LIST!</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">No</th>
                        <th className="px-4 py-2 hidden">Order ID</th>
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Detail</th>
                    </tr> 
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2 hidden">{order.id}</td>
                            <td className="border px-4 py-2">{order.nama}</td>
                            <td className="border px-4 py-2">{order.Status.name}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/order-detail/${order.id}`} className="text-black hover:underline">Detail</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
