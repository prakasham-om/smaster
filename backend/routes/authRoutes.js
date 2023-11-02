const experss = require("express");
const router = experss.Router();

const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)


module.exports = router;
