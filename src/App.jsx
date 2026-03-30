import React, { useState, useEffect } from 'react';
import XPLoading from './components/XPLoading';
import WindowsXPLogin from './components/WindowsXPLogin';
import XPWelcome from './components/XPWelcome';
import XPDesktop from './components/XPDesktop';
import XPBootScreen from './components/XPBootScreen';

const App = () => {
  // Stage-based state machine: 'boot' | 'loading' | 'login' | 'welcome' | 'desktop'
  const [stage, setStage] = useState(() => {
    const hasBooted = sessionStorage.getItem('xp-booted');
    if (!hasBooted) {
      sessionStorage.setItem('xp-booted', 'true');
      return 'boot';
    }
    return 'loading';
  });

  useEffect(() => {
    if (stage === 'boot') {
      const timer = setTimeout(() => setStage('loading'), 3500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'loading') {
      const timer = setTimeout(() => setStage('login'), 500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleLogin = () => {
    setStage('welcome');
  };

  const handleWelcomeComplete = () => {
    setStage('desktop');
  };

  // Render based on current stage
  if (stage === 'boot') {
    return <XPBootScreen onComplete={() => {}} />;
  }

  if (stage === 'loading') {
    return <XPLoading />;
  }

  if (stage === 'login') {
    return <WindowsXPLogin onLogin={handleLogin} />;
  }

  if (stage === 'welcome') {
    return <XPWelcome onComplete={handleWelcomeComplete} />;
  }

  return <XPDesktop />;
};

export default App;
