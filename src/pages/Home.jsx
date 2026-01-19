import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import TextAnimation from "../components/TextAnimation";
import BlurText from "../components/ui/BlurText";
import ArrowButton from "../components/ArrowButton";
import BlueBorderButton from "../components/BlueBorderButton";
import AnimatedContentUse from "../components/AnimatedContentUse";
import SplitText from "../components/ui/SplitText";
import Working from "../components/Working";
import ServicesDrawer from "../components/ServicesDrawer";
import Results from "../components/Results";
import "./Home.css";

const HomePageProjects = React.lazy(
  () => import("../components/HomePageProjects"),
);
const Comments = React.lazy(() => import("../components/Comments"));
const PremiumAnimation = React.lazy(
  () => import("../components/PremiumAnimation"),
);
const Footer = React.lazy(() => import("../components/Footer"));

// A simple loading placeholder to prevent layout shifts during lazy loading
const SectionLoader = () => (
  <div
    style={{
      height: "400px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      color: "#333",
    }}
  >
    <span>Loading Section...</span>
  </div>
);

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Global handler to refresh ScrollTrigger after assets load
  useEffect(() => {
    // Refresh after fonts load (handles web font layout shifts)
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    // Refresh after all images load
    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };

    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        // Already loaded
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    // Fallback: Refresh on full window load
    const handleWindowLoad = () => {
      // Delay slightly for any final layout adjustments
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };
    window.addEventListener("load", handleWindowLoad);

    // Cleanup
    return () => {
      images.forEach((img) => img.removeEventListener("load", handleImageLoad));
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  return (
    <>
      <div className="home-container">
        <Header />
        <TextAnimation />
        <h1 className="home-title"></h1>
        <BlurText />
        <BlurText
          text="Metatrybe delivers premium   design and highend web development services for brands that want more than just a website — they want authority, conversions and growth."
          className="home-description"
          animateBy="letters"
          direction="bottom"
          delay={7}
        />
        <div className="home-buttons">
          <ArrowButton
            text="Start Your Project"
            className="start-project-btn arrow-btn"
          />
          <BlueBorderButton
            className="blue-border-btn"
            text="Explore Our Work"
          />
        </div>
        <AnimatedContentUse />
        <div className="home-split-text-container">
          <div className="split-text-intro">
            <SplitText
              text="Achieving measurable impact with global client partners..."
              className="split-intro-text"
              delay={50}
              duration={0.6}
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="left"
            />
          </div>
          <div className="split-divider"></div>
          <div className="split-text-strategy">
            <SplitText
              text="Strategy Before Style"
              className="split-heading"
              tag="h3"
              delay={50}
              duration={0.6}
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="left"
            />
            <SplitText
              text="Every luxury website design starts with clarity. We align business goals, brand identity, and user intent before a single pixel is designed."
              className="split-paragraph"
              delay={30}
              duration={0.5}
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="left"
            />
          </div>
          <div className="split-divider"></div>
          <div className="split-text-design">
            <SplitText
              text="Designed To Convert"
              className="split-heading"
              tag="h3"
              delay={50}
              duration={0.6}
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="left"
            />
            <SplitText
              text="Beautiful is good. High-converting UX is better. Our premium websites guide users seamlessly from first impression to action."
              className="split-paragraph"
              delay={30}
              duration={0.5}
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="left"
            />
          </div>
          <div className="split-divider"></div>
          <div className="split-text-built">
            <SplitText
              text="Built To Scale"
              className="split-heading"
              tag="h3"
              delay={50}
              duration={0.6}
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="left"
            />
            <SplitText
              text="Our web development services are fast, secure, and future-ready — crafted to grow with your business, not limit it."
              className="split-paragraph"
              delay={30}
              duration={0.5}
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="left"
            />
          </div>
        </div>
      </div>
      <HomePageProjects />
      <Comments />
      <Working />
      <ServicesDrawer />
      <Results />
      <React.Suspense fallback={<SectionLoader />}>
        <PremiumAnimation />
        <Footer />
      </React.Suspense>
    </>
  );
};

export default Home;
