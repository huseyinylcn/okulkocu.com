
const scheduleCreate = require("./../../../use-cases/schedule/create")
const teacherget = require("./../../../use-cases/schedule/tacherget")
const scheduleDeleteUseCase = require("./../../../use-cases/schedule/scheduleDelete")


const scheduleRepository = require("./../../../infrastructure/db/scheduleRepository")


async function create(req,res) {
   try {
        let result =  await scheduleCreate(req.body,{scheduleRepository})
        res.status(200).json(result)
 
   } catch (error) {
        res.status(400).json({error:error.message})
   }


}

async function getteacher(req,res,next) {
     try {
          let result = await teacherget(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}



async function scheduleDelete(req,res,next) {
     try {
        let result = await scheduleDeleteUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}





module.exports = {create,getteacher,scheduleDelete}