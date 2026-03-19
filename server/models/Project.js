// models/Project.js — Data access layer for the projects table
const { query } = require("./db");

const Project = {
  /** Fetch all projects ordered by creation date */
  async findAll() {
    const { rows } = await query(
      "SELECT id, title, description, tech_stack, github_url, live_url, featured, created_at FROM projects ORDER BY featured DESC, created_at DESC"
    );
    return rows;
  },

  /** Fetch featured/preview projects (limit to 3 for homepage) */
  async findFeatured(limit = 3) {
    const { rows } = await query(
      "SELECT id, title, description, tech_stack, github_url, live_url FROM projects WHERE featured = true ORDER BY created_at DESC LIMIT $1",
      [limit]
    );
    return rows;
  },

  /** Fetch a single project by ID */
  async findById(id) {
    const { rows } = await query(
      "SELECT * FROM projects WHERE id = $1",
      [id]
    );
    return rows[0] || null;
  },

  /** Insert a new project (admin use) */
  async create({ title, description, tech_stack, github_url, live_url, featured = false }) {
    const { rows } = await query(
      `INSERT INTO projects (title, description, tech_stack, github_url, live_url, featured)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, tech_stack, github_url, live_url, featured]
    );
    return rows[0];
  },
};

module.exports = Project;
