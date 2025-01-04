import React, {useEffect} from "react";
import AboutUsBg from "../../assets/AboutUs/Aboutusbanner.webp"
import  MarketImage from "../../assets/AboutUs/AboutUs.webp"
import  AirAsiaImage from "../../assets/AboutUs/AirAsia-Logo-2009.jpg"
import  AirIndiaImage from "../../assets/AboutUs/air-india-logo.png"
import  IndigoImage from "../../assets/AboutUs/IndiGo-Logo.png"
import  VistaraImage from "../../assets/AboutUs/vistara-logo-vector.png"
import  AkasaImage from "../../assets/AboutUs/Akasa_Air_logo.png"
import Innovation from "../../assets/Idea.svg";
import Integrity from "../../assets/Technology.svg";
import Collaboration from "../../assets/Deal.svg";

import "./AboutUs.css";

function AboutUs() {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  return (
    <div className="careers-container-aboutus">
            <div className="career-section-1" style={{backgroundImage: `url(${AboutUsBg})`}}>
            <div className="career-title-aboutus">About Us</div>
            </div>

      <div className="upper-section-aboutus">
        {/* <div className="line-image">
          <img src={LineImage} alt="line" />
        </div> */}


        <div className="testimonials-title-aboutus">Our Mission</div>
        <div className="testimonials-heading-aboutus">
        Driving Logistics Excellence.
        </div>
      </div>

      <div className="second-outer-container">
      <div className="left-container-aboutus">
        <div className="heading-aboutus">
        Our mission is to revolutionize the logistics industry by providing tailored solutions that enhance efficiency, reliability, and customer satisfaction.
        </div>
        <div className="container-aboutus">
          <div>
          <div className="item-aboutus">
            <div className="text-content-aboutus">
              <div className="subheading-aboutus">Innovation:</div>
              <div className="content-aboutus">
              Leveraging the latest technologies to create sustainable and scalable logistics solutions.
              </div>
            </div>
          </div>
          <div className="item-aboutus">
            <div className="text-content-aboutus">
              <div className="subheading-aboutus">Integrity:</div>
              <div className="content-aboutus">
              Maintaining the highest standards of ethics and transparency in all our operations.
              </div>
            </div>
          </div>
          </div>
          <div>
          <div className="item-aboutus">
            <div className="text-content-aboutus">
              <div className="subheading-aboutus">Excellence:</div>
              <div className="content-aboutus">
              Delivering high-quality logistics solutions that meet the evolving needs of our clients.
              </div>
            </div>
          </div>
          <div className="item-aboutus">
            <div className="text-content-aboutus">
              <div className="subheading-aboutus">Partnership:</div>
              <div className="content-aboutus">
              Building long-term relationships with clients to help them navigate the logistics landscape and achieve their strategic objectives.
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="right-container-aboutus">
          <img src={MarketImage} alt=""/>
        </div>
        
      </div>
      {/* <div className="second-container-aboutus">
        <div className="sub-second-container-aboutus">
          <div className="inner-divone">
            <div className="count">1500+</div>
            <div className="text-aboutus">Successful Customers </div>
          </div>
          <div className="inner-divtwo">
            <div className="count">100+</div>
            <div className="text-aboutus">Satisfied Clients Worldwide</div>
          </div>
          <div className="inner-divthree">
            <div className="count">10+</div>
            <div className="text-aboutus">Years of industry experience</div>
          </div>
          <div className="inner-divfour">
            <div className="text-aboutus">
              Serving clients in <div className="count">10+</div> countries
            </div>
          </div>
        </div>
      </div> */}
      <div className="aboutus-container">
        {/* <div className="line-image-aboutus">
          <img src={LineImage} alt="line" />
        </div> */}
        <div className="aboutus-content-div">
          <div className="aboutus-title">Core Values</div>
          <div className="aboutus-heading-sub">
          Our Core Values: Guiding Principles for Success in Transportation Services
          </div>
        </div>
      </div>
      <div className="aboutus-success-container-core">
        <div className="aboutus-success-item-one">
          <div className="aboutus-success-count">
            {" "}
            <img src={Innovation} alt="Innovation-pic" />
          </div>
          <div className="aboutus-success-subheading">Our Reach</div>
          <div className="aboutus-success-text">
          We offer 24-hour air transport to over 30 cargo airports nationwide, with road transport connections to over 80 destinations.
          </div>
        </div>
        <div className="aboutus-success-item-two">
          <div className="aboutus-success-count">
            <img src={Integrity} alt="Integrity-pic" />
          </div>
          <div className="aboutus-success-subheading">Mission</div>
          <div className="aboutus-success-text">
          "Happy Customer" through service excellence in the B2B integrated logistics environment.
          </div>
        </div>
        <div className="aboutus-success-item-one">
          <div className="aboutus-success-count">
            <img src={Collaboration} alt="Collaboration-pic" />
          </div>
          <div className="aboutus-success-subheading">Our Partners</div>
          <div className="aboutus-success-text">
          We collaborate with leading air transport operators and ground transport providers to ensure the highest standards of service and reliability for our clients.
          </div>
        </div>
      </div>
      <div className="aboutus-our-teams-main-section">
        <div className="aboutus-our-teams-left-section">
          {/* <div className="line-image">
            <img src={LineImage} alt="line" />
          </div> */}
          <div className="aboutus-our-teams-left-section-div">
            <div className="aboutus-our-teams-title">Our Partners</div>
            <div className="aboutus-our-teams-heading">
            Collaborating with Industry Leaders for Superior Transportation Services
            </div>
            <div className="aboutus-our-teams-text">
            At our logistics company, our partners are key to our success. We are proud to collaborate with esteemed airlines such as Air India, Indigo, AirAsia, and Vistara. These partnerships enable us to provide unparalleled air transportation solutions, ensuring your cargo reaches its destination promptly and securely.
            <br/><br/>
Our strategic alliances with these industry leaders allow us to offer a wide range of services, from premium 'Next Flight Out' options to economical '24-hour' multi-modal transit solutions. By working closely with our partners, we can provide flexible and reliable transportation services tailored to meet your specific needs.
<br/><br/>
We believe in the power of collaboration and are committed to maintaining strong, long-term relationships with our partners. Together, we strive to deliver excellence, reliability, and customer satisfaction in all our logistics operations.
            </div>
          </div>
        </div>
        <div className="aboutus-our-teams-right-section">
          <div className="partners-picture"><img src={AirAsiaImage} alt="airasiaimage"/></div>
          <div className="partners-picture"><img src={AirIndiaImage} alt="airindiaimage"/></div>
          <div className="partners-picture"><img src={IndigoImage} alt="indigoimage"/></div>
          <div className="partners-picture"><img src={VistaraImage} alt="vistaraimage"/></div>
          <div className="partners-picture"><img src={AkasaImage} alt="akasaimage"/></div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
