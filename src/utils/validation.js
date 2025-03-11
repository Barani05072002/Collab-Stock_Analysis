// utils/validation.js

/**
 * Validates a single form field
 * @param {string} name - Field name
 * @param {any} value - Field value
 * @param {Object} rules - Validation rules
 * @returns {string} Error message or empty string
 */
export const validateField = (name, value, rules) => {
    // Format field name for display (e.g., 'fullName' to 'Full Name')
    const displayName = name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
    
    // Required field validation
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return rules.required === true 
        ? `${displayName} is required` 
        : rules.required; // Custom message
    }
    
    // Skip other validations if field is empty and not required
    if (value === undefined || value === null || value === '') {
      return '';
    }
    
    // Email validation
    if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
      return rules.email === true 
        ? 'Please enter a valid email address' 
        : rules.email;
    }
    
    // Min length validation
    if (rules.minLength && String(value).length < rules.minLength.value) {
      return rules.minLength.message || `${displayName} must be at least ${rules.minLength.value} characters`;
    }
    
    // Max length validation
    if (rules.maxLength && String(value).length > rules.maxLength.value) {
      return rules.maxLength.message || `${displayName} cannot exceed ${rules.maxLength.value} characters`;
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.value.test(value)) {
      return rules.pattern.message || `${displayName} format is invalid`;
    }
    
    // Minimum value validation (for numbers)
    if (rules.min && Number(value) < rules.min.value) {
      return rules.min.message || `${displayName} must be at least ${rules.min.value}`;
    }
    
    // Maximum value validation (for numbers)
    if (rules.max && Number(value) > rules.max.value) {
      return rules.max.message || `${displayName} cannot exceed ${rules.max.value}`;
    }
    
    // Custom validation function
    if (rules.validate) {
      const customError = rules.validate(value);
      if (customError) {
        return customError;
      }
    }
    
    // Match validation (for password confirmation, etc.)
    if (rules.match && value !== rules.match.value) {
      return rules.match.message || `${displayName} does not match ${rules.match.field}`;
    }
    
    return '';
  };
  
  /**
   * Validates all form fields
   * @param {Object} values - Form values
   * @param {Object} validationSchema - Validation rules
   * @returns {Object} Object with error messages
   */
  export const validateForm = (values, validationSchema) => {
    const errors = {};
    
    // Validate each field in the schema
    Object.keys(validationSchema).forEach(fieldName => {
      const error = validateField(
        fieldName, 
        values[fieldName], 
        validationSchema[fieldName]
      );
      
      if (error) {
        errors[`${fieldName}Error`] = error;
      } else {
        errors[`${fieldName}Error`] = '';
      }
    });
    
    return errors;
  };