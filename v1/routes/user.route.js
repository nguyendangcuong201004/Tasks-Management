const express = require("express");
const router = express.Router();


const controller = require("../controllers/user.controller.js");
const validate = require("../validates/user.validate.js");

router.post("/register", validate.userCheck, controller.register)

router.post("/login", controller.login)

router.post("/password/forgot", controller.passwordForgot) 

router.post("/password/otp", controller.passwordOtp) 

router.post("/password/reset", controller.passwordReset) 

module.exports = router;
