/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../components/order/OrderForm';

const VerificationPage = () => {
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch('http://localhost:3003/v1/order/my-order', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrderData(data.data[0]); 
                } else {
                    const errorData = await response.json();
                    setError(`Error: ${errorData.message}`);
                }
            } catch (error) {
                setError('There was an error fetching the order!');
                console.error('There was an error fetching the order!', error);
            }
        };

        fetchOrder();
    }, []);

    if (!orderData) {
        return <div>Loading...</div>;
    }

    const handleUpdate = () => {
        navigate('/update-order');
    };

    return (
        <div className="container mx-auto px-10 py-8 min-h-screen flex flex-col justify-between">
            <div>
                <div className="progress-bar mb-4 flex space-x-4">
                    <div className={`step ${orderData.status_id >= 1 ? 'active' : ''}`}>Registration</div>
                    <div className={`step ${(orderData.status_id >= 2 && orderData.status_id <= 7) ? 'active' : ''}`}>Verification</div>
                    <div className={`step ${orderData.status_id >= 6 ? 'active' : ''}`}>Installation</div>
                    <div className={`step ${orderData.status_id >= 7 ? 'active' : ''}`}>Complete</div>
                </div>

                {error && <div className="mb-4 text-red-500">{error}</div>}

                <OrderForm formData={orderData} isReadOnly={true} />

                <div className="mt-4 text-center">
                    <span className="text-lg font-bold text-gray-700">Status: {orderData.Status.name}</span>
                </div>

                {orderData.status_id === 4 && (
                    <div>
                        <div className="mt-4 text-center">
                            <span className="text-lg font-bold text-gray-700">Reject Reason: {orderData.reject_reason}</span>
                        </div>
                        <div className="mt-4 text-center">
                            <button onClick={handleUpdate} className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black">
                                Update
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationPage;
