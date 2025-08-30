const TeacherCreate = require("./../../../use-cases/teacher/create")
const allGet = require("./../../../use-cases/teacher/allGet")
const scheduleUseCase = require("./../../../use-cases/teacher/schedule")


const TeacherRepository = require("./../../../infrastructure/db/TeacherRepository")
const { json } = require("express")



async function create(req,res) {
    try {
        if(req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"
       
       let result = await TeacherCreate(req.body,{TeacherRepository})
       res.status(200).json({result})
        
    } catch (error) {
          if( error.message.trim().includes("ad") ) res.status(401).json({error:error.message})
          else if( error.message.trim().includes("tttccc") ) res.status(402).json({error:error.message})
        else if( error.message.trim().includes("Telefon") ) res.status(403).json({error:error.message})
     else if( error.message.trim().includes("E-POSTA") ) res.status(404).json({error:error.message})
          else if( error.message.trim().includes("Bolum") ) res.status(405).json({error:error.message})
          else if( error.message.trim().includes("Doğum") ) res.status(406).json({error:error.message})
          
         else if( error.message.trim().includes("UQ__Ogretmen__7E1935ED47C9F5FB") ) res.status(408).json({error:error.message}) //tc kimlik
        else if( error.message.trim().includes("IX_Ogretmenler") ) res.status(409).json({error:error.message}) // eposta
   
        else res.status(400).json({error:error.message})




        
        
        console.log(error.message)
        
    }
}

async function allTeacher(req,res) {
    try {
        let result = await allGet({TeacherRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


async function schedule(req,res) {
    try {
        let result = await scheduleUseCase(req.body,{TeacherRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}



module.exports = {create,allTeacher,schedule}