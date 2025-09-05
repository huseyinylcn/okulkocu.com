async function pointadd(data,{TeacherRepository}) {
    let result = await TeacherRepository.pointadd(data)
    return result
}


module.exports = pointadd