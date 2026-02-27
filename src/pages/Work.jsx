import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Use regular Link since TransitionLink might need context
import { gsap } from "gsap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Mid_comp from "../components/Midcomp";
import { useProjects } from "../context/ProjectContext";
import TransitionLink from "../components/TransitionLink";
import "../components/ProjectCard.css"; // Shared card styles
import "./Work.css";

const Work = () => {
  const { projects, loading } = useProjects();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      // Simple fade-in animation for cards
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2,
        },
      );
    }
  }, [loading, projects]);

  return (
    <>
      <Header />
      <div className="work-page-container" ref={containerRef}>
        <div className="work-header">
          <h1 className="work-title">
            Measurable Growth <br /> For Global Brands
          </h1>
          <p className="work-description">
            Premium design and innovation that turn vision into results.
          </p>
        </div>

        {loading ? (
          <div className="work-loading">Loading projects...</div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <TransitionLink
                key={project._id}
                to={`/work/${project.slug}`}
                className="project-card"
              >
                <div className="project-image-container">
                  {project.heroImage ? (
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="project-image"
                    />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                </div>
                <div className="project-info">
                  <div className="project-text">
                    <h3 className="project-card-title">
                      {project.industry || "Featured Project"} — {project.title}
                    </h3>
                    <p className="project-card-desc">{project.description}</p>
                  </div>
                  <div className="project-journey-btn">
                    <span>See Project Journey</span>
                    <div className="btn-arrow"></div>
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        )}
      </div>
      <Mid_comp />
      <Footer />
    </>
  );
};

export default Work;
