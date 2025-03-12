// src/utils/formValidation.js
export const loginValidation = (values) => {
    const errors = {};
    
    if (!values.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!values.password) errors.password = "Password is required";
    
    return errors;
  };
  
  export const signupValidation = (values) => {
    const errors = {};
    
    if (!values.name) errors.name = "Name is required";
    
    if (!values.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    
    if (!values.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    return errors;
  };