

let helperfunc = {
async gunBul(tarih) {
  const gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const date = new Date(tarih); 
  return gunler[date.getDay()];
}

}


module.exports = helperfunc