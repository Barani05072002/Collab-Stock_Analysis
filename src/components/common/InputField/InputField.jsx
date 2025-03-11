// src/components/common/InputField/InputField.jsx
import React, { forwardRef } from 'react';
import './InputField.css';

const InputField = forwardRef(({
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  const inputId = `input-${name}`;

  return (
    <div className={`input-field ${error ? 'input-field-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="input"
        {...props}
      />
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;