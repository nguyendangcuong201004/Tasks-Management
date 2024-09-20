
module.exports.createPost = (req, res, next) => {
    if (!req.body.title){
        res.json({
            code: 400,
            message: "Tiêu đề công việc không được để trống!"
        })
        return;
    }
    if (req.body.title.length < 5){
        res.json({
            code: 400,
            message: "Tiêu đề công việc phải có tối thiểu 5 ký tự!"
        })
        return;
    }
    next();
}