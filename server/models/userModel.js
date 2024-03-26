const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const usersSchem = mongoose.Schema({
  // username: {
  type: String,
  // unique: [true, "username already exists"],
  // required: [true, "username required"],
  // },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "User already exists"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password Required!"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm Password"],
    validator: {
      validator: function (val) {
        return this.password === val;
      },
      message: "passwords not matching!",
    },
  },
  passwordChangedAt: Date,

  firstName: {
    type: String,
    required: [true, "first name required"],
  },
  lastName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

usersSchem.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// set passwordChangedAt
usersSchem.pre("save", function (next) {
  !this.isModified("password") || this.isNew
    ? next()
    : (this.passwordChangedAt = Date.now() - 1000); // 1 second earlier
  next();
});

const User = mongoose.model("User", usersSchem);

module.exports = User;
