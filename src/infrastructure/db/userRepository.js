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
      [AdSoyad]
      ,[Cinsiyet]
      ,[DogumTarihi]
      ,[TCKimlikNo]
      ,[Telefon]
      ,[Eposta]
      ,[Bolum]
      ,[Fotograf]
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
}




module.exports = userRepository




