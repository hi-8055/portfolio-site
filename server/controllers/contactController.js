// controllers/contactController.js
const { validationResult } = require("express-validator");
const Message = require("../models/Message");

/** POST /api/contact — save a contact form submission */
async function submitContact(req, res, next) {
  // Check for validation errors set by the route middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  try {
    const { name, email, message } = req.body;

    // Sanitize — strip any HTML tags (belt-and-suspenders, express-validator already strips)
    const sanitize = (str) => str.replace(/<[^>]*>/g, "").trim();

    const saved = await Message.create({
      name:    sanitize(name),
      email:   sanitize(email),
      message: sanitize(message),
    });

    console.log(`📩 New contact from ${email} (id: ${saved.id})`);

    res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      id: saved.id,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitContact };
