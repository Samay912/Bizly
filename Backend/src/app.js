const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const startupRoutes = require("./routes/startupRoutes");
const marketRoutes = require("./routes/marketRoutes");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/startup", startupRoutes);
app.use("/api/market", marketRoutes);

module.exports = app;
