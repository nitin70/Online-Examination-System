const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token = req?.cookies?.admin;
  if (token) {
    try {
      if (token) {
        const decoded = jwt.verify(token,"nitin");
        //find the user by id
        const user = await User.findById(decoded?.id).select("-password");
        //attach the user to the request object
        //console.log(user);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired, login again");
    }
  } else {
    throw new Error("There is no token attached to the header");
  }
});

module.exports = authMiddleware;