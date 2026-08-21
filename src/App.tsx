import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PortalLoginPage } from './pages/PortalLoginPage';
import { getSubdomain, getPortalUrl, navigateToPortal } from './utils/domain';

// Lazy load Hostel module
// @ts-ignore
const HostelModule = lazy(() => import('./modules/hostel'));
// Lazy load Transportation module
// @ts-ignore
const TransportationModule = lazy(() => import('./modules/transportation'));
// Lazy load Facilities module
// @ts-ignore
const FacilitiesModule = lazy(() => import('./modules/facilities'));

const PageLoader = ({ module = 'Module' }: { module?: string }) => (
  <div className="min-h-screen bg-brand-bg flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 border-3 border-brand-gold border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-brand-textSecondary uppercase tracking-widest font-semibold">
        Loading {module}...
      </span>
    </div>
  </div>
);

// Component to handle redirect from main domain routes (e.g. /hostel) to subdomain
const PortalRedirect = ({ portalId }: { portalId: string }) => {
  const { generateSSOToken } = useAuth();
  useEffect(() => {
    const token = generateSSOToken(portalId);
    navigateToPortal(portalId, token);
  }, [portalId, generateSSOToken]);

  return <PageLoader module={`Redirecting to ${portalId} Subdomain...`} />;
};

// Guard component enforcing authentication and portal authorization on subdomains
const SubdomainGuard = ({
  portalId,
  children,
}: {
  portalId: 'hostel' | 'transportation' | 'facilities';
  children: React.ReactNode;
}) => {
  const { isAuthenticated, user } = useAuth();

  // Check localStorage if AuthContext state is still initializing
  const storedUserStr = localStorage.getItem('t360_user');
  const storedToken = localStorage.getItem('t360_sso_token');
  let effectiveUser = user;
  if (!effectiveUser && storedUserStr && storedToken) {
    try {
      effectiveUser = JSON.parse(storedUserStr);
    } catch (e) {}
  }
  const isAuth = isAuthenticated || (!!effectiveUser && (!!storedToken || !!localStorage.getItem('hostel_portal_token')));

  useEffect(() => {
    if (!isAuth) {
      const mainLoginUrl = `${getPortalUrl('main')}/login`;
      window.location.href = mainLoginUrl;
      return;
    }

    const isAllowed =
      effectiveUser?.role === 'SuperAdmin' ||
      (effectiveUser?.allowedPortals && effectiveUser.allowedPortals.includes(portalId));

    if (!isAllowed) {
      const mainLoginUrl = `${getPortalUrl('main')}/login?error=unauthorized`;
      window.location.href = mainLoginUrl;
    }
  }, [isAuth, effectiveUser, portalId]);

  if (!isAuth) {
    return <PageLoader module={`${portalId.toUpperCase()} Login Guard`} />;
  }

  const isAllowed =
    effectiveUser?.role === 'SuperAdmin' ||
    (effectiveUser?.allowedPortals && effectiveUser.allowedPortals.includes(portalId));

  if (!isAllowed) {
    return <PageLoader module={`${portalId.toUpperCase()} Authorization`} />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const subdomain = getSubdomain();

  if (subdomain === 'hostel') {
    return (
      <SubdomainGuard portalId="hostel">
        <Suspense fallback={<PageLoader module="Hostel Portal" />}>
          <Routes>
            <Route path="/*" element={<HostelModule />} />
          </Routes>
        </Suspense>
      </SubdomainGuard>
    );
  }

  if (subdomain === 'transportation') {
    return (
      <SubdomainGuard portalId="transportation">
        <Suspense fallback={<PageLoader module="Transportation Portal" />}>
          <Routes>
            <Route path="/*" element={<TransportationModule />} />
          </Routes>
        </Suspense>
      </SubdomainGuard>
    );
  }

  if (subdomain === 'facilities') {
    return (
      <SubdomainGuard portalId="facilities">
        <Suspense fallback={<PageLoader module="Facilities Portal" />}>
          <Routes>
            <Route path="/*" element={<FacilitiesModule />} />
          </Routes>
        </Suspense>
      </SubdomainGuard>
    );
  }

  // Default: Main Portal (tgi360.org or localhost)
  return (
    <div className="min-h-screen w-screen bg-brand-bg text-brand-white selection:bg-brand-gold/30 selection:text-brand-white flex flex-col justify-between">
      <main className="flex-grow">
        <Routes>
          {/* Main portal login */}
          <Route path="/login" element={<PortalLoginPage />} />

          {/* Landing (requires auth — handled inside LandingPage) */}
          <Route path="/" element={<LandingPage />} />

          {/* Authenticated internal pages */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* Hostel Portal on TGI360 Main Domain */}
          <Route
            path="/hostel/*"
            element={
              <Suspense fallback={<PageLoader module="Hostel Portal" />}>
                <HostelModule />
              </Suspense>
            }
          />
          <Route path="/transportation/*" element={<PortalRedirect portalId="transportation" />} />
          <Route path="/facilities/*" element={<PortalRedirect portalId="facilities" />} />

          {/* Fallback to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
