

async function teacherGet(data,{scheduleRepository}) {
    return await scheduleRepository.getTeacher(data)
}



module.exports = teacherGet