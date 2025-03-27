const express = require("express");
const { generateApiKey, protectedRoute } = require("../controllers/apiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", protect, generateApiKey);
router.get("/protected-data", protect, protectedRoute);

module.exports = router;
