const router = require("express").Router()

const scheduleController = require("./scheduleController")
const jwtService = require("./../../../infrastructure/jwt/jwtService")


router.post("/create",jwtService.authenticateToken,scheduleController.create)
router.post("/getteacher",jwtService.authenticateToken,scheduleController.getteacher)
router.post("/delete",jwtService.authenticateToken,scheduleController.scheduleDelete)



module.exports = router