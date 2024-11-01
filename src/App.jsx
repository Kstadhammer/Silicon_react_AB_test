import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import MoneyTransfer from './components/MoneyTransfer';
import InternationalPayments from './components/InternationalPayments';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import ContactPage from './components/ContactPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Footer from './components/Footer';
import ChatAgent from './components/ChatAgent';
import RippleEffect from './components/RippleEffect';

// Import styles in specific order for proper cascading
// 1. Base styles (CSS variables, resets, and global styles)
import './components/styles/base.css';
import './index.css';

// 2. Layout components (header and footer)
import './components/styles/Header.css';
import './components/styles/Footer.css';

// 3. Main page components (in order of appearance)
import './components/styles/Hero.css';
import './components/styles/Brands.css';
import './components/styles/Features.css';
import './components/styles/HowItWorks.css';
import './components/styles/MoneyTransfer.css';
import './components/styles/InternationalPayments.css';
import './components/styles/Reviews.css';
import './components/styles/FAQ.css';
import './components/styles/Newsletter.css';

// 4. Contact page and auth styles
import './components/styles/Contact.css';
import './components/styles/LoginForm.css';

const AppContent = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isAuthPage = ['/auth', '/signup', '/forgot-password'].includes(location.pathname);

  useEffect(() => {
    document.body.style.backgroundColor = '';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [isContactPage, isAuthPage]);

  return (
    <div className={`wrapper ${isContactPage ? 'contact-page-active' : ''} ${isAuthPage ? 'auth-page-active' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <RippleEffect />
      <main style={{ backgroundColor: (isContactPage || isAuthPage) ? 'var(--color-background)' : '' }}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero isDarkMode={isDarkMode} />
              <Brands />
              <Features />
              <HowItWorks />
              <MoneyTransfer />
              <InternationalPayments />
              <Reviews />
              <FAQ />
              <Newsletter />
            </>
          } />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Routes>
      </main>
      <Footer />
      <ChatAgent />

    </div>
  );
};

AppContent.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <AppContent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
};

export default App;
