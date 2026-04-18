import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token and user are saved in localStorage on app load
    const savedToken = localStorage.getItem('pricepulse_token');
    const savedUser = localStorage.getItem('pricepulse_user');
    
    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
      // Optionally verify token is still valid
      verifyToken(savedToken);
    }
    setLoading(false);
  }, []);

  const verifyToken = async (token) => {
    try {
      await api.get('/auth/me');
    } catch (error) {
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('pricepulse_token', token);
      localStorage.setItem('pricepulse_user', JSON.stringify(user));
      setUser(user);
      
      return user;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('pricepulse_token', token);
      localStorage.setItem('pricepulse_user', JSON.stringify(user));
      setUser(user);
      
      return user;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pricepulse_token');
    localStorage.removeItem('pricepulse_user');
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoggedIn,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
