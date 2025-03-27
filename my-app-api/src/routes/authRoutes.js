const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // Signup logic here
});

router.post("/login", async (req, res) => {
  // Login logic here
});

module.exports = router;
