const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOne,
  getOneSlug,
} = require("./../controllers/productController");

const router = express.Router();

// router.route("/").post(createProduct).get(deleteProduct);
router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").delete(deleteProduct).patch(updateProduct).get(getOne);
// slug parameter
router.route("/slug/:slug").get(getOneSlug);

module.exports = router;
