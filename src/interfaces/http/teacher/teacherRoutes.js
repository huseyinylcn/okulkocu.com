const router = require("express").Router()



const teacherController = require("./teacherController")


router.post("/create",teacherController.create)







module.exports = router