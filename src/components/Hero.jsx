import PropTypes from 'prop-types';
import './styles/Hero.css';

const Hero = ({ isDarkMode }) => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Manage All Your<br /> Money in One App
          </h1>
          <p>
            We offer you a new generation of the mobile banking.<br />
            Save, spend & manage money in your pocket.
          </p>
          <div className="app-buttons">
            <a href="#" className="app-store-button">
              <img 
                src={isDarkMode ? "/assets/app-store/appstore-dark1.svg" : "/assets/app-store/appstore.svg"} 
                alt="Download on App Store" 
              />
            </a>
            <a href="#" className="google-play-button">
              <img 
                src={isDarkMode ? "/assets/app-store/googleplay-dark1.svg" : "/assets/app-store/googleplay.svg"} 
                alt="Get it on Google Play" 
              />
            </a>
          </div>
          <div className="discover-more">
            {isDarkMode ? (
              <button 
                onClick={scrollToFeatures}
                className="arrow-button arrow-button-dark"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ) : (
              <button 
                onClick={scrollToFeatures}
                className="arrow-button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#33354D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <span>Discover more</span>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="/assets/phones/Iphone2x.svg" 
            alt="Mobile banking app interface" 
          />
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default Hero;
