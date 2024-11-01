import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faUsers, faMapMarkerAlt, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import './styles/Contact.css';

const ContactPage = () => {
  useEffect(() => {
    
  /*   document.querySelector('header').style.backgroundColor = '#F3F6FF';
    document.body.style.backgroundColor = '#FFFFFF';
    
     */
    return () => {
      document.querySelector('header').style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    specialist: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const validateField = (name, value) => {
    switch (name) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      }
      case 'fullname': {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(value) ? '' : 'Please enter a valid name (2-50 characters, letters only)';
      }
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      fullname: validateField('fullname', formData.fullname),
      email: validateField('email', formData.email),
      specialist: !formData.specialist ? 'Please select a specialist' : ''
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://win24-assignment.azurewebsites.net/api/forms/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Log the raw response status
      console.log('Response status:', response.status);
      
      // Check if there's actually content to parse
      const text = await response.text();
      console.log('Raw response:', text);
      
      // Only try to parse as JSON if there's content
      const data = text ? JSON.parse(text) : {};
      console.log('API Response:', data);

      setSubmitStatus({ type: 'success', message: 'Form submitted successfully!' });
      setFormData({ fullname: '', email: '', specialist: '' });
    } catch (error) {
      console.error('Error details:', error);
      setSubmitStatus({ type: 'error', message: `Failed to submit form: ${error.message}` });
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <nav className="breadcrumb">
          <FontAwesomeIcon icon={faHome} />
          <span>Homepage</span>
          <span>/</span>
          <span className="breadcrumb-contact">Contact</span>
        </nav>

        <h1>Contact Us</h1>

        <div className="contact-content">
          {/* Left Column */}
          <div className="contact-left">
            {/* Email Us */}
            <div className="contact-box">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="content">
                <h2>Email us</h2>
                <p>Please feel free to drop us a line. We will respond as soon as possible.</p>
                <a href="#" className="btn-text">Leave a message</a>
              </div>
            </div>

            {/* Careers */}
            <div className="contact-box">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="content">
                <h2>Careers</h2>
                <p>Find your path in healthcare and join our team of dedicated medical professionals.</p>
                <a href="#" className="btn-text">Send an application</a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Get Online Consultation</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              {submitStatus.message && (
                <div className={`status-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="fullname">Full name</label>
                <input 
                  type="text" 
                  id="fullname" 
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
                {errors.fullname && <span className="error-message">{errors.fullname}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="specialist">Specialist</label>
                <select 
                  id="specialist" 
                  name="specialist"
                  value={formData.specialist}
                  onChange={handleInputChange}
                >
                  <option value="">Choose Medical Specialty</option>
                  <option value="1">Cardiology</option>
                  <option value="2">Neurology</option>
                  <option value="3">Pediatrics</option>
                  <option value="4">Oncology</option>
                  <option value="5">Orthopedics</option>
                  <option value="6">Dermatology</option>
                  <option value="7">Gynecology</option>
                  <option value="8">Urology</option>
                </select>
                {errors.specialist && <span className="error-message">{errors.specialist}</span>}
              </div>
              <button type="submit" className="btn-primary">Make an appointment</button>
            </form>
          </div>
        </div>

        {/* Map and Medical Centers */}
        <div className="contact-bottom">
          <div className="map-section">
            <img src="/assets/images/map.png" alt="Location Map" />
          </div>
          <div className="medical-centers">
            <div className="medical-center">
              <h3>Medical Center 1</h3>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 4517 Washington Ave. Manchester, Kentucky 39495</p>
              <p><FontAwesomeIcon icon={faPhone} /> (406) 555-0120</p>
              <p>
                <FontAwesomeIcon icon={faClock} /> <strong>Mon - Fri:</strong> 9:00 am - 22:00 am
              </p>
              <p>
                <span className="time-icon-spacer"></span>
                <strong>Sat - Sun:</strong> 9:00 am - 20:00 am
              </p>
            </div>
            <div className="medical-center">
              <h3>Medical Center 2</h3>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 2464 Royal Ln. Mesa,New Jersey 45463</p>
              <p><FontAwesomeIcon icon={faPhone} /> (406) 544-0123</p>
              <p>
                <FontAwesomeIcon icon={faClock} /> <strong>Mon - Fri:</strong> 9:00 am - 22:00 am
              </p>
              <p>
                <span className="time-icon-spacer"></span>
                <strong>Sat - Sun:</strong> 9:00 am - 20:00 am
              </p>
            </div>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
