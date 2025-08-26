const router = require("express").Router()


const studentController = require("./studentController")

router.post("/create", studentController.create)



module.exports = router