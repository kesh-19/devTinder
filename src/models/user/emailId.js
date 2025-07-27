const validator = require("validator");

module.exports = {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  immutable: true,
  trim: true,
  // validate: (value) => validator.isEmail(value),
  validate: {
    validator: (value) => validator.isEmail(value),
    message: "Invalid email format.",
  },
};
