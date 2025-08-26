const sql = require("mssql")
const scheduleEnity = require("../../domain/schedule/scheduleEnity")

let scheduleRepository = {
    async scheduleCreate(data){
        try {
            await new sql.Request()
            .input("Gun",sql.NVarChar,data.Gun)
            .input("DersSaati",sql.NVarChar,data.DersSaati)
            .input("OgretmenID",sql.Int,data.OgretmenID)
            .input("Sinif",sql.NVarChar,data.Sinif)
            .input("Ders",sql.NVarChar,data.Ders)
            .query(`
                INSERT INTO [dbo].[DersProgrami]
           ([Gun]
           ,[DersSaati]
           ,[OgretmenID]
           ,[Sinif]
           ,[Ders])
     VALUES
           (@Gun
           ,@DersSaati
           ,@OgretmenID
           ,@Sinif
           ,@Ders
           )
                `)
                return true
            
        } catch (error) {
            throw new Error(`Sql Kayıt Hatası ${error.message}`)
        }
    }
}



module.exports = scheduleRepository