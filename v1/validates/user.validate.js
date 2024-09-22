
module.exports.userCheck = async (req, res, next) => {
    if (!req.body.fullName){
        res.json({
            code: 400,
            message: "Tên không được để trống!"
        })
        return;
    }
    if (req.body.fullName.length < 5){
        res.json({
            code: 400,
            message: "Tên phải có ít nhất 5 ký tự!"
        })
        return;
    }
    if (!req.body.email){
        res.json({
            code: 400,
            message: "Email không được để trống!"
        })
        return;
    }
    if (!req.body.password){
        res.json({
            code: 400,
            message: "Email phải có ít nhất 5 ký tự!"
        })
        return;
    }
    next();
}