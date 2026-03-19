// routes/contact.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { submitContact } = require("../controllers/contactController");

// Validation rules for the contact form
const contactValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 characters")
    .escape(),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 10, max: 2000 }).withMessage("Message must be 10–2000 characters")
    .escape(),
];

// POST /api/contact
router.post("/", contactValidation, submitContact);

module.exports = router;
