const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

// Normal User only
router.post("/submit", verifyToken, allowRoles("user"), ratingController.submitOrUpdateRating);
router.get("/my-ratings", verifyToken, allowRoles("user"), ratingController.getMyRatings);

module.exports = router;
