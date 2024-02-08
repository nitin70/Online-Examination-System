const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "nitin", { expiresIn: "20d" });
};

module.exports = generateToken;