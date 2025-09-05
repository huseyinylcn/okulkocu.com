async function homework(data,{StudentRepository}) {
    let result = await StudentRepository.homework(data)
    return result

    
}

module.exports = homework