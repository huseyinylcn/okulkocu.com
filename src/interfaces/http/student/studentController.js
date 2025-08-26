const StudentCreate = require("./../../../use-cases/student/create")
const StudentRepository = require("../../../infrastructure/db/StudentRepository")



async function create(req,res) {
    try {
       
       let result = await StudentCreate(req.body,{StudentRepository})
       res.status(201).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {create}