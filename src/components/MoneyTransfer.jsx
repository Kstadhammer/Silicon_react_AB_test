const MoneyTransfer = () => {
  const benefits = [
    'Banking transactions are free for you',
    'No monthly cash commission',
    'Manage payments and transactions online'
  ];

  return (
    <section id="money-transfer" className="money-transfer">
      <div className="container">
        <div className="money-transfer-content">
          <h2>Make your money<br /> transfer simple and clear</h2>
          <ul className="money-transfer-list">
            {benefits.map((benefit, index) => (
              <li key={index}>
                <img src="/assets/icons/bx-check-circle.svg" alt="Check icon" />
                {benefit}
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary hover-effect">
            Learn more
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="money-transfer-image">
          <img src="/assets/icons/money-transfer.svg" alt="Money Transfer" />
        </div>
      </div>
    </section>
  );
};

export default MoneyTransfer;
