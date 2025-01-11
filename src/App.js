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
import ChatRoomList from './Pages/Chat/ChatRoomList';
import CreateChatRoom from './Pages/Chat/CreateChatRoom';
import ChatRoomDetail from './Pages/Chat/ChatRoomDetail';
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  // Determine if the current route is a restricted/authentication-free route
  const isAuthFreeRoute = ["/login", "/logout"].includes(location.pathname);

  return (
    <div className="app-container">
      {/* Sidebar rendered only for authenticated users */}
      {isAuthenticated && !isAuthFreeRoute && <Sidebar />}

      <div className={`main-content ${isAuthenticated ? "with-sidebar" : ""}`}>
        {/* Navbar rendered for all routes except login/logout */}
        {!isAuthFreeRoute && <Navbar />}

        <Routes>
          {/* Redirect root to appropriate location based on authentication */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated ? <AboutUs /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isAuthenticated ? <ContactUs /> : <Navigate to="/login" />} />

          {/* Chat-related routes */}
          <Route path="/chat" element={isAuthenticated ? <ChatRoomList /> : <Navigate to="/login" />} />
          <Route path="/chat/create" element={isAuthenticated ? <CreateChatRoom /> : <Navigate to="/login" />} />
          <Route path="/chat/:id" element={isAuthenticated ? <ChatRoomDetail /> : <Navigate to="/login" />} />
        </Routes>

        {/* Footer rendered for all routes except login/logout */}
        {!isAuthFreeRoute && <Footer />}
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
