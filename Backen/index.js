require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const postRoutes = require("./src/routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(${new Date().toISOString()} - ${req.method} ${req.url});
  next();
});

// API routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Social Media Analytics API is running",
    endpoints: {
      users: {
        getTopUsers: "/users",
      },
      posts: {
        getPopularPosts: "/posts?type=popular",
        getLatestPosts: "/posts?type=latest",
      },
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  });
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});