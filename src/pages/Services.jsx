import React, { useRef } from "react";
import SkewedScroll from "../components/SkewedScroll";
import Header from "../components/Header";
import ServicesHero from "../components/ServicesHero";
import Mid_comp from "../components/Mid_comp";
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
      <Mid_comp />
      <Footer />
    </>
  );
};

export default Services;
