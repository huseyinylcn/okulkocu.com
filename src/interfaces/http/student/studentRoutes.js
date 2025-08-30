const router = require("express").Router()
const upload = require("./../../../infrastructure/middleware/upload")
const jwtService = require("./../../../infrastructure/jwt/jwtService")



const studentController = require("./studentController")



router.post("/create",jwtService.authenticateToken,upload.single("photo"), studentController.create)
router.post("/all",jwtService.authenticateToken, studentController.all)

router.post("/classadd",jwtService.authenticateToken, studentController.classAdd)
router.post("/classall",jwtService.authenticateToken, studentController.classAll)





module.exports = router