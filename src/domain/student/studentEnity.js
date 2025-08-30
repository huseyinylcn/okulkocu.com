


class StudentEnity{
    constructor({Sinif,OgrenciNumara,AdSoyad,TCKimlikNo,Cinsiyet,DogumTarihi,
        AnneAdSoyad,BabaAdSoyad,VeliDurum,Sag,Engel,AnneEgitim,BabaEgitim,AnneMeslek,BabaMeslek,SuregenRahatsizlik,AylikGelir,AnneTel,BabaTel,photo }){
        
        if (!AdSoyad ) throw new Error("Ad Soyad Girilmemiş")
        if (!OgrenciNumara ) throw new Error("Öğrenci Numarası Girilmemiş")
        if (!Sinif) throw new Error("Sınıf Girilmemiş")
        if (!BabaAdSoyad ) throw new Error("Baba Ad Soyadd Girilmemiş x3")
        if (!AnneAdSoyad ) throw new Error("Anne Ad Soyaddd Girilmemiş x4")
        if (!TCKimlikNo ) throw new Error("ccc v Tc Kimlik No Girilmemiş ccc v")
        
        
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
        this.photo = photo


    }
}

module.exports = StudentEnity