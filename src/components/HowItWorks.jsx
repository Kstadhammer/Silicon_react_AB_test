import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './styles/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    { image: 'src/assets/images/hw1.png', alt: 'Step 1', title: 'Step 1. Advanced budget management', description: 'Optimize your budget with advanced tools to track and manage your expenses effectively.' },
    { image: 'src/assets/images/hw2.png', alt: 'Step 2', title: 'Step 2. Latest transaction history', description: 'Stay informed with real-time updates on your recent transactions and spending patterns.' },
    { image: 'src/assets/images/hw3.png', alt: 'Step 3', title: 'Step 3. Transfers to people from your contact list', description: 'Easily transfer money to friends and family directly from your contact list. No extra fees or commissions.' },
    { image: 'src/assets/images/hw7.png', alt: 'Step 4', title: 'Step 4. Secure online payments', description: 'Make secure online payments with confidence using our encrypted payment system.' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + steps.length) % steps.length);
  };

  const getVisibleSteps = () => {
    const visibleSteps = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % steps.length;
      visibleSteps.push(steps[index]);
    }
    return visibleSteps;
  };

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2 className="how-it-works-title">How Does It Work?</h2>
        <div className="carousel">
          <button onClick={prevSlide} className="nav-button prev">
            <FontAwesomeIcon icon={faChevronLeft} className="chevron-icon" />
          </button>
          <div className="steps">
            {getVisibleSteps().map((step, index) => (
              <div key={index} className="step">
                <img src={step.image} alt={step.alt} className="carousel-image" />
              </div>
            ))}
          </div>
          <button onClick={nextSlide} className="nav-button next">
            <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
          </button>
          <img src="src/assets/images/frame.png" alt="Phone Frame" className="phone-frame" />
        </div>
        <div className="transaction-history">
          <h3 className="transaction-history-title">{steps[currentIndex].title}</h3>
          <p className="transaction-history-description">
            {steps[currentIndex].description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
