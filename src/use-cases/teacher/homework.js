async function homework(data,{TeacherRepository}) {

    let result = await TeacherRepository.homework(data)
    return result
}


module.exports = homework