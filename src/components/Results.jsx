import React from "react";
import "./Results.css";
import CountUpUse from "./CountUpUse";
import GlowingBorderWrapper from "./ui/GlowingBorder";

const Results = () => {
  return (
    <div className="results-container">
      <div className="resultsLeft">
        <h1>Proven Result</h1>
        <div className="results-inline-wrapper">
          <h1>Powerful Impact.</h1>
          <p>In Service For Premium Brands Over The Globe</p>
        </div>
      </div>
      <div className="resultBoxes">
        <GlowingBorderWrapper>
          <div className="box box1 glow-border">
            <CountUpUse className="count-up-text" text="92%" />
            <p>Customer Satisfaction</p>
          </div>

          <div className="box box2 glow-border">
            <CountUpUse className="count-up-text" text="3x" />
            <p>Higher Engagement Rates</p>
          </div>

          <div className="box box3 glow-border">
            <CountUpUse className="count-up-text" text="96%" />
            <p>On-Time Project Delivery</p>
          </div>

          <div className="box box4 glow-border">
            <CountUpUse className="count-up-text" text="5x" />
            <p>Fast Loading Websites</p>
          </div>
        </GlowingBorderWrapper>
      </div>
    </div>
  );
};

export default Results;
