import React, { useState, useEffect } from "react";
import { submitContactForm } from "../../API/user";
import ContactUsBg from "../../assets/ContactUs/Contactus-Banner.jpg";
import "../../Pages/ContactUs/ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      await submitContactForm(formData);
      alert('Inquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>
      <div
        className="contactus-section-1"
        style={{ backgroundImage: `url(${ContactUsBg})` }}
      >
        <div className="contactus-title">Contact Us</div>
      </div>
      <div className="syntax-contactus">
        <div className="overlay-navbar-contactUs">
          <div className="contactus-container">
            <div className="upper-section-form">
            </div>
            <div className="contactus-section">
              <div className="contactus-image-left">
                 <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.387440765141!2d78.47427227420611!3d17.441160583455193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a084670b343%3A0x3835e1f347414361!2sICL%20TRANSPORT%20%26%20SUPPLY%20CHAIN%20MANAGEMENT%20LLP!5e0!3m2!1sen!2sus!4v1723722142545!5m2!1sen!2sus" 
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ICL Transport Location"
                ></iframe>
              </div>
              <div className="contactus-contact-form">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="Subject" 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <textarea 
                    name="message" 
                    placeholder="Message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required
                  ></textarea>
                   <button type="submit" className="submit-btn-form-home" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
                {loading && <div className="loader"></div>} {/* Optional: Add a loader */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
