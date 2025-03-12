// src/services/authService.js
import { apiClient } from './apiClient';

export const authService = {
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      this.setToken(response.token);
      return response.user;
    } catch (error) {
      throw new Error(error.message || 'Failed to login');
    }
  },
  
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      this.setToken(response.token);
      return response.user;
    } catch (error) {
      throw new Error(error.message || 'Failed to register');
    }
  },
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  setToken(token) {
    localStorage.setItem('token', token);
  },
  
  getToken() {
    return localStorage.getItem('token');
  },
  
  isAuthenticated() {
    return !!this.getToken();
  }
};
