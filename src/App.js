import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import AddFriends from './Pages/AddFriends/AddFriends';
import ChatRoom from './components/ChatRoom'; // Corrected path for ChatRoom
import './styles/App.css';

// Reusable PrivateRoute component to handle protected routes
const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function AppContent() {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  const isAuthFreeRoute = ["/login", "/logout"].includes(location.pathname);

  return (
    <div className="app-container">
      {!isAuthFreeRoute && <Navbar />}

      <Routes>
        {/* Redirect root to appropriate location based on authentication */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

        {/* Authentication routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />}
        />
        <Route
          path="/about"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AboutUs />} />}
        />
        <Route
          path="/contact"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<ContactUs />} />}
        />
        <Route
          path="/add-friends"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AddFriends />} />}
        />
        {/* Add the new route for ChatRoom */}
        <Route
          path="/chatroom"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<ChatRoom />} />}
        />
      </Routes>

      {/* Render Footer except on auth-free routes */}
      {!isAuthFreeRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
