// src/utils/constants.js
// API configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Form validation messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  passwordMatch: 'Passwords do not match',
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Cannot exceed ${max} characters`,
  phoneNumber: 'Please enter a valid phone number',
};

// Local storage keys
export const STORAGE_KEYS = {
  token: 'token',
  user: 'user',
  theme: 'theme',
};

// Routes
export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  profile: '/profile',
  forgotPassword: '/forgot-password',
};

// Features
export const FEATURES = {
  darkMode: true,
  notifications: true,
  analytics: true,
};
