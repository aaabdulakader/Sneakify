const catchAsync = require("./../catchAsync");

const User = require("../models/userModel");
const { type } = require("os");

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }
    res.status(200).json({
      status: "success",
      document,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.find();

    if (!documents) {
      return next("No documents found");
    }

    res.status(200).json({
      status: "success",
      results: documents.length,
      documents,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      documents,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const documents = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!documents) {
      return next(`No ${Model.modelName} found with that ID`);
    }

    res.status(200).json({
      status: "success",
      document,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }

    res.status(204).json({
      status: "success",
      document: null,
    });
  });

exports.getCart = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.find({ user: req.params.id });

    if (!document) {
      return next(`No ${Model.modelName} found with that ID`);
    }
    res.status(200).json({
      status: "success",
      user: document[0].user,
      // length: document[0].items,
      cart: document[0],
    });
  });

exports.postCart = (Model) =>
  catchAsync(async (req, res, next) => {
    const { user, items } = req.body;

    console.log("req.body", req.body);

    // Check if the user exists
    const userExists = await User.findById(user);

    // console.log("userExists", userExists);
    if (!userExists) {
      return res
        .status(404)
        .json({ status: "error", message: "User does not exist" });
    }

    // Find the user's cart document
    let cart = await Model.findOne({ user });
    // console.log("cart", cart);
    // If the user doesn't have a cart yet, create one
    if (!cart) {
      cart = await Model.create({ user, items: [] });
    }

    // console.log("cart", cart);

    // Check if the product is already in the user's cart
    const existsInCart = await Model.find({
      user,
      items: {
        $elemMatch: {
          product: items[0].product,
          size: items[0].size,
          color: items[0].color,
        },
      },
    });
    console.log("req.body", req.body);

    // console.log("cartItemProduct", cart.items[0].product);

    // console.log("existsInCart", existsInCart);

    // console.log("existingItemIndex", existingItemIndex);

    // existingItemIndex !== -1
    //   ? console.log("Product exists in cart")
    //   : console.log("Product does not exist in cart");

    // If the product exists in the cart, update the quantity
    if (existsInCart.length > 0) {
      // console.log("Product exists in cart");
      // console.log(typeof cart.items[0].quantity);
      // update the quantity
      cart.items.forEach((item) => {
        if (
          item.product === items[0].product &&
          item.size === items[0].size &&
          item.color === items[0].color
        ) {
          // console.log("item", item);
          item.quantity = +item.quantity + items[0].quantity;
        }
      });
    } else {
      // If the product is not in the cart, add it
      cart.items.push({
        product: items[0].product,
        title: items[0].title,
        quantity: +items[0].quantity,
        size: items[0].size,
        color: items[0].color,
        price: items[0].price,
        image: items[0].image,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        // totalQuantity: items[0].quantity
      });
    }

    // Update the cart document in the database
    cart = await Model.findByIdAndUpdate(
      cart._id,
      cart,
      { totalQuantity: cart.items.length },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({ status: "success", cart });
  });

exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.deleteMany();

    res.status(204).json({
      status: "success",
      document: null,
    });
  });

exports.updateCart = (Model) =>
  catchAsync(async (req, res, next) => {
    const { items } = req.body;

    // Find the user's cart document
    let cart = await Model.findOneAndUpdate(
      { user: req.params.id },
      { items },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ status: "success", cart });
  });

// orders

// exports.getUserOrders = (Model) => {
//   return "user orders";
// };

exports.createOrder = (Model) =>
  catchAsync(async (req, res, next) => {
    const { user, items, shipping_address, payment_method } = req.body;

    console.log("req.body", req.body);
    // Check if the user exists
    const userExists = await User.findById({ _id: user });

    if (!userExists) {
      return res
        .status(404)
        .json({ status: "error", message: "User does not exist!" });
    }

    // Create the order
    const order = await Model.create({
      user,
      items,
      shipping_address,
      payment_method,
    });

    res.status(201).json({
      status: "success",
      order,
    });
  });
