// src/utils/validators.js
export const validators = {
    required: (value, fieldName) => 
      !value.trim() ? `${fieldName} is required` : "",
    
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? "Invalid email format" : "";
    },
    
    minLength: (value, length) => 
      value.length < length ? `Must be at least ${length} characters` : "",
    
    passwordMatch: (password, confirmPassword) =>
      password !== confirmPassword ? "Passwords do not match" : ""
  };
  