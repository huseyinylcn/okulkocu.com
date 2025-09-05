const StudentCreate = require("./../../../use-cases/student/create")
const allGet = require("./../../../use-cases/student/allGet")
const classAddUseCase = require("./../../../use-cases/student/classAdd")
const homeworkUseCase = require("./../../../use-cases/student/homework")
const attendanceUseCase = require("./../../../use-cases/student/attendance")
const examUseCase = require("./../../../use-cases/student/exam")
const pointUseCase = require("./../../../use-cases/student/point")




const classGet = require("./../../../use-cases/student/classGet")



const StudentRepository = require("../../../infrastructure/db/StudentRepository")



async function create(req,res) {
    try {
        

        if(req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"

       
        

        
       let result = await StudentCreate(req.body,{StudentRepository})
     
       res.status(201).json(result)
    } catch (error) {
        console.log(error)
        if((error.message).includes("UNIQUE KEY")) res.status(401).json({error:error.message})

        else if( error.message.trim().includes("ccc v") ) {
            console.log("gel amk evldı gel")
            res.status(408).json({error:error.message})
        
        }

        else if((error.message).includes("Sınıf")) res.status(402).json({error:error.message})

        else if((error.message).includes("Öğrenci")) res.status(403).json({error:error.message})

        else if((error.message).includes("x3")) res.status(405).json({error:error.message})

        else if((error.message).includes("x4")) res.status(406).json({error:error.message})

        else if((error.message).includes("Soyad")) res.status(404).json({error:error.message})
        
       
        
    


        else res.status(400).json({error:error.message})
    }
}



async function all(req,res) {
    try {

        let result = await allGet({StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}


async function classAll(req,res) {
    try {
        let result = await classGet({StudentRepository})
   
        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

async function classAdd(req,res) {
    try {
        let result = await classAddUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}


async function homework(req,res) {
    try {
        console.log(req.body)
        let result = await homeworkUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}


async function attendance(req,res) {
    try {
        console.log(req.body)
        let result = await attendanceUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

async function exam(req,res) {
    try {
       
        let result = await examUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}


async function point(req,res) {
    try {
       
        let result = await pointUseCase(req.body,{StudentRepository})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

module.exports = {create,all,classAdd,classAll,homework,attendance,exam,point}