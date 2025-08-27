const router = require("express").Router()
const upload = require("./../../../infrastructure/middleware/upload")


const studentController = require("./studentController")

router.post("/create",upload.single("photo"), studentController.create)
router.post("/all", studentController.all)



module.exports = router