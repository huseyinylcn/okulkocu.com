const PdfPrinter = require("pdfmake");

function toYMD(val) {
  const d = new Date(val);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function generatePdfBuffer(data) {
  const allDates = [...new Set(data.map(item => toYMD(item.tarih)))];

  let content = [
    { text: "Ders Programı Raporu (Tüm Günler)", style: "mainHeader" }
  ];

  for (let tarihSec of allDates) {
    const filtered = data.filter(item => toYMD(item.tarih) === tarihSec);

    const grouped = filtered.reduce((acc, item) => {
      const key = item.DersSaati + "-" + item.Ders;
      if (!acc[key]) acc[key] = { 
        saat: item.DersSaati, 
        ders: item.Ders, 
        students: [], 
        kazanımlar: [] 
      };

      acc[key].students.push(`${item.OgrenciNumara} - ${item.AdSoyad}`);
      if (item.kazanim) acc[key].kazanımlar.push(item.kazanim);
      return acc;
    }, {});

    let body = [
      ["Saat", "Ders", "Gelmeyen Öğrenciler", "Kazanımlar"]
    ];

    for (let key in grouped) {
      body.push([
        grouped[key].saat,
        grouped[key].ders,
        { text: grouped[key].students.join("\n"), fontSize: 11 },
        { text: [...new Set(grouped[key].kazanımlar)].join("\n"), fontSize: 10 }
      ]);
    }

    content.push(
      { text: `\n📅 Tarih: ${tarihSec}`, style: "subHeader" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "*", "*"],
          body: body
        },
        margin: [0, 0, 0, 20]
      }
    );
  }

  const fonts = {
    Arial: {
      normal: "C:/Windows/Fonts/arial.ttf",
      bold: "C:/Windows/Fonts/arialbd.ttf",
      italics: "C:/Windows/Fonts/ariali.ttf",
      bolditalics: "C:/Windows/Fonts/arialbi.ttf"
    }
  };

  const printer = new PdfPrinter(fonts);
  const doc = printer.createPdfKitDocument({
    content,
    styles: {
      mainHeader: { fontSize: 18, bold: true, margin: [0, 0, 0, 20] },
      subHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 10] }
    },
    defaultStyle: { font: "Arial" }
  });

  return new Promise((resolve, reject) => {
    const chunks = [];
    doc.on("data", chunk => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", err => reject(err));
    doc.end();
  });
}

async function attendanceRapor(data, { TeacherRepository }) {
  const result = await TeacherRepository.attendanceRapor(data);
  const pdfBuffer = await generatePdfBuffer(result);
  return pdfBuffer; // Buffer olarak return ediyor, endpoint vs. burada kullanılır
}

module.exports = attendanceRapor;
