import React, { useState, useEffect } from 'react';
import XPLoading from './components/XPLoading';
import WindowsXPLogin from './components/WindowsXPLogin';


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <XPLoading /> : <WindowsXPLogin />}
    </>
  );
};

export default App;
