const Template = require("../models/template");

// Same enum list as in the model (keep in sync)
const CATEGORY_ENUM = [
  "Portfolio",
  "Business",
  "E-commerce",
  "Blog",
  "Landing Page",
  "Educational",
  "SaaS",
  "Agency",
  "Event",
  "Resume",
  "Restaurant",
  "Travel",
  "Photography",
  "Health & Fitness",
  "Real Estate",
  "Technology",
  "Non-Profit",
  "Entertainment",
  "Finance",
  "Other",
];

// Create a new template (Only accessible to dev users)
const createTemplate = async (req, res) => {
  const { name, html, css, js, category } = req.body;

  // Fallback if invalid or missing
  const selectedCategory = CATEGORY_ENUM.includes(category)
    ? category
    : "Other";

  try {
    const template = new Template({
      name,
      html,
      css,
      js,
      createdBy: req.session.userId,
      category: selectedCategory,
    });

    await template.save();
    res
      .status(201)
      .json({ message: "Template created successfully", template });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create template" });
  }
};

// Get all templates (for normal users)
const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find().populate(
      "createdBy",
      "username email"
    );
    res.status(200).json({ templates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
};
