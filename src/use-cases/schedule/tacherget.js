    const gunler = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi"
];

async function teacherGet(data,{scheduleRepository}) {
    
    const bugun = new Date();
    const gun = gunler[bugun.getDay()]; 
    data.tarih = gun
    return await scheduleRepository.getTeacher(data)
}



module.exports = teacherGet