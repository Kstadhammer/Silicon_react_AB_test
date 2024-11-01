import React from 'react';

const InternationalPayments = () => {
  const features = [
    {
      icon: '/assets/icons/credit-card.svg',
      description: 'Easily manage your international payments online with our secure platform.'
    },
    {
      icon: '/assets/icons/wallet.svg',
      description: 'Access seamless currency conversion and competitive exchange rates.'
    }
  ];

  return (
    <section id="international-payments" className="international-payments">
      <div className="container">
        <div className="international-payments-image">
          <img src="/assets/icons/international-payments.svg" alt="International Payments" />
        </div>
        <div className="international-payments-content">
          <h2>Receive payment from<br /> international bank details</h2>
          <div className="payment-features">
            {features.map((feature, index) => (
              <div key={index} className="payment-feature">
                <img src={feature.icon} alt={`Feature ${index + 1}`} />
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary hover-effect">
            Learn more
            <i className="fas fa-arrow-right" id="arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InternationalPayments;
