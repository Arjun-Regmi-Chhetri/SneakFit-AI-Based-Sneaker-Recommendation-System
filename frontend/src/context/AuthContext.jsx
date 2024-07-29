import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuthToken, setAuthHeader, getUserDetails } from '../service/Service'; // Import your token functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return getAuthToken() !== null;
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Whenever isAuthenticated changes, update localStorage and headers accordingly
    if (isAuthenticated) {
      setAuthHeader(getAuthToken());
      getUserDetails()
        .then(userData => setUser(userData))
        .catch(() => setIsAuthenticated(false));
    } else {
      setAuthHeader(null);
      setUser(null);
    }
  }, [isAuthenticated]);

  const login = (token) => {
    // Save the token and set isAuthenticated to true
    setAuthHeader(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear the token and set isAuthenticated to false
    setAuthHeader(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
