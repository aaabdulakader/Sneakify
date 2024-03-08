const mongoose = require("mongoose");

//   "name": "Running Shoes",
//   "brand": "Nike",
//   "category": "Sneakers",
//   "price": 99.99,
//   "description": "Comfortable running shoes for all-day wear.",
//   "sizes": ["US 7", "US 8", "US 9"],
//   "colors": ["Black", "White", "Blue"],
//   "imageUrls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
//   "createdAt": ISODate("2022-02-21T12:00:00Z")

const productSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  brand: String,
  category: {
    type: String,
    enum: ["Sneakers", "Sandals", "Formal", "Casual", "Sports"],
  },
  price: Number,
  description: String,
  gender: {
    type: String,
    enum: ["Men", "Women", "Kids", "Unisex"],
  },
  sizes: [String],
  colors: [String],
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  //   Embedded ratings and reviews
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      stars: { type: Number, min: 1, max: 5 },
      review: String,
    },
  ],
  images: [String],
  createdAt: { type: Date, default: Date.now },
  SKU: String,
  quantity: {
    type: Number,

    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Quantity must be greater than 0",
    },
  },
});

productSchema.pre(/^find/, function (next) {
  this.find().select("-__v");
  next();
});

// random number between 1 and 100 for quantity of products in stock that's generated randomly before saving if not provided

productSchema.pre("save", function (next) {
  if (!this.quantity) {
    this.quantity = Math.floor(Math.random() * 100) + 1;
  }
  next();
});

// generate SKU before saving
productSchema.pre("save", function (next) {
  this.SKU = `${this.category}-${this.title.split(" ").join("-")}`;
  next();
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
