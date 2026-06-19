import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  mockActivityLogs, 
  mockNotifications, 
  mockAnnouncements, 
  servicePortals
} from '../data/mockData';
import type { NotificationItem, Announcement } from '../data/mockData';
import { DynamicIcon } from '../components/DynamicIcon';
import { 
  Clock, 
  Bell, 
  ExternalLink, 
  AlertTriangle, 
  Home, 
  Building2, 
  Bus, 
  History, 
  CheckCheck
} from 'lucide-react';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, redirectToPortal, setCurrentView } = useAuth();
  
  // States
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnCategory, setSelectedAnnCategory] = useState<string>('All');
  const [dateTimeStr, setDateTimeStr] = useState<string>('');

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentView('landing');
    }
  }, [isAuthenticated, setCurrentView]);

  // Load and sync states
  useEffect(() => {
    // Initial load
    const storedNotifs = localStorage.getItem('t360_notifications');
    if (storedNotifs) {
      setNotifications(JSON.parse(storedNotifs));
    } else {
      setNotifications(mockNotifications);
      localStorage.setItem('t360_notifications', JSON.stringify(mockNotifications));
    }

    setAnnouncements(mockAnnouncements);

  }, []);

  // Clock widget effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      };
      setDateTimeStr(now.toLocaleString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('t360_notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('t360_notifications', JSON.stringify(updated));
  };

  if (!user) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  // Filtered announcements
  const annCategories = ['All', 'Hostel', 'Facilities', 'Transportation', 'Academic', 'General'];
  const filteredAnnouncements = selectedAnnCategory === 'All' 
    ? announcements 
    : announcements.filter(a => a.category === selectedAnnCategory);

  return (
    <div className="relative min-h-screen bg-brand-bg pt-24 pb-28 md:pb-16">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[5%] w-[400px] h-[400px] bg-brand-blue/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <header className="mb-8 p-6 rounded-3xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-6 glow-blue/5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-16 w-16 rounded-2xl border-2 border-brand-gold bg-brand-bgSecondary p-0.5 shadow-premium"
              />
              <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded bg-brand-gold text-brand-bg font-extrabold text-[8px] tracking-widest uppercase">
                {user.role}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-textSecondary uppercase tracking-widest leading-none mb-1">Gateway Authorized</p>
              <h1 className="text-2xl font-extrabold text-brand-white leading-tight">
                Welcome Back, {user.name}
              </h1>
              <p className="text-xs text-brand-textSecondary mt-0.5">
                Role: {user.role} &bull; ID: {user.studentId || 'TR-ADMIN-5523'}
              </p>
            </div>
          </div>
          
          {/* Live Date-Time */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-2.5 rounded-2xl self-start md:self-center">
            <Clock size={16} className="text-brand-gold" />
            <span className="text-xs font-mono font-bold text-brand-white tracking-wide">
              {dateTimeStr || 'Loading timeline...'}
            </span>
          </div>
        </header>

        {/* Quick Access Modules Bar */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textSecondary mb-4">Quick Access Portals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {servicePortals
              .filter(p => p.status === 'active' || p.status === 'coming_soon')
              .map(portal => {
                const isComingSoon = portal.status === 'coming_soon';
                return (
                  <button
                    key={portal.id}
                    id={`quick-portal-btn-${portal.id}`}
                    disabled={isComingSoon}
                    onClick={() => {
                      if (portal.url) {
                        redirectToPortal(portal.url, portal.title);
                      }
                    }}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all text-left group ${
                      isComingSoon 
                        ? 'bg-white/[0.02] border-brand-white/5 opacity-50 cursor-not-allowed'
                        : 'bg-brand-bgSecondary border-brand-white/10 hover:border-brand-gold/30 hover:glow-gold/5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`h-11 w-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ${
                        isComingSoon ? 'text-brand-textSecondary' : 'text-brand-gold group-hover:text-brand-white transition-colors'
                      }`}>
                        <DynamicIcon name={portal.iconName} size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-brand-white leading-snug">{portal.title}</h3>
                        <p className="text-[10px] text-brand-textSecondary mt-0.5 font-medium">
                          {isComingSoon ? 'Status: Under Development' : 'SSO Connection Ready'}
                        </p>
                      </div>
                    </div>
                    {isComingSoon ? (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-brand-warning/80 bg-brand-warning/10 px-2 py-0.5 rounded border border-brand-warning/20">Coming Soon</span>
                    ) : (
                      <ExternalLink size={14} className="text-brand-textSecondary group-hover:text-brand-gold transition-colors" />
                    )}
                  </button>
                );
              })}
          </div>
        </section>

        {/* Quick Overview Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          
          {/* Hostel Status */}
          <div className="p-5 rounded-2xl glass-panel flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-textSecondary">Hostel Status</span>
              <div className="h-7 w-7 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center">
                <Home size={14} />
              </div>
            </div>
            <div>
              <p className="text-xs text-brand-textSecondary">Room Assigned</p>
              <h3 className="text-lg font-bold text-brand-white mt-0.5">Room B-302</h3>
              <p className="text-[10px] text-brand-success font-semibold mt-1.5 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-success animate-pulse" />
                <span>Attendance Verified</span>
              </p>
            </div>
          </div>

          {/* Facility Bookings */}
          <div className="p-5 rounded-2xl glass-panel flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-textSecondary">Active Bookings</span>
              <div className="h-7 w-7 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Building2 size={14} />
              </div>
            </div>
            <div>
              <p className="text-xs text-brand-textSecondary">Auditorium Slot</p>
              <h3 className="text-lg font-bold text-brand-white mt-0.5">Badminton Ct 2</h3>
              <p className="text-[10px] text-brand-gold font-semibold mt-1.5">
                Tomorrow, 6:00 PM
              </p>
            </div>
          </div>

          {/* Transportation */}
          <div className="p-5 rounded-2xl glass-panel flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-textSecondary">Transportation</span>
              <div className="h-7 w-7 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Bus size={14} />
              </div>
            </div>
            <div>
              <p className="text-xs text-brand-textSecondary">Night Shuttle</p>
              <h3 className="text-lg font-bold text-brand-white mt-0.5">Route N-4 Active</h3>
              <p className="text-[10px] text-brand-success font-semibold mt-1.5">
                Every 40 mins
              </p>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="p-5 rounded-2xl glass-panel flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-textSecondary">Pending Approvals</span>
              <div className="h-7 w-7 rounded-lg bg-brand-warning/10 text-brand-warning flex items-center justify-center">
                <AlertTriangle size={14} />
              </div>
            </div>
            <div>
              <p className="text-xs text-brand-textSecondary">Warden Workflow</p>
              <h3 className="text-lg font-bold text-brand-white mt-0.5">0 Requests</h3>
              <p className="text-[10px] text-brand-textSecondary mt-1.5">
                All requests processed
              </p>
            </div>
          </div>

          {/* Unread Alerts */}
          <div className="p-5 rounded-2xl glass-panel flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-textSecondary">Central Alerts</span>
              <div className="h-7 w-7 rounded-lg bg-brand-error/10 text-brand-error flex items-center justify-center">
                <Bell size={14} />
              </div>
            </div>
            <div>
              <p className="text-xs text-brand-textSecondary">Unread Notices</p>
              <h3 className="text-lg font-bold text-brand-error mt-0.5">{unreadCount} Alerts</h3>
              <p className="text-[10px] text-brand-textSecondary mt-1.5 hover:underline cursor-pointer" onClick={markAllAsRead}>
                Mark all as read
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Announcements Module & Activity Feed */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Announcements Module */}
            <div className="p-6 rounded-3xl glass-panel shadow-premium">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-brand-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
                    <span>Live Announcements Board</span>
                  </h2>
                  <p className="text-xs text-brand-textSecondary">Filters official notifications from admins, wardens, and IT</p>
                </div>

                {/* Announcement filters */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {annCategories.map((cat) => (
                    <button
                      key={cat}
                      id={`dash-ann-filter-${cat.toLowerCase()}`}
                      onClick={() => setSelectedAnnCategory(cat)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                        selectedAnnCategory === cat
                          ? 'bg-brand-gold text-brand-bg shadow-premium-gold/10'
                          : 'bg-white/5 text-brand-textSecondary hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Announcements List */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 no-scrollbar">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((ann) => {
                    const isHigh = ann.priority === 'High';
                    const isEmergency = ann.category === 'Emergency';
                    return (
                      <div 
                        key={ann.id}
                        className="p-4 rounded-xl bg-brand-bg/50 border border-white/5 flex gap-3.5 hover:border-brand-gold/20 transition-all"
                      >
                        <div className={`mt-0.5 p-1.5 rounded-lg ${
                          isEmergency ? 'bg-brand-error/15 text-brand-error' : isHigh ? 'bg-brand-warning/15 text-brand-warning' : 'bg-brand-blue/15 text-brand-blue'
                        }`}>
                          <DynamicIcon name={isEmergency ? 'AlertTriangle' : 'Calendar'} size={16} />
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="flex justify-between items-center flex-wrap gap-2 text-[10px] text-brand-textSecondary">
                            <span className="font-semibold">{ann.category} &bull; {ann.date}</span>
                            <span className={`px-2 py-0.5 rounded font-extrabold uppercase ${
                              isEmergency ? 'bg-brand-error/20 text-brand-error' : isHigh ? 'bg-brand-warning/20 text-brand-warning' : 'bg-brand-blue/20 text-brand-blue'
                            }`}>
                              {ann.priority} Priority
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-brand-white leading-snug">{ann.title}</h4>
                          <p className="text-xs text-brand-textSecondary leading-relaxed">{ann.description}</p>
                          <p className="text-[9px] text-brand-textSecondary/70 italic">Posted by: {ann.postedBy}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xs text-brand-textSecondary font-semibold">No announcements found in this category.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity Feed (Timeline) */}
            <div className="p-6 rounded-3xl glass-panel shadow-premium">
              <h2 className="text-lg font-bold text-brand-white mb-6 flex items-center gap-2">
                <History size={18} className="text-brand-blue" />
                <span>Recent System Activity</span>
              </h2>

              <div className="relative border-l border-white/10 pl-6 ml-3 space-y-6">
                {mockActivityLogs.map((log) => (
                  <div key={log.id} className="relative">
                    {/* Bullet circle */}
                    <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border border-[#0B1020] bg-brand-bgSecondary flex items-center justify-center">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        log.category === 'hostel' 
                          ? 'bg-brand-gold' 
                          : log.category === 'facility' 
                          ? 'bg-brand-blue' 
                          : 'bg-brand-success'
                      }`} />
                    </span>
                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                      <div>
                        <h4 className="text-xs font-semibold text-brand-textSecondary">
                          {log.user} ({log.role}) &bull; <span className="text-brand-white font-bold">{log.action}</span>
                        </h4>
                        <p className="text-xs text-brand-textSecondary leading-relaxed mt-1">{log.details}</p>
                      </div>
                      <span className="text-[9px] text-brand-textSecondary bg-white/5 border border-white/5 px-2 py-0.5 rounded-full self-start">
                        {log.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Centralized Notification Center */}
          <div className="lg:col-span-4 space-y-6" id="notification-center">
            <div className="p-6 rounded-3xl glass-panel shadow-premium sticky top-24">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-brand-white flex items-center gap-2">
                    <Bell size={18} className="text-brand-gold" />
                    <span>Notification Center</span>
                  </h2>
                  <p className="text-xs text-brand-textSecondary">{unreadCount} unread notices</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    id="mark-all-read-btn"
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold text-brand-gold hover:text-brand-lightGold flex items-center gap-1 transition-colors"
                  >
                    <CheckCheck size={12} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                {notifications.map((notif) => {
                  const isUnread = !notif.read;
                  return (
                    <div
                      key={notif.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isUnread
                          ? 'bg-brand-gold/5 border-brand-gold/20'
                          : 'bg-brand-bg/50 border-white/5 opacity-75'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-brand-white leading-tight">{notif.title}</h4>
                        <span className="text-[9px] text-brand-textSecondary flex-shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-brand-textSecondary leading-normal mt-1.5">{notif.message}</p>
                      
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5">
                        {notif.actionUrl && notif.actionUrl !== '#' ? (
                          <a
                            href={notif.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-brand-blue hover:underline flex items-center gap-1"
                          >
                            <span>Open Link</span>
                            <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span className="text-[9px] text-brand-textSecondary italic">System Notice</span>
                        )}

                        {isUnread && (
                          <button
                            id={`mark-read-${notif.id}`}
                            onClick={() => markAsRead(notif.id)}
                            className="text-[9px] font-bold text-brand-gold hover:text-brand-lightGold transition-colors"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom mobile navigation panel */}
      <MobileBottomNav unreadCount={unreadCount} />
    </div>
  );
};
