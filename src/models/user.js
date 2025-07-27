const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema, model } = mongoose;

const firstName = require("./user/firstName");
const lastName = require("./user/lastName");
const emailId = require("./user/emailId");
const password = require("./user/password");
const age = require("./user/age");
const gender = require("./user/gender");
const photoUrl = require("./user/photoUrl");
const about = require("./user/about");
const skills = require("./user/skills");
const { JWT_SECRET } = require("../utils/constants");

const userSchema = new Schema(
  {
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
    photoUrl,
    about,
    skills,
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

userSchema.methods.getJwtToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, {
    expiresIn: 60 * 60 * 2,
  }); // Token expires in 2 hours

  return token;
};

const UserModel = model("User", userSchema); // Always use model with capital first letter

module.exports = UserModel;
