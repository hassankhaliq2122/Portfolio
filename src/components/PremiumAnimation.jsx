import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PremiumAnimation.css";
import PremiumMan from "../assets/homePage/PremiumMan.png";
import ArrowButton from "./ArrowButton";

gsap.registerPlugin(ScrollTrigger);

import ArrowBlue from "../assets/icons/ArrowBlue.svg";

const PremiumAnimation = () => {
  const containerRef = useRef(null);
  const bgTextRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const gridRef = useRef(null);
  const rippleContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup main timeline attached to ScrollTrigger for Scrollytelling
      // Pinned sequence: The user scrolls "through" the animation.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Start pinning when component hits top of viewport
          end: () => "+=4000", // Dynamic end value for recalculation
          pin: true, // Pin the container
          pinSpacing: true, // Explicit setting
          scrub: 1, // Smooth scrubbing based on scroll position
          anticipatePin: 1, // Avoid pin jitter
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true, // Recalculate on resize
          // CRITICAL FIX: Lock the timeline state when leaving/re-entering
          onLeave: (self) => {
            // Force timeline to 100% when leaving to prevent "catch-up" replay
            self.animation.progress(1);
          },
          onLeaveBack: (self) => {
            // Force timeline to 0% when leaving backwards
            self.animation.progress(0);
          },
          onEnter: (self) => {
            // Ensure correct state when entering
            self.animation.progress(0);
          },
          onEnterBack: (self) => {
            // Ensure correct state when re-entering from below
            self.animation.progress(1);
          },
          // markers: true, // debug
        },
      });

      // Initial States:
      // Ensure everything starts hidden or in initial position so we can animate them in.
      // (CSS has opacity: 0 for these elements, so we are good to go)

      // 1. "Gradient fully enters screen"
      // Since we pin at "top top", the gradient background (which is the container)
      // will be filling the screen. The ripple effect (grid) is always there.
      // If we want a specific "filling" feeling beyond just scrolling into view,
      // we could scale the container or background, but standard behavior aligns
      // with "when user reaches this section he sees only gradient".

      // Let's add a small pause or "nothing happens" at the start so the user
      // just sees the gradient for a moment before elements appear.
      tl.addLabel("start");

      // 2. "He scrolls further 'PREMIUM' fades in"
      tl.fromTo(
        bgTextRef.current,
        { opacity: 0, scale: 0.5, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" },
        "+=0.5", // Small delay after pinning
      );

      // 3. "Scrolls further pic of man fades in"
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" },
        "+=0.5", // Gap between text and image
      );

      // 4. "Our text fade in"
      // Stagger the foreground content (Headings, P, Button)
      const contentElements = contentRef.current.children;
      tl.fromTo(
        contentElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2, // Stagger intervals
          ease: "power2.out",
        },
        "+=0.5", // Gap between image and text
      );

      // Continuous Ripple Effect for Grid (Independent of scroll position, runs constantly)
      gsap.to(".grid-background", {
        backgroundPosition: "50px 50px",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });

      // IMPORTANT: Refresh AFTER timeline is fully defined
      // Use a small delay to ensure React has finished rendering
      gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleRippleClick = (e) => {
    if (!rippleContainerRef.current) return;

    const rect = rippleContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create ripple element
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Size of ripple (make it relatively large to be visible)
    const size = 100;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.marginLeft = `-${size / 2}px`; // Center it on click
    ripple.style.marginTop = `-${size / 2}px`;

    rippleContainerRef.current.appendChild(ripple);

    // Animate ripple
    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 0.6 },
      {
        scale: 10, // Expand significantly
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        },
      },
    );
  };

  // Helper to generate grid boxes for ripple effect (optional visual enhancement)
  // For performance, ensuring we don't render too many if they aren't strictly needed for the static grid lines.
  // But user asked for "small boxes we will use ripple effect there".
  // Let's implement the visual grid lines in CSS and creating a ripple overlay if needed.
  // The CSS implementation handles the grid lines.

  return (
    <div className="premium-animation-container" ref={containerRef}>
      {/* Grid Background */}
      <div className="grid-background" ref={gridRef}></div>

      {/* Click Interaction Layer */}
      <div
        className="ripple-container"
        ref={rippleContainerRef}
        onClick={handleRippleClick}
      ></div>

      {/* Background Text */}
      <div className="premium-bg-text-container">
        <h1 className="premium-bg-text" ref={bgTextRef}>
          PREMIUM
        </h1>
      </div>

      {/* Main Image */}
      <div className="premium-image-container">
        <img
          src={PremiumMan}
          alt="Premium Man"
          className="premium-image"
          ref={imageRef}
          style={{ width: "800px", height: "800px" }}
        />
      </div>

      {/* Foreground Content */}
      <div className="premium-content" ref={contentRef}>
        <h1>Upgrade To A</h1>
        <h1>Premium Website Experience</h1>
        <p>
          If your brand deserves better than average, let’s build something
          premium, strategic, and designed to perform at the highest level.
        </p>
        <div className="arrow-btn-wrapper">
          <ArrowButton
            text="Contact Us"
            style={{ background: "#FFFFFF", color: "#2C65E1" }}
            icon={ArrowBlue}
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumAnimation;
