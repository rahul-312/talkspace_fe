// src/Pages/Login/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const BASE_URL = 'http://127.0.0.1:8000/';

const Login = () => {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Clear any previous error messages
    setError('');
    setLoading(true);

    // Prepare data for the API call
    const loginData = {
      email: input,
      phone_number: input,
      username: input,
      password,
    };

    try {
      // Make the POST request to the login API
      const response = await axios.post(`${BASE_URL}users/login/`, loginData);

      // Handle successful response
      if (response.data.tokens) {
        // Store the tokens in localStorage or state for later use
        localStorage.setItem('access_token', response.data.tokens.access);
        localStorage.setItem('refresh_token', response.data.tokens.refresh);

        // Redirect to the home page or wherever you want
        navigate('/home');
      }
    } catch (err) {
      // Handle error response
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false); // Stop the loading spinner once the request is finished
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Single input field for email, phone, or username */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Email/Phone/Username"
          required
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Display Error if Login fails */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
