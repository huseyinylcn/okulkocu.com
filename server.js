require("dotenv").config()
const connectDB = require("./src/config/database")
const app = require("./src/app")

const PORT = process.env.PORT || 3000


connectDB().then(result => {
    console.log("Bağlantı Başarılı :)", result)
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })

}).catch(err => {
    console.log("Hata || Veri Tabanına Bağlanılamadı :(", err)
})