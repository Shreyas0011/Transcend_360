import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'Student' | 'Faculty' | 'Warden' | 'Admin';
export type ActiveView = 'landing' | 'dashboard' | 'admin';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  studentId?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole, name?: string) => Promise<boolean>;
  logout: () => void;
  generateSSOToken: (portalName: string) => string;
  redirectToPortal: (portalUrl: string, portalName: string) => void;
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ActiveView>('landing');

  // Hydrate from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('t360_user');
    const token = localStorage.getItem('t360_sso_token');
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
      setIsAuthenticated(true);
      setCurrentView(parsedUser.role === 'Admin' ? 'admin' : 'dashboard');
    }
  }, []);

  const login = async (email: string, role: UserRole, name?: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockNames: Record<UserRole, string> = {
      Student: 'Shreyas Nair',
      Faculty: 'Dr. Aarav Sharma',
      Warden: 'Vikram Rathore',
      Admin: 'Siddharth Sen'
    };

    const mockUser: User = {
      name: name || mockNames[role],
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name || mockNames[role]}`,
      studentId: role === 'Student' ? 'TR-2026-8942' : undefined,
      department: role === 'Faculty' ? 'Computer Science & Engineering' : undefined,
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('t360_user', JSON.stringify(mockUser));
    // Simulate generating standard JWT
    localStorage.setItem('t360_sso_token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(mockUser))}.mock_signature`);
    
    // Set view based on role
    setCurrentView(role === 'Admin' ? 'admin' : 'dashboard');
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('landing');
    localStorage.removeItem('t360_user');
    localStorage.removeItem('t360_sso_token');
  };

  // SSO Token Generation
  const generateSSOToken = (portalName: string) => {
    if (!user) return '';
    const payload = {
      iss: 'transcend-360-gateway',
      sub: user.email,
      name: user.name,
      role: user.role,
      targetPortal: portalName,
      exp: Math.floor(Date.now() / 1000) + (60 * 5) // 5 minutes expiration
    };
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.simulated_signature_hash`;
  };

  // Redirect to portal with SSO token attached
  const redirectToPortal = (portalUrl: string, portalName: string) => {
    const token = generateSSOToken(portalName);
    // Secure SSO transfer: Pass token via query param
    // In production, the target portal would extract and verify the token.
    const ssoUrl = `${portalUrl}?sso_token=${token}&ref=transcend360`;
    window.open(ssoUrl, '_blank', 'noopener,noreferrer');
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
