import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./HorizontalSections.css";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 1,
    title: "Section One",
    subtitle: "Your subtitle here",
    description: "Add your content for section one here. You can change this text later.",
    bgColor: "#111"
  },
  {
    id: 2,
    title: "Section Two",
    subtitle: "Your subtitle here",
    description: "Add your content for section two here. You can change this text later.",
    bgColor: "#1a1a1a"
  },
  {
    id: 3,
    title: "Section Three",
    subtitle: "Your subtitle here",
    description: "Add your content for section three here. You can change this text later.",
    bgColor: "#222"
  }
];

const HorizontalSections = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    
    const totalWidth = wrapper.scrollWidth - window.innerWidth;
    
    gsap.to(wrapper, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="horizontal-container">
      <div ref={wrapperRef} className="horizontal-wrapper">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className="horizontal-section"
            style={{ backgroundColor: section.bgColor }}
          >
            <div className="section-content">
              <span className="section-label">{section.subtitle}</span>
              <h2 className="section-title">{section.title}</h2>
              <p className="section-desc">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSections;
