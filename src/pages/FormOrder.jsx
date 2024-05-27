/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderForm from '../components/order/OrderForm';

const FormOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        upload_identity: null,
        kota: '',
        kecamatan: '',
        jalan: '',
        package_id: location.state?.packageId || ''
    });

    const [progress, setProgress] = useState('registration');
    const [error, setError] = useState('');

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
            const response = await fetch('http://localhost:3003/v1/order/create', {
                method: 'POST',
                body: formDataToSend,
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                alert('Order created successfully!');
                setProgress('verification');
                navigate('/verification');
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.info}`);
            }
        } catch (error) {
            setError('There was an error creating the order!');
            console.error('There was an error creating the order!', error);
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
                    <button type="submit" onClick={handleSubmit} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Create Order</button>
                </div>
            </div>
        </div>
    );
};

export default FormOrder;   
