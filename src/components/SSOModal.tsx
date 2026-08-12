import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key } from 'lucide-react';

interface SSOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// SSOModal is no longer used by the main portal (auth is now on /login page).
// Kept as a stub to avoid breaking any imports.
export const SSOModal: React.FC<SSOModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-brand-white/10 bg-brand-bgSecondary p-8 shadow-2xl text-center"
            id="sso-login-modal"
          >
            <button
              onClick={onClose}
              id="close-sso-modal-btn"
              className="absolute right-5 top-5 rounded-full p-2 text-brand-textSecondary hover:bg-white/5 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold mb-4 mx-auto">
              <Key size={24} />
            </div>
            <h2 className="text-xl font-bold text-brand-white">Sign in at /login</h2>
            <p className="mt-2 text-sm text-brand-textSecondary">
              Please use the main portal login page to authenticate.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
