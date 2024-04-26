const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Cart = require("./cartModel");

const usersSchem = mongoose.Schema({
  // username: {
  type: String,
  // unique: [true, "username already exists"],
  // required: [true, "username required"],
  // },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "User already exists"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password Required!"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm Password"],
    validator: {
      validator: function (val) {
        return this.password === val;
      },
      message: "passwords not matching!",
    },
  },
  passwordChangedAt: Date,

  firstName: {
    type: String,
    required: [true, "first name required"],
  },
  lastName: {
    type: String,
    required: true,
  },
  shippingInfo: [
    {
      name: {
        type: String,
      },

      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      zip: {
        type: String,
      },
    },
  ],

  paymentInfo: [
    {
      cardNumber: {
        type: String,
      },
      expDate: {
        type: String,
      },
      cvv: {
        type: String,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
  },
});

usersSchem.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// set passwordChangedAt
usersSchem.pre("save", function (next) {
  !this.isModified("password") || this.isNew
    ? next()
    : (this.passwordChangedAt = Date.now() - 1000); // 1 second earlier
  next();
});

usersSchem.pre(/^find/, function (next) {
  this.populate({
    path: "cart",
    select: "-__v",
  });
  next();
});

usersSchem.pre("save", async function (next) {
  this.shippingInfo.forEach((info) => {
    info.name = `${this.firstName} ${this.lastName}`;
  });

  next();
});
const User = mongoose.model("User", usersSchem);

module.exports = User;
