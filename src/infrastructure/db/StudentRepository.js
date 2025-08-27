const sql = require("mssql")


let StudentRepository = {

    async studentCreate(data) {

        try {
            let result = await new sql.Request()
                .input("Sinif", sql.NVarChar, data.Sinif)
                .input("OgrenciNumara", sql.NVarChar, data.OgrenciNumara)
                .input("AdSoyad", sql.NVarChar, data.AdSoyad)
                .input("TCKimlikNo", sql.NVarChar, data.TCKimlikNo)
                .input("Cinsiyet", sql.Bit, data.Cinsiyet)
                .input("DogumTarihi", sql.Date, data.DogumTarihi)
                .input("AnneAdSoyad", sql.NVarChar, data.AnneAdSoyad)
                .input("BabaAdSoyad", sql.NVarChar, data.BabaAdSoyad)
                .input("VeliDurum", sql.Bit, data.VeliDurum)
                .input("Sag", sql.NVarChar, data.Sag)
                .input("Engel", sql.Bit, data.Engel)
                .input("AnneEgitim", sql.NVarChar, data.AnneEgitim)
                .input("BabaEgitim", sql.NVarChar, data.BabaEgitim)
                .input("AnneMeslek", sql.NVarChar, data.AnneMeslek)
                .input("BabaMeslek", sql.NVarChar, data.BabaMeslek)
                .input("SuregenRahatsizlik", sql.NVarChar, data.SuregenRahatsizlik)
                .input("AylikGelir", sql.NVarChar, data.AylikGelir)
                .input("AnneTel", sql.NVarChar, data.AnneTel)
                .input("BabaTel", sql.NVarChar, data.BabaTel)
                .input("photo", sql.NVarChar, data.photo)

                .query(`
            INSERT INTO [dbo].[Ogrenciler]
               ([Sinif]
               ,[OgrenciNumara]
               ,[AdSoyad]
               ,[TCKimlikNo]
               ,[Cinsiyet]
               ,[DogumTarihi]
               ,[AnneAdSoyad]
               ,[BabaAdSoyad]
               ,[VeliDurum]
               ,[Sag]
               ,[Engel]
               ,[AnneEgitim]
               ,[BabaEgitim]
               ,[AnneMeslek]
               ,[BabaMeslek]
               ,[SuregenRahatsizlik]
               ,[AylikGelir]
               ,[AnneTel]
               ,[BabaTel]
               ,[Fotograf]
               )
         VALUES
               (@Sinif
               ,@OgrenciNumara
               ,@AdSoyad
               ,@TCKimlikNo
               ,@Cinsiyet
               ,@DogumTarihi
               ,@AnneAdSoyad
               ,@BabaAdSoyad
               ,@VeliDurum
               ,@Sag
               ,@Engel
               ,@AnneEgitim
               ,@BabaEgitim
               ,@AnneMeslek
               ,@BabaMeslek
               ,@SuregenRahatsizlik
               ,@AylikGelir
               ,@AnneTel
               ,@BabaTel
               ,@photo
               )
                        
                        `)
            return true

        } catch (error) {
            console.log(error)
            throw new Error(`kayıt Hatası: ${error.message}`)
        }

    },
    async studentGetAll(){
        let result =await new sql.Request()
        .query(`select * from [okulkocu].[dbo].[Ogrenciler]`)
        
        return result.recordset
    }




}


module.exports = StudentRepository