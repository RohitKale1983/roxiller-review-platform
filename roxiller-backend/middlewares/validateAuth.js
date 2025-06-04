const { body } = require("express-validator");

exports.registerValidator = [
  body("name").isLength({ min: 5, max: 60 }).withMessage("Name must be 20-60 characters."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .isLength({ min: 8, max: 16 })
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage("Password must be 8-16 chars, 1 uppercase & 1 special character."),
  body("address").isLength({ max: 400 }).withMessage("Address must be max 400 characters."),
];

exports.loginValidator = [
  body("email").isEmail().withMessage("Email is required."),
  body("password").notEmpty().withMessage("Password is required."),
];
