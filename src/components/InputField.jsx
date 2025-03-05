import React from "react";
import './InputFiled.css';

const InputField = ({ label, type, name, value, onChange, placeholder, error }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input-field ${error ? "input-error" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default InputField;
