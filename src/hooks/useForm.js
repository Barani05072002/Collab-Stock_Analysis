// hooks/useForm.js
import { useState, useCallback, useEffect } from 'react';
import { validateField, validateForm } from '../utils/validation';

/**
 * Custom hook for form management
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationSchema - Validation rules
 * @param {Function} onSubmit - Submit handler
 * @returns {Object} Form utilities
 */
const useForm = (initialValues = {}, validationSchema = {}, onSubmit = () => {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  // Reset form to initial values
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  // Set form values programmatically
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it's been touched
    if (touched[name] && validationSchema[name]) {
      const fieldError = validateField(name, value, validationSchema[name]);
      setErrors(prev => ({ ...prev, [`${name}Error`]: fieldError }));
    }
  }, [touched, validationSchema]);
  
  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFieldValue(name, inputValue);
  }, [setFieldValue]);
  
  // Mark field as touched on blur
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    if (validationSchema[name]) {
      const fieldError = validateField(name, values[name], validationSchema[name]);
      setErrors(prev => ({ ...prev, [`${name}Error`]: fieldError }));
    }
  }, [values, validationSchema]);
  
  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e && e.preventDefault();
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    const formErrors = validateForm(values, validationSchema);
    setErrors(formErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(formErrors).some(error => error);
    
    if (!hasErrors) {
      onSubmit(values);
    }
    
    setIsSubmitting(false);
  }, [values, validationSchema, onSubmit, initialValues]);
  
  // Check form validity whenever values or errors change
  useEffect(() => {
    const formErrors = validateForm(values, validationSchema);
    const hasErrors = Object.values(formErrors).some(error => error);
    setIsValid(!hasErrors);
  }, [values, validationSchema]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    reset
  };
};

export default useForm;