import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import StarBorder from "../JsrepoComponents/StarBorder";

const BlueBorderButton = ({ text, onClick, className = "", style }) => {
  const sliderRef = useRef(null);

  // Determine target index based on text
  // 0 = Menu, 1 = Exit.
  // If text is neither, default to Menu behavior or just display text statically?
  // User keeps switching between "Menu" and "Exit", so let's optimize for that.
  const isExit = text === "Exit";
  const isToggle = text === "Menu" || text === "Exit";

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        y: isExit ? "-50%" : "0%",
        duration: 0.5,
        ease: "power2.inOut", // Smooth ease for rotation feel
      });
    }
  }, [isExit]);

  return (
    <StarBorder
      as="button"
      onClick={onClick}
      className={className}
      color="cyan"
      speed="5s"
      innerStyle={{
        background: "transparent",
        color: "#2C65E1",
        padding: "0 12px", // Override StarBorder default
        height: "48px", // Restore original height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
      }}
      style={{
        fontSize: "clamp(14px, 2vw, 18px)",
        backgroundColor: "transparent", // Outer container too just in case
        fontWeight: "600",
        color: "#2C65E1",
        // border: "2px solid #2C65E1", // Removed manual border
        // borderRadius: "8px", // StarBorder uses 20px
        minWidth: "65px",
        maxWidth: "75px",
        width: "auto",
        height: "auto",
        cursor: "pointer",
        flexShrink: 0,
        ...style,
      }}
    >
      {!isToggle && <span>{text}</span>}
      {isToggle && (
        <div
          style={{
            height: "1.2em",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: "1.2em",
            position: "relative",
          }}
        >
          <div
            ref={sliderRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              willChange: "transform",
            }}
          >
            {/* Static rendering of both options for the toggle animation */}
            <span style={{ display: "block", height: "1.2em" }}>Menu</span>
            <span style={{ display: "block", height: "1.2em" }}>Exit</span>
          </div>
        </div>
      )}
    </StarBorder>
  );
};

export default BlueBorderButton;
