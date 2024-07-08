import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // navigate('/login'); // Redirect to login on logout
  };

  const handleUnauthorized = () => {
    logout();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, handleUnauthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
