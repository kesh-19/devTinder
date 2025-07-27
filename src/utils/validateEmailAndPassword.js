const validator = require("validator");

const validateEmailAndPassword = (emailId, password) => {
  if (validator.isEmail(emailId) === false) {
    throw new Error("Invalid email format");
  }
  if (password.length < 1) {
    throw new Error("Password cannot be empty");
  }
};

module.exports = validateEmailAndPassword;
