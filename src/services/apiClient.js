// src/services/apiClient.js
const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

export const apiClient = {
  async request(endpoint, method = 'GET', data = null) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      }
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  get(endpoint) {
    return this.request(endpoint);
  },
  
  post(endpoint, data) {
    return this.request(endpoint, 'POST', data);
  },
  
  put(endpoint, data) {
    return this.request(endpoint, 'PUT', data);
  },
  
  delete(endpoint) {
    return this.request(endpoint, 'DELETE');
  }
};