const express = require("express");
const app = express();
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const validateEmailAndPassword = require("./utils/validateEmailAndPassword");

// Import checkCookie middleware
const checkCookie = require("./middleware/checkCookie");

// Import models
const UserModel = require("./models/user");
const cookieParser = require("cookie-parser");

// Initialize Express app
const runServer = () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());

app.use("/", checkCookie); // Apply checkCookie middleware to all routes

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10); // Hash the password before saving

  const user = new UserModel({
    firstName,
    lastName,
    emailId,
    password: passwordHash, // Assuming password is already hashed
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  const user = await UserModel.findOne({ emailId });
  try {
    validateEmailAndPassword(emailId, password);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    } else {
      const token = user.getJwtToken(); // Get JWT token from user model

      res.cookie("token", token);
      res.send("Login Successful");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const userId = req.user._id; // Use the user from the request object
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error" + error.message);
  }
});

app.patch("/user", async (req, res) => {
  const update = req.body;
  const { userId } = update;

  const nonUpdatableFields = new Set([
    "_id",
    "createdAt",
    "updatedAt",
    "emailId",
  ]);

  try {
    if (Object.keys(update).some((key) => nonUpdatableFields.has(key))) {
      throw new Error("Cannot update non-updatable fields");
    }
    await UserModel.findByIdAndUpdate(userId, update, {
      runValidators: true, // Validate the update against the schema
    });
    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

app.patch("/userByEmail", async (req, res) => {
  const update = req.body;
  const { emailId } = update;

  try {
    await UserModel.findOneAndUpdate({ emailId }, update, {
      runValidators: true, // Validate the update against the schema
    });
    res.send("User updated successfully by email");
  } catch (error) {
    console.error("Error updating user by email:", error);
    res.status(500).send("Internal Server Error" + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  try {
    const result = await UserModel.findByIdAndDelete(userId);
    if (result === null) {
      return res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error" + error.message);
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
