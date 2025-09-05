
const scheduleCreate = require("./../../../use-cases/schedule/create")
const teacherget = require("./../../../use-cases/schedule/tacherget")
const scheduleDeleteUseCase = require("./../../../use-cases/schedule/scheduleDelete")
const gainUseCase = require("./../../../use-cases/schedule/gain")
const gainaddUseCase = require("./../../../use-cases/schedule/gainadd")
const getclassUseCase = require("./../../../use-cases/schedule/getclass")
const derslerUseCase = require("./../../../use-cases/schedule/dersler")
const schoolsUseCase = require("./../../../use-cases/schedule/schools")
const scheduleRepository = require("./../../../infrastructure/db/scheduleRepository")






// Örnek kullanım



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


async function gain(req,res,next) {
     try {
        let result = await gainUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}


async function gainadd(req,res,next) {
     try {
        let result = await gainaddUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}

async function getclass(req,res,next) {
     try {
        let result = await getclassUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}

async function dersler(req,res,next) {
     try {
        let result = await derslerUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}





async function schools(req,res,next) {
     try {



        let result = await schoolsUseCase(req.body,{scheduleRepository})
         res.status(200).json(result)
     } catch (error) {
          res.status(400).json({error:error.message})
     }
}



module.exports = {create,getteacher,scheduleDelete,gain,gainadd,getclass,dersler,schools}