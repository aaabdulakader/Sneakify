const express = require("express");
const { testMiddleware } = require(`${__dirname}/../test/test.js`);
const { signUp, login } = require("../controllers/Authentication");

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers, testMiddleware);
router.route("/:id").delete(deleteUser).patch(updateUser).get(getUser);
router.route("/signup").post(signUp);
router.route("/login").post(login);

module.exports = router;
