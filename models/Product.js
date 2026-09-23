const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    vendor: {
      type: String,
      default: ""
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);