const userRepository = require("./../../../infrastructure/db/userRepository")

const loginC = require("./../../../use-cases/users/login")
const createAdmin = require("./../../../use-cases/users/create")
const infoUser = require("./../../../use-cases/users/info")
const tokenUseCase = require("./../../../use-cases/users/token")
const mesajUseCase = require("./../../../use-cases/users/mesaj")
const { sendNotification } = require("./../../../infrastructure/middleware/fcm_token");

let mesajgetUseCase = require("./../../../use-cases/users/mesajget")
let maininfoUseCase = require("./../../../use-cases/users/maininfo")


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



async function mesaj(req,res) {
    try {
        let result = await mesajUseCase(req.body,{userRepository,sendNotification})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}


async function mesajget(req,res) {
    try {
        let result = await mesajgetUseCase(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}


async function maininfo(req,res) {
    try {
        let result = await maininfoUseCase(req.body,{userRepository})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}

module.exports = {login,create,info,token,mesaj,mesajget,maininfo}