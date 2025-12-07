document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return;

  // ------------------------------
  // 1) Ülke adları (ID -> Ülke Adı)
  // ------------------------------
  const countryNames = {
    "af":"Afganistan","al":"Arnavutluk","dz":"Cezayir","ad":"Andorra","ao":"Angola","ag":"Antigua ve Barbuda",
    "ar":"Arjantin","am":"Ermenistan","au":"Avustralya","at":"Avusturya","az":"Azerbaycan","bs":"Bahamalar",
    "bh":"Bahreyn","bd":"Bangladeş","bb":"Barbados","by":"Belarus","be":"Belçika","bz":"Belize",
    "bj":"Benin","bt":"Bhutan","bo":"Bolivya","ba":"Bosna-Hersek","bw":"Botsvana","br":"Brezilya",
    "bn":"Brunei","bg":"Bulgaristan","bf":"Burkina Faso","bi":"Burundi","cv":"Yeşil Burun Adaları",
    "kh":"Kamboçya","cm":"Kamerun","ca":"Kanada","cf":"Orta Afrika Cumhuriyeti","td":"Çad",
    "cl":"Şili","cn":"Çin","co":"Kolombiya","km":"Komorlar","cd":"Kongo DC","cg":"Kongo",
    "cr":"Kosta Rika","ci":"Fildişi Sahili","hr":"Hırvatistan","cu":"Küba","cy":"Kıbrıs","cz":"Çekya",
    "dk":"Danimarka","dj":"Cibuti","dm":"Dominika","do":"Dominik Cumhuriyeti",
    "ec":"Ekvador","eg":"Mısır","sv":"El Salvador","gq":"Ekvator Ginesi","er":"Eritre","ee":"Estonya",
    "sz":"Esvatini","et":"Etiyopya",
    "fj":"Fiji","fi":"Finlandiya","fr":"Fransa",
    "ga":"Gabon","gm":"Gambiya","ge":"Gürcistan","de":"Almanya","gh":"Gana","gr":"Yunanistan",
    "gd":"Grenada","gt":"Guatemala","gn":"Gine","gw":"Gine-Bissau","gy":"Guyana",
    "ht":"Haiti","hn":"Honduras","hu":"Macaristan",
    "is":"İzlanda","in":"Hindistan","id":"Endonezya","ir":"İran","iq":"Irak","ie":"İrlanda",
    "il":"İsrail","it":"İtalya",
    "jm":"Jamaika","jp":"Japonya","jo":"Ürdün",
    "kz":"Kazakistan","ke":"Kenya","ki":"Kiribati","kp":"Kuzey Kore","kr":"Güney Kore","kw":"Kuveyt",
    "kg":"Kırgızistan",
    "la":"Laos","lv":"Letonya","lb":"Lübnan","ls":"Lesotho","lr":"Liberya","ly":"Libya",
    "li":"Lihtenştayn","lt":"Litvanya","lu":"Lüksemburg",
    "mg":"Madagaskar","mw":"Malawi","my":"Malezya","mv":"Maldivler","ml":"Mali","mt":"Malta",
    "mh":"Marshall Adaları","mr":"Moritanya","mu":"Mauritius","mx":"Meksika","fm":"Mikronezya",
    "md":"Moldova","mc":"Monako","mn":"Moğolistan","me":"Karadağ","ma":"Fas","mz":"Mozambik","mm":"Myanmar",
    "na":"Namibya","nr":"Nauru","np":"Nepal","nl":"Hollanda","nz":"Yeni Zelanda","ni":"Nikaragua",
    "ne":"Nijer","ng":"Nijerya","mk":"Kuzey Makedonya","no":"Norveç",
    "om":"Umman",
    "pk":"Pakistan","pw":"Palau","ps":"Filistin","pa":"Panama","pg":"Papua Yeni Gine","py":"Paraguay",
    "pe":"Peru","ph":"Filipinler","pl":"Polonya","pt":"Portekiz",
    "qa":"Katar",
    "ro":"Romanya","ru":"Rusya","rw":"Ruanda",
    "kn":"Saint Kitts ve Nevis","lc":"Saint Lucia","vc":"Saint Vincent","ws":"Samoa","sm":"San Marino",
    "st":"Sao Tome ve Principe","sa":"Suudi Arabistan","sn":"Senegal","rs":"Sırbistan","sc":"Seyşeller",
    "sl":"Sierra Leone","sg":"Singapur","sk":"Slovakya","si":"Slovenya","sb":"Solomon Adaları",
    "so":"Somali","za":"Güney Afrika","ss":"Güney Sudan","es":"İspanya","lk":"Sri Lanka","sd":"Sudan",
    "sr":"Surinam","se":"İsveç","ch":"İsviçre","sy":"Suriye",
    "tw":"Tayvan","tj":"Tacikistan","tz":"Tanzanya","th":"Tayland","tl":"Doğu Timor","tg":"Togo",
    "to":"Tonga","tt":"Trinidad ve Tobago","tn":"Tunus","tr":"Türkiye","tm":"Türkmenistan","tv":"Tuvalu",
    "ug":"Uganda","ua":"Ukrayna","ae":"BAE","gb":"Birleşik Krallık","us":"Amerika",
    "uy":"Uruguay","uz":"Özbekistan",
    "vu":"Vanuatu","va":"Vatikan","ve":"Venezuela","vn":"Vietnam",
    "ye":"Yemen",
    "zm":"Zambiya","zw":"Zimbabve"
  };

  // ------------------------------
  // 2) Otomatik kültür metni üret
  // ------------------------------
  const countryTexts = {};
  for (let code in countryNames) {
    countryTexts[code] = `${countryNames[code]} kültürü, tarihî mirası, yaşam tarzı, gelenekleri ve coğrafi özellikleriyle ilgili kapsamlı bilgiler ve videolar burada yer alacaktır.`;
  }

  // ------------------------------
  // 3) Bozuk, farklı veya hatalı ID'leri düzelt
  // ------------------------------
  const fixMap = {
    turkey:"tr", turkiye:"tr",
    usa:"us", unitedstates:"us",
    france:"fr", germany:"de",
    england:"gb", uk:"gb",
    russia:"ru", korea:"kr", southkorea:"kr"
  };

  // ------------------------------
  // 4) Evrensel tıklama sistemi
  // ------------------------------
  svg.addEventListener("click", function (e) {

    let target = e.target.closest("path, polygon, g");
    if (!target) return;

    const idAttr = (target.getAttribute("id") || "").toLowerCase();
    const classAttr = (target.getAttribute("class") || "").toLowerCase();
    const tokens = (idAttr + " " + classAttr).trim().split(/\s+/).filter(Boolean);

    let found = tokens.find(t => fixMap[t] || countryNames[t]);
    let rawCode = found || tokens[0] || "";
    let countryCode = fixMap[rawCode] || rawCode;

    if (!countryCode) return;

    const name = countryNames[countryCode] || countryCode.toUpperCase();
    const text = countryTexts[countryCode];

    // -------------------------------------------------
    // Yeni Sekme + Video
    // -------------------------------------------------
    const newTab = window.open("", "_blank");
    newTab.document.write(`
      <html>
      <head>
        <title>${name}</title>
        <style>
          body { font-family: Arial; padding: 20px; background:#f7f7f7; }
          h1 { margin-top: 0; }
          p { font-size: 16px; line-height: 1.6; }
          video { width: 100%; margin-top: 15px; }
          .closeButton {
            display: inline-block;
            padding: 8px 12px;
            background: #DC3545;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .closeButton:hover { background: #a71d2a; }
        </style>
      </head>
      <body>
        <button class="closeButton" onclick="window.close()">✕ Sekmeyi Kapat</button>
        <h1>${name}</h1>
        <p>${text}</p>
        <video id="countryVideo" autoplay muted controls>
          <source src="video/${countryCode}.mp4" type="video/mp4">
        </video>
      </body>
      </html>
    `);

  });

});
