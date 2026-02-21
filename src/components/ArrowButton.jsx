import React from "react";
import { useNavigate } from "react-router-dom";
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
  link,
}) => {
  const navigate = useNavigate();
  const arrowSrc = icon || arrow;

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (link) navigate(link);
  };

  return (
    <button
      className={`arrow-btn ${className}`}
      style={{ ...style, ...innerStyle }}
      onClick={handleClick}
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
