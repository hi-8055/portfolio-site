// middleware/logger.js — Custom request/response logger
function requestLogger(req, res, next) {
  const start = Date.now();

  // Intercept res.json to capture status after response is sent
  const originalJson = res.json.bind(res);
  res.json = function (body) {
    const duration = Date.now() - start;
    const color =
      res.statusCode >= 500 ? "\x1b[31m" :   // red
      res.statusCode >= 400 ? "\x1b[33m" :   // yellow
      res.statusCode >= 300 ? "\x1b[36m" :   // cyan
      "\x1b[32m";                            // green

    console.log(
      `${color}[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)\x1b[0m`
    );
    return originalJson(body);
  };

  next();
}

module.exports = { requestLogger };
