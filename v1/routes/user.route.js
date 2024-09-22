const express = require("express");
const router = express.Router();


const controller = require("../controllers/user.controller.js");
const validate = require("../validates/user.validate.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");

router.post("/register", validate.userCheck, controller.register)

router.post("/login", controller.login)

router.post("/password/forgot", controller.passwordForgot) 

router.post("/password/otp", controller.passwordOtp) 

router.post("/password/reset", controller.passwordReset) 

router.get("/detail/:token", authMiddleware.requireAuth, controller.detail) 

router.get("/list" ,controller.listUser) 

module.exports = router;
