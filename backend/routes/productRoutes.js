const express = require("express");
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/authMiddleware')
const {
  getAllProducts,
  newProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getAdminProducts
 
} = require("../controllers/productController");

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(getAdminProducts);
router.route("/admin/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct)
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles('1'),updateProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

module.exports = router;
