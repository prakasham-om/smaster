const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const APIFeatures = require("../utils/APIFeatures");
const cloudinary = require("cloudinary").v2;
// Create new product
exports.newProduct = catchAsyncErrors(async (request, response) => {
  let images = [];
  if (request.body.images === "string") {
    images.push(request.body.images);
  } else {
    images = request.body.images;
  }

  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  request.body.images = imagesLinks;

  // request.body.user = request.user.id;
  console.log(request.body);

  try {
    const product = await Product.create(request.body);
    console.log(product);
    response.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    response.status(401).json({
      success: false,
      error,
    });
  }
 
});

// get all prodcuts

exports.getAllProducts = catchAsyncErrors(async (request, response, next) => {
  const resPerPage = 8;
  const countProduct = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), request.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  response.status(200).json({
    success: true,
    size: products.length,
    resPerPage,
    countProduct,
    products,
  });
});
exports.getAdminProducts = catchAsyncErrors(async (request, response, next) => {
  const products = await Product.find();
  response.status(200).json({
    success: true,
    products,
  });
});

// get single product

exports.getSingleProduct = catchAsyncErrors(async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) {
    return next(new ErrorHandler("Product cannot found", 404));
  }
  response.status(200).json({
    success: true,
    product,
  });
});

// Update product

exports.updateProduct = catchAsyncErrors(async (request, response, next) => {
  let product = await Product.findById(request.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found !", 404));
  }

  product = await Product.findOneAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  response.status(200).json({
    success: true,
    product,
  });
});

// Delete single product

exports.deleteProduct = catchAsyncErrors(async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) {
    return next(new ErrorHandler("Product cannot found", 404));
  }

  await product.remove();
  response.status(200).json({
    success: true,
    messege: "Product deleted succfully!",
  });
});
