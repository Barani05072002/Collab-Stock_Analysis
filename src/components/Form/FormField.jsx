import React from 'react';
import InputField from '../InputField/InputField';
import './FormField.css';

/**
 * FormField component that wraps InputField with additional styling and features
 * 
 * @param {Object} props
 * @param {string} props.name - Field name
 * @param {string} props.label - Field label
 * @param {string} props.type - Input type
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Field value
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.error] - Error message
 * @param {boolean} [props.required=false] - Whether field is required
 * @param {string} [props.helperText] - Helper text
 * @param {boolean} [props.disabled=false] - Whether field is disabled
 * @param {boolean} [props.success=false] - Whether field has success state
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} [props.inputProps={}] - Additional props for InputField
 */
const FormField = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  helperText,
  disabled = false,
  success = false,
  className = '',
  inputProps = {},
  ...restProps
}) => {
  // Determine field status class
  let statusClass = '';
  if (error) statusClass = 'has-error';
  else if (success) statusClass = 'has-success';
  
  return (
    <div 
      className={`form-field ${statusClass} ${className}`} 
      {...restProps}
    >
      <InputField
        nameData={name}
        valueData={value}
        labelData={label}
        typeData={type}
        placeHolderData={placeholder}
        onChangeFn={onChange}
        required={required}
        disabled={disabled}
        error={error}
        helperText={helperText}
        {...inputProps}
      />
      
      {success && !error && (
        <div className="form-feedback">
          <span className="form-feedback-icon">✓</span>
          {helperText && <span>{helperText}</span>}
        </div>
      )}
    </div>
  );
};

/**
 * FormSection component for grouping related form fields
 */
export const FormSection = ({ 
  title, 
  description, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`form-section ${className}`}>
      {title && <h3 className="form-section-title">{title}</h3>}
      {description && <p className="form-section-description">{description}</p>}
      {children}
    </div>
  );
};

/**
 * FormRow component for horizontal layout of form fields
 */
export const FormRow = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`form-field-row ${className}`}>
      {children}
    </div>
  );
};

/**
 * FormActions component for form buttons and actions
 */
export const FormActions = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`form-actions ${className}`}>
      {children}
    </div>
  );
};

export default FormField;