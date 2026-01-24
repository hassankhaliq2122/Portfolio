import React from "react";
import "./ServicesHero.css";
import ServicesMain from "../assets/ServicesPage/ServicesMain.png";
import { Palette, Layout, Building2, Code } from "lucide-react";

const features = [
  {
    icon: <Palette size={24} strokeWidth={1.5} />,
    title: "Website Design",
    description: "Beautiful, user-centered designs that captivate and convert",
  },
  {
    icon: <Layout size={24} strokeWidth={1.5} />,
    title: "WordPress Development",
    description: "Flexible CMS solutions that put you in control",
  },
  {
    icon: <Building2 size={24} strokeWidth={1.5} />,
    title: "Premium Business",
    description: "Enterprise-grade websites for established brands",
  },
  {
    icon: <Code size={24} strokeWidth={1.5} />,
    title: "Web Development",
    description:
      "Robust, scalable solutions built with cutting-edge technology",
  },
];

const ServicesHero = () => {
  return (
    <div className="services-hero">
      <div className="services-hero-header">
        <h1 className="services-hero-title">Our Premium Services</h1>
        <p className="services-hero-subtitle">
          We deliver comprehensive digital solutions tailored to your business
          needs. From concept to launch, our expert team brings your vision to
          life.
        </p>
      </div>

      <div className="services-hero-image-container">
        <img
          src={ServicesMain}
          alt="Services Main"
          className="services-hero-image"
        />
      </div>

      <div className="services-features-grid">
        {features.map((feature, index) => (
          <div key={index} className="services-feature-item">
            <div className="feature-icon-wrapper">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesHero;
