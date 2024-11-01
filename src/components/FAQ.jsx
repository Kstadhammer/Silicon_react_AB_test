import { useState, useEffect } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqItems, setFaqItems] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('https://win24-assignment.azurewebsites.net/api/faq');
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        const data = await response.json();
        setFaqItems(data.map(item => ({
          question: item.title,
          answer: item.content
        })));
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        // Optionally set an error state here to display to the user
      }
    };

    fetchFAQs();
  }, []);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="faqs">
      <div className="container">
        <div className="faqs-content">
          <h2>Any Questions?<br />Check out the FAQs</h2>
          <p>Still have unanswered questions and need to get in touch?</p>
          <div className="contact-options">
            <div className="contact-option">
              <img className="rotate-on-hover" src="/assets/icons/call-phone.svg" alt="Call" />
              <p>Still have questions?</p>
              <a href="#" className="hover-effect">Contact us →</a>
            </div>
            <div className="contact-option">
              <img className="rotate-on-hover" src="/assets/icons/text-sms.svg" alt="Chat" />
              <p>Don&apos;t like phone calls?</p>
              <a href="#" className="hover-effect chat-with-us">Contact us →</a>
            </div>
          </div>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <h3 onClick={() => toggleFaq(index)}>
                {item.question}
                <i className={`fas fa-chevron-down ${activeIndex === index ? 'rotate' : ''}`}></i>
              </h3>
              <p className={activeIndex === index ? 'show' : ''}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
