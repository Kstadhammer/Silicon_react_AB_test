import './styles/Features.css';

const Features = () => {
  const features = [
    {
      icon: '/assets/icons/credit-card.svg',
      title: 'Easy Payments',
      description: 'Experience seamless and secure transactions with our easy payment options.'
    },
    {
      icon: '/assets/icons/shield.svg',
      title: 'Data Security',
      description: 'Protect your data with our top-notch security measures and encryption.'
    },
    {
      icon: '/assets/icons/bars-graphic.svg',
      title: 'Cost Statistics',
      description: 'Analyze your spending with detailed cost statistics and insights.'
    },
    {
      icon: '/assets/icons/communication.svg',
      title: 'Support 24/7',
      description: 'Get round-the-clock support from our dedicated customer service team.'
    },
    {
      icon: '/assets/icons/wallet.svg',
      title: 'Regular Cashback',
      description: 'Enjoy regular cashback rewards on all of your purchases.'
    },
    {
      icon: '/assets/icons/happy.svg',
      title: 'Top Standards',
      description: 'Benefit from our commitment to maintaining the highest standards.'
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="features-image">
          <img src="/assets/phones/iphone-app-features.svg" alt="App Features" />
        </div>
        <div className="features-content">
          <h2>App Features</h2>
          <p className="features-description">
            Discover the unique features of our app that enhance your experience. 
            From secure transactions to 24/7 support, we ensure top-notch service 
            and satisfaction.
          </p>
          <div className="feature-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">
                  <img src={feature.icon} alt={feature.title} />
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
