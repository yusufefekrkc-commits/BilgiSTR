// ==============================
// 1. ÜLKE İSİMLERİ — Tüm liste
// ==============================
const countries = {
  af:"Afganistan",al:"Arnavutluk",dz:"Cezayir",ad:"Andorra",ao:"Angola",ag:"Antigua ve Barbuda",
  ar:"Arjantin",am:"Ermenistan",au:"Avustralya",at:"Avusturya",az:"Azerbaycan",bs:"Bahamalar",
  bh:"Bahreyn",bd:"Bangladeş",bb:"Barbados",by:"Belarus",be:"Belçika",bz:"Belize",bj:"Benin",
  bt:"Butan",bo:"Bolivya",ba:"Bosna-Hersek",bw:"Botsvana",br:"Brezilya",bn:"Brunei",bg:"Bulgaristan",
  bf:"Burkina Faso",bi:"Burundi",cv:"Cape Verde",kh:"Kamboçya",cm:"Kamerun",ca:"Kanada",
  cf:"Orta Afrika Cumhuriyeti",td:"Çad",cl:"Şili",cn:"Çin",co:"Kolombiya",km:"Komorlar",cg:"Kongo",
  cd:"Kongo Demokratik Cumhuriyeti",cr:"Kosta Rika",hr:"Hırvatistan",cu:"Küba",cy:"Kıbrıs",
  cz:"Çekya",dk:"Danimarka",dj:"Cibuti",dm:"Dominika",do:"Dominik Cumhuriyeti",ec:"Ekvador",
  eg:"Mısır",sv:"El Salvador",gq:"Ekvator Ginesi",er:"Eritre",ee:"Estonya",sz:"Esvatini",et:"Etiyopya",
  fj:"Fiji",fi:"Finlandiya",fr:"Fransa",ga:"Gabon",gm:"Gambiya",ge:"Gürcistan",de:"Almanya",
  gh:"Gana",gr:"Yunanistan",gd:"Grenada",gt:"Guatemala",gn:"Gine",gw:"Gine-Bissau",gy:"Guyana",
  ht:"Haiti",hn:"Honduras",hu:"Macaristan",is:"İzlanda",in:"Hindistan",id:"Endonezya",
  ir:"İran",iq:"Irak",ie:"İrlanda",il:"İsrail",it:"İtalya",jm:"Jamaika",jp:"Japonya",
  jo:"Ürdün",kz:"Kazakistan",ke:"Kenya",ki:"Kiribati",kp:"Kuzey Kore",kr:"Güney Kore",
  kw:"Kuveyt",kg:"Kırgızistan",la:"Laos",lv:"Letonya",lb:"Lübnan",ls:"Lesotho",lr:"Liberya",
  ly:"Libya",li:"Lihtenştayn",lt:"Litvanya",lu:"Lüksemburg",mg:"Madagaskar",mw:"Malavi",
  my:"Malezya",mv:"Maldivler",ml:"Mali",mt:"Malta",mh:"Marshall Adaları",mr:"Moritanya",
  mu:"Mauritius",mx:"Meksika",fm:"Mikronezya",md:"Moldova",mc:"Monako",mn:"Moğolistan",
  me:"Karadağ",ma:"Fas",mz:"Mozambik",mm:"Myanmar",na:"Namibya",nr:"Nauru",np:"Nepal",
  nl:"Hollanda",nz:"Yeni Zelanda",ni:"Nikaragua",ne:"Nijer",ng:"Nijerya",no:"Norveç",om:"Umman",
  pk:"Pakistan",pw:"Palau",pa:"Panama",pg:"Papua Yeni Gine",py:"Paraguay",pe:"Peru",
  ph:"Filipinler",pl:"Polonya",pt:"Portekiz",qa:"Katar",ro:"Romanya",ru:"Rusya",rw:"Ruanda",
  kn:"Saint Kitts ve Nevis",lc:"Saint Lucia",vc:"Saint Vincent ve Grenadinler",ws:"Samoa",
  sm:"San Marino",st:"Sao Tome ve Principe",sa:"Suudi Arabistan",sn:"Senegal",rs:"Sırbistan",
  sc:"Seyşeller",sl:"Sierra Leone",sg:"Singapur",sk:"Slovakya",si:"Slovenya",sb:"Solomon Adaları",
  so:"Somali",za:"Güney Afrika",ss:"Güney Sudan",es:"İspanya",lk:"Sri Lanka",sd:"Sudan",
  sr:"Surinam",se:"İsveç",ch:"İsviçre",sy:"Suriye",tw:"Tayvan",tj:"Tacikistan",tz:"Tanzanya",
  th:"Tayland",tl:"Doğu Timor",tg:"Togo",to:"Tonga",tt:"Trinidad ve Tobago",tn:"Tunus",
  tr:"Türkiye",tm:"Türkmenistan",tv:"Tuvalu",ug:"Uganda",ua:"Ukrayna",ae:"Birleşik Arap Emirlikleri",
  gb:"Birleşik Krallık",us:"Amerika Birleşik Devletleri",uy:"Uruguay",uz:"Özbekistan",
  vu:"Vanuatu",va:"Vatikan",ve:"Venezuela",vn:"Vietnam",ye:"Yemen",zm:"Zambiya",zw:"Zimbabve"
};

