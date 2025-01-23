import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CompanyLogo from '../assets/Icons/PastedGraphic-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <img src={CompanyLogo} alt="Company Logo" className="navbar-logo-home" />
        </div>
        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink exact to="/" activeClassName="active">Dashboard</NavLink></li>
            <li><NavLink to="/add-friends" activeClassName="active">Add Friends</NavLink></li>
            <li><NavLink to="/chat" activeClassName="active">Chat</NavLink></li>
            <li><NavLink to="/about" activeClassName="active">About Us</NavLink></li>
            <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
            <li><NavLink to="/logout" activeClassName="active">Logout</NavLink></li>
          </ul>
        </div>
        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
