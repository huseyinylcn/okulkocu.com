const StudentCreate = require("./../../../use-cases/student/create")
const allGet = require("./../../../use-cases/student/allGet")

const StudentRepository = require("../../../infrastructure/db/StudentRepository")



async function create(req,res) {
    try {
        

        if(req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"
       
        

        
       let result = await StudentCreate(req.body,{StudentRepository})
     
       res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
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

module.exports = {create,all}