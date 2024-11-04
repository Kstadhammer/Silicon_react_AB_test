import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'; 
import './styles/Header.css';
import MobileMenu from './MobileMenu';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    acceptTerms: false,
    rememberMe: false
  });
  const [forgotEmail, setForgotEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (showLoginForm) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [showLoginForm]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', forgotEmail);
    setIsSubmitted(true);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up attempt:', formData);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.dropdown-form-wrapper')) {
      setShowLoginForm(false);
      setShowForgotPassword(false);
      setIsSubmitted(false);
    }
  };

  const handleAuthButtonClick = (e) => {
    e.stopPropagation();
    setShowLoginForm(!showLoginForm);
    setShowSignUpForm(false);
    setShowForgotPassword(false);
  };

  const switchToSignUp = () => {
    setShowLoginForm(false);
    setShowSignUpForm(true);
    setShowForgotPassword(false);
  };

  const switchToSignIn = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
    setShowForgotPassword(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowLoginForm(false);
  };

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          {isDarkMode ? (
            <img src="/assets/logos/solid-dark.svg" alt="Silicon Logo (Dark Mode)" />
          ) : (
            <img src="/assets/logos/solid.svg" alt="Silicon Logo" />
          )}
        </Link>
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/#features" className="nav-link">Features</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </nav>
        <div className="btn-toggle-switch">
          <span className="label">Dark mode</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="auth-container">
          <button 
            className="auth-button"
            onClick={handleAuthButtonClick}
          >
            <FontAwesomeIcon icon={faUser} className="signin-icon" />
            <span>Sign in / up</span>
          </button>
          
          {showLoginForm && !showSignUpForm && !showForgotPassword && (
            <div className="dropdown-form-wrapper">
              <div className="dropdown-login-form">
                <form onSubmit={handleSubmit}>
                  <h3>Sign In</h3>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-options">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      />
                      <label htmlFor="rememberMe" className="checkbox-label">Remember me</label>
                    </div>
                    <button 
                      type="button" 
                      className="forgot-password"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot?
                    </button>
                  </div>
                  <button type="submit" className="btn-signin">
                    Sign in
                  </button>
                  <p className="signup-prompt">
                    No account? <button 
                      type="button" 
                      className="btn-text"
                      onClick={switchToSignUp}
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </div>
            </div>
          )}

          {showLoginForm && showForgotPassword && !isSubmitted && (
            <div className="dropdown-form-wrapper">
              <div className="dropdown-login-form">
                <form onSubmit={handleForgotSubmit}>
                  <h3>Reset Password</h3>
                  <p className="reset-subtitle">
                    Enter your email address and we&apos;ll send you instructions to reset your password.
                  </p>
                  <div className="form-group">
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-signin">
                    Send Reset Instructions
                  </button>
                  <button 
                    type="button" 
                    className="btn-back"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to Sign In
                  </button>
                </form>
              </div>
            </div>
          )}

          {showLoginForm && showForgotPassword && isSubmitted && (
            <div className="dropdown-form-wrapper">
              <div className="dropdown-login-form">
                <h3>Check Your Email</h3>
                <p className="reset-subtitle">
                  We&apos;ve sent password reset instructions to your email address.
                  Please check your inbox.
                </p>
                <button 
                  type="button" 
                  className="btn-signin"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setIsSubmitted(false);
                  }}
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          )}

          {showSignUpForm && !showLoginForm && !showForgotPassword && (
            <div className="dropdown-form-wrapper">
              <div className="dropdown-login-form">
                <form onSubmit={handleSignUpSubmit}>
                  <h3>Sign Up</h3>
                  <p className="form-subtitle">Create an account to get started.</p>
                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <div className="form-options">
                    <label className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                      />
                      <span className="checkbox-label">I accept the Terms and Privacy Policy</span>
                    </label>
                  </div>
                  <button type="submit" className="btn-signin">
                    Create Account
                  </button>
                  <p className="signup-prompt">
                    Already have an account? <button 
                      type="button" 
                      className="btn-text"
                      onClick={switchToSignIn}
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
        <button className="btn-mobile" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onAuthClick={handleAuthButtonClick}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

export default Header;
