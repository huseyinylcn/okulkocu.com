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
           ,@Fotograf
           )`)



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
      .input("id", sql.Int,data.id)
        .query(`
        SELECT dp.*,
       o.AdSoyad
FROM [okulkocu].[dbo].[DersProgrami] dp
INNER JOIN [okulkocu].[dbo].[Ogretmenler] o
       ON dp.OgretmenID = o.OgretmenID
WHERE dp.OgretmenID = @id
  
          
          `)
          return result.recordsets[0]
    } catch (error) {
        throw new Error(`Sql Kayıt hatası ${error}`)
    }
  },
  
  

}


module.exports = TeacherRepository