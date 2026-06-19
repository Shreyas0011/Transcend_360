import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../context/AuthContext';
import { X, ShieldAlert, Key, UserCheck, Mail, ArrowRight } from 'lucide-react';

interface SSOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SSOModal: React.FC<SSOModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Student');
  const [isLoading, setIsLoading] = useState(false);
  const [customName, setCustomName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      await login(email, role, customName || undefined);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleQuickLogin = async (selectedRole: UserRole) => {
    setIsLoading(true);
    const mockEmails: Record<UserRole, string> = {
      Student: 'shreyas.student@transcend.edu',
      Faculty: 'aarav.faculty@transcend.edu',
      Warden: 'vikram.warden@transcend.edu',
      Admin: 'siddharth.admin@transcend.edu',
    };
    try {
      await login(mockEmails[selectedRole], selectedRole);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-brand-white/10 bg-brand-bgSecondary p-8 shadow-2xl glow-gold/10"
            id="sso-login-modal"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              id="close-sso-modal-btn"
              className="absolute right-5 top-5 rounded-full p-2 text-brand-textSecondary hover:bg-white/5 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Title Section */}
            <div className="mb-8 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold mb-3">
                <Key size={24} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-brand-white">
                Transcend 360 Gateway
              </h2>
              <p className="mt-1.5 text-sm text-brand-textSecondary">
                One Login. Every Campus Service.
              </p>
            </div>

            {/* Quick Demo Access Roles */}
            <div className="mb-6 rounded-2xl bg-white/5 p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                <ShieldAlert size={14} />
                <span>Simulated Role-Based SSO Bypass</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['Student', 'Faculty', 'Warden', 'Admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    id={`quick-login-${r.toLowerCase()}`}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleRoleQuickLogin(r)}
                    className="flex items-center gap-2 rounded-xl bg-brand-bg/50 px-3 py-2 text-xs font-medium text-brand-white border border-white/5 hover:border-brand-gold/30 hover:bg-brand-bg transition-all"
                  >
                    <UserCheck size={14} className="text-brand-blue" />
                    <span>{r} Gateway</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-brand-white/5"></div>
              <span className="flex-shrink mx-4 text-[10px] text-brand-textSecondary uppercase tracking-widest">Or Use Custom SSO Credentials</span>
              <div className="flex-grow border-t border-brand-white/5"></div>
            </div>

            {/* Custom Credentials Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-textSecondary mb-2">
                  SSO Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-textSecondary">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    id="sso-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. student@transcend.edu"
                    className="w-full rounded-xl border border-brand-white/10 bg-brand-bg px-4 py-3 pl-10 text-sm text-brand-white outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-textSecondary mb-2">
                  Display Name (Optional)
                </label>
                <input
                  type="text"
                  id="sso-name-input"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-brand-white/10 bg-brand-bg px-4 py-3 text-sm text-brand-white outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-textSecondary mb-2">
                  Select Gateway Level (SSO Authorization)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Student', 'Faculty', 'Warden', 'Admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      id={`select-role-${r.toLowerCase()}`}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`rounded-xl border py-2.5 text-xs font-medium transition-all ${
                        role === r
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                          : 'border-brand-white/10 bg-brand-bg text-brand-textSecondary hover:text-brand-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                id="submit-sso-login-btn"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 py-3.5 text-sm font-semibold text-brand-bg hover:bg-brand-lightGold transition-all duration-200 mt-6 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-bg border-t-transparent" />
                ) : (
                  <>
                    <span>Authenticate & Access Portals</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
