import React from 'react';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './style.css';

export const FacilitiesModule = () => {
  return (
    <div className="facilities-module-wrapper min-h-screen bg-[#f8fafc]">
      <AuthProvider>
        <App />
      </AuthProvider>
    </div>
  );
};

export default FacilitiesModule;
