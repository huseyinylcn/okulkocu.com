async function exam(data,{TeacherRepository}) {
    let result = await TeacherRepository.exam(data)
    return result
}


module.exports = exam