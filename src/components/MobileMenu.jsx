import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './styles/MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, onAuthClick }) => {
  const handleLinkClick = () => {
    onClose();
  };

  const handleAuthButtonClick = (e) => {
    onAuthClick(e);
    onClose();
  };

  return (
    <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
      <div className="nav-links">
        <Link to="/#features" className="nav-link" onClick={handleLinkClick}>
          Features
        </Link>
        <Link to="/contact" className="nav-link" onClick={handleLinkClick}>
          Contact
        </Link>
      </div>
      <button 
        className="auth-button"
        onClick={handleAuthButtonClick}
      >
        <FontAwesomeIcon icon={faUser} className="signin-icon" />
        <span>Sign in / up</span>
      </button>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAuthClick: PropTypes.func.isRequired
};

export default MobileMenu; 