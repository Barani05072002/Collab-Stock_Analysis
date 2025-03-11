// features/auth/components/SignupForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/form/FormField/FormField';
import Button from '../../../components/common/Button/Button';
import TitleComp from '../../../components/common/Typography/Title';
import { registerUser } from '../../../services/authService';
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  
  // Define validation schema
  const validationSchema = {
    fullName: {
      required: true,
      minLength: { value: 3, message: 'Name must be at least 3 characters' }
    },
    email: {
      required: true,
      email: true,
      // Async validation example (commented out)
      /*
      validate: async (value) => {
        try {
          const response = await checkEmailExists(value);
          return response.exists ? 'Email already in use' : null;
        } catch (error) {
          console.error('Email validation error:', error);
          return null;
        }
      }
      */
    },
    password: {
      required: true,
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: 'Password must contain at least one letter and one number'
      }
    },
    confirmPassword: {
      required: true,
      match: {
        field: 'password',
        message: 'Passwords do not match'
      }
    },
    phoneNumber: {
      required: true,
      pattern: {
        value: /^\d{10}$/,
        message: 'Phone number must be 10 digits'
      }
    },
    termsAccepted: {
      validate: value => value === true ? null : 'You must accept the terms and conditions'
    }
  };
  
  // Form submission handler
  const handleSignupSubmit = async (values) => {
    try {
      // Show loading state (using the isSubmitting from useForm)
      const response = await registerUser(values);
      
      if (response.success) {
        // Registration successful
        navigate('/login', { 
          state: { message: 'Registration successful! Please log in.' } 
        });
      } else {
        // Handle registration error
        console.error('Registration failed:', response.error);
        // You could set a form-level error here
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  // Initialize form hook
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid
  } = useForm(
    {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      termsAccepted: false
    },
    validationSchema,
    handleSignupSubmit
  );
  
  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <TitleComp titleData={<h2>Create Account</h2>} />
      
      <div className="form-fields">
        <FormField
          name="fullName"
          label="Full Name"
          value={values.fullName}
          placeholder="Enter your full name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullNameError}
          touched={touched.fullName}
          required
        />
        
        <FormField
          name="email"
          label="Email Address"
          value={values.email}
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.emailError}
          touched={touched.email}
          required
        />
        
        <FormField
          name="phoneNumber"
          label="Phone Number"
          value={values.phoneNumber}
          type="tel"
          placeholder="Enter your phone number"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phoneNumberError}
          touched={touched.phoneNumber}
          required
        />
        
        <FormField
          name="password"
          label="Password"
          value={values.password}
          type="password"
          placeholder="Create a password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.passwordError}
          touched={touched.password}
          required
        />
        
        <FormField
          name="confirmPassword"
          label="Confirm Password"
          value={values.confirmPassword}
          type="password"
          placeholder="Confirm your password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPasswordError}
          touched={touched.confirmPassword}
          required
        />
        
        <div className="terms-container">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={values.termsAccepted}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="termsAccepted">
            I accept the Terms of Service and Privacy Policy
          </label>
          {touched.termsAccepted && errors.termsAcceptedError && (
            <div className="form-field-error">{errors.termsAcceptedError}</div>
          )}
        </div>
        
        <Button 
          buttonName="Sign Up"
          type="submit"
          disabled={isSubmitting || !isValid}
        />
        
        <div className="login-link">
          Already have an account? <a onClick={() => navigate('/login')}>Login</a>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;