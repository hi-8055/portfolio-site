// models/Message.js — Data access layer for the messages table
const { query } = require("./db");

const Message = {
  /** Save a contact form submission to the DB */
  async create({ name, email, message }) {
    const { rows } = await query(
      `INSERT INTO messages (name, email, message)
       VALUES ($1, $2, $3) RETURNING id, created_at`,
      [name, email, message]
    );
    return rows[0];
  },

  /** Fetch all messages (admin only) */
  async findAll() {
    const { rows } = await query(
      "SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC"
    );
    return rows;
  },
};

module.exports = Message;
