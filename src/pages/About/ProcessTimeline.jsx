import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding goals & scope" },
  { num: "02", title: "Strategy", desc: "Defining the blueprint" },
  { num: "03", title: "Architecture", desc: "Engineering the foundation" },
  { num: "04", title: "Development", desc: "Building with precision" },
  { num: "05", title: "Optimization", desc: "Performance & refinement" },
  { num: "06", title: "Deployment", desc: "Launch & continuous support" },
];

const ProcessTimeline = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current.querySelector(".about-process__header");
      const stepEls = sectionRef.current.querySelectorAll(
        ".about-process__step",
      );

      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
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

      // Progress line animation
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });
      }

      // Steps reveal sequentially
      stepEls.forEach((step, i) => {
        gsap.to(step, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top ${70 - i * 5}%`,
            toggleActions: "play none none none",
          },
          onComplete: () => step.classList.add("is-active"),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-process" ref={sectionRef}>
      <div className="about-process__inner">
        <div className="about-process__header">
          <h2 className="about-process__title">Engineering Standard</h2>
        </div>
        <div className="about-process__timeline">
          <div className="about-process__track">
            <div className="about-process__progress" ref={progressRef} />
          </div>
          {steps.map((step, index) => (
            <div key={index} className="about-process__step">
              <div className="about-process__dot" />
              <span className="about-process__step-num">{step.num}</span>
              <span className="about-process__step-title">{step.title}</span>
              <span className="about-process__step-desc">{step.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
