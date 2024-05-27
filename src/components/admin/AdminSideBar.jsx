/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isTechnicianOpen, setIsTechnicianOpen] = useState(false);
    const [isPackageOpen, setIsPackageOpen] = useState(false);
    const [isOrderOpen, setIsOrderOpen] = useState(false);

    const toggleTechnician = () => setIsTechnicianOpen(!isTechnicianOpen);
    const togglePackage = () => setIsPackageOpen(!isPackageOpen);
    const toggleOrder = () => setIsOrderOpen(!isOrderOpen);

    return (
        <div className="container mx-auto px-10 w-64 h-screen bg-gray-800 text-white">
            <nav className="mt-10">
                <div>
                    <button onClick={toggleTechnician} className="w-full text-left p-3 hover:bg-gray-700">Technicians</button>
                    {isTechnicianOpen && (
                        <div className="pl-4">
                            <Link to="/admin/technicians" className="block p-2 hover:bg-gray-700">List Technicians</Link>
                        </div>
                    )}
                </div>
                <div>
                    <button onClick={togglePackage} className="w-full text-left p-3 hover:bg-gray-700">Packages</button>
                    {isPackageOpen && (
                        <div className="pl-4">
                            <Link to="/admin/packages" className="block p-2 hover:bg-gray-700">List Packages</Link>
                            <Link to="/admin/package-create" className="block p-2 hover:bg-gray-700">Create Package</Link>
                        </div>
                    )}
                </div>
                <div>
                    <button onClick={toggleOrder} className="w-full text-left p-3 hover:bg-gray-700">Orders</button>
                    {isOrderOpen && (
                        <div className="pl-4">
                            <Link to="/admin/orders" className="block p-2 hover:bg-gray-700">All Orders</Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
