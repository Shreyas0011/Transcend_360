import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, Compass, LayoutDashboard, Bell, User, LogOut, Shield } from 'lucide-react';
import { SSOModal } from './SSOModal';

interface MobileBottomNavProps {
  onToggleNotifications?: () => void;
  unreadCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  onToggleNotifications,
  unreadCount = 3 
}) => {
  const { user, isAuthenticated, logout, currentView, setCurrentView } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showMiniProfile, setShowMiniProfile] = useState(false);

  const handleServicesClick = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const servicesSec = document.getElementById('services');
        if (servicesSec) servicesSec.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const servicesSec = document.getElementById('services');
      if (servicesSec) servicesSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      setShowMiniProfile(!showMiniProfile);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1020]/90 backdrop-blur-lg border-t border-brand-white/10 px-4 py-2 md:hidden shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-around">
          {/* Home */}
          <button
            onClick={() => setCurrentView('landing')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
              currentView === 'landing' ? 'text-brand-gold' : 'text-brand-textSecondary'
            }`}
          >
            <Home size={20} />
            <span className="text-[10px] font-medium mt-1">Home</span>
          </button>

          {/* Services */}
          <button
            onClick={handleServicesClick}
            className="flex flex-col items-center justify-center p-2 rounded-xl text-brand-textSecondary transition-colors"
          >
            <Compass size={20} />
            <span className="text-[10px] font-medium mt-1">Services</span>
          </button>

          {/* Dashboard */}
          <button
            onClick={() => {
              if (isAuthenticated) {
                setCurrentView((user?.role as any) === 'Admin' || (user?.role as any) === 'SuperAdmin' ? 'admin' : 'dashboard');
              } else {
                setIsLoginModalOpen(true);
              }
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
              currentView === 'dashboard' || currentView === 'admin' ? 'text-brand-gold' : 'text-brand-textSecondary'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-medium mt-1">Portal</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => {
              if (isAuthenticated) {
                if (onToggleNotifications) {
                  onToggleNotifications();
                } else {
                  setCurrentView('dashboard');
                  setTimeout(() => {
                    const notifSec = document.getElementById('notification-center');
                    if (notifSec) notifSec.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              } else {
                setIsLoginModalOpen(true);
              }
            }}
            className="flex flex-col items-center justify-center p-2 rounded-xl text-brand-textSecondary relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && isAuthenticated && (
              <span className="absolute top-1.5 right-3 h-4 w-4 bg-brand-error text-brand-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#0B1020]">
                {unreadCount}
              </span>
            )}
            <span className="text-[10px] font-medium mt-1">Alerts</span>
          </button>

          {/* Profile */}
          <button
            onClick={handleProfileClick}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
              showMiniProfile ? 'text-brand-gold' : 'text-brand-textSecondary'
            }`}
          >
            {isAuthenticated && user ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-5 w-5 rounded-full border border-brand-gold/40 bg-white/5"
              />
            ) : (
              <User size={20} />
            )}
            <span className="text-[10px] font-medium mt-1">{isAuthenticated ? 'Profile' : 'Sign In'}</span>
          </button>
        </div>
      </div>

      {/* Mini Profile Popup Drawer for Mobile */}
      {showMiniProfile && isAuthenticated && user && (
        <>
          <div 
            className="fixed inset-0 z-30 md:hidden bg-black/40 backdrop-blur-xs"
            onClick={() => setShowMiniProfile(false)}
          />
          <div className="fixed bottom-16 left-4 right-4 z-40 bg-brand-bgSecondary border border-brand-white/10 rounded-2xl p-5 shadow-2xl animate-fade-in md:hidden">
            <div className="flex items-center gap-4 border-b border-brand-white/5 pb-4 mb-4">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-12 w-12 rounded-full border border-brand-gold/40 bg-white/5"
              />
              <div>
                <h4 className="text-sm font-bold text-brand-white">{user.name}</h4>
                <p className="text-xs text-brand-textSecondary">{user.email}</p>
                <div className="inline-block px-2 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/20 text-[9px] font-bold text-brand-gold uppercase tracking-wider mt-1.5">
                  {user.role} Authorization
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {((user.role as any) === 'Admin' || (user.role as any) === 'SuperAdmin') && (
                <button
                  onClick={() => {
                    setShowMiniProfile(false);
                    setCurrentView('admin');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-brand-gold bg-brand-gold/5 hover:bg-brand-gold/10 transition-colors"
                >
                  <Shield size={16} />
                  <span>Admin Panel</span>
                </button>
              )}
              <button
                onClick={() => {
                  setShowMiniProfile(false);
                  logout();
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-error/10 text-brand-error hover:bg-brand-error/20 transition-colors"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Login Modal */}
      <SSOModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};
