// routes/templateRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTemplate,
  getAllTemplates,
} = require("../controllers/templateController");
const { requireAuth } = require("../middlewares/template/authMiddleware"); // Ensure user is authenticated

// POST: Create a new template (Only accessible to dev users)
router.post("/create", requireAuth, createTemplate);

// GET: Get all templates (Accessible to normal users)
router.get("/", requireAuth, getAllTemplates);

module.exports = router;
