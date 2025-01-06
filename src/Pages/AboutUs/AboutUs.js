import React, { useEffect } from "react";
import "./AboutUs.css";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aboutus-container">
      <h1>Welcome to About Us</h1>
    </div>
  );
}

export default AboutUs;
