import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import StudioIntro from "./StudioIntro";
import ServiceMatrix from "./ServiceMatrix";
import ProcessTimeline from "./ProcessTimeline";
// import FounderSpotlight from "./FounderSpotlight";
import TeamMatrix from "./TeamMatrix";
import QualitySection from "./QualitySection";
import CTASection from "./CTASection";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after fonts and images load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    const handleLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="about-page">
        <HeroSection />
        <StudioIntro />
        <ServiceMatrix />
        <ProcessTimeline />
        {/* <FounderSpotlight /> */}
        <TeamMatrix />
        <QualitySection />
        <CTASection />
      </div>
      <Footer />
    </>
  );
};

export default About;
