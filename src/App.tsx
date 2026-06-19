import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <div className="h-screen w-screen overflow-hidden bg-brand-bg text-brand-white selection:bg-brand-gold/30 selection:text-brand-white">
        <LandingPage />
      </div>
    </AuthProvider>
  );
}

export default App;
