import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import Dashboard from "./components/Dashboard";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("access_token");

  // Redirect logged-in users away from the login page
  if (location.pathname === "/login" && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="app-container">
      {/* Conditionally render Sidebar for authenticated users */}
      {isAuthenticated && location.pathname !== "/login" && location.pathname !== "/logout" && <Sidebar />}

      <div className={`main-content ${isAuthenticated ? 'with-sidebar' : ''}`}>
        {location.pathname !== "/login" && location.pathname !== "/logout" && <Navbar />}
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated ? <AboutUs /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isAuthenticated ? <ContactUs /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        {location.pathname !== "/login" && location.pathname !== "/logout" && <Footer />}
      </div>
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
