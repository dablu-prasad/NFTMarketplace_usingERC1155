
const User = require("../models/userModel");

// Register a User
exports.registerUser = async (req, res, next) => {
    res.send("Hello Register")
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password
  });
};


