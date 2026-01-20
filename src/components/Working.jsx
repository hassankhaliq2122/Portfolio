import React from "react";
import "./Working.css";
// import ScrollReveal from "../JsrepoComponents/ScrollReveal";
import AnimatedContent from "./ui/AnimatedContent";
import ArrowButton from "./ArrowButton";

const Working = () => {
  const animationProps = {
    direction: "vertical",
    distance: 50,
    duration: 1,
    delay: 0.5,
    initialOpacity: 0,
    scale: 1,
    threshold: 0.1,
    disappearAfter: 0,
    disappearDuration: 0.5,
    ease: "power3.out",
    disappearEase: "power3.in",
  };

  return (
    <div className="working-section">
      <div className="working-container">
        {/* Left Column */}
        <div className="working-col working-left">
          <div className="working-header-wrapper">
            <AnimatedContent {...animationProps}>
              <h2 className="working-main-title">
                {`Who We Are\nWorking With\nCurrently`}
              </h2>
            </AnimatedContent>
          </div>
          <div className="working-content-wrapper">
            <AnimatedContent {...animationProps}>
              <p className="working-text">
                At Metatrybe, we don’t design for trends — we design for impact.
              </p>
            </AnimatedContent>
            <AnimatedContent {...animationProps}>
              <p className="working-text">
                Our premium web design and development process blends strategy,
                creativity, and technology to create digital experiences that
                feel exclusive, intentional, and results-driven.
              </p>
            </AnimatedContent>
          </div>
        </div>

        {/* Middle Column */}
        <div className="working-col working-mid">
          <div className="working-header-wrapper">
            <AnimatedContent {...animationProps}>
              <h3 className="working-sub-title">AGGD Corporation</h3>
            </AnimatedContent>
          </div>
          <div className="working-content-wrapper spacer-top">
            <AnimatedContent {...animationProps}>
              <p className="working-text">
                We are currently designing and developing a premium,
                enterprise-level website for AGGD Corporation, focused on
                clarity, credibility, and performance.
              </p>
            </AnimatedContent>
            <AnimatedContent {...animationProps}>
              <p className="working-text">
                The project is crafted to reflect the brand’s scale and vision
                through luxury UI, strategic UX, and high-performance web
                development, aligned precisely with the client’s expectations
                and business goals.
              </p>
            </AnimatedContent>
          </div>
        </div>

        {/* Right Column */}
        <div className="working-col working-right">
          <div className="working-header-wrapper">
            <AnimatedContent {...animationProps}>
              <h3 className="working-sub-title">Elysea Health</h3>
            </AnimatedContent>
          </div>
          <div className="working-content-wrapper">
            <AnimatedContent {...animationProps}>
              <p className="working-text">
                For Elysea Health, we’re building a premium healthcare website
                experience that balances trust, elegance, and usability.
              </p>
            </AnimatedContent>
            <AnimatedContent {...animationProps}>
              <p className="working-text">
                Our team is delivering a luxury, user-centric website with
                refined design and robust development — tailored to meet strict
                industry standards while exceeding the client’s expectations for
                quality and impact.
              </p>
            </AnimatedContent>
          </div>
        </div>
      </div>

      <div className="working-footer">
        <ArrowButton text="Contact Us" />
      </div>
    </div>
  );
};

export default Working;
