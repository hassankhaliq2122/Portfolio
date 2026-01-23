import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SmoothScroll.css";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const circleRef = useRef(null);
  const lenisRef = useRef(null);

  // SVG Configuration
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Circular Progress Animation
    const updateProgress = () => {
      if (circleRef.current) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;

        // Calculate stroke offset
        // offset = circumference - (progress * circumference)
        const offset = circumference - progress * circumference;

        gsap.to(circleRef.current, {
          strokeDashoffset: offset,
          duration: 0.1, // Smooth updates
          ease: "none",
          overwrite: true,
        });
      }
    };

    lenis.on("scroll", updateProgress);
    updateProgress(); // Initial call

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [circumference]);

  return (
    <>
      {/* Circular Progress Indicator */}
      <div className="scroll-progress-circle">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          style={{ overflow: "visible" }}
        >
          {/* Background Circle */}
          <circle className="progress-ring__bg" cx="25" cy="25" r={radius} />
          {/* Progress Circle */}
          <circle
            ref={circleRef}
            className="progress-ring__circle"
            cx="25"
            cy="25"
            r={radius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference}
          />
        </svg>
      </div>
      {children}
    </>
  );
};

export default SmoothScroll;
