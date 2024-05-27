/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './components/Footer';
import Register from './pages/Register';
import Packages from './pages/Package';
import NotFoundPage from './pages/NotFound';
import FormOrder from './pages/FormOrder';
import VerificationPage from './pages/Verification';
import UpdateOrderPage from './pages/UpdateOrder';
import './App.css';
import TeknisiData from './pages/TeknisiData';
import OrderList from './pages/OrderList';
import OrderDetail from './pages/OrderDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminTeknisiList from './components/admin/AdminTeknisiList';
import AdminTeknisiDetail from './components/admin/AdminTeknisiDetail';
import AdminPackageList from './components/admin/AdminPackageList';
import AdminPackageUpdate from './components/admin/AdminPackageUpdate';
import AdminPackageCreate from './components/admin/AdminPackageCreate';
import AdminOrderList from './components/admin/AdminOrderList';
import AdminOrderDetail from './components/admin/AdminOrderDetail';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [orderExists, setOrderExists] = useState(false);

  useEffect(() => {
    const checkOrder = async () => {
      if (user && user.role === 'CUSTOMER') {
        try {
          const response = await fetch('http://localhost:3003/v1/order/my-order', {
            method: 'GET',
            credentials: 'include'
          });
          const data = await response.json();
          if (response.ok && data.data.length > 0) {
            setOrderExists(true);
          } else {
            setOrderExists(false);
          }
        } catch (error) {
          console.error('Error checking order:', error);
        }
      }
    };

    checkOrder();
  }, [user]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="/verification" element={<VerificationPage/>} />
            <Route path="/update-order" element={user && user.role === 'CUSTOMER' && orderExists ? <UpdateOrderPage/> : <Navigate to="/not-found" replace />} />
            <Route path="/create-order" element={user && user.role === 'CUSTOMER' && orderExists ? <Navigate to="/verification" /> : <FormOrder />} />
            <Route path="/packages" element={user && user.role === 'CUSTOMER' && !orderExists ? <Packages /> : <Navigate to="/not-found" replace />} />
            <Route path="/create-teknisi" element={user && !user.teknisiId && user.role === 'TEKNISI' ? <TeknisiData /> : <Navigate to="/not-found" replace />} />
            <Route path="/order-list" element={user && user.teknisiId && user.role === 'TEKNISI' ? <OrderList /> : <Navigate to="/not-found" replace />} />
            <Route path="/order-detail/:id" element={user && user.teknisiId && user.role === 'TEKNISI' ? <OrderDetail /> : <Navigate to="/not-found" replace />} />
            <Route path="/admin/*" element={user && user.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/not-found" replace />} />
            <Route path="/admin/technicians" element={user && user.role === 'ADMIN' ? <AdminTeknisiList /> : <Navigate to="/not-found" replace />} />
            <Route path="/admin/technician-detail/:id" element={user && user.role === 'ADMIN' ? <AdminTeknisiDetail /> : <Navigate to="/not-found" replace />} />
            <Route path="/admin/packages" element={user && user.role === 'ADMIN' ? <AdminPackageList /> : <Navigate to="/not-found" replace />} />
            <Route path="/admin/package-update/:id" element={user && user.role === 'ADMIN' ? <AdminPackageUpdate /> : <Navigate to="/not-found" replace />} />
            <Route path="/admin/package-create" element={user && user.role === 'ADMIN' ? <AdminPackageCreate /> : <Navigate to="/not-found" replace />} />
            <Route path="/admin/orders" element={user && user.role === 'ADMIN' ? <AdminOrderList /> : <Navigate to="/not-found" replace />} />
            <Route path="/admin/order-detail/:id" element={user && user.role === 'ADMIN' ? <AdminOrderDetail /> : <Navigate to="/not-found" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
