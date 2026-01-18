import React, { useState } from "react";
import "./ServicesDrawer.css";

const services = [
  {
    id: "01",
    title: "Premium Website Design",
    description:
      "High-End UI/UX Design Crafted To Elevate Your Brand, Engage Users, And Create Memorable Digital Experiences.",
  },
  {
    id: "02",
    title: "Web Development Services",
    description:
      "Robust and scalable web development solutions tailored to meet your specific business needs with cutting-edge technology.",
  },
  {
    id: "03",
    title: "WordPress Development",
    description:
      "Custom WordPress themes and plugins designed to provide a flexible and easy-to-manage content management system.",
  },
  {
    id: "04",
    title: "Luxury Business Websites",
    description:
      "Exclusive web designs for luxury brands that demand sophistication, elegance, and a seamless user journey.",
  },
];

const ServicesDrawer = () => {
  const [activeId, setActiveId] = useState("01");

  const handleToggle = (id) => {
    if (activeId !== id) {
      setActiveId(id);
    }
  };

  return (
    <div className="services-drawer-section">
      <div className="services-drawer-container">
        {/* Left Side */}
        <div className="services-left">
          <h2 className="services-title">
            Our Premium
            <br />
            Services
          </h2>
          <p className="services-note">
            Proactive Customer Engagement & Follow-Ups
          </p>
        </div>

        {/* Right Side - Accordion */}
        <div className="services-right">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-item service-item-${service.id} ${activeId === service.id ? "active" : ""}`}
              onClick={() => handleToggle(service.id)}
            >
              <div className="service-header">
                <h3 className="service-name">{service.title}</h3>
                <span className="service-number">{service.id}</span>
              </div>
              <div className="service-body">
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesDrawer;
