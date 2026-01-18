import React from "react";
import FooterLogo from "../assets/logo/Footer.svg";
import "./Footer.css";
import MetallicPaintUse from "./MetallicPaintUse";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Upper Content - 5 Columns */}
        <div className="upper-content">
          <div className="footer-description">
            <p>
              We Design And Develop Premium, Luxury Websites That Elevate
              Brands, Engage Users, And Drive Measurable Growth. Built With
              Strategy, Crafted With Precision.
            </p>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Our Deals</a>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <a href="#">Premium Website Design</a>
            <a href="#">Web Development</a>
            <a href="#">WordPress Development</a>
            <a href="#">Luxury Business Websites</a>
          </div>

          <div className="footer-column">
            <h4>Call Us</h4>
            <p>(205) 908-3709</p>
            <h4>Email Us</h4>
            <a href="mailto:hello@metatrybe.com">hello@metatrybe.com</a>
            <a href="mailto:info@metatrybe.com">info@metatrybe.com</a>
          </div>

          <div className="footer-column">
            <h4>Follow</h4>
            <a href="#">Linkedin</a>
            <a href="#">Instagram</a>
          </div>
        </div>

        {/* Logo Section */}
        <div className="footer-logo-section">
          <MetallicPaintUse />
        </div>

        {/* Lower Content - Copyright & Links */}
        <div className="lower-content">
          <p className="copyright">© 2025 Metatrybe. All Rights Reserved.</p>
          <div className="legal-links">
            <a href="#">Terms Of Use</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
