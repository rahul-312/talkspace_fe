// src/components/Footer.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../assets/Icons/PastedGraphic-1.png";
import Twitter from "../assets/twitter-footer.svg";
import Facebook from "../assets/fb-footer.svg";
import Instagram from "../assets/insta-footer.svg";
import LinkedIN from "../assets/linkedin-footer.svg";
import "../styles/Footer.css";

function Footer() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  const handleCloseAlert = () => {
    setMessage('');
  };

  return (
    <div className="footer-container-contactus">
      {message && (
        <div className="alert-success">
          <p>{message}</p>
          <button className="alert-close-btn" onClick={handleCloseAlert}>
            &times;
          </button>
        </div>
      )}

      <div className="footer-lower-section">
        <div className="comapnyinfo-socialicons">
          <div className="company-info">
            <div className="logo">
              <img src={CompanyLogo} alt="company-logo" />
              {/* <span>ICL</span> */}
            </div>
            <p>
              
            </p>
          </div>
          <div className="social-icons">
            <a href="https://x.com/iclexpcouriers" target="_blank" rel="noopener noreferrer">
              <img src={Twitter} alt="twitter-logo" />
            </a>
            <a href="https://www.facebook.com/iclexpresscouriers" target="_blank" rel="noopener noreferrer">
              <img src={Facebook} alt="facebook-logo" />
            </a>
            <a href="https://www.instagram.com/iclexpresscouriers/" target="_blank" rel="noopener noreferrer">
              <img src={Instagram} alt="instagram-logo" />
            </a>
            <a href="https://www.linkedin.com/company/icl-couriers-logistics/" target="_blank" rel="noopener noreferrer">
              <img src={LinkedIN} alt="linkedin-logo" />
            </a>
          </div>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <div className="links">
            <Link to="/about">
              <div>About Us</div>
            </Link>
            <Link to="/contact">
              <div>Contact Us</div>
            </Link>
          </div>
        </div>
        <div className="contact-details">
          <h3>Contact Us</h3>
          <div className="info">
            <div className="info-heading-footer">Email Address</div>
            <div className="info-heading-content">rahulsid49@gmail.com </div>
            <div className="info-heading-footer">Mobile Number</div>
            <div className="info-heading-content">9908569245</div>
          </div>
        </div>
      </div>
      <div className="legal">
        <div className="left-content">
          Copyright 2025. All Rights Reserved.
        </div>
        <div className="right-content">
          <Link to="/">
            <span className="right-content-left-span">Terms & Conditions</span>
          </Link>
          <Link to="/">
            <span className="right-content-right-span">Privacy Policy</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
