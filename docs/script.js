document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) {
    console.error("SVG öğesi DOM'da bulunamadı. Lütfen HTML dosyanızdaki <svg> etiketinin varlığını kontrol edin.");
    return;
  }

  // 1. ÜLKE ADLARI VE KODLARI (ISO 3166-1 alpha-2) - 195 ÜLKE TAM LİSTE
  const countryNames = {
    "af": "Afganistan", "al": "Arnavutluk", "dz": "Cezayir", "ad": "Andorra", "ao": "Angola",
    "ag": "Antigua ve Barbuda", "ar": "Arjantin", "am": "Ermenistan", "au": "Avustralya", "at": "Avusturya",
    "az": "Azerbaycan", "bs": "Bahamalar", "bh": "Bahreyn", "bd": "Bangladeş", "bb": "Barbados",
    "by": "Belarus", "be": "Belçika", "bz": "Belize", "bj": "Benin", "bt": "Bhutan",
    "bo": "Bolivya", "ba": "Bosna-Hersek", "bw": "Botsvana", "br": "Brezilya", "bn": "Brunei",
    "bg": "Bulgaristan", "bf": "Burkina Faso", "bi": "Burundi", "kh": "Kamboçya", "cm": "Kamerun",
    "ca": "Kanada", "cv": "Yeşil Burun Adaları", "cf": "Orta Afrika Cumhuriyeti", "td": "Çad", "cl": "Şili",
    "cn": "Çin", "co": "Kolombiya", "km": "Komorlar", "cd": "Kongo Demokratik Cumhuriyeti", "cg": "Kongo",
    "cr": "Kosta Rika", "ci": "Fildişi Sahili", "hr": "Hırvatistan", "cu": "Küba", "cy": "Kıbrıs",
    "cz": "Çekya", "dk": "Danimarka", "dj": "Cibuti", "dm": "Dominika", "do": "Dominik Cumhuriyeti",
    "ec": "Ekvador", "eg": "Mısır", "sv": "El Salvador", "gq": "Ekvator Ginesi", "er": "Eritre",
    "ee": "Estonya", "sz": "Esvatini", "et": "Etiyopya", "fj": "Fiji", "fi": "Finlandiya",
    "fr": "Fransa", "ga": "Gabon", "gm": "Gambiya", "ge": "Gürcistan", "de": "Almanya",
    "gh": "Gana", "gr": "Yunanistan", "gd": "Grenada", "gt": "Guatemala", "gn": "Gine",
    "gw": "Gine-Bissau", "gy": "Guyana", "ht": "Haiti", "hn": "Honduras", "hu": "Macaristan",
    "is": "İzlanda", "in": "Hindistan", "id": "Endonezya", "ir": "İran", "iq": "Irak",
    "ie": "İrlanda", "il": "İsrail", "it": "İtalya", "jm": "Jamaika", "jp": "Japonya",
    "jo": "Ürdün", "kz": "Kazakistan", "ke": "Kenya", "ki": "Kiribati", "kp": "Kuzey Kore",
    "kr": "Güney Kore", "kw": "Kuveyt", "kg": "Kırgızistan", "la": "Laos", "lv": "Letonya",
    "lb": "Lübnan", "ls": "Lesoto", "lr": "Liberya", "ly": "Libya", "li": "Lihtenştayn",
    "lt": "Litvanya", "lu": "Lüksemburg", "mg": "Madagaskar", "mw": "Malavi", "my": "Malezya",
    "mv": "Maldivler", "ml": "Mali", "mt": "Malta", "mh": "Marshall Adaları", "mr": "Moritanya",
    "mu": "Mauritius", "mx": "Meksika", "fm": "Mikronezya", "md": "Moldova", "mc": "Monako",
    "mn": "Moğolistan", "me": "Karadağ", "ma": "Fas", "mz": "Mozambik", "mm": "Myanmar",
    "na": "Namibya", "nr": "Nauru", "np": "Nepal", "nl": "Hollanda", "nz": "Yeni Zelanda",
    "ni": "Nikaragua", "ne": "Nijer", "ng": "Nijerya", "no": "Norveç", "om": "Umman",
    "pk": "Pakistan", "pw": "Palau", "pa": "Panama", "pg": "Papua Yeni Gine", "py": "Paraguay",
    "pe": "Peru", "ph": "Filipinler", "pl": "Polonya", "pt": "Portekiz", "qa": "Katar",
    "ro": "Romanya", "ru": "Rusya", "rw": "Ruanda", "kn": "Saint Kitts ve Nevis", "lc": "Saint Lucia",
    "vc": "Saint Vincent ve Grenadinler", "ws": "Samoa", "sm": "San Marino", "st": "Sao Tome ve Principe",
    "sa": "Suudi Arabistan", "sn": "Senegal", "rs": "Sırbistan", "sc": "Seyşeller", "sl": "Sierra Leone",
    "sg": "Singapur", "sk": "Slovakya", "si": "Slovenya", "sb": "Solomon Adaları", "so": "Somali",
    "za": "Güney Afrika", "ss": "Güney Sudan", "es": "İspanya", "lk": "Sri Lanka", "sd": "Sudan",
    "sr": "Surinam", "se": "İsveç", "ch": "İsviçre", "sy": "Suriye", "tw": "Tayvan",
    "tj": "Tacikistan", "tz": "Tanzanya", "th": "Tayland", "tl": "Doğu Timor", "tg": "Togo",
    "to": "Tonga", "tt": "Trinidad ve Tobago", "tn": "Tunus", "tr": "Türkiye", "tm": "Türkmenistan",
    "tv": "Tuvalu", "ug": "Uganda", "ua": "Ukrayna", "ae": "Birleşik Arap Emirlikleri", "gb": "Birleşik Krallık",
    "us": "Amerika Birleşik Devletleri", "uy": "Uruguay", "uz": "Özbekistan", "vu": "Vanuatu",
    "va": "Vatikan", "ve": "Venezuela", "vn": "Vietnam", "ye": "Yemen", "zm": "Zambiya",
    "zw": "Zimbabve"
  };

  // 2. ÜLKE BİLGİ METİNLERİ (senin verdiğin bölüm - dokunulmadı)
  const countryTexts = {
    "tr": "Türkiye, Asya ve Avrupa kıtalarını birleştiren stratejik konumuyla bilinir...",
    "us": "Amerika Birleşik Devletleri, 50 eyaletten oluşan federal bir cumhuriyettir...",
    "ca": "Kanada, yüzölçümü bakımından dünyanın ikinci en büyük ülkesidir...",
    "de": "Almanya, Avrupa Birliği'nin kurucu üyelerindendir...",
    "fr": "Fransa, kültürü ve sanatıyla tanınır...",
    // diğerleri eksikse sistem otomatik placeholder gösterecek
  };

  // 3. Kod Düzeltme Haritası
  const fixMap = {
    turkey: "tr", usa: "us", america: "us",
    "united states": "us", "united_states": "us",
    "United States": "us", "us-states": "us",
    canada: "ca", france: "fr", germany: "de",
    england: "gb", uk: "gb",
  };

  const usStates = ["al","ak","az","ar","ca","co","ct","de","fl","ga","hi","id","il","in","ia","ks","ky","la","me","md","ma","mi","mn","ms","mo","mt","ne","nv","nh","nj","nm","ny","nc","nd","oh","ok","or","pa","ri","sc","sd","tn","tx","ut","vt","va","wa","wv","wi","wy"];

  // 4. SVG Tıklama Olayı
  svg.addEventListener("click", function (e) {
    let target = e.target.closest("path, polygon, g");
    if (!target) return;

    const idAttr = (target.getAttribute("id") || "").toLowerCase();
    const classAttr = (target.getAttribute("class") || "");
    const tokens = (idAttr + " " + classAttr.toLowerCase()).trim().split(/\s+/).filter(Boolean);
    tokens.push(classAttr);

    let foundToken = tokens.find(t => fixMap[t] || (t.length === 2 && countryNames[t]));
    let rawCode = foundToken || tokens[0] || "";
    let countryCode = fixMap[rawCode] || rawCode.toLowerCase();

    if (usStates.includes(countryCode)) countryCode = "us";

    if (!countryCode || !countryNames[countryCode]) {
      console.warn("Ülke kodu bulunamadı:", idAttr, classAttr);
      return;
    }

    const name = countryNames[countryCode];
    const text = countryTexts[countryCode] || `${name} için henüz bilgi eklenmedi.`;

    const newTab = window.open("", "_blank");
    if (!newTab) {
      alert("Tarayıcınız pop-up engelledi.");
      return;
    }

    const videoFileName = countryCode;

    newTab.document.write(`
      <html><head><title>${name}</title></head>
      <body>
        <h1>${name}</h1>
        <p>${text}</p>
        <video autoplay muted controls>
          <source src="video/${videoFileName}.mp4" type="video/mp4">
        </video>
      </body></html>
    `);

    newTab.document.close();
  });

});
