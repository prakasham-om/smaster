const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2
//  Register new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {


  const result = await cloudinary.uploader.upload(req.body.avatar,{
    folder:'avatars',
    width:150,
    crop:'scale'
  })
  
  const { name, email, password } = req.body;
  
  try {
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(401).json({
      success: false,
      error
    });
  }
});

// login user

exports.loginUser = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      success: false,
      message: "Please enter Email & Password !",
    });
    //  next(new ErrorHandler('Please enter Email & Password !', 400))
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return response.status(401).json({
      success: false,
      message: "Invalid Email & Password !",
    });
    // next(new ErrorHandler('Invalid Email & Password !', 401))
  }

  const isPasswordMacted = await user.comparePassword(password);

  if (!isPasswordMacted) {
    return response.status(401).json({
      success: false,
      message: "Invalid Email & Password !",
    });
    //  next(new ErrorHandler('Invalid Email & Password !', 401))
  }

  sendToken(user, 201, response);
});

//  Log Out User
exports.logoutUser = catchAsyncErrors(async (request, response, next) => {
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();

    sendToken(updateUser, 201, res);
  } else {
    res.status(404);
    throw new Error("user Not Found!");
  }
});
