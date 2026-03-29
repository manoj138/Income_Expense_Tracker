const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/DashboardController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/", authenticateToken, DashboardController.dashBoard);

module.exports = router;