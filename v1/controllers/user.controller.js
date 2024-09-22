const md5 = require('md5');
const generateHelper = require("../../helpers/generate.helper.js");
const User = require("../models/user.model.js");
const ForgotPassword = require('../models/forgot-password.model.js');
const sendEmailHelper = require("../../helpers/sendmail.helper.js");

// [POST] /v1/users/register
module.exports.register = async (req, res) => {

    const exitEmail = await User.findOne({
        email: req.body.email,
        deleted: false,
    })

    if (exitEmail){
        res.json ({
            "code": 400,
            message: "Email đã tồn tại!"
        })
        return;
    }

    const dataUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        token: generateHelper.generateRandomString(20)
    }

    const user = new User(dataUser);
    await user.save();

    const token = user.token;

    res.json ({
        "code": 200,
        token: token,
        message: "Đăng ký tài khoản thành công!"
    })
}

// [POST] /v1/users/login
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const exitUser = await User.findOne({
        email: email,
        deleted: false,
    })

    if (!exitUser){
        res.json ({
            "code": 400,
            message: "Email không tồn tại!"
        })
        return;
    }

    if(md5(password) != exitUser.password){
        res.json ({
            "code": 400,
            message: "Sai mật khẩu!"
        })
        return;
    }

    const token = exitUser.token;

    res.json ({
        "code": 200,
        token: token,
        message: "Đăng nhập thành công!"
    })
}

// [POST] /v1/users/password/forgot
module.exports.passwordForgot = async (req, res) => {

    const email = req.body.email;
    
    const exitUser = await User.findOne({
        email: email,
        deleted: false,
    })

    if (!exitUser){
        res.json ({
            "code": 400,
            message: "Email không tồn tại!"
        })
        return;
    }

    const otp = generateHelper.generateRandomNumber(6);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now() + 3*60*1000,
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();


    const subject = "Lấy lại mật khẩu";
    const text = `Mã OTP xác thực tài khoản của bạn là: ${otp}. \nMã OTP có hiệu lực trong vòng 3 phút. Vui lòng không cung cấp mã OTP này cho bất kỳ ai.`;

    sendEmailHelper.sendEmail(email, subject, text)
    
    
    res.json({
        code: 200,
        message: "OTP đã được gửi qua email!"
    })
}

// [POST] /v1/users/password/otp
module.exports.passwordOtp = async (req, res) => {

    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp,
    })

    if (!result){
        res.json({
            code: 400,
            message: "OTP không hợp lệ!"
        });
        return;
    }

    const user = await User.findOne({
        email: email,
    })

    const token = user.token;

    res.json({
        code: 200,
        token: token,
        message: "Xác thực thành công!"
    })
}

// [POST] /v1/users/password/otp
module.exports.passwordReset = async (req, res) => {

    const token = req.body.token;
    const password = req.body.password;

    const user = await User.findOne({
        token: token,
        deleted: false,
    })

    if (user) {
        await User.updateOne({
            token: token,
            deleted: false,
        }, {
            password: md5(password)
        })
    
        res.json({
            code: 200,
            message: "Đổi mật khẩu thành công!"
        })
    }
    else{
        res.json({
            code: 400,
            message: "Đã xảy ra lỗi!"
        })
    }

}
