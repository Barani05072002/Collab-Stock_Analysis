// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getAuthStatus, validateToken, logoutUser } from '../services/authService';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const { isAuthenticated, user } = getAuthStatus();
      
      if (isAuthenticated) {
        // Validate token with backend
        const isValid = await validateToken();
        
        if (isValid) {
          setIsAuthenticated(true);
          setUser(user);
        } else {
          // Token is invalid, log out
          logoutUser();
        }
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);
  
  // Update auth state after login
  const login = useCallback((userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  }, []);
  
  // Clear auth state on logout
  const logout = useCallback(() => {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
  }, []);
  
  // Update user data
  const updateUser = useCallback((userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
    // You might want to save this to localStorage as well
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...storedUser, ...userData }));
  }, []);
  
  // Context value
  const contextValue = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};