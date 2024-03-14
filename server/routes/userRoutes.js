const express = require("express");
const { testMiddleware } = require(`${__dirname}/../test/test.js`);
const { signUp, login, secure } = require("../controllers/Authentication");

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(secure, getAllUsers, testMiddleware);
router
  .route("/:id")
  .delete(secure, deleteUser)
  .patch(secure, updateUser)
  .get(secure, getUser);
router.route("/signup").post(signUp);
router.route("/login").post(login);

module.exports = router;
