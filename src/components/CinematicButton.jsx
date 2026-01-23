import React from "react";
import "./CinematicButton.css";

const ArrowIcon = ({ className }) => (
  <svg
    className={`arrow-icon ${className}`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CinematicButton = ({ text = "Explore", className = "", onClick }) => {
  return (
    <button className={`cinematic-btn ${className}`} onClick={onClick}>
      <span className="cinematic-text">{text}</span>
      <span className="cinematic-arrow-wrapper">
        <ArrowIcon className="arrow-main" />
        <ArrowIcon className="arrow-secondary" />
      </span>
    </button>
  );
};

export default CinematicButton;
