


async function attendanceadd(data, { TeacherRepository, sendNotification }) {







    let result = await TeacherRepository.attendanceadd(data)

    if (data.durum == 0) {
        try {
            let res = await TeacherRepository.attendanceNatfication(data)
            res.forEach(element => {
                sendNotification(
                    element.fcm_token,
                    "Devamsızlık Bilgisi",
                    `${element.AdSoyad} ${data.tarih} ${element.DersSaati} tarihinde ki ${element.Ders} dersine katılmamıştır.`,
                    { customKey: "customValue" }
                );

            });
        } catch (error) {
            return true
            // bildirim gitmediğini logla daha sonra tekrar göndermeyi dene

        }


    }




    return result
}


module.exports = attendanceadd







