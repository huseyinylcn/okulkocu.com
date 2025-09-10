const router = require("express").Router()
const usersController = require("./usersController")
const upload = require("./../../../infrastructure/middleware/upload")

const jwtService = require("./../../../infrastructure/jwt/jwtService")


router.post("/login",usersController.login)
router.post("/create",jwtService.authenticateToken,upload.single("photo"),usersController.create)
router.post("/info",jwtService.authenticateToken,usersController.info)
router.post("/token",jwtService.authenticateToken,usersController.token)
router.post("/mesaj",jwtService.authenticateToken,usersController.mesaj)
router.post("/mesajget",jwtService.authenticateToken,usersController.mesajget)
router.post("/main/info",jwtService.authenticateToken,usersController.maininfo)








module.exports = router