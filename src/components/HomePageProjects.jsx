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

      // Set initial states
      // Panel 0: Visible, y: 0
      // Others: Invisible, y: 50 (entering from bottom)
      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 50 });
        }
      });

      // Create a timeline connected to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (totalPanels - 1.5)}`, // Reduced scroll length for faster transition
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smooth scrubbing to match PremiumAnimation
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Build the timeline transitions
      // For each panel transition:
      // 1. Current Panel fades out and moves up
      // 2. Next Panel fades in and moves to center
      panels.forEach((panel, i) => {
        if (i < totalPanels - 1) {
          const nextPanel = panels[i + 1];

          tl.add(`step${i}`)
            // Current panel leaves
            .to(
              panel,
              {
                autoAlpha: 0,
                y: -50,
                duration: 1,
                ease: "power1.inOut",
              },
              `step${i}`,
            )
            // Next panel enters
            .to(
              nextPanel,
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power1.inOut",
              },
              `step${i}`,
            ); // Prefer overlapping slightly? Sync is usually fine.

          // Add a small pause/gap? No, continuous is usually smoother.
        }
      });

      // Force refresh
      gsap.delayedCall(0.1, () => ScrollTrigger.refresh());

      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
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
