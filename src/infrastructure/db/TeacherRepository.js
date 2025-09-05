const sql = require("mssql")


let TeacherRepository = {
  async Teachercreate(data) {
    try {
      await new sql.Request()
        .input("AdSoyad", sql.NVarChar, data.AdSoyad)
        .input("Cinsiyet", sql.Bit, data.Cinsiyet)
        .input("DogumTarihi", sql.Date, data.DogumTarihi)
        .input("TCKimlikNo", sql.NVarChar, data.TCKimlikNo)
        .input("Telefon", sql.NVarChar, data.Telefon)
        .input("Eposta", sql.NVarChar, data.Eposta)
        .input("Bolum", sql.NVarChar, data.Bolum)
        .input("Fotograf", sql.NVarChar, data.Fotograf)

        .query(`INSERT INTO [dbo].[Ogretmenler]
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
                      ,@Fotograf)`)



    } catch (error) {

      throw new Error(`SQL Kayıt Hatası ${error.message}`)
    }
  },
  async allTeacherGet() {
    try {
      let result = await new sql.Request()
        .query(`SELECT *
                FROM [okulkocu].[dbo].[Ogretmenler]`)
      return result.recordsets[0]
    } catch (error) {
      throw new Error(`Sql Kayıt hatası ${error}`)
    }
  },

  async scheduleGet(data) {
    try {
      let result = await new sql.Request()
        .input("id", sql.Int, data.id)
        .query(`
              SELECT dp.*,
                o.AdSoyad
              FROM [okulkocu].[dbo].[DersProgrami] dp
              INNER JOIN [okulkocu].[dbo].[Ogretmenler] o
                    ON dp.OgretmenID = o.OgretmenID
              WHERE dp.OgretmenID = @id`)
      return result.recordsets[0]
    } catch (error) {
      throw new Error(`Sql Kayıt hatası ${error}`)
    }
  },

  async dersler(data) {
    try {

      let result = await new sql.Request()
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("Gun", sql.NVarChar, data.Gun)

        .query(`
            SELECT *
            FROM [okulkocu].[dbo].[DersProgrami] where Gun = @Gun and Sinif = @Sinif
        `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },



  async attendance(data) {
    try {
      console.log(data)
      let result = await new sql.Request()
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("tarih", sql.NVarChar, data.Tarih)
        .input("DersSaati", sql.NVarChar, data.DersSaati)
        .input("ProgramID", sql.Int, data.ProgramID)

        .query(`
           SELECT 
                o.OgrenciId,
                o.OgrenciNumara,
                o.AdSoyad,
                dp.ProgramID,
                dp.Gun,
                dp.DersSaati,
                dp.Ders,
                @tarih as tarih,
                y.durum
            FROM Ogrenciler o
            INNER JOIN DersProgrami dp
                ON o.Sinif = dp.Sinif



            LEFT JOIN yoklama y
                ON o.OgrenciId = y.OgrenciID
              AND dp.ProgramID = y.ProgramID
              AND y.tarih = @tarih


            WHERE o.Sinif = @Sinif
              AND dp.DersSaati = @DersSaati
              AND dp.ProgramID = @ProgramID

`)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },














  async attendanceadd(data) {
    try {

      let result = await new sql.Request()
        .input("tarih", sql.Date, data.tarih)
        .input("OgrenciID", sql.Int, data.OgrenciID)
        .input("ProgramID", sql.Int, data.ProgramID)
        .input("durum", sql.Int, data.durum)

        .query(`
          DELETE FROM [dbo].[yoklama]
          WHERE tarih = @tarih
            AND OgrenciID = @OgrenciID
            AND ProgramID = @ProgramID;

          INSERT INTO [dbo].[yoklama] (tarih, OgrenciID, ProgramID, durum)
          VALUES (@tarih, @OgrenciID, @ProgramID, @durum);



  `)

      return true

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },








  async attendanceNatfication(data) {
    try {

      let result = await new sql.Request()
        .input("OgrenciID", sql.Int, data.OgrenciID)
        .input("ProgramID", sql.Int, data.ProgramID)


        .query(`
 SELECT tk.fcm_token, o.OgrenciId, o.OgrenciNumara, dp.DersSaati, dp.Ders,o.AdSoyad
  FROM [okulkocu].[dbo].[FCM_TOKEN] tk
  inner join [okulkocu].[dbo].[Ogrenciler] o on o.OgrenciId = tk.[user_id]
  inner join [okulkocu].[dbo].[DersProgrami] dp on dp.ProgramID = @ProgramID
  where [user_type] = 'student' and [user_id] = @OgrenciID


          
  `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },










  async homework(data) {
    try {
 
      let result = await new sql.Request()
        .input("DersAdi", sql.NVarChar, data.DersAdi)
        .input("Konu", sql.NVarChar, data.Konu)
        .input("Aciklama", sql.NVarChar, data.Aciklama)
        .input("TeslimTarihi", sql.Date, data.TeslimTarihi)
        .input("puan", sql.NVarChar, data.puan)
        .input("durum", sql.NVarChar, data.durum)
        .input("tarih", sql.Date, data.tarih)
        .input("OgrenciNo", sql.Int, data.OgrenciNumara)
        .input("KayitTuru", sql.Int, data.KayitTuru)
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("OgretmenID", sql.Int, data.OgretmenID)

        .input("Fotograf", sql.NVarChar, data.photo)




        .query(`
            INSERT INTO [dbo].[odev]
           ([DersAdi]
           ,[Konu]
           ,[Aciklama]
           ,[TeslimTarihi]
           ,[puan]
           ,[durum]
           ,[Fotograf]
           ,[tarih]
           ,[OgrenciID]
           ,[KayitTuru]
           ,[Sinif]
           ,[OgretmenID])
     VALUES
           (
             @DersAdi,
             @Konu,
             @Aciklama,
             @TeslimTarihi,
             @puan,
             @durum,
             @Fotograf,
             GETDATE(),
             (SELECT OgrenciID FROM [dbo].[Ogrenciler] WHERE OgrenciNumara = @OgrenciNo),
             @KayitTuru,
             @Sinif,
             @OgretmenID
           );
          `)

      return true

    } catch (error) {
      console.log(error)
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },





  async homeworkget(data) {
    try {
     
      let result = await new sql.Request()
        .input("OgretmenID", sql.Int, data.OgretmenID)


        .query(`
      SELECT *
      FROM [okulkocu].[dbo].[odev] where OgretmenID = @OgretmenID

      `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },











  async homeworkdelete(data) {
    try {

      let result = await new sql.Request()
        .input("id", sql.Int, data.id)


        .query(`
        delete
          FROM [okulkocu].[dbo].[odev] where id = @id


      `)

      return true

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },




    async exam(data) {
    try {

      let result = await new sql.Request()
        .input("Tarih", sql.Date, data.Tarih)
        .input("SinavSuresi", sql.NVarChar, data.SinavSuresi)
        .input("Ders", sql.NVarChar, data.Ders)
        .input("Puan", sql.NVarChar, data.Puan)
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("SinavAdi", sql.NVarChar, data.SinavAdi)
        .input("Aciklama", sql.NVarChar, data.Aciklama)
        .input("OgretmenID", sql.Int, data.OgretmenID)




        .query(`
 
            INSERT INTO [dbo].[sinavlar]
                  ([Tarih]
                  ,[SinavSuresi]
                  ,[Ders]
                  ,[Puan]
                  ,[Sinif]
                  ,[SinavAdi]
                  ,[Aciklama]
                  ,[OgretmenID])
            VALUES
                  (@Tarih
                  ,@SinavSuresi
                  ,@Ders
                  ,@Puan
                  ,@Sinif
                  ,@SinavAdi
                  ,@Aciklama
                  ,@OgretmenID)


      `)

      return true

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },






  async examget(data) {
    try {
  
      let result = await new sql.Request()

        .input("OgretmenID", sql.Int, data.OgretmenID)
        .query(`
            SELECT *
            FROM [okulkocu].[dbo].[sinavlar] where OgretmenID = @OgretmenID
              `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },







  async examdelete(data) {
    try {
    
      let result = await new sql.Request()

        .input("id", sql.Int, data.SinavID)
        .query(`
            delete FROM [okulkocu].[dbo].[sinavlar] where id = @id
delete from notlar where SinavId = @id
              `)

      return true

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },



  async point(data) {
    try {
 
      let result = await new sql.Request()

        .input("id", sql.Int, data.id)
        .query(`
              SELECT  s.id,o.AdSoyad, o.OgrenciId, o.OgrenciNumara, n.puan
              FROM [okulkocu].[dbo].[sinavlar] s
              inner join [okulkocu].[dbo].[Ogrenciler]  o on s.Sinif = o.Sinif
              left join [okulkocu].[dbo].[notlar] n on s.id = n.SinavId and o.OgrenciId = n.OgrenciId
              where s.id = @id
              `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },


  async pointadd(data) {
    try {
    console.log(data)
      let result = await new sql.Request()

        .input("puan", sql.Int, data.puan)
        .input("OgrenciId", sql.Int, data.OgrenciId)
        .input("SinavId", sql.Int, data.SinavId)

        .query(`
    MERGE [dbo].[notlar] AS target
    USING (SELECT @OgrenciId AS OgrenciId, @SinavId AS SinavId, @puan AS puan) AS source
    ON (target.OgrenciId = source.OgrenciId AND target.SinavId = source.SinavId)
    WHEN MATCHED THEN
        UPDATE SET puan = source.puan
    WHEN NOT MATCHED THEN
        INSERT (puan, OgrenciId, SinavId)
        VALUES (source.puan, source.OgrenciId, source.SinavId);

              `)

      return true

    } catch (error) {
      console.log(error)
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },













}


module.exports = TeacherRepository