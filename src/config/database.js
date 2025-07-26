const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("MongoDB connecting");
  await mongoose.connect(
    "mongodb+srv://namaste_node:namaste_node@books-store-mern.jhjz8.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
