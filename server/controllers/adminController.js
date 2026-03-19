// controllers/adminController.js
const Message = require("../models/Message");
const Project = require("../models/Project");

/** GET /api/admin/messages — list all contact messages */
async function getMessages(req, res, next) {
  try {
    const messages = await Message.findAll();
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
}

/** POST /api/admin/projects — add a new project */
async function createProject(req, res, next) {
  try {
    const { title, description, tech_stack, github_url, live_url, featured } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, error: "title and description are required" });
    }
    const project = await Project.create({ title, description, tech_stack, github_url, live_url, featured });
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMessages, createProject };
