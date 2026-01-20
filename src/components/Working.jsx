import React from "react";
import "./Working.css";
import ScrollReveal from "../JsrepoComponents/ScrollReveal";
import ArrowButton from "./ArrowButton";

const Working = () => {
  return (
    <div className="working-section">
      <div className="working-container">
        {/* Left Column */}
        <div className="working-col working-left">
          <div className="working-header-wrapper">
            <ScrollReveal textClassName="working-main-title">
              Who We Are Working With Currently
            </ScrollReveal>
          </div>
          <div className="working-content-wrapper">
            <ScrollReveal textClassName="working-text">
              At Metatrybe, we don't design for trends — we design for impact.
            </ScrollReveal>
            <ScrollReveal textClassName="working-text">
              Our premium web design and development process blends strategy,
              creativity, and technology to create digital experiences that feel
              exclusive, intentional, and results-driven.
            </ScrollReveal>
          </div>
        </div>

        {/* Middle Column */}
        <div className="working-col working-mid">
          <div className="working-header-wrapper">
            <ScrollReveal textClassName="working-sub-title">
              AGGD Corporation
            </ScrollReveal>
          </div>
          <div className="working-content-wrapper spacer-top">
            <ScrollReveal textClassName="working-text">
              We are currently designing and developing a premium,
              enterprise-level website for AGGD Corporation, focused on clarity,
              credibility, and performance.
            </ScrollReveal>
            <ScrollReveal textClassName="working-text">
              The project is crafted to reflect the brand's scale and vision
              through luxury UI, strategic UX, and high-performance web
              development, aligned precisely with the client's expectations and
              business goals.
            </ScrollReveal>
          </div>
        </div>

        {/* Right Column */}
        <div className="working-col working-right">
          <div className="working-header-wrapper">
            <ScrollReveal textClassName="working-sub-title">
              Elysea Health
            </ScrollReveal>
          </div>
          <div className="working-content-wrapper">
            <ScrollReveal textClassName="working-text">
              For Elysea Health, we're building a premium healthcare website
              experience that balances trust, elegance, and usability.
            </ScrollReveal>
            <ScrollReveal textClassName="working-text">
              Our team is delivering a luxury, user-centric website with refined
              design and robust development — tailored to meet strict industry
              standards while exceeding the client's expectations for quality
              and impact.
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="working-footer">
        <ArrowButton text="Contact Us" enableStarBorder={true} />
      </div>
    </div>
  );
};

export default Working;
