const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerDev = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, username, password: hash, role: "dev" });
    res.status(201).json({ message: "Dev registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Dev registration failed", error: err });
  }
};

exports.loginDev = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: "dev" });
    if (!user) return res.status(404).json({ message: "Dev not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    req.session.userId = user._id;
    res.json({
      message: "Dev login successful",
      role: user.role,
      token: "dev-auth-token", // You can generate a real JWT here if needed
    });
  } catch (err) {
    res.status(500).json({ message: "Dev login error", error: err });
  }
};

exports.logoutDev = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.status(200).json({ message: "Dev logged out successfully" });
  });
};
