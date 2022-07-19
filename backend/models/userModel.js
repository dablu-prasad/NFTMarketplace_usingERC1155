const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "users",
  }
);

mongoose.model("users", UserDetailsScehma);



// const mongoose = require("mongoose");
// const validator = require("validator");


// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please Enter Your Name"],
//     maxLength: [30, "Name cannot exceed 30 characters"],
//     minLength: [4, "Name should have more than 4 characters"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please Enter Your Email"],
//     unique: true,
//     validate: [validator.isEmail, "Please Enter a valid Email"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please Enter Your Password"],
//     minLength: [8, "Password should be greater than 8 characters"],
//     select: false,
//   }
// });

// const users =  mongoose.model("users", userSchema);

// module.exports =users;
