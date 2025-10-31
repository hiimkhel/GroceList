const express = require("express");
const {getUser, deleteUser} = require("../controllers/userControllers")
const router = express.Router();

// [ROUTE ENDPOINTS]
router.get("/:userId", getUser);
router.delete("/:userId", deleteUser);


module.exports = router;