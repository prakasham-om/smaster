const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plase enter product name!"],
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Plase enter product name!"],
    maxLength: 5,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter category"],
    enum: {
      values: [ "Electronics",
      "Cameras",
      "Laptops",
      "Accessiores",
      "Headphones",
      "Books",
      "Cloth/Shoes",
      "Beauty/Health",
      "Sports",
      "Outdoor",
      "Home",],
      message: "Please enter valid category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller name"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product can not be exceed 5 stock"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
        maxLength: 100,
      },
      ratings: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  // user:{
  //  type:mongoose.Schema.ObjectId,
  //  ref:'User',
  //  default:'Admin'
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
