const router = require("express").Router()
const usersController = require("./usersController")
const upload = require("./../../../infrastructure/middleware/upload")

const jwtService = require("./../../../infrastructure/jwt/jwtService")


router.post("/login",usersController.login)
router.post("/create",jwtService.authenticateToken,upload.single("photo"),usersController.create)
router.post("/info",jwtService.authenticateToken,usersController.info)







module.exports = router