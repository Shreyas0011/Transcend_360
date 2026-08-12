import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, HelpCircle, FileText, Compass, ExternalLink } from 'lucide-react';
import { navigateToPortal } from '../utils/domain';

export const Footer: React.FC = () => {
  return (
    <footer id="support" className="bg-[#080B16] border-t border-brand-white/10 pt-16 pb-24 md:pb-12 text-sm text-brand-textSecondary relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-gold to-brand-lightGold flex items-center justify-center font-extrabold text-brand-bg">T</div>
              <span className="text-brand-white font-extrabold text-lg tracking-tight">
                Transcend <span className="text-brand-gold">360</span>
              </span>
            </Link>
            <p className="max-w-sm text-brand-textSecondary text-xs md:text-sm leading-relaxed">
              The premium, unified digital gateway for all Transcend campus management platforms. Access hostel requests, facility reservations, transportation updates, and upcoming modules through a single, secure authentication interface.
            </p>
            <div className="flex items-center gap-3 text-brand-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-all">
                <a href="mailto:support@transcend.edu" title="Email Support">
                  <Mail size={16} className="text-brand-gold" />
                </a>
              </div>
              <a href="mailto:support@transcend.edu" className="text-xs hover:underline hover:text-brand-gold">
                support@transcend.edu
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-brand-white font-semibold uppercase tracking-wider text-xs mb-4">Integrated Portals</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => navigateToPortal('facilities')} 
                  className="flex items-center gap-1.5 hover:text-brand-white transition-colors text-left"
                >
                  <Compass size={14} className="text-brand-blue" />
                  <span>Facilities Portal</span>
                  <ExternalLink size={10} />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPortal('hostel')} 
                  className="flex items-center gap-1.5 hover:text-brand-white transition-colors text-left"
                >
                  <Compass size={14} className="text-brand-gold" />
                  <span>Hostel Management</span>
                  <ExternalLink size={10} />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPortal('transportation')} 
                  className="flex items-center gap-1.5 hover:text-brand-white transition-colors text-left"
                >
                  <Compass size={14} className="text-purple-400" />
                  <span>Transportation Portal</span>
                  <ExternalLink size={10} />
                </button>
              </li>
            </ul>
          </div>

          {/* Support / Legal */}
          <div>
            <h3 className="text-brand-white font-semibold uppercase tracking-wider text-xs mb-4">Help & Documentation</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#support" className="flex items-center gap-1.5 hover:text-brand-white transition-colors">
                  <HelpCircle size={14} className="text-brand-gold" />
                  <span>Central Support Desk</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1.5 hover:text-brand-white transition-colors">
                  <FileText size={14} className="text-brand-blue" />
                  <span>SSO Documentation</span>
                </a>
              </li>
              <li>
                <Link to="/admin" className="flex items-center gap-1.5 hover:text-brand-white transition-colors">
                  <FileText size={14} className="text-brand-gold" />
                  <span>System Health Metrics</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Transcend Campus Operations. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-white transition-colors">SSO Integration API</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
