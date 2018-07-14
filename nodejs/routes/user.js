const express = require('express');
const UserController = require("../controllers/user");
const router = express.Router();

router.post("/signup", UserController.UserSignup);
router.post("/login", UserController.userlogin);

module.exports = router;
