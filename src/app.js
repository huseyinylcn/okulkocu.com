const express = require("express")

const app = express()
app.use(express.json())

const student = require("./interfaces/http/student/studentRoutes")
const teacher = require("./interfaces/http/teacher/teacherRoutes")
const schedule = require("./interfaces/http/schedule/scheduleRoutes")

// const admin = require("./interfaces/http/admin/adminRoutes")
 

app.use("/api/student",student)
app.use("/api/teacher",teacher)
app.use("/api/schedule",schedule)

// app.use("/admin",admin)




module.exports = app