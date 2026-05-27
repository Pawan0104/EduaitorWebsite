import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  const [errors, setErrors] = useState({});

  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = isLogin ? validateLogin() : validateSignup();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitStatus(isLogin ? 'Logging in...' : 'Creating account...');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus(isLogin ? 'Login successful! Redirecting...' : 'Account created! Please login.');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    window.location.href = "/";
  };

  return (
    <div className="login-container">
      {/* HD Background Image */}
      <div className="bg-image">
        <div className="image-overlay"></div>
      </div>

      <div className="login-content">
        {/* Left Side - Branding & Toggle */}
        <div className="login-left">
          <div className="brand-section">
            <h1 className="logo-title">EduAitor</h1>
            <p className="brand-subtitle">
              {isLogin 
                ? 'Welcome back! Please sign in to your account.' 
                : 'Join EduAitor and unlock your learning potential.'
              }
            </p>
            
            {/* Toggle Buttons */}
            <div className="toggle-container">
              <button
                className={`toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => {
                  setIsLogin(true);
                  setErrors({});
                  setSubmitStatus('');
                }}
              >
                Login
              </button>
              {/* <button
                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => {
                  setIsLogin(false);
                  setErrors({});
                  setSubmitStatus('');
                }}
              >
                Sign Up
              </button> */}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-right">
          <div className="form-card">
            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              )}

              {isLogin && (
                <div className="forgot-password">
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={!!submitStatus}
                className="submit-btn"
              >
                {submitStatus || (isLogin ? 'Sign In' : 'Create Account')}
              </button>

              {submitStatus && !errors.name && (
                <div className={`status-message ${submitStatus.includes('successful') ? 'success' : ''}`}>
                  {submitStatus}
                </div>
              )}
            </form>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
