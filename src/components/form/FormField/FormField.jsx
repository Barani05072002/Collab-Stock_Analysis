// Fix for the FormField component to use the correct prop names
// src/components/form/FormField/FormField.jsx
import React from 'react';
import InputField from '../../common/InputField/InputField';
import './FormField.css';

/**
 * FormField component that wraps InputField with error handling
 * @param {Object} props - Component props
 * @returns {JSX.Element} Form field component
 */
const FormField = ({
  name,
  label,
  value,
  type = 'text',
  placeholder,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  ...rest
}) => {
  return (
    <div className="form-field">
      <InputField
        name={name}
        label={label}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        error={touched && error ? error : ''}
        required={required}
        {...rest}
      />
    </div>
  );
};

export default FormField;