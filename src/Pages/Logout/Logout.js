// src/Pages/Logout/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/users/'; // Your API base URL

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
          console.log("No refresh token found.");
          navigate('/login'); // Redirect to login if no refresh token is found
          return;
        }

        // Send POST request to logout API
        await axios.post(`${BASE_URL}logout/`, { refresh: refreshToken });

        // Clear tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Redirect to login page
        navigate('/login');
      } catch (err) {
        console.error("Logout failed:", err);

        // Clear tokens and redirect to login even if the logout API fails
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      <h2>Logging you out...</h2>
    </div>
  );
};

export default Logout;
