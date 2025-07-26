const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String, // String is shorthand for { type: String }
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const UserModel = model("User", userSchema); // Always use model with capital first letter

module.exports = UserModel;
