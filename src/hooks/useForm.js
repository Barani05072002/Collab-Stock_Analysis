// src/hooks/useForm.js
import { useState } from 'react';

/**
 * Custom hook for form handling with validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validateFn - Validation function
 * @returns {Object} - Form state and handlers
 */
export const useForm = (initialValues, validateFn) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e, onSubmit) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      await onSubmit(values);
    }
    
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors
  };
};