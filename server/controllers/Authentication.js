const crypto = require("crypto");
const User = require("../models/userModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).json({
      status: "success",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const login = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }).select(
    "+password"
  );

  if (!req.body.password || !req.body.username)
    return next("Please enter username and password");

  if (!user || !(await bycrypt.compare(req.body.password, user.password)))
    return next("Wrong username or password!");

  res.status(200).json({
    status: "success",
    data: user,
  });
};

module.exports = { signUp, login };
