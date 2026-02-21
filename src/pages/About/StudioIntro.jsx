import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StudioIntro = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = sectionRef.current.querySelector(".about-studio__label");
      const text = sectionRef.current.querySelector(".about-studio__text");

      gsap.fromTo(
        label,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Split text into lines for stagger reveal
      const words = text.textContent.split(" ");
      text.innerHTML = words
        .map(
          (word) =>
            `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block" class="studio-word">${word}</span></span>`,
        )
        .join(" ");

      gsap.fromTo(
        text.querySelectorAll(".studio-word"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.015,
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
    <section className="about-studio" ref={sectionRef}>
      <div className="about-studio__inner">
        <p className="about-studio__label">Who We Are</p>
        <p className="about-studio__text">
          We are a premium web engineering agency focused on performance,
          scalability, and precision execution. Every system we build is
          designed to elevate brand authority and drive measurable business
          results.
        </p>
      </div>
    </section>
  );
};

export default StudioIntro;
