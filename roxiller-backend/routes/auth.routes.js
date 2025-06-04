const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../middlewares/validateAuth");

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);

module.exports = router;
