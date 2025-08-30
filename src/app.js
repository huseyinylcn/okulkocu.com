const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()
app.use(express.json())
app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


const student = require("./interfaces/http/student/studentRoutes")
const teacher = require("./interfaces/http/teacher/teacherRoutes")
const schedule = require("./interfaces/http/schedule/scheduleRoutes")
const users = require("./interfaces/http/users/usersRoutes")

// const admin = require("./interfaces/http/admin/adminRoutes")
 


app.use("/api/student",student)
app.use("/api/teacher",teacher)
app.use("/api/schedule",schedule)
app.use("/api/user",users)

// app.use("/admin",admin)




module.exports = app