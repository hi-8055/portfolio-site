// middleware/auth.js — Basic HTTP authentication for admin routes
const bcrypt = require("bcryptjs");

/**
 * Basic Auth middleware.
 * Reads the Authorization header and compares credentials.
 * In production, replace with a proper JWT or session-based auth.
 */
function basicAuth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.set("WWW-Authenticate", 'Basic realm="Portfolio Admin"');
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    // Decode the Base64 credentials
    const base64 = authHeader.slice(6);
    const decoded = Buffer.from(base64, "base64").toString("utf8");
    const [username, password] = decoded.split(":");

    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "changeme";

    if (username !== adminUser || password !== adminPass) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    // Attach admin flag for downstream use
    req.isAdmin = true;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid authorization header" });
  }
}

module.exports = { basicAuth };
