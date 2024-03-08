const Product = require("../models/productModel");
const User = require("../models/userModel");
const factory = require(`${__dirname}/factoryFunction`);

exports.getAllProducts = factory.getAll(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);

exports.getOne = factory.getOne(Product);
