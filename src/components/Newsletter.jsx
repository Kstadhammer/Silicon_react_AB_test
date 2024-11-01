import { useState } from 'react';


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    if (!email.trim()) return false; // Check for empty email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      const response = await fetch('https://win24-assignment.azurewebsites.net/api/forms/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', Object.fromEntries(response.headers));

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        console.log('Response Text:', textResponse);
        data = { message: textResponse || 'Thank you for subscribing to our newsletter!' };
      }

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      console.log('Subscription successful:', data);
      setEmail('');
      setError('');
      setSuccessMessage(data.message || 'Thank you for subscribing to our newsletter!');
    } catch (error) {
      console.error('Error in newsletter subscription:', error);
      setError(error.message || 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <section id="newsletter" className="newsletter container">
      <img 
        src="/assets/icons/notification.svg" 
        alt="Newsletter" 
        className="bounce-animation"
      />
      <h2>Subscribe to our newsletter to stay informed about latest updates</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <div className="input-wrapper">
            <i className="fas fa-envelope"></i>
            <input 
              type="email" 
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
            />
          </div>
          <button 
            type="submit" 
            id="subscribe-btn" 
            className="btn btn-primary-1"
          >
            Subscribe
          </button>
        </div>
        {error && <span className="error-text">{error}</span>}
        {successMessage && <span className="success-text">{successMessage}</span>}
      </form>
    </section>
  );
};

export default Newsletter;
