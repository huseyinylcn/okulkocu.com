

class TeacherEnity{
    constructor({AdSoyad,Cinsiyet,DogumTarihi,TCKimlikNo,Telefon,Eposta,Bolum,photo}){
        if(!AdSoyad) throw new Error("ad ve soyad girilmemiş")
        if(!TCKimlikNo) throw new Error("Tc Kimlik NO Girilmemiş tttccc")
        if(!Telefon) throw new Error("Telefon Girilmemiş")
            if(!Eposta) throw new Error("E-POSTA ")
        if(!Bolum) throw new Error("Bolum girilmemiş")
        if(!DogumTarihi) throw new Error("Doğum Tarihi Girilmemiş")
        
        
        



        this.AdSoyad = AdSoyad
        this.Cinsiyet = Cinsiyet
        this.DogumTarihi = DogumTarihi
        this.TCKimlikNo = TCKimlikNo
        this.Telefon = Telefon
        this.Eposta = Eposta
        this.Bolum = Bolum
        this.Fotograf = photo
    }
}



module.exports = TeacherEnity


