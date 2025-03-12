// src/pages/SignupPage.jsx
import React from 'react';
import { useForm } from '../hooks/useForm';
import { signupValidation } from '../utils/formValidation';
import FormField from '../components/Form/FormField';
import Button from '../components/Button/Button';
import './page_styles/signup.css';

const SignupPage = () => {
  const initialValues = { 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  };
  
  const handleSignup = async (values) => {
    console.log('Signup submitted:', values);
    // Here you would make API call to register the user
    // Example: await authService.register(values);
  };
  
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues, 
    signupValidation
  );

  return (
    <div className="container">
      <h3 className="headline">Sign Up</h3>
      <form onSubmit={(e) => handleSubmit(e, handleSignup)} className="flex-col mrgn-auto">
        <FormField
          name="name"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        
        <FormField
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        
        <FormField
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        
        <FormField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        
        <Button
          buttonName="Sign Up"
          onClickFn={() => {}} // The form onSubmit handles submission
        />
      </form>
    </div>
  );
};

export default SignupPage;
