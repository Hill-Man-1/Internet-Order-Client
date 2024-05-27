/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../components/order/OrderForm';

const UpdateOrderPage = () => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        upload_identity: null,
        kota: '',
        kecamatan: '',
        jalan: '',
        package_id: '',
    });
    const [error, setError] = useState('');
    const [progress, setProgress] = useState('registration');
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
                    const order = data.data[0];
                    setFormData({
                        nama: order.nama,
                        email: order.email,
                        upload_identity: order.upload_identity,
                        kota: order.kota,
                        kecamatan: order.kecamatan,
                        jalan: order.jalan,
                        package_id: order.package_id,
                    });
                    setProgress('registration');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, upload_identity: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:3003/v1/order/update-data', {
                method: 'PUT',
                body: formDataToSend,
                credentials: 'include',
            });

            if (response.ok) {
                alert('Order updated successfully!');
                navigate('/verification');
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.info}`);
            }
        } catch (error) {
            setError('There was an error updating the order!');
            console.error('There was an error updating the order!', error);
        }
    };

    return (
        <div className="container mx-auto px-10 py-8 min-h-screen flex flex-col justify-between">
            <div>
                <div className="progress-bar mb-4 flex space-x-4">
                    <div className={`step ${progress === 'registration' ? 'active' : ''}`}>Registration</div>
                    <div className={`step ${progress === 'verification' ? 'active' : ''}`}>Verification</div>
                    <div className={`step ${progress === 'installation' ? 'active' : ''}`}>Installation</div>
                    <div className={`step ${progress === 'complete' ? 'active' : ''}`}>Complete</div>
                </div>

                {error && <div className="mb-4 text-red-500">{error}</div>}

                <OrderForm formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} isReadOnly={false} isPackageIdHidden={true} />

                <div className="col-span-2">
                    <button type="submit" onClick={handleSubmit} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Update Order</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderPage;
