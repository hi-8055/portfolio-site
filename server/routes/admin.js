// routes/admin.js
const express = require("express");
const router = express.Router();
const { basicAuth } = require("../middleware/auth");
const { getMessages, createProject } = require("../controllers/adminController");

// All admin routes require authentication
router.use(basicAuth);

// GET /api/admin/messages
router.get("/messages", getMessages);

// POST /api/admin/projects
router.post("/projects", createProject);

// GET /api/admin (overview)
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted",
    endpoints: [
      "GET  /api/admin/messages",
      "POST /api/admin/projects",
    ],
  });
});

module.exports = router;
