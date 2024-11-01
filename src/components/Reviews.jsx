import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Static reviews
  const staticReviews = [
    {
      id: 'static1',
      author: 'John Thompson',
      jobRole: 'Small Business Owner',
      starRating: 5,
      comment: 'Working with this team has transformed our financial processes. Their attention to detail and responsive support have made implementation seamless. Highly recommended for any business!',
      avatarUrl: '/assets/avatars/avatar-6.png'
    },
    {
      id: 'static2',
      author: 'Michael Chen',
      jobRole: 'Freelance Developer',
      starRating: 5,
      comment: 'The team\'s expertise and dedication to customer success is outstanding. They\'ve consistently delivered solutions that make my workflow smoother. Couldn\'t be happier with the service!',
      avatarUrl: '/assets/avatars/avatar-3.png'
    },
    {
      id: 'static3',
      author: 'Sarah Williams',
      jobRole: 'Digital Nomad',
      starRating: 4,
      comment: 'Their support team has been exceptional in helping me navigate international transactions. The platform is intuitive and they\'re always ready to assist when needed.',
      avatarUrl: '/assets/avatars/avatar-4.png'
    },
    {
      id: 'static4',
      author: 'David Miller',
      jobRole: 'Startup Founder',
      starRating: 5,
      comment: 'Impressed by the team\'s commitment to excellence. They understood our unique needs and delivered a solution that perfectly matches our requirements. A pleasure to work with!',
      avatarUrl: '/assets/avatars/avatar-5.png'
    },
    
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://win24-assignment.azurewebsites.net/api/testimonials');
        const data = await response.json();
        setReviews([...data, ...staticReviews]);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews(staticReviews);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <i key={index} className={`fa-star ${index < rating ? 'fa-solid' : 'fa-regular'}`}></i>
    ));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 2 >= reviews.length ? 0 : prevIndex + 2
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 2 < 0 ? Math.max(reviews.length - 2, 0) : prevIndex - 2
    );
  };

  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <div className="reviews-content">
          <h2 className="reviews-title">Clients are<br />loving our app</h2>
          <div className="carousel-controls">
            <button className="carousel-button prev" onClick={prevSlide}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="carousel-button next" onClick={nextSlide}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="reviews-carousel">
          <div className="review-cards">
            {reviews.slice(currentIndex, currentIndex + 2).map((review) => (
              <div key={review.id} className="review-card">
                <img src="/assets/icons/quotes.svg" alt="Quote" className="quote-icon" />
                <div className="rating">
                  {renderStars(review.starRating)}
                </div>
                <p className="review-text">{review.comment}</p>
                <div className="reviewer">
                  <img src={review.avatarUrl} alt={review.author} />
                  <div className="reviewer-info">
                    <span className="reviewer-name">{review.author}</span>
                    <span className="reviewer-title">{review.jobRole}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
