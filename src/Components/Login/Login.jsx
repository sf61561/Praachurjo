import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const validateField = (field) => {
    const newErrors = {};
    if (field === 'email' || !field) {
      if (!email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    }
    if (field === 'password' || !field) {
      if (!password) newErrors.password = 'Password is required';
      else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const showError = (field) => touched[field] && errors[field];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    
    if (!validateField()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.error === "Invalid email or password") {
        toast.error(data.error, { position: 'top-center' });
        setErrors({ email: data.error });
      } else {
        toast.success('Login successful!', { position: 'top-center' });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch {
      toast.error('Connection error. Please try again.', { position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <NavLink to="/" className="login-logo-link">
            <img
              src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
              alt="Jkkniu-Mart"
              className="login-logo"
            />
          </NavLink>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email field */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email <span className="required" aria-label="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`input-field ${showError('email') ? 'error' : ''}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={!!showError('email')}
                aria-describedby={showError('email') ? 'email-error' : undefined}
              />
              {showError('email') && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password field */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password <span className="required" aria-label="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`input-field ${showError('password') ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  autoComplete="current-password"
                  required
                  aria-required="true"
                  aria-invalid={!!showError('password')}
                  aria-describedby={showError('password') ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
              {showError('password') && (
                <span id="password-error" className="error-message" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="form-options">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember"
                  className="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <NavLink to="/forgot-password" className="link forgot-link">
                Forgot password?
              </NavLink>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  <span>Logging in...</span>
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

        {/* Sign up link */}
        <div className="signup-prompt">
          <span className="signup-text">Don't have an account?</span>
          <NavLink to="/signup" className="link signup-link">
            Sign Up
          </NavLink>
        </div>
      </div>
      
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Login;
