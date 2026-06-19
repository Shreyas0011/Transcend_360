import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Home, 
  Building2, 
  Bus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Activity, 
  ArrowUpRight, 
  UserCheck, 
  Database,
  Cpu
} from 'lucide-react';
import { MobileBottomNav } from '../components/MobileBottomNav';

interface PendingRequest {
  id: string;
  studentName: string;
  studentId: string;
  portal: 'Hostel' | 'Facilities';
  type: string;
  details: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const AdminDashboardPage: React.FC = () => {
  const { user, isAuthenticated, setCurrentView } = useAuth();

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentView('landing');
    } else if (user?.role !== 'Admin') {
      setCurrentView('dashboard');
    }
  }, [isAuthenticated, user, setCurrentView]);

  // Pending Requests State
  const [requests, setRequests] = useState<PendingRequest[]>([
    {
      id: 'req1',
      studentName: 'Shreyas Nair',
      studentId: 'TR-2026-8942',
      portal: 'Hostel',
      type: 'Weekend Outing Leave',
      details: 'Visiting home from June 20th to June 22nd.',
      date: '2026-06-19',
      status: 'Pending'
    },
    {
      id: 'req2',
      studentName: 'Nisha Patil',
      studentId: 'TR-2026-7241',
      portal: 'Facilities',
      type: 'Seminar Hall Reservation',
      details: 'Robotics Club Orientation Meeting (3:00 PM - 5:00 PM)',
      date: '2026-06-19',
      status: 'Pending'
    },
    {
      id: 'req3',
      studentName: 'Kabir Mehta',
      studentId: 'TR-2026-1184',
      portal: 'Hostel',
      type: 'Room Switch Request',
      details: 'Requesting transfer from Block C Room 102 to Block A Room 204.',
      date: '2026-06-18',
      status: 'Pending'
    },
    {
      id: 'req4',
      studentName: 'Rohan Deshmukh',
      studentId: 'TR-2026-3392',
      portal: 'Facilities',
      type: 'Auditorium Booking',
      details: 'Music Club Annual Concert Practice Session (6:00 PM - 9:00 PM)',
      date: '2026-06-18',
      status: 'Pending'
    }
  ]);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    // Update request list
    const updated = requests.map(r => r.id === id ? { ...r, status: action } : r);
    setRequests(updated);

    // Also push a simulated notification into notification list so the user sees it
    const storedNotifs = localStorage.getItem('t360_notifications');
    const currentNotifs = storedNotifs ? JSON.parse(storedNotifs) : [];
    const targetReq = requests.find(r => r.id === id);

    if (targetReq) {
      const newNotif = {
        id: `n_admin_${Date.now()}`,
        title: `${targetReq.type} ${action}`,
        message: `Your request regarding "${targetReq.details}" has been ${action.toLowerCase()} by Admin Siddharth Sen.`,
        time: 'Just now',
        category: targetReq.portal.toLowerCase(),
        read: false,
        actionUrl: targetReq.portal === 'Hostel' ? 'https://hostel-portal-kappa.vercel.app' : 'https://www.tgi360.org'
      };

      localStorage.setItem('t360_notifications', JSON.stringify([newNotif, ...currentNotifs]));
    }
  };

  if (!user || user.role !== 'Admin') return null;

  return (
    <div className="relative min-h-screen bg-brand-bg pt-24 pb-28 md:pb-16">
      {/* Background Radial Glow */}
      <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] bg-brand-gold/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] right-[-5%] w-[450px] h-[450px] bg-brand-blue/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <header className="mb-8 border-b border-brand-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-white tracking-tight flex items-center gap-3">
              <UserCheck className="text-brand-gold" />
              <span>System Operations Control</span>
            </h1>
            <p className="text-brand-textSecondary text-xs md:text-sm mt-1">
              Gateway level access: Central Administrator &bull; Transcend 360 Ecosystem
            </p>
          </div>
          
          {/* Health indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-success/10 border border-brand-success/20 text-brand-success text-xs font-bold uppercase tracking-wider self-start sm:self-center">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-success animate-ping" />
            <span>SSO Nodes Online</span>
          </div>
        </header>

        {/* Admin Metric Cards with SVGs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Total Students */}
          <div className="p-6 rounded-3xl glass-panel relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-brand-textSecondary uppercase tracking-wider">Total Enrolled</p>
                <h3 className="text-2xl font-extrabold text-brand-white mt-1">2,842</h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Users size={18} />
              </div>
            </div>
            {/* Sparkline chart mockup */}
            <div className="h-10 w-full mt-4 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path 
                  d="M0 25 Q15 15, 30 18 T60 8 T90 20 T100 5" 
                  fill="none" 
                  stroke="#4F8CFF" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-brand-success font-semibold flex items-center gap-0.5">
                <ArrowUpRight size={14} /> +4.2%
              </span>
              <span className="text-brand-textSecondary text-[10px]">Since last semester</span>
            </div>
          </div>

          {/* Hostel Occupancy */}
          <div className="p-6 rounded-3xl glass-panel relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-brand-textSecondary uppercase tracking-wider">Hostel Occupancy</p>
                <h3 className="text-2xl font-extrabold text-brand-white mt-1">94.8%</h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center">
                <Home size={18} />
              </div>
            </div>
            {/* Sparkline chart mockup */}
            <div className="h-10 w-full mt-4 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path 
                  d="M0 5 Q15 12, 30 5 T60 20 T90 8 T100 12" 
                  fill="none" 
                  stroke="#D4AF37" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-brand-textSecondary font-semibold">1,120 / 1,180 beds</span>
              <span className="text-brand-textSecondary text-[10px]">Blocks A, B, C, D</span>
            </div>
          </div>

          {/* Facility Utilization */}
          <div className="p-6 rounded-3xl glass-panel relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-brand-textSecondary uppercase tracking-wider">Facility Utilization</p>
                <h3 className="text-2xl font-extrabold text-brand-white mt-1">82.3%</h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Building2 size={18} />
              </div>
            </div>
            {/* Sparkline chart mockup */}
            <div className="h-10 w-full mt-4 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path 
                  d="M0 20 Q15 8, 30 15 T60 5 T90 25 T100 8" 
                  fill="none" 
                  stroke="#4F8CFF" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-brand-success font-semibold flex items-center gap-0.5">
                <ArrowUpRight size={14} /> +12%
              </span>
              <span className="text-brand-textSecondary text-[10px]">Peak hours 4PM - 8PM</span>
            </div>
          </div>

          {/* Transportation Usage */}
          <div className="p-6 rounded-3xl glass-panel relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-brand-textSecondary uppercase tracking-wider">Transit Ridership</p>
                <h3 className="text-2xl font-extrabold text-brand-white mt-1">1,480 / day</h3>
              </div>
              <div className="h-10 w-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Bus size={18} />
              </div>
            </div>
            {/* Sparkline chart mockup */}
            <div className="h-10 w-full mt-4 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path 
                  d="M0 15 Q15 25, 30 10 T60 22 T90 12 T100 18" 
                  fill="none" 
                  stroke="#4F8CFF" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-brand-textSecondary font-semibold">6 active routes</span>
              <span className="text-brand-textSecondary text-[10px]">Shuttles N-1 to N-6</span>
            </div>
          </div>

        </section>

        {/* Analytics details and approval workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Approval Workflow Queue */}
          <div className="lg:col-span-8 p-6 rounded-3xl glass-panel shadow-premium">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-brand-white flex items-center gap-2">
                  <Clock size={18} className="text-brand-gold animate-spin-slow" />
                  <span>Pending SSO Request Approvals</span>
                </h2>
                <p className="text-xs text-brand-textSecondary">Incoming student leaves and facility reservations awaiting auth approval</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-brand-warning/10 border border-brand-warning/20 text-brand-warning text-xs font-bold">
                {requests.filter(r => r.status === 'Pending').length} Pending
              </span>
            </div>

            <div className="space-y-4">
              {requests.map((req) => {
                const isPending = req.status === 'Pending';
                return (
                  <div 
                    key={req.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      req.status === 'Approved'
                        ? 'bg-brand-success/5 border-brand-success/20 opacity-75'
                        : req.status === 'Rejected'
                        ? 'bg-brand-error/5 border-brand-error/20 opacity-75'
                        : 'bg-brand-bgSecondary border-brand-white/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                            req.portal === 'Hostel' ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-blue/20 text-brand-blue'
                          }`}>
                            {req.portal} Portal
                          </span>
                          <span className="text-brand-textSecondary">&bull; {req.date}</span>
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-brand-white">
                          {req.type} &bull; <span className="text-brand-gold font-medium">{req.studentName}</span>
                        </h3>
                        <p className="text-xs text-brand-textSecondary font-medium">ID: {req.studentId}</p>
                        <p className="text-xs text-brand-white leading-relaxed mt-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                          {req.details}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex sm:flex-col gap-2 shrink-0 self-start sm:self-center">
                        {isPending ? (
                          <>
                            <button
                              id={`approve-btn-${req.id}`}
                              onClick={() => handleAction(req.id, 'Approved')}
                              className="px-4 py-2.5 rounded-xl bg-brand-success text-brand-bg font-extrabold text-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 size={14} />
                              <span>Approve</span>
                            </button>
                            <button
                              id={`reject-btn-${req.id}`}
                              onClick={() => handleAction(req.id, 'Rejected')}
                              className="px-4 py-2.5 rounded-xl bg-brand-error/15 hover:bg-brand-error/25 text-brand-error font-extrabold text-xs transition-all flex items-center justify-center gap-1.5"
                            >
                              <XCircle size={14} />
                              <span>Reject</span>
                            </button>
                          </>
                        ) : (
                          <div className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase border flex items-center gap-1.5 ${
                            req.status === 'Approved' 
                              ? 'bg-brand-success/10 border-brand-success/20 text-brand-success' 
                              : 'bg-brand-error/10 border-brand-error/20 text-brand-error'
                          }`}>
                            {req.status === 'Approved' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            <span>{req.status}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: System Health Indicators */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 rounded-3xl glass-panel shadow-premium">
              <h2 className="text-lg font-bold text-brand-white mb-6 flex items-center gap-2">
                <Activity size={18} className="text-brand-blue" />
                <span>System Infrastructure Health</span>
              </h2>

              <div className="space-y-4">
                
                {/* CPU Load */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-brand-textSecondary flex items-center gap-1.5">
                      <Cpu size={14} className="text-brand-gold" />
                      <span>Simulated Gateway CPU Load</span>
                    </span>
                    <span className="text-brand-white">28%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-brand-gold rounded-full w-[28%] transition-all duration-500" />
                  </div>
                </div>

                {/* DB Sessions */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-brand-textSecondary flex items-center gap-1.5">
                      <Database size={14} className="text-brand-blue" />
                      <span>Active SSO Sessions</span>
                    </span>
                    <span className="text-brand-white">1,482</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-brand-blue rounded-full w-[65%] transition-all duration-500" />
                  </div>
                </div>

                {/* API Response times */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-brand-textSecondary">SSO Handshake Latency</span>
                    <span className="text-brand-success">14ms (Optimal)</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-brand-success rounded-full w-[15%] transition-all duration-500" />
                  </div>
                </div>

              </div>

              {/* Node Logs */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-brand-textSecondary">SSO Node Logs</p>
                <div className="font-mono text-[9px] text-brand-textSecondary bg-brand-bg/80 border border-white/5 p-3 rounded-xl space-y-1.5 max-h-[140px] overflow-y-auto no-scrollbar">
                  <p className="text-brand-success">[19:14:02] Token issuer verified: 'transcend-360-gateway'</p>
                  <p className="text-brand-blue">[19:14:02] Handshake success for 'shreyas.student@transcend.edu'</p>
                  <p className="text-brand-success">[19:13:58] Facilities Sync payload size: 14KB</p>
                  <p className="text-brand-textSecondary">[19:13:12] Cron job 'NotificationPrune' completed: 0 purged</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom mobile navigation panel */}
      <MobileBottomNav />
    </div>
  );
};
