// app.js — Express application setup and middleware configuration
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const { requestLogger } = require("./middleware/logger");

const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────
app.use(helmet());

// CORS — supports comma-separated list of allowed origins

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn(`CORS blocked: ${origin}`);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── Rate Limiting ─────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: "Too many contact submissions, please try again later." },
});

// ─── Body Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ─── Logging ───────────────────────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(requestLogger);

// ─── Root route ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    name: "Portfolio API",
    version: "1.0.0",
    status: "running",
    endpoints: ["/api/health", "/api/projects", "/api/contact"],
  });
});

// ─── Routes ────────────────────────────────────────────────────────────────
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);
app.use("/api/admin", adminRoutes);

// ─── Health Check ──────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Global Error Handler ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("💥 Unhandled error:", err.message);
  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

module.exports = app;