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
    slug: "darbpay",
    title: "Premium Business Website — Darbpay",
    description:
      "A luxury fintech website experience built to inspire trust, simplify complex ideas, and drive high-value conversions through premium UI and performance-led development.",
    imageSrc: Laptop1,
  },
  {
    id: 2,
    number: "02",
    slug: "rozee-digital",
    title: "Rozee Digital Agency — Agency Website",
    description:
      "A bold and modern premium agency website designed to showcase expertise, build authority, and convert visitors into qualified leads through refined UI and strategic UX.",
    imageSrc: Laptop2,
  },
  {
    id: 3,
    number: "03",
    slug: "vfairco",
    title: "vFairCo — SaaS Website",
    description:
      "A conversion-focused premium SaaS website crafted to clearly communicate value, simplify complex features, and drive product adoption with clean design and scalable development.",
    imageSrc: Laptop3,
  },
  {
    id: 4,
    number: "04",
    slug: "appforshare",
    title: "AppForShare — App Platform Website",
    description:
      "A sleek and intuitive premium app platform website built to highlight functionality, enhance user trust, and support growth through performance-driven design and development.",
    imageSrc: Laptop4,
  },
];

const HomePageProjects = () => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(
    () => {
      // Don't run GSAP animations on mobile
      if (isMobile) {
        // On mobile, show all panels stacked
        const panels = panelsRef.current.filter(Boolean);
        panels.forEach((panel) => {
          gsap.set(panel, {
            autoAlpha: 1,
            y: 0,
            position: "relative",
            opacity: 1,
          });
        });

        // Kill any existing ScrollTrigger
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        return;
      }

      const panels = panelsRef.current.filter(Boolean);
      const totalPanels = panels.length;

      // Set initial states for desktop
      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 50 });
        }
      });

      // Create timeline for desktop
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (totalPanels - 1.5)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Build desktop transitions
      panels.forEach((panel, i) => {
        if (i < totalPanels - 1) {
          const nextPanel = panels[i + 1];
          tl.add(`step${i}`)
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
            .to(
              nextPanel,
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power1.inOut",
              },
              `step${i}`,
            );
        }
      });

      gsap.delayedCall(0.1, () => ScrollTrigger.refresh());

      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [isMobile] },
  );

  return (
    <div
      ref={containerRef}
      className={`work-delivered-wrapper ${isMobile ? "mobile-view" : ""}`}
    >
      <div className="static-header">
        <h1>Work We've Delivered</h1>
        <p>
          A curated selection of premium and luxury website projects crafted to
          elevate brands, drive engagement, and deliver measurable impact.
        </p>
      </div>

      <div className={`projects-stack ${isMobile ? "mobile-stack" : ""}`}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-panel ${isMobile ? "mobile-panel" : ""}`}
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
                  className="case-study-btn"
                  link={`/work/${project.slug}`}
                />
              </div>
            </div>

            {/* Footer - Hidden on mobile */}
            {!isMobile && (
              <div className="project-footer">
                <span className="page-indicator">
                  [{project.number}/
                  {projects.length.toString().padStart(2, "0")}]
                </span>
                <div className="view-all">VIEW ALL PROJECTS ↗</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile navigation indicator */}
      {isMobile && (
        <div className="mobile-navigation">
          <div className="mobile-indicator">
            {projects.map((_, index) => (
              <div key={index} className="indicator-dot"></div>
            ))}
          </div>
          <div className="view-all-mobile">VIEW ALL PROJECTS ↗</div>
        </div>
      )}
    </div>
  );
};

export default HomePageProjects;
