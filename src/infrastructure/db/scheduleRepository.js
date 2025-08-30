const sql = require("mssql")


let scheduleRepository = {
    async scheduleCreate(data){
        try {
           let result=  await new sql.Request()
            .input("Gun",sql.NVarChar,data.Gun)
            .input("DersSaati",sql.NVarChar,data.DersSaati)
            .input("OgretmenID",sql.Int,data.OgretmenID)
            .input("Sinif",sql.NVarChar,data.Sinif)
            .input("Ders",sql.NVarChar,data.Ders)
            .query(`
     
DECLARE @NewID INT;

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
           ,@Ders);

SET @NewID = SCOPE_IDENTITY();

SELECT @NewID AS ProgramID;


                `)
                console.log(result.recordset[0].ProgramID)
                return result.recordset[0].ProgramID
            
        } catch (error) {
            console.log(error)
            throw new Error(`Sql Kayıt Hatası ${error.message}`)
        }
    },



    async getTeacher(data){
        try {
          
            let result = await new sql.Request()
            .input("id",sql.Int,data.id)
            .query(`
                SELECT *
  FROM [okulkocu].[dbo].[DersProgrami]
  WHERE OgretmenID = @id

                `)
                return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI")
        }

    },
    async scheduleDelete(data){
        try {
            await new sql.Request()
            .input("id",sql.Int,data.id)
            .query(`
                DELETE
                    FROM [okulkocu].[dbo].[DersProgrami]
                    WHERE ProgramID = @id
                `)
                return true
        } catch (error) {
             throw new Error("SQL DELETE HATASI")
        }
    }

}



module.exports = scheduleRepository