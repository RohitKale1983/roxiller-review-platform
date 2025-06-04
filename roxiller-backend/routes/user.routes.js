const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

// All users can update password
router.put("/update-password", verifyToken, userController.updatePassword);

// Admin only
router.get("/admin/dashboard", verifyToken, allowRoles("admin"), userController.getAdminDashboard);
router.get("/admin/users", verifyToken, allowRoles("admin"), userController.listUsers);

module.exports = router;
