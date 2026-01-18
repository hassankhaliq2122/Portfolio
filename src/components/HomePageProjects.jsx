import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./HomePageProjects.css";
import TiltedCardUse from "./TiltedCardUse";
import ArrowButton from "./ArrowButton";
import Laptop1 from "../assets/homePage/Laptop1.png";
import Laptop2 from "../assets/homePage/Laptop2.png";
import Laptop3 from "../assets/homePage/Laptop3.png";
import Laptop4 from "../assets/homePage/Laptop4.png";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    number: "01",
    title: "Premium Business Website — Darbpay",
    description:
      "A luxury fintech website experience built to inspire trust, simplify complex ideas, and drive high-value conversions through premium UI and performance-led development.",
    imageSrc: Laptop1,
  },
  {
    id: 2,
    number: "02",
    title: "Rozee Digital Agency — Agency Website",
    description:
      "A bold and modern premium agency website designed to showcase expertise, build authority, and convert visitors into qualified leads through refined UI and strategic UX.",
    imageSrc: Laptop2,
  },
  {
    id: 3,
    number: "03",
    title: "vFairCo — SaaS Website",
    description:
      "A conversion-focused premium SaaS website crafted to clearly communicate value, simplify complex features, and drive product adoption with clean design and scalable development.",
    imageSrc: Laptop3,
  },
  {
    id: 4,
    number: "04",
    title: "AppForShare — App Platform Website",
    description:
      "A sleek and intuitive premium app platform website built to highlight functionality, enhance user trust, and support growth through performance-driven design and development.",
    imageSrc: Laptop4,
  },
];

const HomePageProjects = () => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useGSAP(
    () => {
      const panels = panelsRef.current.filter(Boolean);
      const totalPanels = panels.length;

      // Set all panels except first to invisible initially
      panels.forEach((panel, i) => {
        if (i > 0) {
          gsap.set(panel, { autoAlpha: 0, y: 30 });
        }
      });

      // Create the main pinned scroll trigger
      // Using functional end value and invalidateOnRefresh for production stability

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalPanels - 1)}`,
        pin: true,
        scrub: 0.5, // 0.5s smoothing
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
        invalidateOnRefresh: true, // Recalculate values on resize/refresh
        onUpdate: (self) => {
          const progress = self.progress;
          const currentIndex = Math.min(
            Math.floor(progress * totalPanels),
            totalPanels - 1,
          );

          // Show/hide panels based on scroll progress
          panels.forEach((panel, i) => {
            if (i === currentIndex) {
              gsap.to(panel, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                overwrite: true,
              });
            } else {
              gsap.to(panel, {
                autoAlpha: 0,
                y: i < currentIndex ? -30 : 30,
                duration: 0.5,
                overwrite: true,
              });
            }
          });
        },
      });

      // Force refresh after mount to handle potential layout shifts
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="work-delivered-wrapper">
      <div className="static-header">
        <h1>Work We’ve Delivered</h1>
        <p>
          A curated selection of premium and luxury website projects crafted to
          elevate brands, drive engagement, and deliver measurable impact.
        </p>
      </div>

      <div className="projects-stack">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-panel"
            ref={(el) => (panelsRef.current[index] = el)}
          >
            <div className="project-grid">
              <div className="col-left">
                <span className="project-number">Project {project.number}</span>
                <h2 className="project-title">{project.title}</h2>
              </div>

              <div className="col-center">
                <TiltedCardUse imageSrc={project.imageSrc} />
              </div>

              <div className="col-right">
                <p className="project-desc">{project.description}</p>
                <ArrowButton
                  text="View Full Case Study"
                  style={{ maxWidth: "280px", width: "auto" }}
                />
              </div>
            </div>
            {/* Visual Progress / Controls (Visual only) */}
            <div className="project-footer">
              <span className="page-indicator">
                [{project.number}/{projects.length.toString().padStart(2, "0")}]
              </span>
              <div className="nav-arrows">{/* Icons could go here */}</div>
              <div className="view-all">VIEW ALL PROJECTS ↗</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageProjects;
