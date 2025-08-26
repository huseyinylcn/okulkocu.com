

class TeacherEnity{
    constructor({AdSoyad,Cinsiyet,DogumTarihi,TCKimlikNo,Telefon,Eposta,Bolum}){
        if(!AdSoyad) throw new Error("ad ve soyad girilmemiş")
        if(!Bolum) throw new Error("Bolum girilmemiş")
        if(!DogumTarihi) throw new Error("Doğum Tarihi Girilmemiş")
        if(!Telefon) throw new Error("Telefon Girilmemiş")
        if(!TCKimlikNo) throw new Error("Tc Kimlik NO Girilmemiş")


        this.AdSoyad = AdSoyad
        this.Cinsiyet = Cinsiyet
        this.DogumTarihi = DogumTarihi
        this.TCKimlikNo = TCKimlikNo
        this.Telefon = Telefon
        this.Eposta = Eposta
        this.Bolum = Bolum
        
    }
}



module.exports = TeacherEnity


