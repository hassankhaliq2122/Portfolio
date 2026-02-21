import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import InteractiveGlobe from "./InteractiveGlobe";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (!heading) return;
      const text = heading.textContent;
      heading.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span class="word"><span class="word-inner">${word}</span></span> `,
        )
        .join("");

      const wordInners = heading.querySelectorAll(".word-inner");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        wordInners,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 },
      )
        .fromTo(
          labelRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.5",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5",
        );

      // Globe entrance
      gsap.fromTo(
        ".about-hero__globe-wrap",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-hero" ref={sectionRef}>
      <div className="about-hero__content">
        <div className="about-hero__text">
          <p className="about-hero__label" ref={labelRef}>
            Digital Engineering Studio
          </p>
          <h1 className="about-hero__heading" ref={headingRef}>
            Engineering Premium Digital Experiences.
          </h1>
          <p className="about-hero__sub" ref={subRef}>
            We build high-performance websites and SaaS platforms for brands
            that refuse to look ordinary.
          </p>
          <Link to="/contact-us" className="about-hero__cta" ref={ctaRef}>
            <span>Start a Project</span>
            <svg
              className="about-hero__cta-arrow"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="about-hero__globe-wrap">
          <div className="about-hero__globe-label">
            <span className="about-hero__globe-label-dot" />
            Our Global Clients
          </div>
          <div className="about-hero__globe-container">
            <InteractiveGlobe />
          </div>
          <div className="about-hero__globe-stats">
            <div className="about-hero__globe-stat">
              <span className="about-hero__globe-stat-num">10+</span>
              <span className="about-hero__globe-stat-label">Countries</span>
            </div>
            <div className="about-hero__globe-stat-divider" />
            <div className="about-hero__globe-stat">
              <span className="about-hero__globe-stat-num">50+</span>
              <span className="about-hero__globe-stat-label">Projects</span>
            </div>
            <div className="about-hero__globe-stat-divider" />
            <div className="about-hero__globe-stat">
              <span className="about-hero__globe-stat-num">99%</span>
              <span className="about-hero__globe-stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
