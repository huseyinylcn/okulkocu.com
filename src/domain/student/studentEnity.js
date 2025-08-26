


class StudentEnity{
    constructor({Sinif,OgrenciNumara,AdSoyad,TCKimlikNo,Cinsiyet,DogumTarihi,
        AnneAdSoyad,BabaAdSoyad,VeliDurum,Sag,Engel,AnneEgitim,BabaEgitim,AnneMeslek,BabaMeslek,SuregenRahatsizlik,AylikGelir,AnneTel,BabaTel }){
        if (!Sinif) throw new Error("Sınıf Girilmemiş")
        if (!OgrenciNumara ) throw new Error("Öğrenci Numarası Girilmemiş")
        if (!AdSoyad ) throw new Error("Ad Soyad Girilmemiş")
        if (!BabaAdSoyad ) throw new Error("Baba Ad Soyad Girilmemiş")
        if (!AnneAdSoyad ) throw new Error("Anne Ad Soyad Girilmemiş")
        if (!TCKimlikNo ) throw new Error("Tc Kimlik No Girilmemiş")
        
        this.Sinif = Sinif
        this.OgrenciNumara = OgrenciNumara
        this.AdSoyad = AdSoyad
        this.BabaAdSoyad = BabaAdSoyad
        this.AnneAdSoyad = AnneAdSoyad
        this.TCKimlikNo = TCKimlikNo
        this.Cinsiyet = Cinsiyet
        this.DogumTarihi = DogumTarihi
        this.AnneEgitim = AnneEgitim
        this.BabaEgitim = BabaEgitim
        this.AnneMeslek = AnneMeslek
        this.BabaMeslek = BabaMeslek
        this.SuregenRahatsizlik = SuregenRahatsizlik
        this.AylikGelir = AylikGelir
        this.AnneTel = AnneTel
        this.BabaTel = BabaTel
        this.Engel = Engel
        this.VeliDurum = VeliDurum
        this.Sag = Sag


    }
}

module.exports = StudentEnity