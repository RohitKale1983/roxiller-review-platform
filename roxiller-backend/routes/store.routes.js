const express = require("express");
const router = express.Router();

const storeController = require("../controllers/store.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

// Admin routes
router.post("/create", verifyToken, allowRoles("admin"), storeController.createStore);
router.get("/all", verifyToken, allowRoles("admin", "user"), storeController.getAllStores);

// Store owner route
router.get("/my-store", verifyToken, allowRoles("store_owner"), storeController.getMyStoreDetails);

module.exports = router;
