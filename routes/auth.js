const express = require("express");
const router = express.Router();
const User = require("../models/user");

const { body } = require("express-validator/check");

const authController = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email")
      .custom((value, { err }) => {
        return User.find({ email: value }).then((user) => {
          if (user) {
            console.log(user);
            return Promise.reject("Email already in use");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

// router.post("/login", authController.login);

module.exports = router;
