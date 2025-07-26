const express = require("express");
const connectDB = require("./config/database");
const app = express();

// Initialize Express app
const runServer = () => {
  express().listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

app.post("/signup", (req, res) => {
  // Logic to create a new user

  const dummyUser = {
    firstName: "John",
    lastName: "Doe",
    emailId: "john.doe@gmail.com",
    password: "password123",
    age: 27,
  };
});

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    runServer();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
