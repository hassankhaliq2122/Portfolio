import React from "react";
import arrow from "../assets/icons/arrow.png";
import StarBorder from "../JsrepoComponents/StarBorder";

const ArrowButton = ({ text, className = "", style, icon }) => {
  return (
    <StarBorder
      as="button"
      className={className}
      color="cyan"
      speed="5s"
      innerStyle={{
        background: "radial-gradient(circle, #36A5FF, #2C65E1)",
        color: "#FFFFFF",
        padding: "0 16px", // Override StarBorder default
        height: "48px", // Restore original height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px", // Match StarBorder radius or keep 8px? StarBorder has 20px radius on container.
      }}
      style={{
        // Remove background to use StarBorder's black bg
        // background: "radial-gradient(circle, #36A5FF, #2C65E1)",
        // borderRadius: "8px", // StarBorder uses 20px
        fontSize: "clamp(13px, 2vw, 15px)",
        fontWeight: 600,
        minWidth: "140px",
        maxWidth: "165px",
        width: "auto",
        height: "auto", // Let padding define height or keep fixed? StarBorder has padding.
        border: "none",
        cursor: "pointer",
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <span>{text}</span>
        <img
          src={icon || arrow}
          alt="Arrow"
          style={{ width: "22px", height: "22px" }} // Reduced from 36px
        />
      </div>
    </StarBorder>
  );
};

export default ArrowButton;
