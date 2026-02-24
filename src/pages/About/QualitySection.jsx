import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const qualities = [
  {
    num: "01",
    title: "Performance-First Philosophy",
    desc: "Every line of code is benchmarked. We engineer for sub-second load times, smooth 60fps interactions, and Core Web Vitals excellence.",
  },
  {
    num: "02",
    title: "Clean Architecture",
    desc: "Modular, maintainable codebases built with scalable patterns. No technical debt. No shortcuts. Every system is production-grade from day one.",
  },
  {
    num: "03",
    title: "International Standards",
    desc: "We adhere to WCAG accessibility guidelines, SEO best practices, and global security standards — building products that perform worldwide.",
  },
  {
    num: "04",
    title: "Business-Driven Approach",
    desc: "Technology serves strategy. Every decision maps to business KPIs — from conversion rates and user engagement to brand positioning and revenue growth.",
  },
];

const QualitySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current.querySelector(".about-quality__header");
      const blocks = sectionRef.current.querySelectorAll(
        ".about-quality__block",
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

      blocks.forEach((block, i) => {
        gsap.fromTo(
          block,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none none",
              onEnter: () => block.classList.add("is-visible"),
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-quality" ref={sectionRef}>
      <div className="about-quality__inner">
        <div className="about-quality__header">
          <h2 className="about-quality__title">Proof of Quality</h2>
        </div>
        <div className="about-quality__grid">
          {qualities.map((item, index) => (
            <div key={index} className="about-quality__block">
              <div className="about-quality__block-num">{item.num}</div>
              <h3 className="about-quality__block-title">{item.title}</h3>
              <p className="about-quality__block-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
