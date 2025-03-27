const asyncHandler = require("express-async-handler");
const { createApiKey, validateApiKey } = require("../services/apiKeyService");

// ✅ Generate API Key for authenticated users
const generateApiKey = asyncHandler(async (req, res) => {
  const apiKey = await createApiKey(req.user.id);
  res.json({ success: true, apiKey, expiresIn: "30 minutes" });
});

// ✅ Example protected route using API Key
const protectedRoute = asyncHandler(async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ error: "API Key required" });

  const userId = await validateApiKey(apiKey);
  if (!userId) return res.status(403).json({ error: "Invalid or expired API Key" });

  res.json({ message: "Welcome! You accessed a protected route.", userId });
});

module.exports = { generateApiKey, protectedRoute };