// ==============================
// 2. ÜLKE METİNLERİ — Tüm Liste (ISO Büyük Harf)
// ==============================
const countryTexts = {
  AF: "Afganistan hakkında bilgi ve video.",
  AL: "Arnavutluk hakkında bilgi ve video.",
  DZ: "Cezayir hakkında bilgi ve video.",
  AD: "Andorra hakkında bilgi ve video.",
  AO: "Angola hakkında bilgi ve video.",
  AG: "Antigua ve Barbuda hakkında bilgi ve video.",
  AR: "Arjantin hakkında bilgi ve video.",
  AM: "Ermenistan hakkında bilgi ve video.",
  AU: "Avustralya hakkında bilgi ve video.",
  AT: "Avusturya hakkında bilgi ve video.",
  AZ: "Azerbaycan hakkında bilgi ve video.",
  BS: "Bahamalar hakkında bilgi ve video.",
  BH: "Bahreyn hakkında bilgi ve video.",
  BD: "Bangladeş hakkında bilgi ve video.",
  BB: "Barbados hakkında bilgi ve video.",
  BY: "Belarus hakkında bilgi ve video.",
  BE: "Belçika hakkında bilgi ve video.",
  BZ: "Belize hakkında bilgi ve video.",
  BJ: "Benin hakkında bilgi ve video.",
  BT: "Butan hakkında bilgi ve video.",
  BO: "Bolivya hakkında bilgi ve video.",
  BA: "Bosna-Hersek hakkında bilgi ve video.",
  BW: "Botsvana hakkında bilgi ve video.",
  BR: "Brezilya hakkında bilgi ve video.",
  BN: "Brunei hakkında bilgi ve video.",
  BG: "Bulgaristan hakkında bilgi ve video.",
  BF: "Burkina Faso hakkında bilgi ve video.",
  BI: "Burundi hakkında bilgi ve video.",
  CV: "Cape Verde hakkında bilgi ve video.",
  KH: "Kamboçya hakkında bilgi ve video.",
  CM: "Kamerun hakkında bilgi ve video.",
  CA: "Kanada hakkında bilgi ve video.",
  CF: "Orta Afrika Cumhuriyeti hakkında bilgi ve video.",
  TD: "Çad hakkında bilgi ve video.",
  CL: "Şili hakkında bilgi ve video.",
  CN: "Çin hakkında bilgi ve video.",
  CO: "Kolombiya hakkında bilgi ve video.",
  KM: "Komorlar hakkında bilgi ve video.",
  CG: "Kongo hakkında bilgi ve video.",
  CD: "Kongo Demokratik Cumhuriyeti hakkında bilgi ve video.",
  CR: "Kosta Rika hakkında bilgi ve video.",
  HR: "Hırvatistan hakkında bilgi ve video.",
  CU: "Küba hakkında bilgi ve video.",
  CY: "Kıbrıs hakkında bilgi ve video.",
  CZ: "Çekya hakkında bilgi ve video.",
  DK: "Danimarka hakkında bilgi ve video.",
  DJ: "Cibuti hakkında bilgi ve video.",
  DM: "Dominika hakkında bilgi ve video.",
  DO: "Dominik Cumhuriyeti hakkında bilgi ve video.",
  EC: "Ekvador hakkında bilgi ve video.",
  EG: "Mısır hakkında bilgi ve video.",
  SV: "El Salvador hakkında bilgi ve video.",
  GQ: "Ekvator Ginesi hakkında bilgi ve video.",
  ER: "Eritre hakkında bilgi ve video.",
  EE: "Estonya hakkında bilgi ve video.",
  SZ: "Esvatini hakkında bilgi ve video.",
  ET: "Etiyopya hakkında bilgi ve video.",
  FJ: "Fiji hakkında bilgi ve video.",
  FI: "Finlandiya hakkında bilgi ve video.",
  FR: "Fransa hakkında bilgi ve video.",
  GA: "Gabon hakkında bilgi ve video.",
  GM: "Gambiya hakkında bilgi ve video.",
  GE: "Gürcistan hakkında bilgi ve video.",
  DE: "Almanya hakkında bilgi ve video.",
  GH: "Gana hakkında bilgi ve video.",
  GR: "Yunanistan hakkında bilgi ve video.",
  GD: "Grenada hakkında bilgi ve video.",
  GT: "Guatemala hakkında bilgi ve video.",
  GN: "Gine hakkında bilgi ve video.",
  GW: "Gine-Bissau hakkında bilgi ve video.",
  GY: "Guyana hakkında bilgi ve video.",
  HT: "Haiti hakkında bilgi ve video.",
  HN: "Honduras hakkında bilgi ve video.",
  HU: "Macaristan hakkında bilgi ve video.",
  IS: "İzlanda hakkında bilgi ve video.",
  IN: "Hindistan hakkında bilgi ve video.",
  ID: "Endonezya hakkında bilgi ve video.",
  IR: "İran hakkında bilgi ve video.",
  IQ: "Irak hakkında bilgi ve video.",
  IE: "İrlanda hakkında bilgi ve video.",
  IL: "İsrail hakkında bilgi ve video.",
  IT: "İtalya hakkında bilgi ve video.",
  JM: "Jamaika hakkında bilgi ve video.",
  JP: "Japonya hakkında bilgi ve video.",
  JO: "Ürdün hakkında bilgi ve video.",
  KZ: "Kazakistan hakkında bilgi ve video.",
  KE: "Kenya hakkında bilgi ve video.",
  KI: "Kiribati hakkında bilgi ve video.",
  KP: "Kuzey Kore hakkında bilgi ve video.",
  KR: "Güney Kore hakkında bilgi ve video.",
  KW: "Kuveyt hakkında bilgi ve video.",
  KG: "Kırgızistan hakkında bilgi ve video.",
  LA: "Laos hakkında bilgi ve video.",
  LV: "Letonya hakkında bilgi ve video.",
  LB: "Lübnan hakkında bilgi ve video.",
  LS: "Lesotho hakkında bilgi ve video.",
  LR: "Liberya hakkında bilgi ve video.",
  LY: "Libya hakkında bilgi ve video.",
  LI: "Lihtenştayn hakkında bilgi ve video.",
  LT: "Litvanya hakkında bilgi ve video.",
  LU: "Lüksemburg hakkında bilgi ve video.",
  MG: "Madagaskar hakkında bilgi ve video.",
  MW: "Malavi hakkında bilgi ve video.",
  MY: "Malezya hakkında bilgi ve video.",
  MV: "Maldivler hakkında bilgi ve video.",
  ML: "Mali hakkında bilgi ve video.",
  MT: "Malta hakkında bilgi ve video.",
  MH: "Marshall Adaları hakkında bilgi ve video.",
  MR: "Moritanya hakkında bilgi ve video.",
  MU: "Mauritius hakkında bilgi ve video.",
  MX: "Meksika hakkında bilgi ve video.",
  FM: "Mikronezya hakkında bilgi ve video.",
  MD: "Moldova hakkında bilgi ve video.",
  MC: "Monako hakkında bilgi ve video.",
  MN: "Moğolistan hakkında bilgi ve video.",
  ME: "Karadağ hakkında bilgi ve video.",
  MA: "Fas hakkında bilgi ve video.",
  MZ: "Mozambik hakkında bilgi ve video.",
  MM: "Myanmar hakkında bilgi ve video.",
  NA: "Namibya hakkında bilgi ve video.",
  NR: "Nauru hakkında bilgi ve video.",
  NP: "Nepal hakkında bilgi ve video.",
  NL: "Hollanda hakkında bilgi ve video.",
  NZ: "Yeni Zelanda hakkında bilgi ve video.",
  NI: "Nikaragua hakkında bilgi ve video.",
  NE: "Nijer hakkında bilgi ve video.",
  NG: "Nijerya hakkında bilgi ve video.",
  NO: "Norveç hakkında bilgi ve video.",
  OM: "Umman hakkında bilgi ve video.",
  PK: "Pakistan hakkında bilgi ve video.",
  PW: "Palau hakkında bilgi ve video.",
  PA: "Panama hakkında bilgi ve video.",
  PG: "Papua Yeni Gine hakkında bilgi ve video.",
  PY: "Paraguay hakkında bilgi ve video.",
  PE: "Peru hakkında bilgi ve video.",
  PH: "Filipinler hakkında bilgi ve video.",
  PL: "Polonya hakkında bilgi ve video.",
  PT: "Portekiz hakkında bilgi ve video.",
  QA: "Katar hakkında bilgi ve video.",
  RO: "Romanya hakkında bilgi ve video.",
  RU: "Rusya hakkında bilgi ve video.",
  RW: "Ruanda hakkında bilgi ve video.",
  KN: "Saint Kitts ve Nevis hakkında bilgi ve video.",
  LC: "Saint Lucia hakkında bilgi ve video.",
  VC: "Saint Vincent ve Grenadinler hakkında bilgi ve video.",
  WS: "Samoa hakkında bilgi ve video.",
  SM: "San Marino hakkında bilgi ve video.",
  ST: "Sao Tome ve Principe hakkında bilgi ve video.",
  SA: "Suudi Arabistan hakkında bilgi ve video.",
  SN: "Senegal hakkında bilgi ve video.",
  RS: "Sırbistan hakkında bilgi ve video.",
  SC: "Seyşeller hakkında bilgi ve video.",
  SL: "Sierra Leone hakkında bilgi ve video.",
  SG: "Singapur hakkında bilgi ve video.",
  SK: "Slovakya hakkında bilgi ve video.",
  SI: "Slovenya hakkında bilgi ve video.",
  SB: "Solomon Adaları hakkında bilgi ve video.",
  SO: "Somali hakkında bilgi ve video.",
  ZA: "Güney Afrika hakkında bilgi ve video.",
  SS: "Güney Sudan hakkında bilgi ve video.",
  ES: "İspanya hakkında bilgi ve video.",
  LK: "Sri Lanka hakkında bilgi ve video.",
  SD: "Sudan hakkında bilgi ve video.",
  SR: "Surinam hakkında bilgi ve video.",
  SE: "İsveç hakkında bilgi ve video.",
  CH: "İsviçre hakkında bilgi ve video.",
  SY: "Suriye hakkında bilgi ve video.",
  TW: "Tayvan hakkında bilgi ve video.",
  TJ: "Tacikistan hakkında bilgi ve video.",
  TZ: "Tanzanya hakkında bilgi ve video.",
  TH: "Tayland hakkında bilgi ve video.",
  TL: "Doğu Timor hakkında bilgi ve video.",
  TG: "Togo hakkında bilgi ve video.",
  TO: "Tonga hakkında bilgi ve video.",
  TT: "Trinidad ve Tobago hakkında bilgi ve video.",
  TN: "Tunus hakkında bilgi ve video.",
  TR: "Türkiye hakkında bilgi ve video.",
  TM: "Türkmenistan hakkında bilgi ve video.",
  TV: "Tuvalu hakkında bilgi ve video.",
  UG: "Uganda hakkında bilgi ve video.",
  UA: "Ukrayna hakkında bilgi ve video.",
  AE: "Birleşik Arap Emirlikleri hakkında bilgi ve video.",
  GB: "Birleşik Krallık hakkında bilgi ve video.",
  US: "Amerika Birleşik Devletleri hakkında bilgi ve video.",
  UY: "Uruguay hakkında bilgi ve video.",
  UZ: "Özbekistan hakkında bilgi ve video.",
  VU: "Vanuatu hakkında bilgi ve video.",
  VA: "Vatikan hakkında bilgi ve video.",
  VE: "Venezuela hakkında bilgi ve video.",
  VN: "Vietnam hakkında bilgi ve video.",
  YE: "Yemen hakkında bilgi ve video.",
  ZM: "Zambiya hakkında bilgi ve video.",
  ZW: "Zimbabve hakkında bilgi ve video."
};

