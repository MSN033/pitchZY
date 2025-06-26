import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import StartupDashboard from './components/StartupDashboard';
import InvestorDashboard from './components/InvestorDashboard';
import { User } from './types';

type AppState = 'landing' | 'login' | 'signup' | 'startup-dashboard' | 'investor-dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'startup') {
      setCurrentPage('startup-dashboard');
    } else {
      setCurrentPage('investor-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToSignup={() => setCurrentPage('signup')}
          />
        );
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToSignup={() => setCurrentPage('signup')}
            onNavigateToLanding={() => setCurrentPage('landing')}
          />
        );
      case 'signup':
        return (
          <SignupPage
            onSignup={handleLogin}
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToLanding={() => setCurrentPage('landing')}
          />
        );
      case 'startup-dashboard':
        return currentUser ? (
          <StartupDashboard user={currentUser} onLogout={handleLogout} />
        ) : null;
      case 'investor-dashboard':
        return currentUser ? (
          <InvestorDashboard user={currentUser} onLogout={handleLogout} />
        ) : null;
      default:
        return (
          <LandingPage
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToSignup={() => setCurrentPage('signup')}
          />
        );
    }
  };

  return <div className="min-h-screen">{renderCurrentPage()}</div>;
}

export default App;