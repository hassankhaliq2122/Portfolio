import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowButton from "../../components/ArrowButton";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll(
        ".about-cta__heading, .about-cta__sub, .arrow-btn",
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
        <ArrowButton link="/contact-us" text="Get in Touch" />
      </div>
    </section>
  );
};

export default CTASection;
