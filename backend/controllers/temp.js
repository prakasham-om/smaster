
  const checkUser = await User.findOne({ email });
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Email & Password!",
    });
  }
  if (checkUser) {
    return res.status(401).json({
      success: false,
      message: "Email already used !",
    });
  } else {
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "1197309358",
        url: "https://res.cloudinary.com/www-draggital-com/image/upload/v1637315871/high-fashion-model-metallic-silver-260nw-1197309358_pkrj9h.webp",
      },
    });
    sendToken(user, 201, res);
  }