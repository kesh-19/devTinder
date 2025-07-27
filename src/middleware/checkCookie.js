const { skipCookieCheck, JWT_SECRET } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const checkCookie = async (req, res, next) => {
  console.log("all calls");
  try {
    if (skipCookieCheck.includes(req.path)) {
      return next(); // Skip cookie check for these routes
    }

    const decodedMsg = jwt.verify(req.cookies.token, JWT_SECRET);
    console.log("decodedMsg", decodedMsg);
    const { _id } = decodedMsg;
    const user = await UserModel.findById(_id);
    console.log("logged in user", user.firstName);
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res
      .status(401)
      .send("Invalid session. Please log in again. " + error.message);
  }
};

module.exports = checkCookie;
