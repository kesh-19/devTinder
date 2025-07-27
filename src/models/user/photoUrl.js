const validator = require("validator");

module.exports = {
  type: String,
  default: "https://example.com/default-profile.png",
  validate: {
    validator: (value) =>
      validator.isURL(value, {
        protocols: ["https"],
      }),
    message: "Invalid URL format for photo URL.",
  },
};
