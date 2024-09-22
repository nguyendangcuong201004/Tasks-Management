const Task = require("../models/task.model.js");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {

    const userId = res.locals.user.id;

    // Bộ lọc theo trạng thái
    const find = {
        $or: [ 
            { createdBy: userId },
            { listUsers:  userId }
         ],
        deleted: false,
    }

    if (req.query.status){
        find.status = req.query.status
    }

    // Xắp xếp theo tiêu chí và giá trị thông qua query 
    const sort = {};

    if (req.query.sortKey && req.query.sortValue){
        sort[`${req.query.sortKey}`] = req.query.sortValue;
    }

    // Phân trang 
    const pagination = {
        limit: 2,
        page: 1
    }

    if (req.query.page && req.query.page > 0){
        pagination.page = parseInt(req.query.page)
    }

    if (req.query.limit){
        pagination.limit = parseInt(req.query.limit)
    }

    const skip = pagination.limit * (pagination.page - 1);

    // Tìm kiếm

    if (req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i")
        find.title = regex;
    }

    // Đổi trạng thái công việc



    const tasks = await Task.find(find).sort(sort).limit(pagination.limit).skip(skip)
    res.json({
        code: 200,
        tasks: tasks
    })
}

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false,
    })
    res.json(task)
}

// [PATCH] /api/v1/tasks/changeStatus/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        
        await Task.updateOne({
            _id: id
        }, {
            status: status
        })

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
        });
    }
    catch(error){
        console.log(error);
        res.json({
            code: 400,
            message: "Đã xảy ra lỗi!"
        });
    }

  
}

// [PATCH] /api/v1/tasks/changeStatus/:id
module.exports.changeMulti = async (req, res) => {
    const {ids, status} = req.body;

    const listStatus = ["initial", "doing", "finish", "pending", "notFinish"];

    if (listStatus.includes(status)){
        await Task.updateMany({
            _id: ids,
        }, {
            status: status
        })
    
        res.json({
            code: 200,
            message: "Đổi trạng thái thành công!"
        })
    }
    else {
        res.json({
            code: 400,
            message: `Trạng thái ${status} không hợp lệ!`
        })
    }  
    
}

// [POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {

    req.body.createdBy = res.locals.user.id;
    const task = new Task(req.body);
    await task.save();

    res.json({
        code: 200,
        message: "Thêm mới công việc thành công!"
    })
}

// [PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    
    await Task.updateOne({
        _id: id
    }, req.body);

    res.json({
        code: 200,
        message: "Cập nhật công việc thành công!"
    })
}

// [PATCH] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {

    const id = req.params.id;

    await Task.updateOne({
        _id: id,
    }, {
        deleted: true,
        deleteAt: new Date()
    })

    res.json({
        code: 200,
        message: "Xóa công việc thành công!"
    })
}

// [PATCH] /api/v1/tasks/delete-multi
module.exports.deleteMulti = async (req, res) => {

    const { ids } = req.body;

    await Task.updateMany({
        _id: { $in: ids }
    }, {
        deleted: true,
        deleteAt: new Date()
    })

    res.json({
        code: 200,
        message: "Xóa công việc thành công!"
    })
}