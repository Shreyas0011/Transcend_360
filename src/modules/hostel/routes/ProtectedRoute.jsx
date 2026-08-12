// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from './routeConstants';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated: reduxAuth } = useSelector((state) => state.auth);
  const storedUser = localStorage.getItem('t360_user') || localStorage.getItem('hostel_portal_token');
  const isAuthenticated = reduxAuth || !!storedUser;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
