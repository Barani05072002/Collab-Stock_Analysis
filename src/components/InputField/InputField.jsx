import React, { forwardRef } from 'react';
import './InputField.css';

/**
 * Reusable InputField component with enhanced features
 * 
 * @param {Object} props
 * @param {string} [props.nameData] - Input name attribute
 * @param {string} [props.valueData] - Input value
 * @param {string} [props.labelData] - Label text
 * @param {string} [props.typeData='text'] - Input type
 * @param {string} [props.placeHolderData] - Placeholder text
 * @param {Function} [props.onChangeFn] - onChange handler
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.disabled=false] - Whether the field is disabled
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.helperText] - Additional helper text
 * @param {Object} [props.inputProps={}] - Additional props for the input element
 */
const InputField = forwardRef(({
  nameData,
  valueData = '',
  labelData,
  typeData = 'text',
  placeHolderData,
  onChangeFn,
  required = false,
  error,
  disabled = false,
  className = '',
  helperText,
  inputProps = {},
  ...restProps
}, ref) => {
  // Compute container class based on dark mode, error state, etc.
  const containerClass = `input-container flex-col ${error ? 'has-error' : ''} ${className}`;
  
  return (
    <div className={containerClass} {...restProps}>
      {labelData && (
        <label htmlFor={nameData} className="input-label">
          {labelData}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        <input
          ref={ref}
          id={nameData}
          name={nameData}
          value={valueData}
          type={typeData}
          placeholder={placeHolderData}
          onChange={onChangeFn}
          disabled={disabled}
          className={`input-field ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
          {...inputProps}
        />
        
        {typeData === 'password' && (
          <button 
            type="button" 
            className="password-toggle"
            onClick={() => {
              const input = document.getElementById(nameData);
              input.type = input.type === 'password' ? 'text' : 'password';
            }}
          >
            👁️
          </button>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {helperText && !error && <div className="helper-text">{helperText}</div>}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;