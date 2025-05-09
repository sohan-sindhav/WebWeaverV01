const express = require("express");

const router = express.Router();
const {
  registerDev,
  loginDev,
  logoutDev,
} = require("../controllers/devController");
const { requireAuth } = require("../middlewares/auth");

router.post("/register", registerDev);
router.post("/login", loginDev);
router.post("/logout", logoutDev); // Add logout route
// In your dev routes
router.get("/verify", requireAuth, (req, res) => {
  res.json({ isAuthenticated: true });
});

module.exports = router;
