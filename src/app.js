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

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({ age: 23 });
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/user", async (req, res) => {
  const update = req.body;
  const { userId } = update;

  try {
    await UserModel.findByIdAndUpdate(userId, update);
    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/userByEmail", async (req, res) => {
  const update = req.body;
  const { emailId } = update;

  try {
    await UserModel.findOneAndUpdate({ emailId }, update);
    res.send("User updated successfully by email");
  } catch (error) {
    console.error("Error updating user by email:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/user", async (req, res) => {
  const { userId } = req.body;

  try {
    await UserModel.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
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
