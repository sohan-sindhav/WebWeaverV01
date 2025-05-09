// middleware/authMiddleware.js

exports.requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Middleware to ensure the user is a dev user (for template creation)
exports.requireDev = (req, res, next) => {
  if (req.session.role !== "dev") {
    return res
      .status(403)
      .json({ message: "Only dev users can create templates." });
  }
  next();
};
