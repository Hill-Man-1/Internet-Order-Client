/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSideBar from '../components/admin/AdminSideBar';

const AdminDashboard = () => {
    return (
        <div className="flex">
            <AdminSideBar />
            <div className="flex-grow p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Admin Dashboard</h1>
            </div>
        </div>
    );
};

export default AdminDashboard;
