import React, { useRef } from "react";
import SkewedScroll from "../components/SkewedScroll";
import Header from "../components/Header";
import ServicesHero from "../components/ServicesHero";
import Footer from "../components/Footer";
import "./Services.css";

const Services = () => {
  return (
    <>
      <div className="service-page-container">
        <Header />
      </div>
      <ServicesHero />
      <SkewedScroll />
      <Footer />
    </>
  );
};

export default Services;
