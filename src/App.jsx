import React, { useState, useEffect } from 'react';
import XPLoading from './components/XPLoading';
import WindowsXPLogin from './components/WindowsXPLogin';
import XPDesktop from './components/XPDesktop';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (loading) return <XPLoading />;
  if (isLoggedIn) return <XPDesktop />;

  return <WindowsXPLogin onLogin={handleLogin} />;
};

export default App;
