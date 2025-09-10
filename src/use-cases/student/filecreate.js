
const xlsx = require("xlsx")
let studentEnity = require("./../../domain/student/studentEnity")





async function filecreate(data, { StudentRepository }) {
    let kayiterror = []

    const dosya = xlsx.readFile(`./uploads/${data.filename}`)

    let sayfaAdi = dosya.SheetNames[0]
    let sayfa = dosya.Sheets[sayfaAdi]

    let veri = xlsx.utils.sheet_to_json(sayfa, { defval: null });


for (const element of veri) {
    const yapi = {
        Sinif: element["Sınıf *"],
        OgrenciNumara: String(element["Numara *"]),
        BabaAdSoyad: element["Baba Adı soyadı *"],
        AdSoyad: element["İsim Soyisim *"],
        AnneAdSoyad: element["Anne Adı Soyadı *"],
        TCKimlikNo: String(element["TC *"]),
        Cinsiyet: element["Cinsiyeti"] === "Erkek" ? 1 : 0,
        DogumTarihi: String(element["Doğum Tarihi"]),
        AnneEgitim: element["Anne Eğitim "],
        BabaEgitim: element["Baba Eğitim"],
        AnneMeslek: element["Anne Meslek"],
        BabaMeslek: element["Baba Meslek"],
        SuregenRahatsizlik: element["Süreğen rahatsızlık"],
        AylikGelir: element["Aylık gelir"],
        AnneTel: element["Anne Tel"],
        BabaTel: element["Baba Tel"],
        Engel: element["Engel"]  === "Var" ? 1 : 0,
        VeliDurum: element["Ber/Ayrı"]  === "Beraber" ? 1 : 0,
        Sag: element["Sağ"],
        photo: "default.png"
    };

    try {
        let res = await new studentEnity(yapi);
        let xx = await StudentRepository.studentCreate(res);
    } catch (error) {
        kayiterror.push({ isim: yapi.AdSoyad, OgrenciNumara: yapi.OgrenciNumara });
    }
}







    return kayiterror

}


module.exports = filecreate