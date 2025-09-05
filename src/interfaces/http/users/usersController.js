const userRepository = require("./../../../infrastructure/db/userRepository")

const loginC = require("./../../../use-cases/users/login")
const createAdmin = require("./../../../use-cases/users/create")
const infoUser = require("./../../../use-cases/users/info")
const tokenUseCase = require("./../../../use-cases/users/token")



const jwtService = require("./../../../infrastructure/jwt/jwtService")


async function login(req,res) {
    try {
     
        let result = await loginC(req.body,{userRepository,jwtService})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
async function create(req,res) {
    try {

         if(req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"
       

        let result = await createAdmin(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

async function info(req,res) {
    try {
        let result = await infoUser(req.user,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


async function token(req,res) {
    try {
        let result = await tokenUseCase(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}







module.exports = {login,create,info,token}