import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import BlueBorderButton from "./BlueBorderButton";
import ArrowBlue from "../assets/icons/ArrowBlue.svg";
import Arrow from "../assets/icons/arrow.svg";
import ArrowBlack from "../assets/icons/ArrowBlack.svg";
import "./FullPageMenu.css";
import MenuFooter from "../assets/homePage/MenuFooter.png";
const menuItems = [
  { label: "Home", link: "/" },
  { label: "Work", link: "/work" },
  { label: "Services", link: "/services" },
  { label: "About", link: "/about" },
];

const serviceItems = [
  { number: "01", label: "Premium Website Design" },
  { number: "02", label: "Web Development Services" },
  { number: "03", label: "WordPress Development" },
  { number: "04", label: "Luxury Business Websites" },
];

const contactItems = [
  { type: "General", email: "hello@metatrybe.com", img: Arrow },
  { type: "Support", email: "Support@metatrybe.com", img: Arrow },
];

const FullPageMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const buttonRef = useRef(null);
  const menuItemRefs = useRef([]);
  const serviceRefs = useRef([]);
  const contactRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      // SET INITIAL STATES
      gsap.set(menuRef.current, {
        visibility: "visible",
        opacity: 1,
        clipPath: "inset(0 100% 0 0)", // Start hidden (reveal from left to right or modify for other feel)
        // Let's use vertical reveal as requested "non-directional" often implies simple fade or expand
        // User suggested "clip-path or scaleY"
        // Let's do a center vertical reveal:
        clipPath: "inset(50% 0 50% 0)",
      });

      // Animate menu opening
      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      }).to(
        menuRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.1,
          ease: "power3.out",
        },
        "-=0.1",
      );

      // Stagger menu items (blur + fade + slight Y)
      tl.fromTo(
        menuItemRefs.current,
        { y: 20, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2",
      );

      // Stagger service items
      tl.fromTo(
        serviceRefs.current,
        { y: 20, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
      );

      // Stagger contact items
      tl.fromTo(
        contactRefs.current,
        { y: 20, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2",
      );

      // Footer animation
      tl.fromTo(
        ".menuRight-footer",
        { y: 20, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.2",
      );
    } else {
      // Animate menu closing
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: "hidden" });
        },
      });

      tl.to(
        [
          menuItemRefs.current,
          serviceRefs.current,
          contactRefs.current,
          ".menuRight-footer",
        ],
        {
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.2,
          ease: "power2.in",
        },
      )
        .to(
          menuRef.current,
          {
            clipPath: "inset(50% 0 50% 0)",
            duration: 0.3,
            ease: "power3.in",
          },
          "-=0.1",
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.2",
        );
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button (Desktop) */}
      <div
        ref={buttonRef}
        className="menu-button-wrapper desktop-menu-btn"
        onClick={toggleMenu}
      >
        <BlueBorderButton text={isOpen ? "Exit" : "Menu"} />
      </div>

      {/* Menu Button (Mobile) */}
      <div
        className="mobile-menu-btn"
        onClick={toggleMenu}
        style={{ zIndex: 9999, position: "relative", cursor: "pointer" }}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`menu-overlay ${isOpen ? "active" : ""}`}
        onClick={closeMenu}
      />

      {/* Full Page Menu */}
      <div ref={menuRef} className={`full-page-menu ${isOpen ? "open" : ""}`}>
        <div className="menu-content">
          {/* Left Side - Navigation Links */}
          <div className="menu-left">
            <nav className="menu-navigation">
              {menuItems.map((item, index) => (
                <div key={item.label} className="menu-item-wrapper">
                  <a
                    href={item.link}
                    className="menu-link"
                    ref={(el) => (menuItemRefs.current[index] = el)}
                    onClick={closeMenu}
                  >
                    <span className="menu-link-number">0{index + 1}</span>
                    <span className="menu-link-text">{item.label}</span>
                  </a>
                  <hr className="menu-divider" />
                </div>
              ))}
            </nav>
          </div>

          {/* Right Side - Services & Contact */}
          <div className="menu-right">
            {/* Services Section */}
            <div className="services-section-menu">
              <div className="our-serv">
                <h3 className="services-title-menu">
                  Our Services
                  <img src={ArrowBlue} />
                </h3>
              </div>
              <ul className="services-list-menu">
                {serviceItems.map((service, index) => (
                  <li
                    key={service.number}
                    className="service-item-menu"
                    ref={(el) => (serviceRefs.current[index] = el)}
                  >
                    <span className="service-number-menu">
                      {service.number}
                    </span>
                    <span className="service-label-menu">{service.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="contact-section">
              <h3 className="contact-title">Contact the team</h3>
              <div className="contact-list">
                {contactItems.map((contact, index) => (
                  <a
                    key={contact.type}
                    href={`mailto:${contact.email}`}
                    className="contact-item"
                    ref={(el) => (contactRefs.current[index] = el)}
                  >
                    <div className="contact-info">
                      <span className="contact-type">{contact.type}</span>
                      <span className="contact-email">{contact.email}</span>
                    </div>
                    <img
                      src={ArrowBlack}
                      alt=""
                      className="contact-arrow"
                      width={10}
                      height={10}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="menuRight-footer">
              <div className="menuRight-footer-img">
                <img src={MenuFooter} alt="asd" style={{ width: "100%" }} />
              </div>
              <div className="menuRight-footer-text">
                <h2>Beyond Trends by Metatrybe</h2>
                <p>
                  Exploring design-led directions, industry observations,and
                  innovation towards impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FullPageMenu;
