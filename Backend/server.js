const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const templateRoutes = require("./routes/templateRoutes");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "authSecret",
    resave: false,
    saveUninitialized: false,
  })
);

const userRoutes = require("./routes/userRoutes");
const devRoutes = require("./routes/devRoutes");
const templateRoutes = require("./routes/templateRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/dev", devRoutes);
app.use("/api/v1/templates", templateRoutes);

const frontendPath = path.join(__dirname, "../frontend/dist");
console.log("Frontend path:", frontendPath);

const fs = require("fs");
console.log("Directory exists:", fs.existsSync(frontendPath));

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
