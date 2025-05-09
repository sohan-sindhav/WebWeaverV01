const { default: mongoose } = require("mongoose");

const savedTemplateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  originalTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
  name: { type: String, required: true },
  html: { type: String, required: true },
  css: { type: String, default: "" },
  js: { type: String, default: "" }, // Make JS optional
  isEditedVersion: { type: Boolean, default: false },
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SavedTemplate", savedTemplateSchema);
