import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/style.css';

import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute, { getDashboardRedirect } from './routes/RoleRoute';

import StudentDashboard from './pages/student/Dashboard';
import ParentDashboard from './pages/parent/Dashboard';
import WardenDashboard from './pages/warden/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import SuperAdminDashboard from './pages/superadmin/Dashboard';
import MessManagerDashboard from './pages/messManager/Dashboard';
import Login from './pages/auth/Login';

// Dispatcher component for root /hostel or /hostel/dashboard
const DashboardDispatcher = () => {
  const { user: reduxUser } = useSelector((state) => state.auth || {});
  let user = reduxUser;

  if (!user) {
    const stored = localStorage.getItem('t360_user') || localStorage.getItem('hostel_user');
    if (stored) {
      try { user = JSON.parse(stored); } catch (e) {}
    }
  }

  if (user && user.role) {
    return <Navigate to={getDashboardRedirect(user.role)} replace />;
  }

  return <Navigate to="/hostel/login" replace />;
};

export const HostelModule = () => {
  return (
    <div className="hostel-module-wrapper min-h-screen bg-[#f0f4f8]">
      <Routes>
        {/* Landing / Role Dispatcher */}
        <Route path="/" element={<DashboardDispatcher />} />
        <Route path="/dashboard" element={<DashboardDispatcher />} />
        
        {/* Auth / Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Role Dashboards */}
        <Route 
          path="/student/*" 
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['Student']}>
                <StudentDashboard />
              </RoleRoute>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/*" 
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['Parent']}>
                <ParentDashboard />
              </RoleRoute>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/warden/*" 
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['Warden']}>
                <WardenDashboard />
              </RoleRoute>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/superadmin/*" 
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['SuperAdmin']}>
                <SuperAdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mess-manager/*" 
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['MessManager']}>
                <MessManagerDashboard />
              </RoleRoute>
            </ProtectedRoute>
          } 
        />

        {/* Feature Specific Shortcuts mapped to role dispatch */}
        <Route path="/meals" element={<DashboardDispatcher />} />
        <Route path="/leave" element={<DashboardDispatcher />} />
        <Route path="/complaints" element={<DashboardDispatcher />} />
        <Route path="/health" element={<DashboardDispatcher />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/hostel" replace />} />
      </Routes>
    </div>
  );
};

export default HostelModule;
