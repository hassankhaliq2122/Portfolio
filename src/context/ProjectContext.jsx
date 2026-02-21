import React, { createContext, useState, useEffect, useContext } from "react";

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `${import.meta.env.VITE_API_URL || "https://portfolio-backend-production-a954.up.railway.app"}/api/projects`;

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get single project by slug
  const getProjectBySlug = async (slug) => {
    try {
      const response = await fetch(`${API_URL}/${slug}`);
      if (!response.ok) throw new Error("Project not found");
      return await response.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Add new project
  const addProject = async (projectData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error("Failed to create project");
      const newProject = await response.json();
      setProjects((prev) => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      throw err;
    }
  };

  // Update project
  const updateProject = async (id, projectData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error("Failed to update project");
      const updatedProject = await response.json();
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? updatedProject : p)),
      );
      return updatedProject;
    } catch (err) {
      throw err;
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects,
        getProjectBySlug,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
