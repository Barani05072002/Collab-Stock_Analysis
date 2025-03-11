// src/components/common/Typography/Title.jsx
import React from 'react';
import './Typography.css';

export const Title = ({
  level = 1,
  children,
  className = '',
  ...props
}) => {
  const Tag = `h${level}`;
  
  return (
    <Tag className={`title title-${level} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const Text = ({
  variant = 'body',
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={`text text-${variant} ${className}`} {...props}>
      {children}
    </p>
  );
};

export const Label = ({
  children,
  htmlFor,
  className = '',
  ...props
}) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`label ${className}`} 
      {...props}
    >
      {children}
    </label>
  );
};