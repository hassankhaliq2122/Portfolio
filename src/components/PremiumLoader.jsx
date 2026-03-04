import React, { useEffect, useRef, useState } from "react";
import "./PremiumLoader.css";
import preloaderSvg from "../assets/logo/PreLoader.svg";

const PremiumLoader = ({ onComplete }) => {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const taglineRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Counter animation: 0 → 100 over 2.8s
    let start = null;
    const duration = 2800;

    const animateCounter = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(eased * 100);
      setCount(value);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${eased * 100}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    const rafId = requestAnimationFrame(animateCounter);

    // Logo entrance: fade + scale in
    if (logoRef.current) {
      logoRef.current.style.opacity = "0";
      logoRef.current.style.transform = "scale(0.7) translateY(20px)";
      setTimeout(() => {
        if (logoRef.current) {
          logoRef.current.style.transition =
            "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
          logoRef.current.style.opacity = "1";
          logoRef.current.style.transform = "scale(1) translateY(0)";
        }
      }, 100);
    }

    // Tagline entrance
    if (taglineRef.current) {
      taglineRef.current.style.opacity = "0";
      taglineRef.current.style.transform = "translateY(16px)";
      setTimeout(() => {
        if (taglineRef.current) {
          taglineRef.current.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
          taglineRef.current.style.opacity = "1";
          taglineRef.current.style.transform = "translateY(0)";
        }
      }, 600);
    }

    // Exit animation after counter finishes
    const exitTimer = setTimeout(() => {
      if (!wrapperRef.current) return;

      // Slide up reveal
      const wrapper = wrapperRef.current;
      const overlay = overlayRef.current;

      if (overlay) {
        overlay.style.transition =
          "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)";
        overlay.style.transform = "scaleY(1)";
        overlay.style.transformOrigin = "top";
      }

      setTimeout(() => {
        if (wrapper) {
          wrapper.style.transition =
            "opacity 0.5s ease, transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";
          wrapper.style.opacity = "0";
          wrapper.style.transform = "translateY(-8px)";
        }
      }, 200);

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 750);
    }, duration + 300);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className="svgl-wrapper" ref={wrapperRef}>
      {/* Ambient glow orbs */}
      <div className="svgl-orb svgl-orb--1" />
      <div className="svgl-orb svgl-orb--2" />
      <div className="svgl-orb svgl-orb--3" />

      {/* Noise grain overlay */}
      <div className="svgl-noise" />

      {/* Slide-up reveal overlay */}
      <div className="svgl-reveal-overlay" ref={overlayRef} />

      {/* Main content */}
      <div className="svgl-content">
        {/* Logo */}
        <div className="svgl-logo-wrap" ref={logoRef}>
          <img
            src={preloaderSvg}
            alt="Loading..."
            className="svgl-logo-img"
            draggable={false}
          />
        </div>

        {/* Tagline */}
        <p className="svgl-tagline" ref={taglineRef}>
          Crafting digital experiences
        </p>

        {/* Progress section */}
        <div className="svgl-progress-section">
          <div className="svgl-progress-track">
            <div className="svgl-progress-bar" ref={progressBarRef} />
          </div>
          <div className="svgl-counter-row">
            <span className="svgl-counter" ref={counterRef}>
              {count}
            </span>
            <span className="svgl-counter-pct">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoader;
