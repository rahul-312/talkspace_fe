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
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/add-friends" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Friends
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/friend-list" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Friend List
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/chatroom" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Chat
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/logout" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Logout
              </NavLink>
            </li>
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
