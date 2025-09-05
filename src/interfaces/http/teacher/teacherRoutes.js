const router = require("express").Router()
const upload = require("./../../../infrastructure/middleware/upload")

const jwtService = require("./../../../infrastructure/jwt/jwtService")
const teacherController = require("./teacherController")


router.post("/create",jwtService.authenticateToken,upload.single("photo"),teacherController.create)
router.post("/allTeacher",jwtService.authenticateToken,teacherController.allTeacher)
router.post("/schedule",jwtService.authenticateToken,teacherController.schedule)
router.post("/dersler",jwtService.authenticateToken,teacherController.dersler)
router.post("/attendance",jwtService.authenticateToken,teacherController.attendance)
router.post("/attendanceadd",jwtService.authenticateToken,teacherController.attendanceadd)
router.post("/homework",jwtService.authenticateToken,upload.single("photo"),teacherController.homework)
router.post("/homeworkget",jwtService.authenticateToken,teacherController.homeworkget)
router.post("/homeworkdelete",jwtService.authenticateToken,teacherController.homeworkdelete)
router.post("/exam",jwtService.authenticateToken,teacherController.exam)
router.post("/examget",jwtService.authenticateToken,teacherController.examget)
router.post("/examdelete",jwtService.authenticateToken,teacherController.examdelete)
router.post("/point",jwtService.authenticateToken,teacherController.point)
router.post("/point/add",jwtService.authenticateToken,teacherController.pointadd)














module.exports = router