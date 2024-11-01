import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './styles/LoginForm.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="login-container">
        <div className="login-form-wrapper">
          <h2>Check Your Email</h2>
          <p className="login-subtitle">
            We&apos;ve sent password reset instructions to your email address.
            Please check your inbox.
          </p>
          <div className="form-actions">
            <Link to="/auth" className="btn-signin">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Reset Password</h2>
        <p className="login-subtitle">
          Enter your email address and we&apos;ll send you instructions to reset your password.
        </p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-signin">
            Send Reset Instructions
          </button>

          <p className="signup-prompt">
            Remember your password? <Link to="/auth">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
