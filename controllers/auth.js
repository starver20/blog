const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedpw) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedpw,
      });
      return user.save();
    })
    .then((user) => {
      res.status(200).json({ message: "user created", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
