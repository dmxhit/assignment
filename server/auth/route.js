const express = require("express");
const { register, login, getUser } = require("./auth");
const verifyToken = require("../middleware"); // JWT token middleware
const userSchema = require("../middleware/validations"); //  Validation Schema
const router = express.Router();

// API ROUTES
router.post(
  "/register",
  userSchema.validate(userSchema.signUpSchema),
  register
);
router.post("/login", userSchema.validate(userSchema.loginSchema), login);
router.get("/getUser", verifyToken, getUser);

module.exports = router;
