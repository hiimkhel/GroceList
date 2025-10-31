const express = require("express");
const {getUser, deleteUser, updateAddress} = require("../controllers/userControllers")
const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/:userId", getUser);
router.delete("/:userId", deleteUser);
router.patch("/:userId/address", updateAddress);


module.exports = router;