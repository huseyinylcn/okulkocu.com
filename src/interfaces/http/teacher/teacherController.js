const TeacherCreate = require("./../../../use-cases/teacher/create")
const allGet = require("./../../../use-cases/teacher/allGet")
const scheduleUseCase = require("./../../../use-cases/teacher/schedule")
const derslerUseCase = require("./../../../use-cases/teacher/dersler")
const attendanceUseCase = require("./../../../use-cases/teacher/attendance")
const attendanceaddUseCase = require("./../../../use-cases/teacher/attendanceadd")
const homeworkUseCase = require("./../../../use-cases/teacher/homework")
const homeworkgetUseCase = require("./../../../use-cases/teacher/homeworkget")
const homeworkdeleteUseCase = require("./../../../use-cases/teacher/homeworkdelete")
const examUseCase = require("./../../../use-cases/teacher/exam")
const examgetUseCase = require("./../../../use-cases/teacher/examget")
const examdeleteUseCase = require("./../../../use-cases/teacher/examdelete")
const pointUseCase = require("./../../../use-cases/teacher/point")
const pointaddUseCase = require("./../../../use-cases/teacher/pointadd")

const { sendNotification } = require("./../../../infrastructure/middleware/fcm_token");











const TeacherRepository = require("./../../../infrastructure/db/TeacherRepository")

const helperFunc = require("./../../../utils/helperFunc")



async function create(req, res) {
    try {
        if (req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"

        let result = await TeacherCreate(req.body, { TeacherRepository })
        res.status(200).json({ result })

    } catch (error) {
        if (error.message.trim().includes("ad")) res.status(401).json({ error: error.message })
        else if (error.message.trim().includes("tttccc")) res.status(402).json({ error: error.message })
        else if (error.message.trim().includes("Telefon")) res.status(403).json({ error: error.message })
        else if (error.message.trim().includes("E-POSTA")) res.status(404).json({ error: error.message })
        else if (error.message.trim().includes("Bolum")) res.status(405).json({ error: error.message })
        else if (error.message.trim().includes("Doğum")) res.status(406).json({ error: error.message })

        else if (error.message.trim().includes("UQ__Ogretmen__7E1935ED47C9F5FB")) res.status(408).json({ error: error.message }) //tc kimlik
        else if (error.message.trim().includes("IX_Ogretmenler")) res.status(409).json({ error: error.message }) // eposta

        else res.status(400).json({ error: error.message })






        console.log(error.message)

    }
}

async function allTeacher(req, res) {
    try {
        let result = await allGet({ TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function schedule(req, res) {
    try {
        let result = await scheduleUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function dersler(req, res) {
    try {
        console.log(req.body)
        let result = await derslerUseCase(req.body, { TeacherRepository, helperFunc })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function attendance(req, res) {
    try {
        let result = await attendanceUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function attendanceadd(req, res) {
    try {
       
        let result = await attendanceaddUseCase(req.body, { TeacherRepository,sendNotification })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function homework(req, res) {
    try {
        console.log(req.body)

        if (req.file != undefined) req.body.photo = req.file.filename
        else req.body.photo = "default.png"


        let result = await homeworkUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function homeworkget(req, res) {
    try {

        let result = await homeworkgetUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function homeworkdelete(req, res) {
    try {

        console.log(req.body)

        let result = await homeworkdeleteUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


async function exam(req, res) {
    try {

        console.log(req.body)

        let result = await examUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function examget(req, res) {
    try {
        let result = await examgetUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
async function examdelete(req, res) {
    try {
        let result = await examdeleteUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}










async function point(req, res) {
    try {
        let result = await pointUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



async function pointadd(req, res) {
    try {
        let result = await pointaddUseCase(req.body, { TeacherRepository })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}



module.exports = { create, allTeacher, schedule, dersler, attendance, attendanceadd, homework, homeworkget, homeworkdelete, exam, examget, examdelete, point, pointadd }