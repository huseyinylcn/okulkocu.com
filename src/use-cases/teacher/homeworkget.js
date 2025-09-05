async function homeworkget(data,{TeacherRepository}) {
    let result = await TeacherRepository.homeworkget(data)
    return result
}

module.exports = homeworkget