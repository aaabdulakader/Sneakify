const express = require("express");
const { testMiddleware } = require(`${__dirname}/../test/test.js`);
const { signUp, login, secure } = require("../controllers/Authentication");
const Cart = require("../models/cartModel");

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getCart,
  postCart,
  getAllCarts,
  deleteAll,
  updateCart,
  getAllOrders,
  getUserOrders,
  postOrder,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers, testMiddleware).post(signUp);
router.route("/cart").get(getAllCarts).delete(deleteAll);
router.route("/:id/cart").get(getCart).post(postCart).patch(updateCart);
router.route("/:id/orders").post(postOrder).get(getAllOrders);
// router.route("/orders").get(getAllOrders).post(postOrder);
router
  .route("/:id")
  .delete(secure, deleteUser)
  .patch(updateUser)
  .get(getUser);

router.route("/signup").post(signUp);
router.route("/login").post(login);

module.exports = router;
