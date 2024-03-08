const factory = require("./factoryFunction");
const User = require("../models/userModel");

exports.getAllUsers = factory.getAll(User);
// exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getUser = factory.getOne(User);
