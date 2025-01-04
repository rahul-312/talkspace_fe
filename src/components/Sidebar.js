import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current path

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about">About Us</Link>
        </li>
        <li className={location.pathname === '/contact' ? 'active' : ''}>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;