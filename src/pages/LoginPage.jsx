import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { loginValidation } from '../utils/formValidation';
import FormField, { FormActions } from '../components/Form/FormField';
import Button from '../components/Button/Button';
import './page_styles/LoginPage.css';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const initialValues = { email: "", password: "" };
  
  const handleLogin = async (values) => {
    setIsLoading(true);
    console.log('Login submitted:', values, 'Remember me:', rememberMe);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would typically call your auth service
      // await authService.login(values);
      
      // Redirect to dashboard or home page
      // history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (show message, etc.)
    } finally {
      setIsLoading(false);
    }
  };
  
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues, 
    loginValidation
  );

  return (
    <div className="login-container">
      <h2 className="login-headline">Log in to your account</h2>
      
      <div className="login-social-buttons">
        <button className="login-social-button">
          <span className="login-social-icon">G</span>
          Google
        </button>
        <button className="login-social-button">
          <span className="login-social-icon">f</span>
          Facebook
        </button>
      </div>
      
      <div className="login-divider">
        <span>or continue with</span>
      </div>
      
      <form onSubmit={(e) => handleSubmit(e, handleLogin)} className="login-form">
        <FormField
          name="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <FormField
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        <div className="login-remember-forgot">
          <label className="login-remember">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>
          <a href="/forgot-password" className="login-forgot">Forgot password?</a>
        </div>
        
        <FormActions>
          <Button
            buttonName="Sign In"
            type="submit"
            isLoading={isLoading}
          />
        </FormActions>
      </form>
      
      <div className="login-footer">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default LoginPage;