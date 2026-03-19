// routes/projects.js
const express = require("express");
const router = express.Router();
const { getAllProjects, getFeaturedProjects, getProjectById } = require("../controllers/projectsController");

// GET /api/projects
router.get("/", getAllProjects);

// GET /api/projects/featured
router.get("/featured", getFeaturedProjects);

// GET /api/projects/:id
router.get("/:id", getProjectById);

module.exports = router;
