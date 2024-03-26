const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const axios = require("axios");

const app = express();
const router = express.Router();
app.use(
  cors({
    origin: "http://localhost:3001",
    // credentials: true,
    withCredentials: true,
  })
);

// Enables CORS for all requests and sends the appropriate headers

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.get("/logout", (req, res, next) => {
  if (!req.jwt) {
    return res.status(200).json({
      status: "success",
      message: "User logged outt",
    });
  }
  res.cookie("jwt", "", {
    expires: 1,
    // httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "User logged out",
  });
});
// Fore non-existing routes or for routes that come with the wrong HTTP method
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
