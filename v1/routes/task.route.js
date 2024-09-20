const express = require("express");
const router = express.Router();


const controller = require("../controllers/task.controller.js");
const taskValidate = require("../validates/task.validate.js");


router.get("/", controller.index)

router.get("/detail/:id", controller.detail)

router.patch("/change-status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.post("/create", taskValidate.createPost ,controller.create) 

router.patch("/edit/:id", taskValidate.createPost ,controller.edit) 

router.patch("/delete/:id" ,controller.delete) 

router.patch("/delete-multi" ,controller.deleteMulti) 

module.exports = router;
