const express = require("express");
const app = express();
const connectDB = require("./config/database");

// Import models
const UserModel = require("./models/user");

// Initialize Express app
const runServer = () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

app.post("/signup", async (req, res) => {
  // Logic to create a new user

  const userObj = {
    firstName: "John",
    lastName: "Doe",
    emailId: "john.doe@gmail.com",
    password: "password123",
    age: 27,
  };

  const user = new UserModel(userObj);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    runServer();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
