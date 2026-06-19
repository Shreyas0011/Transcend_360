import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicePortals } from '../data/mockData';
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
  GraduationCap
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Card Mouse Tracking for Spotlight Glow
  const [cardMousePos, setCardMousePos] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCardMousePos(prev => ({ ...prev, [cardId]: { x, y } }));
  };

  const triggerAuthHandshake = (portal: typeof servicePortals[0]) => {
    if (portal.status !== 'active') return;
    window.open(portal.url || '#', '_blank', 'noopener,noreferrer');
  };

  const activePortals = servicePortals.filter(p => p.status === 'active' || p.status === 'coming_soon');

  return (
    <div 
      className="h-screen w-screen bg-[#f8fafc] text-slate-900 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. Coordinate Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-100" />

      {/* 2. Interactive Dynamic Cursor Tracking Glow Orb */}
      <div 
        className="absolute rounded-full bg-blue-600/8 blur-[100px] pointer-events-none z-0 transition-transform duration-500 ease-out"
        style={{
          width: '400px',
          height: '400px',
          transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
          top: 0,
          left: 0,
        }}
      />

      {/* 3. Premium Layered Ambient Mesh Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12)_0%,_rgba(255,255,255,0)_65%)] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.08)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.03)_0%,_transparent_70%)] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />

      {/* 4. Multi-Layer Concentric Tech Orbits / Blueprint Compass */}
      {/* Top Left Stack */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full border border-blue-900/5 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[480px] h-[480px] rounded-full border border-dashed border-blue-900/5 animate-spin-slow pointer-events-none z-0" />
      </div>
      <div className="absolute top-[5%] left-[5%] w-[380px] h-[380px] rounded-full border border-indigo-900/5 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[280px] h-[280px] rounded-full border border-dashed border-indigo-900/5 animate-spin-slow pointer-events-none z-0" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
      </div>
      <div className="absolute top-[12%] left-[12%] w-[180px] h-[180px] rounded-full border border-blue-900/5 pointer-events-none z-0" />

      {/* Bottom Right Stack */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full border border-indigo-900/5 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[550px] h-[550px] rounded-full border border-dashed border-indigo-900/5 animate-spin-slow pointer-events-none z-0" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
      </div>
      <div className="absolute bottom-[-2%] right-[-2%] w-[400px] h-[400px] rounded-full border border-blue-900/5 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] rounded-full border border-dashed border-blue-900/5 animate-spin-slow pointer-events-none z-0" style={{ animationDuration: '25s' }} />
      </div>
      <div className="absolute bottom-[5%] right-[5%] w-[180px] h-[180px] rounded-full border border-indigo-900/5 pointer-events-none z-0" />

      {/* 5. Rich Scattered Floating Background Icons (Visible, 10% Opacity) */}
      {/* Top Left Quadrant */}
      <div className="absolute top-[12%] left-[22%] z-0 pointer-events-none text-blue-900/10 animate-float">
        <GraduationCap size={36} />
      </div>
      <div className="absolute top-[25%] left-[8%] z-0 pointer-events-none text-blue-900/10 animate-float-delayed">
        <ShieldCheck size={28} />
      </div>
      <div className="absolute top-[38%] left-[20%] z-0 pointer-events-none text-indigo-900/10 animate-float">
        <Database size={28} />
      </div>

      {/* Top Center / Header Quadrant */}
      <div className="absolute top-[6%] left-[45%] z-0 pointer-events-none text-blue-900/10 animate-float-delayed">
        <Network size={32} />
      </div>

      {/* Top Right Quadrant */}
      <div className="absolute top-[14%] right-[22%] z-0 pointer-events-none text-blue-900/10 animate-float">
        <Cpu size={38} />
      </div>
      <div className="absolute top-[22%] right-[8%] z-0 pointer-events-none text-indigo-900/10 animate-float-delayed">
        <Database size={24} />
      </div>
      <div className="absolute top-[35%] right-[28%] z-0 pointer-events-none text-blue-900/10 animate-float">
        <Globe size={32} />
      </div>

      {/* Mid Left & Right Quadrant */}
      <div className="absolute top-[48%] left-[6%] z-0 pointer-events-none text-blue-900/10 animate-float">
        <Globe size={36} />
      </div>
      <div className="absolute top-[46%] right-[8%] z-0 pointer-events-none text-indigo-900/10 animate-float-delayed">
        <Wifi size={30} />
      </div>

      {/* Bottom Left Quadrant */}
      <div className="absolute bottom-[28%] left-[14%] z-0 pointer-events-none text-blue-900/10 animate-float-delayed">
        <ShieldCheck size={26} />
      </div>
      <div className="absolute bottom-[36%] left-[28%] z-0 pointer-events-none text-indigo-900/10 animate-float">
        <Workflow size={32} />
      </div>
      <div className="absolute bottom-[10%] left-[48%] z-0 pointer-events-none text-blue-900/10 animate-float-delayed">
        <GraduationCap size={28} />
      </div>

      {/* Bottom Right Quadrant */}
      <div className="absolute bottom-[22%] right-[25%] z-0 pointer-events-none text-blue-900/10 animate-float">
        <ShieldCheck size={34} />
      </div>
      <div className="absolute bottom-[14%] right-[10%] z-0 pointer-events-none text-indigo-900/10 animate-float-delayed">
        <Cpu size={28} />
      </div>

      {/* Header Row */}
      <header className="flex justify-center items-center z-10 border-b border-slate-150 pb-3 shrink-0">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="h-10 w-10 rounded-2xl bg-blue-950 flex items-center justify-center shadow-[0_4px_12px_rgba(30,58,138,0.15)] relative overflow-hidden group">
            <span className="text-white font-extrabold text-xl z-10">T</span>
            <div className="absolute inset-0 bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-xl font-extrabold tracking-tight leading-none text-blue-950">
              Transcend <span className="text-blue-600">360</span>
            </h1>
            <p className="text-[9px] text-slate-400 tracking-wider uppercase font-semibold">
              Campus Operating System
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid View */}
      <main className="flex-grow flex flex-col justify-center items-center overflow-hidden py-4 z-10 max-h-[calc(100vh-140px)]">
        <div className="w-full max-w-7xl flex flex-col justify-center items-center h-full">
          
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
                Welcome to the <span className="text-blue-600">Transcend Gateway</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-lg mx-auto">
                Directly connect to active campus service portals from a single consolidated dispatch page.
              </p>
            </div>

            {/* Centered Portals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl px-4">
              {activePortals.map((portal) => {
                const isActive = portal.status === 'active';
                const isFacilities = portal.id === 'facilities';
                const isHovered = hoveredCard === portal.id;
                const mPos = cardMousePos[portal.id] || { x: 0, y: 0 };

                return (
                  <motion.div
                    key={portal.id}
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
                    className={`p-6 rounded-3xl border transition-all text-left flex flex-col justify-between min-h-[220px] relative overflow-hidden cursor-pointer ${
                      isActive 
                        ? 'border-slate-200 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-blue-600/35 hover:shadow-[0_12px_40px_rgba(30,58,138,0.08)]' 
                        : 'bg-slate-50/40 border-slate-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Hover Aura Behind Card */}
                    <AnimatePresence>
                      {isActive && isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`absolute inset-0 z-0 pointer-events-none transition-all duration-300 ${
                            isFacilities 
                              ? 'bg-gradient-to-tr from-blue-500/5 to-transparent' 
                              : 'bg-gradient-to-tr from-indigo-500/5 to-transparent'
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
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                              : 'bg-slate-100 text-slate-400 border border-slate-200/50'
                          }`}
                        >
                          {isFacilities ? <Building2 size={20} /> : portal.id === 'hostel' ? <Home size={20} /> : <Bus size={20} />}
                        </motion.div>
                        {isActive ? (
                          <span className="text-[8px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-150 font-bold uppercase tracking-wider">
                            Active
                          </span>
                        ) : (
                          <span className="text-[8px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Lock size={8} /> Soon
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-extrabold text-blue-950 leading-tight">
                        {portal.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                        {portal.description}
                      </p>
                    </div>

                    <div className="z-10 relative mt-4">
                      {isActive ? (
                        <motion.div
                          animate={isHovered ? { x: 3 } : { x: 0 }}
                          className={`w-full py-2.5 rounded-xl text-white font-extrabold text-[11px] transition-all flex items-center justify-center gap-1.5 ${
                            isFacilities 
                              ? 'bg-blue-600 hover:bg-blue-700 shadow-[0_4px_12px_rgba(37,99,235,0.2)]'
                              : 'bg-indigo-600 hover:bg-indigo-700 shadow-[0_4px_12px_rgba(79,70,229,0.2)]'
                          }`}
                        >
                          <span>View Site</span>
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
