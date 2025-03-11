// components/form/FormField/FormField.jsx
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
        nameData={name}
        valueData={value}
        labelData={required ? `${label} *` : label}
        typeData={type}
        placeHolderData={placeholder}
        onChangeFn={onChange}
        onBlurFn={onBlur}
        {...rest}
      />
      {touched && error && <div className="form-field-error">{error}</div>}
    </div>
  );
};

export default FormField;