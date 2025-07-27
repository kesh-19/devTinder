const validator = require("validator");

module.exports = {
  type: String,
  required: true,
  validate: {
    validator: (value) => validator.isStrongPassword(value),
    message: "Password must be strong and meet the required criteria.",
  },
};
