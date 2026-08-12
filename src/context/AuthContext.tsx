import React, { createContext, useContext, useState, useEffect } from 'react';

export type MainPortalRole = 
  | 'SuperAdmin'        // sees all portals
  | 'HostelAdmin'       // sees hostel only
  | 'FacilitiesAdmin'   // sees facilities only
  | 'TransportAdmin';   // sees transport only

export type ActiveView = 'landing' | 'dashboard' | 'admin';

export interface MainUser {
  name: string;
  email: string;
  role: MainPortalRole;
  avatar: string;
  employeeId?: string;
  department?: string;
  // Which portal IDs this user can access
  allowedPortals: string[];
}

interface AuthContextType {
  user: MainUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  generateSSOToken: (portalName: string) => string;
  redirectToPortal: (portalUrl: string, portalName: string) => void;
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Credential Store ──────────────────────────────────────────────────────────
// Maps email → { password, user data }
const MAIN_PORTAL_USERS: Record<string, {
  password: string;
  name: string;
  role: MainPortalRole;
  employeeId: string;
  department: string;
  allowedPortals: string[];
}> = {
  'superadmin@tgi360.com': {
    password: 'Super@2026',
    name: 'Super Administrator',
    role: 'SuperAdmin',
    employeeId: 'TGI-SA-001',
    department: 'Campus Administration',
    allowedPortals: ['facilities', 'hostel', 'transportation'],
  },
  'admin@tgi360.com': {
    password: 'Admin@2026',
    name: 'Campus Admin',
    role: 'SuperAdmin',
    employeeId: 'TGI-SA-002',
    department: 'Campus Administration',
    allowedPortals: ['facilities', 'hostel', 'transportation'],
  },
  // Hostel-only admins
  'hostel@tgi360.com': {
    password: 'Hostel@2026',
    name: 'Hostel Administrator',
    role: 'HostelAdmin',
    employeeId: 'TGI-HA-001',
    department: 'Hostel Management',
    allowedPortals: ['hostel'],
  },
  'warden@tgi360.com': {
    password: 'Warden@2026',
    name: 'Chief Warden',
    role: 'HostelAdmin',
    employeeId: 'TGI-HA-002',
    department: 'Hostel Management',
    allowedPortals: ['hostel'],
  },
  // Facilities-only admins
  'facilities@tgi360.com': {
    password: 'Facilities@2026',
    name: 'Facilities Manager',
    role: 'FacilitiesAdmin',
    employeeId: 'TGI-FA-001',
    department: 'Facilities Management',
    allowedPortals: ['facilities'],
  },
  // Transport-only admins
  'transport@tgi360.com': {
    password: 'Transport@2026',
    name: 'Transport Manager',
    role: 'TransportAdmin',
    employeeId: 'TGI-TA-001',
    department: 'Transportation',
    allowedPortals: ['transportation'],
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MainUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ActiveView>('landing');

  // Hydrate from localStorage & parse incoming SSO tokens
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ssoToken = params.get('sso_token');

    if (ssoToken) {
      try {
        const parts = ssoToken.split('.');
        if (parts.length >= 2) {
          const payload = JSON.parse(atob(parts[1]));
          const email = (payload.sub || payload.email || '').toLowerCase();
          const userRecord = MAIN_PORTAL_USERS[email];
          if (userRecord) {
            const mainUser: MainUser = {
              name: userRecord.name,
              email: email,
              role: userRecord.role,
              avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${userRecord.name}`,
              employeeId: userRecord.employeeId,
              department: userRecord.department,
              allowedPortals: userRecord.allowedPortals,
            };
            setUser(mainUser);
            setIsAuthenticated(true);
            setCurrentView('dashboard');
            localStorage.setItem('t360_user', JSON.stringify(mainUser));
            localStorage.setItem('t360_sso_token', ssoToken);
            localStorage.setItem('hostel_portal_token', ssoToken);
          }
        }
      } catch (e) {
        console.error('Failed to parse SSO token', e);
      }

      // Clean token from URL query params
      const url = new URL(window.location.href);
      url.searchParams.delete('sso_token');
      url.searchParams.delete('ref');
      window.history.replaceState({}, document.title, url.pathname + url.search);
      return;
    }

    const storedUser = localStorage.getItem('t360_user');
    const token = localStorage.getItem('t360_sso_token');
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser) as MainUser;
        setUser(parsedUser);
        setIsAuthenticated(true);
        setCurrentView('dashboard');
      } catch (e) {
        localStorage.removeItem('t360_user');
        localStorage.removeItem('t360_sso_token');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 700)); // simulate API delay

    const normalizedEmail = email.trim().toLowerCase();
    const record = MAIN_PORTAL_USERS[normalizedEmail];

    if (!record) {
      return { success: false, error: 'No account found with this email address.' };
    }
    if (record.password !== password.trim()) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const mainUser: MainUser = {
      name: record.name,
      email: normalizedEmail,
      role: record.role,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${record.name}`,
      employeeId: record.employeeId,
      department: record.department,
      allowedPortals: record.allowedPortals,
    };

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(mainUser))}.mock_signature`;
    setUser(mainUser);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    localStorage.setItem('t360_user', JSON.stringify(mainUser));
    localStorage.setItem('t360_sso_token', token);
    localStorage.setItem('hostel_portal_token', token);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('landing');
    localStorage.removeItem('t360_user');
    localStorage.removeItem('t360_sso_token');
    localStorage.removeItem('hostel_portal_token');
  };

  const generateSSOToken = (portalName: string) => {
    if (!user) return '';
    const payload = {
      iss: 'transcend-360-gateway',
      sub: user.email,
      name: user.name,
      role: user.role,
      allowedPortals: user.allowedPortals,
      targetPortal: portalName,
      exp: Math.floor(Date.now() / 1000) + 300,
    };
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.simulated_signature_hash`;
  };

  const redirectToPortal = (portalUrl: string, portalName: string) => {
    const token = generateSSOToken(portalName);
    if (portalUrl.startsWith('http://') || portalUrl.startsWith('https://')) {
      const ssoUrl = `${portalUrl}${portalUrl.includes('?') ? '&' : '?'}sso_token=${token}&ref=transcend360`;
      window.location.href = ssoUrl;
      return;
    }
    // Subdomain redirection
    const ssoUrl = `${portalUrl}${portalUrl.includes('?') ? '&' : '?'}sso_token=${token}&ref=transcend360`;
    window.location.href = ssoUrl;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, generateSSOToken, redirectToPortal, currentView, setCurrentView }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
