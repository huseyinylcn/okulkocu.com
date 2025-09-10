const sql = require("mssql")
const { lessonadd } = require("../../interfaces/http/schedule/scheduleController")


let scheduleRepository = {
    async scheduleCreate(data) {
        try {
            let result = await new sql.Request()
                .input("Gun", sql.NVarChar, data.Gun)
                .input("DersSaati", sql.NVarChar, data.DersSaati)
                .input("OgretmenID", sql.Int, data.OgretmenID)
                .input("Sinif", sql.NVarChar, data.Sinif)
                .input("Ders", sql.NVarChar, data.Ders)
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



    async getTeacher(data) {
        try {
            let result = await new sql.Request()
                .input("id", sql.Int, data.id)
                .input("tarih", sql.NVarChar, data.tarih)

                .query(`
                    SELECT dp.*, s.Derslik
                    FROM [okulkocu].[dbo].[DersProgrami]
                    dp inner join [okulkocu].[dbo].[Siniflar] s on dp.Sinif = s.SinifAdi  where dp.OgretmenID = @id and dp.Gun = @tarih

                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI")
        }

    },














    async scheduleDelete(data) {
        try {
            await new sql.Request()
                .input("id", sql.Int, data.id)
                .query(`
                DELETE
                    FROM [okulkocu].[dbo].[DersProgrami]
                    WHERE ProgramID = @id
                `)
            return true
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },
    async gain(data) {
        try {
            console.log(data)
            data.Sinif = data.Sinif[0]
            let result = await new sql.Request()
                .input("Ders", sql.NVarChar, data.Ders)
                .input("Sinif", sql.NVarChar, data.Sinif)

                .query(`
              
                SELECT *
                FROM [okulkocu].[dbo].[Kazanim] where Ders = @Ders and  Sinif = @Sinif

                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },
    async gainadd(data) {
        try {

            let result = await new sql.Request()
                .input("kazanim", sql.NVarChar, data.kazanim)
                .input("Sinif", sql.NVarChar, data.Sinif)
                .input("ProgramID", sql.Int, data.ProgramID)


                .query(`


                MERGE [dbo].[DersKazanimlari] AS target
USING (
    SELECT 
        @kazanim AS kazanim, 
        @Sinif AS Sinif, 
        CAST(GETDATE() AS DATE) AS tarih,  -- sadece gün bazında kontrol
        @ProgramID AS ProgramID
) AS source
ON (
    target.Sinif = source.Sinif 
    AND target.ProgramID = source.ProgramID 
    AND CAST(target.tarih AS DATE) = source.tarih
)
WHEN MATCHED THEN
    UPDATE SET kazanim = source.kazanim
WHEN NOT MATCHED THEN
    INSERT (kazanim, Sinif, tarih, ProgramID)
    VALUES (source.kazanim, source.Sinif, source.tarih, source.ProgramID);


                `)
            return true
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },



    async getclass(data) {
        try {

            let result = await new sql.Request()
                .input("Sinif", sql.NVarChar, data.Sinif)
                .query(`

                SELECT dp.Gun, dp.DersSaati, dp.Sinif, Dp.Ders, o.AdSoyad, s.Derslik
                FROM [okulkocu].[dbo].[DersProgrami] dp 
                inner join [okulkocu].[dbo].[Ogretmenler] o on dp.OgretmenID = o.OgretmenID inner join [okulkocu].[dbo].[Siniflar] s on s.SinifAdi = dp.Sinif
                where Sinif = @Sinif

                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },




      async dersler(data) {
        try {

            let result = await new sql.Request()
                .query(`
                        SELECT *
                        FROM [okulkocu].[dbo].[Dersler]
                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },


   async schools(data) {
        try {

            let result = await new sql.Request()
                .query(`
                        SELECT *
                        FROM [okulkocu].[dbo].[Okullar]
                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },

       async lessonadd(data) {
        try {

            let result = await new sql.Request()
            .input("lesson",sql.NVarChar,data.lesson)
                .query(`
                INSERT INTO [dbo].[Dersler]
                    ([isim])
                VALUES
                (@lesson)
                `)
            return true
        } catch (error) {
    
            throw new Error("SQL DELETE HATASI")
        }
    },


    async lessondelete(data) {
        try {

            let result = await new sql.Request()
            .input("lesson",sql.NVarChar,data.lesson)
                .query(`
                    DELETE
                    FROM [okulkocu].[dbo].[Dersler] where isim = @lesson
                `)
            return true
        } catch (error) {
    
            throw new Error("SQL DELETE HATASI")
        }
    },
}


module.exports = scheduleRepository