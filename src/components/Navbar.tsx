import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard, Shield, ChevronDown } from 'lucide-react';
import { SSOModal } from './SSOModal';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, currentView, setCurrentView } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (anchorId: string) => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'landing') {
      setCurrentView('landing');
      // Wait for view mount before scrolling
      setTimeout(() => {
        const element = document.getElementById(anchorId.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(anchorId.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', view: 'landing', action: () => setCurrentView('landing') },
    { name: 'Services', view: 'services', action: () => handleNavClick('#services') },
    { name: 'Dashboard', view: 'dashboard', action: () => {
        if (isAuthenticated) {
          setCurrentView(user?.role === 'Admin' ? 'admin' : 'dashboard');
        } else {
          setIsLoginModalOpen(true);
        }
      }
    },
    { name: 'Announcements', view: 'announcements', action: () => handleNavClick('#announcements') },
    { name: 'Support', view: 'support', action: () => handleNavClick('#support') },
  ];

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-brand-bg/85 backdrop-blur-md border-b border-brand-white/10 shadow-glass'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Button */}
            <div className="flex-shrink-0 flex items-center">
              <button 
                onClick={() => setCurrentView('landing')} 
                className="flex items-center gap-2 group text-left"
              >
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-gold to-brand-lightGold flex items-center justify-center shadow-premium-gold transition-transform group-hover:scale-105">
                  <span className="text-brand-bg font-extrabold text-lg font-sans">T</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-white font-extrabold tracking-tight text-lg leading-none">
                    Transcend <span className="text-brand-gold">360</span>
                  </span>
                  <span className="text-[9px] text-brand-textSecondary tracking-wider uppercase font-medium mt-0.5">
                    Campus Hub
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = 
                  (link.view === 'landing' && currentView === 'landing') ||
                  (link.view === 'dashboard' && (currentView === 'dashboard' || currentView === 'admin'));
                
                return (
                  <button
                    key={link.name}
                    id={`nav-link-${link.name.toLowerCase()}`}
                    onClick={link.action}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'text-brand-gold bg-brand-gold/10'
                        : 'text-brand-textSecondary hover:text-brand-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTA / Profile Dropdown */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    id="profile-dropdown-trigger"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-7 w-7 rounded-full bg-brand-bg border border-brand-gold/20"
                    />
                    <div className="text-left">
                      <p className="text-xs font-semibold text-brand-white leading-tight max-w-[100px] truncate">
                        {user.name}
                      </p>
                      <p className="text-[9px] text-brand-textSecondary font-medium leading-none uppercase">
                        {user.role}
                      </p>
                    </div>
                    <ChevronDown size={14} className="text-brand-textSecondary" />
                  </button>

                  {isProfileDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-brand-bgSecondary p-2 shadow-2xl z-20 backdrop-blur-md">
                        <div className="px-3 py-2.5 border-b border-white/5 mb-1">
                          <p className="text-xs font-medium text-brand-textSecondary">Signed in as</p>
                          <p className="text-sm font-bold text-brand-white truncate">{user.email}</p>
                        </div>

                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            setCurrentView('dashboard');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-brand-textSecondary hover:text-brand-white hover:bg-white/5 transition-colors text-left"
                        >
                          <LayoutDashboard size={16} className="text-brand-blue" />
                          <span>Services Dashboard</span>
                        </button>

                        {user.role === 'Admin' && (
                          <button
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setCurrentView('admin');
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-brand-textSecondary hover:text-brand-white hover:bg-white/5 transition-colors text-left"
                          >
                            <Shield size={16} className="text-brand-gold" />
                            <span>System Admin Panel</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-brand-error hover:bg-brand-error/10 transition-colors mt-1 text-left"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button
                    id="nav-login-btn"
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-5 py-2 text-sm font-semibold text-brand-textSecondary hover:text-brand-white transition-all"
                  >
                    Login
                  </button>
                  <button
                    id="nav-get-started-btn"
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-5 py-2.5 rounded-full bg-brand-gold text-brand-bg font-bold text-sm hover:bg-brand-lightGold hover:scale-[1.02] shadow-premium-gold transition-all duration-200"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {isAuthenticated && user && (
                <button onClick={() => setCurrentView('dashboard')} className="mr-1">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border border-brand-gold/30 bg-white/5"
                  />
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-brand-textSecondary hover:text-brand-white hover:bg-white/5 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slideout Menu */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 z-40 bg-brand-bgSecondary border-b border-brand-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-fade-in">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      link.action();
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-brand-textSecondary hover:text-brand-white hover:bg-brand-bg transition-all"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="border-t border-brand-white/5 pt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    {user?.role === 'Admin' && (
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setCurrentView('admin');
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-brand-gold bg-brand-gold/5 w-full text-left"
                      >
                        <Shield size={18} />
                        <span>System Admin Panel</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold bg-brand-error/10 text-brand-error"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="w-full text-center py-3 rounded-xl text-base font-semibold text-brand-white hover:bg-white/5 border border-brand-white/10 transition-all"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="w-full text-center py-3.5 rounded-xl bg-brand-gold text-brand-bg font-bold text-base hover:bg-brand-lightGold transition-all"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Login modal overlay */}
      <SSOModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};
