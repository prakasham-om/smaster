const experss = require("express");
const productsRoutes = require("./routes/productRoutes");
const usersRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoute");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const filUpload = require("express-fileupload");


const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errorMiddleware");

const app = experss();
app.use(experss.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(filUpload());

// cloudninary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors("origin", "*"));

// Routes
app.use("/", productsRoutes);
app.use("/users", usersRoutes);
app.use("/orders", orderRoutes);
app.get("/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Middle wares
app.use(errorMiddleware);

module.exports = app;
