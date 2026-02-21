import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTransition } from "../context/TransitionContext";

const TransitionLink = ({ to, children, className, ...props }) => {
  const { triggerTransition } = useTransition();
  const location = useLocation();

  const handleClick = (e) => {
    // Call the original onClick if provided (e.g. to close a menu)
    if (props.onClick) props.onClick(e);

    // If we are already on the page, let it be
    if (location.pathname === to) return;

    e.preventDefault();
    triggerTransition(to);
  };

  return (
    <Link to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
