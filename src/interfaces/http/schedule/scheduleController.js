
const scheduleCreate = require("./../../../use-cases/schedule/create")
const scheduleRepository = require("./../../../infrastructure/db/scheduleRepository")


async function create(req,res) {
   try {
        let result =  await scheduleCreate(req.body,{scheduleRepository})
        res.status(200).json(result)
 
   } catch (error) {
        res.status(400).json({error:error.message})
   }


}







module.exports = {create}