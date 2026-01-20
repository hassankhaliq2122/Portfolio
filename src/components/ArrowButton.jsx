import React from "react";
import arrow from "../assets/icons/arrow.png";

const ArrowButton = ({ text, className = "", style, icon }) => {
  return (
    <button
      style={{
        fontSize: "clamp(13px, 2vw, 15px)",
        fontWeight: 600,
        color: "#FFFFFF",
        background: "radial-gradient(circle, #36A5FF, #2C65E1)",
        borderRadius: "8px",
        minWidth: "140px",
        maxWidth: "165px",
        width: "auto",
        height: "48px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "0 16px",
        flexShrink: 0,
        ...style,
      }}
      className={className}
    >
      <span>{text}</span>
      <img
        src={icon || arrow}
        alt="Arrow"
        style={{ width: "36px", height: "36px" }}
      />
    </button>
  );
};

export default ArrowButton;
