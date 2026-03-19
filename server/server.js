// server.js — Main entry point for the portfolio API server
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const app = require("./app");
const { testConnection } = require("./models/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Verify DB connection before accepting requests
  const dbOk = await testConnection();
  if (!dbOk) {
    console.warn("⚠️  DB connection failed — server will start but DB routes may error.");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer();
