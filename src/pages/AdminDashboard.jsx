import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProjects } from "../context/ProjectContext";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { projects, addProject, updateProject, deleteProject, fetchProjects } =
    useProjects();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [view, setView] = useState("list"); // list, add, edit
  const [currentProject, setCurrentProject] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    overview: "",
    heroImage: "",
    // Initial State: 3 rows (Landscape, Squares, Landscape)
    galleryImages: [
      { type: "landscape", images: [""] },
      { type: "squares", images: ["", ""] },
      { type: "landscape", images: [""] },
    ],
    goals: ["", "", "", ""], // Minimum 4 goals
    designTags: "",
    devTags: "",
    secondGallery: ["", "", ""],
    role: "", // detailed role
    teamRoles: "", // New field
    timeline: "",
    industry: "", // New field
    year: "", // New field
    liveUrl: "", // New field
    techStack: "",
    problemStatement: "",
    solution: "",
  });

  const [loading, setLoading] = useState(false);

  // Simple Auth Check
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "@Metaman123") {
      setIsAuthenticated(true);
      fetchProjects();
    } else {
      alert("Incorrect password");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert file to base64
  const handleImageUpload = (e, field, index = null, subIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (field === "galleryImages") {
        // Handle structured gallery
        setFormData((prev) => {
          const newGallery = [...prev.galleryImages];
          newGallery[index].images[subIndex] = base64;
          return { ...prev, galleryImages: newGallery };
        });
      } else if (index !== null) {
        // Simple array field (secondGallery)
        setFormData((prev) => {
          const newArray = [...prev[field]];
          newArray[index] = base64;
          return { ...prev, [field]: newArray };
        });
      } else {
        // Single field
        setFormData((prev) => ({ ...prev, [field]: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Gallery Management
  const addGalleryRow = (type) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: [
        ...prev.galleryImages,
        {
          type,
          images: type === "landscape" ? [""] : ["", ""],
        },
      ],
    }));
  };

  const removeGalleryRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  // Goals Management
  const handleGoalChange = (value, index) => {
    setFormData((prev) => {
      const newGoals = [...prev.goals];
      newGoals[index] = value;
      return { ...prev, goals: newGoals };
    });
  };

  const addGoal = () => {
    setFormData((prev) => ({
      ...prev,
      goals: [...prev.goals, ""],
    }));
  };

  const removeGoal = (index) => {
    if (formData.goals.length <= 4) {
      alert("Minimum 4 goals required");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectPayload = {
        ...formData,
        designTags: formData.designTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        devTags: formData.devTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (view === "add") {
        await addProject(projectPayload);
        alert("Project Added!");
      } else if (view === "edit" && currentProject) {
        await updateProject(currentProject._id, projectPayload);
        alert("Project Updated!");
      }

      setView("list");
      resetForm();
    } catch (err) {
      alert("Error saving project: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      overview: "",
      heroImage: "",
      galleryImages: [
        { type: "landscape", images: [""] },
        { type: "squares", images: ["", ""] },
        { type: "landscape", images: [""] },
      ],
      goals: ["", "", "", ""],
      designTags: "",
      devTags: "",
      secondGallery: ["", "", ""],
      role: "",
      teamRoles: "",
      timeline: "",
      industry: "",
      year: "",
      liveUrl: "",
      techStack: "",
      problemStatement: "",
      solution: "",
    });
  };

  const startEdit = (project) => {
    setCurrentProject(project);

    // Normalize galleryImages for backward compatibility
    let normalizedGallery = project.galleryImages;
    // Check if it's the old format (array of strings) or new format
    if (
      project.galleryImages &&
      project.galleryImages.length > 0 &&
      typeof project.galleryImages[0] === "string"
    ) {
      // Convert old format to new format as best guess (needs manual update likely)
      // defaulting to 3 landscape images for safety if old data exists
      normalizedGallery = project.galleryImages.map((img) => ({
        type: "landscape",
        images: [img],
      }));
    } else if (!project.galleryImages || project.galleryImages.length === 0) {
      normalizedGallery = [
        { type: "landscape", images: [""] },
        { type: "squares", images: ["", ""] },
        { type: "landscape", images: [""] },
      ];
    }

    setFormData({
      title: project.title,
      description: project.description,
      overview: project.overview || "",
      heroImage: project.heroImage || "",
      galleryImages: normalizedGallery,
      goals:
        project.goals && project.goals.length >= 4
          ? project.goals
          : ["", "", "", ""],
      designTags: project.designTags ? project.designTags.join(", ") : "",
      devTags: project.devTags ? project.devTags.join(", ") : "",
      secondGallery: project.secondGallery || ["", "", ""],
      role: project.role || "",
      teamRoles: project.teamRoles || "",
      timeline: project.timeline || "",
      industry: project.industry || "",
      year: project.year || "",
      liveUrl: project.liveUrl || "",
      techStack: project.techStack || "",
      problemStatement: project.problemStatement || "",
      solution: project.solution || "",
    });
    setView("edit");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-screen">
        <div className="auth-box">
          <h2>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <Header />
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">
            {view === "list"
              ? "Project Dashboard"
              : view === "add"
                ? "Add New Project"
                : "Edit Project"}
          </h1>
          {view === "list" && (
            <button
              className="new-project-btn"
              onClick={() => {
                resetForm();
                setView("add");
              }}
            >
              + New Project
            </button>
          )}
        </div>
        <Link to="/admin/leads">
          {" "}
          <button className="logout-btn">Go To Leads</button>
        </Link>
        {view === "list" ? (
          <div className="admin-project-list">
            {projects.map((project) => (
              <div key={project._id} className="admin-project-item">
                <div className="admin-project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="admin-project-actions">
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p style={{ color: "#666", textAlign: "center" }}>
                No projects found. Add one!
              </p>
            )}
          </div>
        ) : (
          <div className="admin-form-container">
            <form className="admin-form" onSubmit={handleSubmit}>
              {/* Basic Info */}
              <div className="form-group">
                <label>Project Title</label>
                <input
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Short Description (for Listing)</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Hero Image (1280x720)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "heroImage")}
                />
                {formData.heroImage && (
                  <img
                    src={formData.heroImage}
                    className="image-preview"
                    alt="Preview"
                  />
                )}
              </div>

              {/* Overview & Meta */}
              <div className="form-group">
                <label>Project Overview</label>
                <textarea
                  name="overview"
                  className="form-textarea"
                  value={formData.overview}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Live Project URL</label>
                <input
                  name="liveUrl"
                  className="form-input"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>

              {/* Meta Fields Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div className="form-group">
                  <label>Design Role</label>
                  <input
                    name="role"
                    className="form-input"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="UI/UX Design"
                  />
                </div>
                <div className="form-group">
                  <label>Team Roles</label>
                  <input
                    name="teamRoles"
                    className="form-input"
                    value={formData.teamRoles}
                    onChange={handleInputChange}
                    placeholder="Product Designer, Developer"
                  />
                </div>
                <div className="form-group">
                  <label>Timeline</label>
                  <input
                    name="timeline"
                    className="form-input"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder="4 Weeks"
                  />
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <input
                    name="industry"
                    className="form-input"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="Fintech"
                  />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    name="year"
                    className="form-input"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="2024"
                  />
                </div>
                <div className="form-group">
                  <label>Tech Stack</label>
                  <input
                    name="techStack"
                    className="form-input"
                    value={formData.techStack}
                    onChange={handleInputChange}
                    placeholder="React, Node.js"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Problem Statement</label>
                <textarea
                  name="problemStatement"
                  className="form-textarea"
                  value={formData.problemStatement}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Solution</label>
                <textarea
                  name="solution"
                  className="form-textarea"
                  value={formData.solution}
                  onChange={handleInputChange}
                />
              </div>

              {/* Structured Gallery */}
              <div
                className="form-group"
                style={{
                  border: "1px solid #eee",
                  padding: "20px",
                  borderRadius: "8px",
                  background: "#f9f9f9",
                }}
              >
                <label style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
                  Gallery Section 1
                </label>

                {formData.galleryImages.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="gallery-row-input"
                    style={{
                      marginBottom: "20px",
                      paddingBottom: "20px",
                      borderBottom: "1px dashed #ccc",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          fontSize: "0.8rem",
                          color: "#666",
                        }}
                      >
                        Row {rowIndex + 1}: {row.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeGalleryRow(rowIndex)}
                        style={{
                          color: "red",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                      >
                        Remove Row
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      {row.images.map((img, imgIndex) => (
                        <div key={imgIndex} style={{ flex: 1 }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(
                                e,
                                "galleryImages",
                                rowIndex,
                                imgIndex,
                              )
                            }
                          />
                          {formData.galleryImages[rowIndex].images[
                            imgIndex
                          ] && (
                            <img
                              src={
                                formData.galleryImages[rowIndex].images[
                                  imgIndex
                                ]
                              }
                              className="image-preview"
                              alt="Preview"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div
                  className="add-row-actions"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => addGalleryRow("landscape")}
                  >
                    + Add Landscape Row
                  </button>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => addGalleryRow("squares")}
                  >
                    + Add Squares Row
                  </button>
                </div>
              </div>

              {/* Goals */}
              <div className="form-group">
                <label>Goals & Objectives (Min 4)</label>
                {formData.goals.map((goal, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      placeholder={`Goal ${i + 1}`}
                      className="form-input"
                      value={goal}
                      onChange={(e) => handleGoalChange(e.target.value, i)}
                    />
                    <button
                      type="button"
                      onClick={() => removeGoal(i)}
                      className="delete-btn"
                      style={{ padding: "0 10px" }}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button type="button" className="edit-btn" onClick={addGoal}>
                  + Add Goal
                </button>
              </div>

              {/* Tags */}
              <div className="form-group">
                <label>Design Tags</label>
                <input
                  name="designTags"
                  className="form-input"
                  value={formData.designTags}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Development Tags</label>
                <input
                  name="devTags"
                  className="form-input"
                  value={formData.devTags}
                  onChange={handleInputChange}
                />
              </div>

              {/* Gallery 2 */}
              <div className="form-group">
                <label>Second Gallery Images (3 Landscape/Square)</label>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "secondGallery", i)}
                    />
                    {formData.secondGallery[i] && (
                      <img
                        src={formData.secondGallery[i]}
                        className="image-preview"
                        alt={`Preview ${i}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setView("list")}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
