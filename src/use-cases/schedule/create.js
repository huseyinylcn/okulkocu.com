const scheduleEnity = require("./../../domain/schedule/scheduleEnity")


async function create(data,{scheduleRepository}) {
    let result = await new scheduleEnity(data)
    await scheduleRepository.scheduleCreate(result)
    return result
}


module.exports = create