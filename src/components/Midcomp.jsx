import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mid_comp.css";
import midImage from "../assets/ServicesPage/MidComp.png";

const Mid_comp = () => {
  const navigate = useNavigate();

  return (
    <div className="mid-comp-section">
      <div className="mid-comp-container">
        <div className="mid-comp-content">
          <div className="partnership-badge">
            <span className="badge-dot"></span>
            Start A New Partnership
          </div>
          <h2 className="mid-comp-title">
            Shape The Future, <br /> Begin Now
          </h2>
          <p className="mid-comp-description">
            Our work connects best with those ready to plan with purpose and
            create impact. If you’re eager to build something meaningful, let’s
            meet over coffee and explore the possibilities!
          </p>

          <div className="mid-comp-contact">
            <h3>Contact</h3>
            <p>Partnerships & New Business</p>
            <button
              className="mid-contact-btn"
              onClick={() => navigate("/contact-us")}
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="mid-comp-image-wrapper">
          <img
            src={midImage}
            alt="Partnership Team"
            className="mid-comp-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Mid_comp;
