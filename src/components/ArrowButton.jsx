import React from "react";
import arrow from "../assets/icons/arrow.svg";
import arrowBlue from "../assets/icons/ArrowBlue.svg";
import "./ArrowButton.css";

const ArrowButton = ({
  text,
  className = "",
  style,
  innerStyle,
  icon,
  onClick,
}) => {
  const arrowSrc = icon || arrow;

  return (
    <button
      className={`arrow-btn ${className}`}
      style={{ ...style, ...innerStyle }}
      onClick={onClick}
    >
      <span className="arrow-btn-text">{text}</span>
      <span className="arrow-btn-wrapper">
        <img src={arrowSrc} alt="" className="arrow-btn-icon arrow-main" />
        <img src={arrowSrc} alt="" className="arrow-btn-icon arrow-secondary" />
      </span>
    </button>
  );
};

export default ArrowButton;
