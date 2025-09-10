const router = require("express").Router()

const scheduleController = require("./scheduleController")
const jwtService = require("./../../../infrastructure/jwt/jwtService")


router.post("/create",jwtService.authenticateToken,scheduleController.create)
router.post("/getteacher",jwtService.authenticateToken,scheduleController.getteacher)
router.post("/get",jwtService.authenticateToken,scheduleController.getclass)

router.post("/delete",jwtService.authenticateToken,scheduleController.scheduleDelete)
router.post("/gain",jwtService.authenticateToken,scheduleController.gain)
router.post("/gainadd",jwtService.authenticateToken,scheduleController.gainadd)
router.post("/dersler",jwtService.authenticateToken,scheduleController.dersler)
router.post("/lesson/add",jwtService.authenticateToken,scheduleController.lessonadd)
router.post("/lesson/delete",jwtService.authenticateToken,scheduleController.lessondelete)




router.post("/schools",scheduleController.schools)





module.exports = router