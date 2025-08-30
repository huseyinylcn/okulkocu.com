const router = require("express").Router()
const upload = require("./../../../infrastructure/middleware/upload")

const jwtService = require("./../../../infrastructure/jwt/jwtService")
const teacherController = require("./teacherController")


router.post("/create",jwtService.authenticateToken,upload.single("photo"),teacherController.create)
router.post("/allTeacher",jwtService.authenticateToken,teacherController.allTeacher)
router.post("/schedule",jwtService.authenticateToken,teacherController.schedule)








module.exports = router