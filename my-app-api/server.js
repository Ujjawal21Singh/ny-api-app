const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require("node-cron");
const asyncHandler = require("express-async-handler");

const userRoutes = require("./routes/userRoutes"); // Handles authentication
const apiRoutes = require("./routes/apiRoutes");   // Handles API Key generation
const { expireApiKey } = require("./services/apiKeyService");

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Adjust as per your frontend URL

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Routes
app.use("/api/users", userRoutes); // User authentication routes
app.use("/api/keys", apiRoutes);   // API key management routes

// ✅ Cron Job: Clean expired API keys every hour
cron.schedule("0 * * * *", asyncHandler(async () => {
  await expireApiKey();
  console.log("🗑️ Expired API keys removed");
}));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
