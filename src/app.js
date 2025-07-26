const express = require("express");
const connectDB = require("./config/database");

// Initialize Express app
const runServer = () => {
  express().listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    runServer();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
