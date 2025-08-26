const TeacherCreate = require("./../../../use-cases/teacher/create")
const TeacherRepository = require("./../../../infrastructure/db/TeacherRepository")



async function create(req,res) {
    try {
       let result = await TeacherCreate(req.body,{TeacherRepository})
       res.status(200).json({result})
        
    } catch (error) {
        
        res.status(400).json({error:error.message})
    }
}


module.exports = {create}