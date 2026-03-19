// controllers/projectsController.js
const Project = require("../models/Project");

/** GET /api/projects — return all projects */
async function getAllProjects(req, res, next) {
  try {
    const projects = await Project.findAll();
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
}

/** GET /api/projects/featured — return featured projects for homepage */
async function getFeaturedProjects(req, res, next) {
  try {
    const projects = await Project.findFeatured(3);
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
}

/** GET /api/projects/:id */
async function getProjectById(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProjects, getFeaturedProjects, getProjectById };
