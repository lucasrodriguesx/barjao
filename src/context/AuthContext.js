'use client'

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('currentClient'));

  const login = (username) => {
    setUser(username);
    localStorage.setItem('currentClient', username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentClient');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
