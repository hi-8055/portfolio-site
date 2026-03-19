// server/models/db.js — PostgreSQL connection pool
// Supports both local Docker (no SSL) and hosted providers (SSL)
// via DATABASE_URL or individual env vars.

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

// ─── Build pool config ────────────────────────────────────────────────────
// Priority: DATABASE_URL (Supabase / Neon / Railway) → individual vars (local Docker)
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction
        ? { rejectUnauthorized: false } // required by most hosted Postgres providers
        : false,                         // no SSL when DATABASE_URL is local
    }
  : {
      // Local Docker fallback
      host:     process.env.DB_HOST     || "localhost",
      port:     parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME     || "portfolio_db",
      user:     process.env.DB_USER     || "portfolio_user",
      password: process.env.DB_PASSWORD || "portfolio_pass",
      ssl: false, // Docker local — no SSL needed
    };

const pool = new Pool({
  ...poolConfig,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.error("Unexpected DB pool error:", err.message);
});

/**
 * Execute a parameterized SQL query.
 * @param {string} text   SQL query string
 * @param {Array}  params Query parameters
 */
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (!isProduction) {
    console.log(`[DB] ${text.slice(0, 60)} | ${duration}ms | ${res.rowCount} rows`);
  }
  return res;
}

/** Test the DB connection on startup */
async function testConnection() {
  try {
    await pool.query("SELECT 1");
    const mode = process.env.DATABASE_URL ? "DATABASE_URL" : "host/port vars";
    const ssl  = poolConfig.ssl ? "SSL ON" : "SSL OFF";
    console.log(`✅ PostgreSQL connected [${mode}] [${ssl}]`);
    return true;
  } catch (err) {
    console.error("❌ PostgreSQL connection error:", err.message);
    return false;
  }
}

module.exports = { query, pool, testConnection };