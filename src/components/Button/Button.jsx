import React from 'react';
import './Button.css';

/**
 * Reusable Button component with customizable properties
 * 
 * @param {Object} props
 * @param {string} props.buttonName - Text to display on button
 * @param {Function} props.onClick - Function to call when button is clicked
 * @param {string} [props.type='button'] - Button type (button, submit, reset)
 * @param {string} [props.variant='primary'] - Visual style variant (primary, secondary, outline, danger)
 * @param {string} [props.size='medium'] - Button size (small, medium, large)
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.isLoading=false] - Whether to show loading state
 * @returns {JSX.Element}
 */
const Button = ({
  buttonName,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  isLoading = false,
  ...restProps
}) => {
  const buttonClasses = `btn btn-${variant} btn-${size} ${className} ${isLoading ? 'btn-loading' : ''}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? (
        <>
          <span className="loading-spinner"></span>
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        buttonName
      )}
    </button>
  );
};

export default Button;