import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Mid_comp from "../components/Midcomp";
import { useProjects } from "../context/ProjectContext";
import ArrowButton from "../components/ArrowButton";
import "../components/ProjectCard.css"; // Shared card styles
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { getProjectBySlug, projects } = useProjects();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      const data = await getProjectBySlug(slug);
      setProject(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };

    if (slug) {
      loadProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="project-detail-container">
        <Header />
        <div className="project-loading">Loading Case Study...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-container">
        <Header />
        <div className="project-error">Project not found.</div>
      </div>
    );
  }

  const otherProjects = projects
    .filter((p) => p._id !== project._id)
    .slice(0, 2);

  // Format Date
  const dateStr = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="project-page-wrapper">
      <Header />
      <div className="project-detail-container">
        {/* 1. Header */}
        <div className="project-header">
          <h1 className="project-title">{project.title}</h1>
          <p className="project-subtitle">{project.description}</p>
        </div>

        {/* 2. Hero Image */}
        {/* 2. Hero Image & Live Link */}
        <div
          className="project-hero-image-wrapper"
          style={{ flexDirection: "column", alignItems: "center", gap: "40px" }}
        >
          {project.heroImage && (
            <img
              src={project.heroImage}
              alt="Project Hero"
              className="project-hero-image"
              width="1400"
              height="800"
            />
          )}

          {project.liveUrl && (
            <ArrowButton
              text="View Live Project"
              onClick={() => window.open(project.liveUrl, "_blank")}
              style={{ padding: "12px 30px", fontSize: "1rem" }}
            />
          )}
        </div>

        {/* 3. Overview & Meta Grid */}
        <div className="project-overview-container">
          <div className="overview-left">
            <span className="section-label">Project Overview</span>
            <p className="overview-text">{project.overview}</p>

            <div style={{ marginTop: "40px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "40px",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      color: "#555",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    Project Name
                  </h4>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      color: "#111",
                      fontWeight: "500",
                    }}
                  >
                    {project.title}
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      color: "#555",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    Team Roles
                  </h4>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      color: "#111",
                      fontWeight: "500",
                    }}
                  >
                    {project.teamRoles || project.role || "Design & Dev"}
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      color: "#555",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    Timeline
                  </h4>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      color: "#111",
                      fontWeight: "500",
                    }}
                  >
                    {project.timeline || "Ongoing"}
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      color: "#555",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    Industry
                  </h4>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      color: "#111",
                      fontWeight: "500",
                    }}
                  >
                    {project.industry || "-"}
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.9rem",
                      color: "#555",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    Year
                  </h4>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      color: "#111",
                      fontWeight: "500",
                    }}
                  >
                    {project.year || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="overview-right">
            {/* Keeping the right side simplistic or removing if redundant, 
                 but keeping basic date/tech stack as requested or per old design? 
                 User asked to "Add text input fields... After project overview". 
                 So I put them in the left column under overview for better layout 
                 or we can replace the right column. 
                 Let's keep Tech Stack here. */}

            <div className="meta-item">
              <h4>Tech Stack</h4>
              <p>{project.techStack || "React, Node.js"}</p>
            </div>
            <div className="meta-item">
              <h4>Date</h4>
              <p>{dateStr}</p>
            </div>
          </div>
        </div>

        {/* 4. Problem & Solution */}
        {(project.problemStatement || project.solution) && (
          <div className="problem-solution-section">
            <div className="ps-item">
              <h3>Problem Statement</h3>
              <p>
                {project.problemStatement ||
                  "Defining the core challenges faced by the user to understand the necessity of this solution."}
              </p>
            </div>
            <div className="ps-item">
              <h3>Solution</h3>
              <p>
                {project.solution ||
                  "Our strategic approach to solving the problem through design innovation and technical excellence."}
              </p>
            </div>
          </div>
        )}

        {/* 5. Gallery 1 (Dynamic) */}
        <div className="project-gallery-row" style={{ gap: "20px" }}>
          {project.galleryImages &&
            project.galleryImages.map((row, rowIndex) => {
              // Backward compatibility check: if row is string, treating as old image array
              if (typeof row === "string") {
                return (
                  <img
                    key={rowIndex}
                    src={row}
                    alt={`Gallery ${rowIndex + 1}`}
                    className="gallery-image"
                  />
                );
              }

              // New Structure
              if (row.type === "landscape") {
                return (
                  <div key={rowIndex} style={{ width: "100%" }}>
                    {row.images[0] && (
                      <img
                        src={row.images[0]}
                        alt={`Row ${rowIndex} Landscape`}
                        className="gallery-image"
                      />
                    )}
                  </div>
                );
              } else if (row.type === "squares") {
                return (
                  <div
                    key={rowIndex}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      width: "100%",
                      maxWidth: "1400px",
                    }}
                  >
                    {row.images.map(
                      (img, imgIndex) =>
                        img && (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`Row ${rowIndex} Square ${imgIndex}`}
                            className="gallery-image"
                            style={{ aspectRatio: "624/720" }}
                          />
                        ),
                    )}
                  </div>
                );
              }
              return null;
            })}
        </div>

        {/* 6. Goals */}
        <div className="project-goals-section">
          <div className="goals-container">
            <h2 className="goals-title">Goals & Objectives</h2>
            <div className="goals-grid">
              {project.goals &&
                project.goals.map((goal, index) => (
                  <div key={index} className="goal-item">
                    <span className="goal-number">0{index + 1}.</span>
                    <p className="goal-text">{goal}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 7. What We Have Done (Tags) */}
        <div className="project-tags-section">
          <h2 className="tags-header">What We Have Done</h2>

          <div style={{ marginBottom: "40px" }}>
            <h4
              style={{
                marginBottom: "20px",
                color: "#555",
                textTransform: "uppercase",
                fontSize: "0.9rem",
              }}
            >
              Design
            </h4>
            <div className="tags-grid">
              {project.designTags &&
                project.designTags.map((tag, i) => (
                  <div key={i} className="tag-pill">
                    {tag}
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                marginBottom: "20px",
                color: "#555",
                textTransform: "uppercase",
                fontSize: "0.9rem",
              }}
            >
              Development
            </h4>
            <div className="tags-grid">
              {project.devTags &&
                project.devTags.map((tag, i) => (
                  <div key={i} className="tag-pill">
                    {tag}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 8. Gallery 2 */}
        <div className="project-gallery-row">
          {project.secondGallery &&
            project.secondGallery.map((img, index) => (
              <img
                key={index + 3}
                src={img}
                alt={`Second Gallery ${index + 1}`}
                className="gallery-image"
              />
            ))}
        </div>

        {/* 9. More Work */}
        {otherProjects.length > 0 && (
          <div className="more-work-section">
            <div className="more-work-title">More of Our Work</div>
            <div className="projects-grid">
              {otherProjects.map((p) => (
                <Link
                  key={p._id}
                  to={`/work/${p.slug}`}
                  className="project-card"
                >
                  <div className="project-image-container">
                    <img
                      src={p.heroImage}
                      alt={p.title}
                      className="project-image"
                    />
                  </div>
                  <div className="project-info">
                    <div>
                      <h3 className="project-card-title">{p.title}</h3>
                      <p className="project-card-desc">{p.description}</p>
                    </div>
                    <div className="project-arrow"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 10. CTA Section replaced by Mid_comp */}
        <Mid_comp />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
