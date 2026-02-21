import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll(
        ".about-cta__heading, .about-cta__sub, .about-cta__button",
      );

      gsap.fromTo(
        els,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-cta" ref={sectionRef}>
      <div className="about-cta__inner">
        <h2 className="about-cta__heading">
          Let's Build Something Exceptional.
        </h2>
        <p className="about-cta__sub">
          Ready to elevate your digital presence? Let's engineer a product that
          sets the standard.
        </p>
        <Link to="/contact-us" className="about-cta__button">
          <span>Get in Touch</span>
          <svg
            className="about-cta__button-arrow"
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
    </section>
  );
};

export default CTASection;
