const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const router = express.Router();
app.use(cors()); // Enables CORS for all requests

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));

app.use("/products", productRoutes);
app.use("/users", userRoutes);

// Fore non-existing routes or for routes that come with the wrong HTTP method
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
