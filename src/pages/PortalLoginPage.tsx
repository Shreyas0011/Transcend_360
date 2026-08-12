import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowRight, Lock, Mail } from 'lucide-react';

const DEMO_CREDENTIALS = [
  { label: 'Super Admin',   email: 'admin@tgi360.com',        password: 'Admin@2026',      color: '#1e3a8a' },
  { label: 'Hostel Admin',  email: 'hostel@tgi360.com',       password: 'Hostel@2026',     color: '#2563eb' },
  { label: 'Facilities',   email: 'facilities@tgi360.com',   password: 'Facilities@2026', color: '#0284c7' },
  { label: 'Transport',    email: 'transport@tgi360.com',    password: 'Transport@2026',  color: '#0d9488' },
];

export const PortalLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [shake, setShake]             = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter both email and password.'); return; }
    setLoading(true);
    setError('');
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const fillDemo = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '24px',
        backgroundColor: '#f8fafc',
        backgroundImage: `linear-gradient(to right, rgba(226, 232, 240, 0.4) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(226, 232, 240, 0.4) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          background: '#ffffff',
          borderRadius: '28px',
          width: '100%',
          maxWidth: '480px',
          padding: '44px 36px',
          boxShadow: '0 10px 35px -5px rgba(15, 23, 42, 0.05), 0 0 1px 1px rgba(15, 23, 42, 0.02)',
          border: '1px solid #f1f5f9',
          boxSizing: 'border-box'
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/transcend-logo.svg" alt="Transcend Group of Institutions" style={{ height: '70px', objectFit: 'contain', margin: '0 auto' }} />
        </div>

        {/* Title & Subtitle */}
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', margin: '0 0 6px 0', textAlign: 'center' }}>
          Campus ERP Portal
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0, textAlign: 'center' }}>
          Sign in with your institutional account
        </p>

        {/* Quick Demo Access Chips */}
        <div style={{ marginTop: '20px', marginBottom: '4px', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, margin: '0 0 8px 0' }}>
            Quick Demo Login
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {DEMO_CREDENTIALS.map(cred => (
              <button
                key={cred.label}
                type="button"
                onClick={() => fillDemo(cred)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  border: `1px solid ${cred.color}30`,
                  color: cred.color,
                  background: `${cred.color}0a`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cred.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
          {/* Email / ID */}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.06em', marginBottom: '8px', textTransform: 'uppercase' }}>
              EMAIL OR ENROLLMENT ID
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', color: '#94a3b8', pointerEvents: 'none' }} />
              <input
                id="portal-login-email"
                type="text"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="Email or Enrollment ID (e.g. admin@tgi360.com)"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px 0 46px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.06em', marginBottom: '8px', textTransform: 'uppercase' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', color: '#94a3b8', pointerEvents: 'none' }} />
              <input
                id="portal-login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 46px 0 46px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  color: '#94a3b8',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ color: '#ef4444', fontSize: '12px', marginBottom: '16px', textAlign: 'center', fontWeight: 600 }}>
              {error}
            </div>
          )}

          {/* Primary Button */}
          <button
            id="portal-login-submit"
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              height: '48px',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
            }}
          >
            <span>{loading ? 'Authenticating…' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer */}
        <div style={{ marginTop: '32px', textAlign: 'center', lineHeight: '1.6', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          <p style={{ margin: 0, fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', fontSize: '11px', letterSpacing: '0.05em' }}>
            OWNED BY TRANSCEND GROUP OF INSTITUTIONS
          </p>
          <p style={{ margin: '4px 0 0 0', textTransform: 'uppercase', fontSize: '11px', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>
            DEVELOPED BY <span style={{ color: '#2563eb', fontWeight: 700 }}>START SMART, SE</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PortalLoginPage;
