import { useLocation } from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <footer className={`footer ${isContactPage ? 'footer-white' : ''}`}>
      <div className="container">
        <p className="footer-content">
          © {new Date().getFullYear()} Silicon. All rights reserved. Credit MadrasThemes
        </p>
      </div>
    </footer>
  );
};

export default Footer;
