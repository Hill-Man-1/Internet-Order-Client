/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PricingSection() {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('user');

    useEffect(() => {
        fetch('http://localhost:3003/v1/package/list')
            .then(response => response.json())
            .then(data => setPackages(data.data))
            .catch(error => console.error('Error fetching packages:', error));
    }, []);

    const handlePackageClick = (packageName, packageId) => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        
        if (!userInfo) {
            navigate('/login');
        } else if (userInfo.role !== 'CUSTOMER') {
            navigate('/not-found');
        } else {
            navigate('/create-order', { state: { packageName, packageId } });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div id='packages' className="container mx-auto px-10 py-10">
            <h1 className="text-4xl font-bold mb-3 text-center">OUR PACKAGES!</h1>
            <h2 className="text-3xl font-bold text-center mb-6">We Connect Your Business</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {packages.map(pkg => (
                    <div key={pkg.id} className="flex flex-col justify-between p-6 shadow-lg rounded-lg bg-gray-200 text-center w-full max-w-lg mx-auto min-h-[400px]">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-black">{pkg.nama.toUpperCase()}</h3>
                            <p className="text-2xl font-bold mb-2 text-black">Rp. {pkg.harga}/mth</p>
                            <p className="mb-4 text-black">{pkg.deskripsi}</p>
                        </div>
                        <button 
                            onClick={() => handlePackageClick(pkg.nama.toLowerCase(), pkg.id)}
                            className="bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors"
                        >
                            Get {pkg.nama.toLowerCase()} plan
                        </button>
                    </div>
                ))}
            </div>
            <button 
                onClick={scrollToTop}
                className="rounded-full p-2 bg-white text-black hover:text-white hover:bg-black fixed bottom-5 right-5"
                style={{ width: '50px', height: '50px' }}
                aria-label="Scroll to Top"
            >
                ↑
            </button>
        </div>
    );
}

export default PricingSection;
