import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicePortals } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Home, 
  Bus, 
  ExternalLink, 
  Lock,
  Cpu,
  Workflow,
  ShieldCheck,
  Database,
  Globe,
  Network,
  Wifi,
  GraduationCap,
  LogOut,
  ChevronDown
} from 'lucide-react';

import { navigateToPortal } from '../utils/domain';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, generateSSOToken } = useAuth();

  const [mousePos, setMousePos]     = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [cardMousePos, setCardMousePos] = useState<Record<string, { x: number; y: number }>>({});
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos(prev => ({ ...prev, [cardId]: { x: e.clientX - rect.left, y: e.clientY - rect.top } }));
  };

  const triggerAuthHandshake = (portal: typeof servicePortals[0]) => {
    if (portal.status !== 'active') return;
    const token = generateSSOToken(portal.id);
    navigateToPortal(portal.id, token);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Filter portals by user's allowed portals (SuperAdmin sees all)
  const allowedPortalIds = user?.allowedPortals || [];
  const visiblePortals = servicePortals.filter(p => 
    (p.status === 'active' || p.status === 'coming_soon') &&
    allowedPortalIds.includes(p.id)
  );

  // Role display label
  const roleLabels: Record<string, string> = {
    SuperAdmin: 'Super Administrator',
    HostelAdmin: 'Hostel Administrator',
    FacilitiesAdmin: 'Facilities Manager',
    TransportAdmin: 'Transport Manager',
  };
  const roleColors: Record<string, string> = {
    SuperAdmin: '#6366f1',
    HostelAdmin: '#f59e0b',
    FacilitiesAdmin: '#3b82f6',
    TransportAdmin: '#10b981',
  };
  const userRoleLabel = roleLabels[user?.role || ''] || user?.role || '';
  const userRoleColor = roleColors[user?.role || ''] || '#6366f1';

  if (!isAuthenticated || !user) return null;

  return (
    <div 
      className="h-screen w-screen bg-[#f8fafc] text-slate-900 flex flex-col relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-100" />
      <div 
        className="absolute rounded-full bg-blue-600/8 blur-[100px] pointer-events-none z-0 transition-transform duration-500 ease-out"
        style={{ width: '400px', height: '400px', transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`, top: 0, left: 0 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12)_0%,_rgba(255,255,255,0)_65%)] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.08)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* Orbit decorations */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full border border-blue-900/5 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[480px] h-[480px] rounded-full border border-dashed border-blue-900/5 animate-spin-slow pointer-events-none z-0" />
      </div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full border border-indigo-900/5 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[550px] h-[550px] rounded-full border border-dashed border-indigo-900/5 animate-spin-slow pointer-events-none z-0" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
      </div>

      {/* Floating background icons */}
      <div className="absolute top-[8%] left-[6%] z-0 pointer-events-none text-blue-900/8 animate-float"><Database size={32} /></div>
      <div className="absolute top-[15%] right-[8%] z-0 pointer-events-none text-indigo-900/8 animate-float-delayed"><Globe size={28} /></div>
      <div className="absolute top-[40%] left-[3%] z-0 pointer-events-none text-blue-900/8 animate-float"><Network size={26} /></div>
      <div className="absolute top-[60%] right-[5%] z-0 pointer-events-none text-indigo-900/8 animate-float-delayed"><Wifi size={22} /></div>
      <div className="absolute bottom-[22%] left-[8%] z-0 pointer-events-none text-blue-900/8 animate-float"><GraduationCap size={30} /></div>
      <div className="absolute bottom-[22%] right-[25%] z-0 pointer-events-none text-blue-900/10 animate-float"><ShieldCheck size={34} /></div>
      <div className="absolute bottom-[14%] right-[10%] z-0 pointer-events-none text-indigo-900/10 animate-float-delayed"><Cpu size={28} /></div>

      {/* ── Top Nav Bar ── */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-10 py-4 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-blue-950 flex items-center justify-center shadow-sm">
            <span className="text-white font-extrabold text-sm">T</span>
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-tight text-blue-950">Transcend <span className="text-blue-600">360</span></span>
            <p className="text-[9px] text-slate-400 tracking-wider uppercase font-semibold leading-none mt-0.5">Campus ERP</p>
          </div>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300 transition-all shadow-sm"
          >
            <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-lg object-cover bg-slate-100" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-none">{user.name}</p>
              <p className="text-[10px] font-semibold leading-none mt-0.5" style={{ color: userRoleColor }}>{userRoleLabel}</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <p className="text-xs font-bold text-slate-800">{user.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{user.email}</p>
                  <span 
                    className="inline-block mt-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ color: userRoleColor, background: userRoleColor + '18', border: `1px solid ${userRoleColor}30` }}
                  >
                    {userRoleLabel}
                  </span>
                </div>

                {/* Allowed portals */}
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold mb-1.5">Portal Access</p>
                  {allowedPortalIds.map(id => {
                    const p = servicePortals.find(sp => sp.id === id);
                    return p ? (
                      <div key={id} className="flex items-center gap-1.5 py-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[11px] font-medium text-slate-600">{p.title}</span>
                      </div>
                    ) : null;
                  })}
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-sm font-semibold"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
      )}

      {/* ── Main Content ── */}
      <main className="flex-grow flex flex-col justify-center items-center overflow-hidden py-4 z-10">
        <div className="w-full max-w-7xl flex flex-col justify-center items-center h-full px-6">
          
          <div className="flex flex-col items-center justify-center max-w-5xl mx-auto text-center space-y-6">
            
            {/* Title Block */}
            <div className="space-y-2.5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-700 uppercase tracking-wider shadow-sm"
              >
                <Workflow size={10} className="text-blue-600 animate-spin-slow" />
                <span>Unified Digital Campus Ecosystem</span>
              </motion.div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-950 tracking-tight leading-none">
                Welcome, <span className="text-blue-600">{user.name.split(' ')[0]}</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-lg mx-auto">
                {visiblePortals.length === 1
                  ? `You have access to the ${visiblePortals[0]?.title} portal.`
                  : `You have access to ${visiblePortals.length} campus service portals.`}
              </p>
            </div>

            {/* Portal Cards Grid */}
            <div className={`grid gap-6 w-full max-w-4xl px-4 ${
              visiblePortals.length === 1 ? 'grid-cols-1 max-w-sm' :
              visiblePortals.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl' :
              'grid-cols-1 sm:grid-cols-3'
            }`}>
              {visiblePortals.map((portal) => {
                const isActive = portal.status === 'active';
                const isFacilities = portal.id === 'facilities';
                const isHovered = hoveredCard === portal.id;
                const mPos = cardMousePos[portal.id] || { x: 0, y: 0 };

                return (
                  <motion.div
                    key={portal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={isActive ? { y: -6 } : {}}
                    onMouseMove={(e) => isActive && handleCardMouseMove(e, portal.id)}
                    onHoverStart={() => isActive && setHoveredCard(portal.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    onClick={() => isActive && triggerAuthHandshake(portal)}
                    style={{
                      background: isHovered 
                        ? `radial-gradient(150px circle at ${mPos.x}px ${mPos.y}px, rgba(37, 99, 235, 0.08), transparent), rgba(255, 255, 255, 0.85)` 
                        : 'rgba(255, 255, 255, 0.72)'
                    }}
                    className={`p-6 rounded-3xl border transition-all text-left flex flex-col justify-between min-h-[220px] relative overflow-hidden ${
                      isActive 
                        ? 'border-slate-200 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-blue-600/35 hover:shadow-[0_12px_40px_rgba(30,58,138,0.08)] cursor-pointer' 
                        : 'bg-slate-50/40 border-slate-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <AnimatePresence>
                      {isActive && isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`absolute inset-0 z-0 pointer-events-none ${
                            isFacilities ? 'bg-gradient-to-tr from-blue-500/5 to-transparent' : 'bg-gradient-to-tr from-indigo-500/5 to-transparent'
                          }`}
                        />
                      )}
                    </AnimatePresence>

                    <div className="z-10 relative">
                      <div className="flex justify-between items-start mb-3">
                        <motion.div 
                          animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                          transition={{ duration: 0.5 }}
                          className={`p-3 rounded-xl transition-all ${
                            isActive 
                              ? isFacilities 
                                ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                                : portal.id === 'hostel'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-100 shadow-sm'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm'
                              : 'bg-slate-100 text-slate-400 border border-slate-200/50'
                          }`}
                        >
                          {isFacilities ? <Building2 size={20} /> : portal.id === 'hostel' ? <Home size={20} /> : <Bus size={20} />}
                        </motion.div>
                        {isActive ? (
                          <span className="text-[8px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase tracking-wider">
                            Active
                          </span>
                        ) : (
                          <span className="text-[8px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Lock size={8} /> Soon
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-extrabold text-blue-950 leading-tight">{portal.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">{portal.description}</p>
                    </div>

                    <div className="z-10 relative mt-4">
                      {isActive ? (
                        <motion.div
                          animate={isHovered ? { x: 3 } : { x: 0 }}
                          className={`w-full py-2.5 rounded-xl text-white font-extrabold text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                            isFacilities 
                              ? 'bg-blue-600 hover:bg-blue-700 shadow-[0_4px_12px_rgba(37,99,235,0.2)]'
                              : portal.id === 'hostel'
                                ? 'bg-amber-600 hover:bg-amber-700 shadow-[0_4px_12px_rgba(245,158,11,0.2)]'
                                : 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.2)]'
                          }`}
                        >
                          <span>Enter Portal</span>
                          <ExternalLink size={12} />
                        </motion.div>
                      ) : (
                        <div className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-extrabold text-[11px] border border-slate-200/50 flex items-center justify-center gap-1.5">
                          <Cpu size={12} />
                          <span>Integrating Module</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
