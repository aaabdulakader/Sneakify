const crypto = require("crypto");
const User = require("../models/userModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { parse } = require("path");
const dotenv = require("dotenv");
const { promisify } = require("util");

dotenv.config({ path: `${__dirname}/../config.env` });

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

    sendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const login = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }).select(
    "+password"
  );

  console.log(user);

  if (!req.body.password || !req.body.username)
    return next("Please enter username and password");

  if (!user || !(await bycrypt.compare(req.body.password, user.password)))
    return next("Wrong username or password!");
  sendToken(user, 200, res);
};

const secure = async (req, res, next) => {
  let token;

  // req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer") &&
  //   (token = req.headers.authorization.split(" ")[1]);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next("User is not logged in! Please log in!");

  console.log(token, "token");

  const tokenDecoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  console.log(tokenDecoded.id, "tokenDecoded");

  const currentUser = await User.findById(tokenDecoded.id);
  console.log(currentUser);
  if (!currentUser) return next("User no longer exists! Please sign up again!");

  const changedPasswordAt = parseInt(
    Date.parse(currentUser.passwordChangedAt) / 1000,
    10
  );
  // 65f1c93b4f22178e852a8235
  if (changedPasswordAt && tokenDecoded.iat < changedPasswordAt)
    return next("User made changes recently! Please log in again");

  req.user = currentUser;

  next();
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (user, statusCode, res) => {
  const token = createToken(user._id);

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   secure: process.env.NODE_ENV === "production",
  // });

  console.log(process.env.COOKIE_EXPIRES_IN);

  const cookieData = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  };

  console.log(cookieData, "cookieData");

  res.cookie("jwt", token, cookieData);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    tokenExpiresIn: process.env.JWT_EXPIRES_IN,
    data: {
      user,
    },
  });
};

module.exports = { signUp, login, secure };
