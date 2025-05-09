// models/template.js
const mongoose = require("mongoose");

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
  "Other", // default/fallback
];

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    html: { type: String, required: true },
    css: { type: String },
    js: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: CATEGORY_ENUM,
      default: "Other",
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
