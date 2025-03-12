import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/form/FormField/FormField';
import Button from '../../../components/common/Button/Button';
import { Title } from '../../../components/common/Typography/Title';
import { useAuth } from '../../../context/AuthContext';
import { loginUser } from '../../../services/authService';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formError, setFormError] = useState('');
  
  // Define validation schema
  const validationSchema = {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
    }
  };

  // Form submission handler
  const handleLoginSubmit = async (values) => {
    try {
      setFormError('');
      
      const response = await loginUser(values);
      
      if (response.success) {
        // Update auth context with user data
        login(response.data.user);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Handle login error
        setFormError(response.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setFormError('An unexpected error occurred. Please try again.');
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
  } = useForm(
    {
      email: '',
      password: '',
    },
    validationSchema,
    handleLoginSubmit
  );
  
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Title level={2}>Sign In</Title>
      
      {formError && (
        <div className="form-error-message">{formError}</div>
      )}
      
      <div className="form-fields">
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
          name="password"
          label="Password"
          value={values.password}
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.passwordError}
          touched={touched.password}
          required
        />
        
        <div className="form-actions">
          <div className="forgot-password">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              navigate('/forgot-password');
            }}>
              Forgot Password?
            </a>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            fullWidth
          >
            Sign In
          </Button>
        </div>
        
        <div className="signup-link">
          Don't have an account?{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault();
            navigate('/signup');
          }}>
            Create Account
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;