const sql = require("mssql")

let TeacherRepository = {
    async Teachercreate(data){
       try {
         await new sql.Request()
         .input("AdSoyad",sql.NVarChar,data.AdSoyad)
         .input("Cinsiyet",sql.Bit,data.Cinsiyet)
         .input("DogumTarihi",sql.Date,data.DogumTarihi)
         .input("TCKimlikNo",sql.NVarChar,data.TCKimlikNo)
         .input("Telefon",sql.NVarChar,data.Telefon)
         .input("Eposta",sql.NVarChar,data.Eposta)
         .input("Bolum",sql.NVarChar,data.Bolum)
         .query(`INSERT INTO [dbo].[Ogretmenler]
           ([AdSoyad]
           ,[Cinsiyet]
           ,[DogumTarihi]
           ,[TCKimlikNo]
           ,[Telefon]
           ,[Eposta]
           ,[Bolum])
     VALUES
           (@AdSoyad
           ,@Cinsiyet
           ,@DogumTarihi
           ,@TCKimlikNo
           ,@Telefon
           ,@Eposta
           ,@Bolum
           )`)


         
       } catch (error) {
        throw new Error(`SQL Kayıt Hatası ${error.messsage}`)
       }
    }

}


module.exports = TeacherRepository