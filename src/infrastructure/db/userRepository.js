const sql = require("mssql")





const userRepository = {
    async login(data) {
        try {
            console.log(data)
            let result = await new sql.Request()
                .input("username", sql.NVarChar, data.username)
                .input("password", sql.NVarChar, data.password)
                .query(`
                EXEC CheckUser @Username = @username, @Password = @password`)
            return result.recordset[0]
        } catch (error) {
            return false
        }
    },
    async createAdmin(data) {
        try {

            await new sql.Request()
                .input("AdSoyad", sql.NVarChar, data.AdSoyad)
                .input("Cinsiyet", sql.NVarChar, data.Cinsiyet)
                .input("DogumTarihi", sql.Date, data.DogumTarihi)
                .input("TCKimlikNo", sql.NVarChar, data.TCKimlikNo)
                .input("Telefon", sql.NVarChar, data.Telefon)
                .input("Eposta", sql.NVarChar, data.Eposta)
                .input("Bolum", sql.NVarChar, data.Bolum)
                .input("Fotograf", sql.NVarChar, data.photo)
                .query(`
                INSERT INTO [dbo].[Yoneticiler]
           ([AdSoyad]
           ,[Cinsiyet]
           ,[DogumTarihi]
           ,[TCKimlikNo]
           ,[Telefon]
           ,[Eposta]
           ,[Bolum]
           ,[Fotograf])
     VALUES
           (@AdSoyad
           ,@Cinsiyet
           ,@DogumTarihi
           ,@TCKimlikNo
           ,@Telefon
           ,@Eposta
           ,@Bolum
           ,@Fotograf
           )
                `)

            return true
        } catch (error) {
            console.log(error)
            throw new Error("SQL HATASI")
        }
    },
    async adminInfo(data) {

        try {
            let result = await new sql.Request()
                .input("id", sql.NVarChar, data.id)
                .query(`
                SELECT 
 *
  FROM [okulkocu].[dbo].[Yoneticiler] where AdminID = @id
                `)
            return result
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    async studentInfo(data) {
        try {
            let result = await new sql.Request()
                .input("id", sql.NVarChar, data.id)
                .query(`
               SELECT *
  FROM [okulkocu].[dbo].[Ogrenciler] where OgrenciId = @id

                `)
            return result
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    async teacherInfo(data) {

        try {



            let result = await new sql.Request()
                .input("id", sql.NVarChar, data.id)
                .query(`
                SELECT 
      [AdSoyad]
      ,[Cinsiyet]
      ,[DogumTarihi]
      ,[TCKimlikNo]
      ,[Telefon]
      ,[Eposta]
      ,[Bolum]
      ,[Fotograf]
      ,[OgretmenID]
  FROM [okulkocu].[dbo].[Ogretmenler] where OgretmenID = @id
                `)
            return result
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    async token(data) {

        try {



            let result = await new sql.Request()
                .input("fcm_token", sql.NVarChar, data.fcm_token)
                .input("user_id", sql.Int, data.user_id)
                .input("user_type", sql.NVarChar, data.user_type)

                .query(`
                        MERGE [dbo].[FCM_TOKEN] AS target
                        USING (VALUES (@user_type, @user_id, @fcm_token)) AS source ([user_type], [user_id], [fcm_token])
                            ON target.[fcm_token] = source.[fcm_token]
                        WHEN MATCHED THEN 
                            UPDATE SET 
                                target.[user_type] = source.[user_type],
                                target.[user_id] = source.[user_id]
                        WHEN NOT MATCHED THEN
                            INSERT ([user_type], [user_id], [fcm_token])
                            VALUES (source.[user_type], source.[user_id], source.[fcm_token]);
                `)
            return true
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    async mesaj(data) {

        try {



            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`

                INSERT INTO [dbo].[mesaj]
                    ([mesaj]
                    ,[gonderenTipi]
                    ,[gonderenID]
                    ,[aliciTipi]
                    ,[AliciID]
                    ,[tarih])
                VALUES
                    (@mesaj
                    ,@gonderenTipi
                    ,@gonderenID
                    ,@aliciTipi
                    ,@AliciID
                    ,GETDATE())



                `)
            return true
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    },

   async mesaj1(data) {

        try {



            let result = await new sql.Request()
    
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                    
                    SELECT o.AdSoyad, o.Sinif, o.OgrenciNumara, tk.*
                    FROM [okulkocu].[dbo].[FCM_TOKEN] tk
                    left join [okulkocu].[dbo].[Ogrenciler] o on o.OgrenciId = @gonderenID
                    where tk.[user_type] = @aliciTipi and tk.[user_id] = @AliciID



                `)
            return result.recordset
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },




    async mesaj2(data) {

        try {
            let result = await new sql.Request()
    
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                    
                SELECT o.AdSoyad, tk.*
                FROM [okulkocu].[dbo].[FCM_TOKEN] tk
                left join [okulkocu].[dbo].[Ogretmenler] o on o.OgretmenID = @gonderenID
                where tk.[user_type] = @aliciTipi and tk.[user_id] = @AliciID


                `)
            return result.recordset
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    
    async mesaj3(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                SELECT  tk.*,og.AdSoyad 
                FROM [okulkocu].[dbo].[FCM_TOKEN] tk
                inner join [okulkocu].[dbo].[Ogretmenler] og on og.OgretmenID = @gonderenID

                left join [okulkocu].[dbo].[Ogrenciler] o on o.Sinif = @AliciID
                where tk.[user_type] = 'student' and tk.[user_id] = o.OgrenciId



                `)
            return result.recordset
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },






        async mesaj4(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                    SELECT  tk.*
                    FROM [okulkocu].[dbo].[FCM_TOKEN] tk
                    where tk.[user_type] = 'teacher' 
                    `)
            return result.recordset
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },





    
        async mesaj5(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                    SELECT  tk.*
                    FROM [okulkocu].[dbo].[FCM_TOKEN] tk
                    where tk.[user_type] = 'student' 
                    `)
            return result.recordset
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

        async mesaj6(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                   
                    SELECT  tk.*
                    FROM [okulkocu].[dbo].[FCM_TOKEN] tk
                    left join [okulkocu].[dbo].[Ogrenciler] o on o.Sinif = @AliciID
                    where tk.[user_type] = 'student' and tk.[user_id] = o.OgrenciId

                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    },





        async mesaj7(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                   
                   SELECT  tk.*, o.OgrenciNumara, o.AdSoyad,o.Sinif
                    FROM [okulkocu].[dbo].[FCM_TOKEN] tk
                    left join [okulkocu].[dbo].[Ogrenciler] o on o.OgrenciId = @gonderenID
                    where tk.[user_type] = 'admin' 


                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    },





   async mesajget(data) {

        try {
            let result = await new sql.Request()




                .query(`
        
                SELECT 
                
                ms.mesaj,ms.gonderenTipi, ms.tarih,

                CASE 
                        WHEN ms.gonderenTipi = 'teacher' THEN og.AdSoyad
                        WHEN ms.gonderenTipi = 'student'   THEN o.AdSoyad
                    END AS AdSoyad
                    ,  CASE 
                        WHEN ms.gonderenTipi = 'teacher' THEN '-'
                        WHEN ms.gonderenTipi = 'student'   THEN o.Sinif
                    END AS Sinif
                    ,  CASE 
                        WHEN ms.gonderenTipi = 'teacher' THEN '-'
                        WHEN ms.gonderenTipi = 'student'   THEN o.OgrenciNumara
                    END AS OgrenciNumara

                FROM [okulkocu].[dbo].[mesaj] ms


                left join [okulkocu].[dbo].[Ogretmenler] og on ms.gonderenTipi = 'teacher' and ms.gonderenID = og.OgretmenID

                left join [okulkocu].[dbo].[Ogrenciler] o on ms.gonderenTipi = 'student' and ms.gonderenID = o.OgrenciId


                    where ms.aliciTipi = 'admin' 

                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    },


 async maininfo(data) {

        try {
            let result = await new sql.Request()
             .query(`
                  
                        WITH SinavOrtalama AS (
                            SELECT 
                                s.Ders,
                                s.Sinif,
                                n.SinavId,
                                AVG(TRY_CAST(n.puan AS FLOAT)) AS sinav_ortalama,
                                (SELECT AVG(TRY_CAST(nn.puan AS FLOAT)) 
                                FROM [okulkocu].[dbo].[notlar] nn) AS genel_ortalama
                            FROM [okulkocu].[dbo].[notlar] n
                            LEFT JOIN [okulkocu].[dbo].[sinavlar] s 
                                ON s.id = n.SinavId
                            GROUP BY s.Ders, s.Sinif, n.SinavId
                        ),
                        YoklamaIstatistik AS (
                            SELECT 
                                (SELECT COUNT(*) 
                                FROM [okulkocu].[dbo].[yoklama] y
                                INNER JOIN [okulkocu].[dbo].[Ogrenciler] o ON y.OgrenciID = o.OgrenciID
                                WHERE CAST(y.tarih AS DATE) = CAST(GETDATE() AS DATE)
                                AND y.durum = 0) AS gunluk_gelmeyenler,

                                (SELECT COUNT(*) 
                                FROM [okulkocu].[dbo].[yoklama] y
                                INNER JOIN [okulkocu].[dbo].[Ogrenciler] o ON y.OgrenciID = o.OgrenciID
                                WHERE y.tarih BETWEEN DATEADD(MONTH, -1, GETDATE()) AND GETDATE()
                                AND y.durum = 0) AS aylik_gelmeyenler,

                                (SELECT COUNT(*) 
                                FROM [okulkocu].[dbo].[Ogrenciler]) AS toplam_ogrenci
                        )
                        SELECT 
                            s.Ders,
                            s.Sinif,
                            s.SinavId,
                            s.sinav_ortalama,
                            s.genel_ortalama,
                            y.gunluk_gelmeyenler,
                            y.aylik_gelmeyenler,
                            y.toplam_ogrenci
                        FROM SinavOrtalama s
                        CROSS JOIN YoklamaIstatistik y;


                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    },









}











module.exports = userRepository




