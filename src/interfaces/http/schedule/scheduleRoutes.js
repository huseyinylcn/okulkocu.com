const router = require("express").Router()

const scheduleController = require("./scheduleController")


router.post("/create",scheduleController.create)



module.exports = router