// ==============================
// 3. ÇOK PARÇALI ÜLKELER DÜZELTME
// ==============================
document.querySelectorAll("path[class*='china'], path[id^='CHN'], path[id^='CN']")
  .forEach(p => p.setAttribute("data-country", "cn"));

document.querySelectorAll("path[class*='russia'], path[id^='RUS'], path[id^='RU']")
  .forEach(p => p.setAttribute("data-country", "ru"));

document.querySelectorAll("path[class*='australia'], path[id^='AUS'], path[id^='AU']")
  .forEach(p => p.setAttribute("data-country", "au"));

document.querySelectorAll("path[class*='canada'], path[id^='CAN'], path[id^='CA']")
  .forEach(p => p.setAttribute("data-country", "ca"));

document.querySelectorAll("path[id^='USA'], path[id^='US']")
  .forEach(p => p.setAttribute("data-country", "us"));

document.querySelectorAll("path[id^='NOR'], path[id^='NO']")
  .forEach(p => p.setAttribute("data-country", "no"));

// ==============================
// 4. TEK — KESİN ÇALIŞAN TIKLAMA SİSTEMİ
// ==============================
document.querySelectorAll("svg path").forEach(path => {

    // Ülke kodunu almayı dene
    let code =
        path.getAttribute("data-country") ||
        path.getAttribute("name") ||
        path.getAttribute("class") ||
        path.id;

    if (!code) return;

    code = code.toLowerCase();

    // listede yoksa çık
    if (!countries[code]) return;

    path.style.cursor = "pointer";

    path.addEventListener("click", () => {

        const name = countries[code];
        const info = countryTexts[code.toUpperCase()];
        const url = `countries/${code.toUpperCase()}.html`;

        window.open(url, "_blank");
    });
});
