document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return;

  // 1. TIKLAMAYI ZORLA AÇ
  svg.querySelectorAll("*").forEach(el => {
      el.style.pointerEvents = "all";
      el.style.cursor = "pointer";
  });

  // 2. ENGEL OLABİLECEK ŞEFFAF KATLARI DEVRE DIŞI BIRAK
  document.querySelectorAll("svg rect, svg defs, svg g[opacity='0'], svg [fill='none'], svg [fill='transparent']")
    .forEach(el => {
        el.style.pointerEvents = "none";
    });

  // ÜLKE KODLARI ve METİNLERİ (senin verdiğin gibi)
  const countryNames = {...};  // aynı bıraktım burada
  const countryTexts = {};
  for(let code in countryNames){
    countryTexts[code] = `${countryNames[code]} hakkında bilgi buraya gelecek.`;
  }

  const fixMap = {
    turkey:"tr", usa:"us", france:"fr", germany:"de", england:"gb", uk:"gb"
  };

  // 3. GERÇEK TIKLANAN SVG ELEMENTİNİ ALAN SİSTEM
  svg.addEventListener("click", function(e){

    const real = document.elementFromPoint(e.clientX, e.clientY);
    const target = real.closest("path, polygon, g");
    if (!target) return;

    const idAttr = (target.getAttribute("id") || "").toLowerCase();
    const classAttr = (target.getAttribute("class") || "").toLowerCase();
    const tokens = (idAttr + " " + classAttr).trim().split(/\s+/).filter(Boolean);

    let found = tokens.find(t => fixMap[t] || countryNames[t]);
    let rawCode = found || tokens[0] || "";
    let countryCode = fixMap[rawCode] || rawCode;
    
    const name = countryNames[countryCode] || countryCode.toUpperCase();
    const text = countryTexts[countryCode] || "Bu ülke için metin eklenmemiş.";

    // Yeni sekme açma
    const newTab = window.open("", "_blank");

    newTab.document.write(`
      <html>
      <head>
        <title>${name}</title>
      </head>
      <body>
        <h1>${name}</h1>
        <p>${text}</p>
        <video autoplay muted controls>
          <source src="video/${countryCode}.mp4" type="video/mp4">
        </video>
      </body>
      </html>
    `);

  });

});
