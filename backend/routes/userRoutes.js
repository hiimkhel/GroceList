const express = require("express");
const {getUser, deleteUser, updateAddress} = require("../controllers/userControllers");
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/:userId", getUser);
router.delete("/:userId", verifyToken, deleteUser);
router.patch("/:userId/address", verifyToken, updateAddress);


module.exports = router;