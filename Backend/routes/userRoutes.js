const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  LogoutUser,
} = require("../controllers/userController");
const { requireAuth } = require("../middlewares/auth");
const SavedTemplate = require("../models/savedTemplateSchema"); // Changed import name
const User = require("../models/User");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/verify", (req, res) => {
  if (req.session.userId) {
    res.json({ isAuthenticated: true, role: req.user?.role });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.post("/logout", LogoutUser);

// Save template route
router.post("/save", requireAuth, async (req, res) => {
  const { originalTemplateId, html, css, js, name } = req.body;

  if (!originalTemplateId || !html || !css) {
    return res.status(400).json({
      message: "Missing required fields (originalTemplateId, html, or css)",
    });
  }

  try {
    const saved = await SavedTemplate.create({
      // Use the model
      userId: req.session.userId,
      originalTemplateId,
      name: name || `Saved Template ${new Date().toLocaleString()}`,
      html,
      css,
      js: js || "",
    });

    res.status(201).json({
      message: "Template saved successfully",
      savedTemplate: saved,
    });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({
      message: "Failed to save template",
      error: err.message,
    });
  }
});

// Get saved templates route
router.get("/saved-templates", requireAuth, async (req, res) => {
  try {
    const templates = await SavedTemplate.find({
      // Use the model
      userId: req.session.userId,
    });
    res.json(templates);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch templates",
      error: err.message,
    });
  }
});

router.get("/info", async (req, res) => {
  try {
    console.log("Session:", req.session); // 👈 Log session
    if (!req.session.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.session.userId).select(
      "username email"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in /user/info:", err); // 👈 Log error
    res
      .status(500)
      .json({ message: "Failed to fetch user info", error: err.message });
  }
});

// In your userRoutes.js
router.delete("/templates/:id", requireAuth, async (req, res) => {
  try {
    await SavedTemplate.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId,
    });
    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete template", error: err });
  }
});

module.exports = router;
