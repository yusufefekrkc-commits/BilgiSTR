// ==============================
// 1. ÜLKE İSİMLERİ
// ==============================
const countries = {
  af:"Afganistan", al:"Arnavutluk", dz:"Cezayir", ad:"Andorra", ao:"Angola", ag:"Antigua ve Barbuda",
  ar:"Arjantin", am:"Ermenistan", au:"Avustralya", at:"Avusturya", az:"Azerbaycan",
  bs:"Bahamalar", bh:"Bahreyn", bd:"Bangladeş", bb:"Barbados", by:"Belarus",
  be:"Belçika", bz:"Belize", bj:"Benin", bt:"Butan", bo:"Bolivya", ba:"Bosna-Hersek",
  bw:"Botsvana", br:"Brezilya", bn:"Brunei", bg:"Bulgaristan", bf:"Burkina Faso",
  bi:"Burundi", cv:"Cape Verde", kh:"Kamboçya", cm:"Kamerun", ca:"Kanada",
  cf:"Orta Afrika Cumhuriyeti", td:"Çad", cl:"Şili", cn:"Çin", co:"Kolombiya",
  km:"Komorlar", cg:"Kongo", cd:"Kongo Demokratik Cumhuriyeti", cr:"Kosta Rika",
  hr:"Hırvatistan", cu:"Küba", cy:"Kıbrıs", cz:"Çekya", dk:"Danimarka",
  dj:"Cibuti", dm:"Dominika", do:"Dominik Cumhuriyeti", ec:"Ekvador", eg:"Mısır",
  sv:"El Salvador", gq:"Ekvator Ginesi", er:"Eritre", ee:"Estonya", sz:"Esvatini",
  et:"Etiyopya", fj:"Fiji", fi:"Finlandiya", fr:"Fransa", ga:"Gabon",
  gm:"Gambiya", ge:"Gürcistan", de:"Almanya", gh:"Gana", gr:"Yunanistan",
  gd:"Grenada", gt:"Guatemala", gn:"Gine", gw:"Gine-Bissau", gy:"Guyana",
  ht:"Haiti", hn:"Honduras", hu:"Macaristan", is:"İzlanda", in:"Hindistan",
  id:"Endonezya", ir:"İran", iq:"Irak", ie:"İrlanda", il:"İsrail", it:"İtalya",
  jm:"Jamaika", jp:"Japonya", jo:"Ürdün", kz:"Kazakistan", ke:"Kenya",
  ki:"Kiribati", kp:"Kuzey Kore", kr:"Güney Kore", kw:"Kuveyt", kg:"Kırgızistan",
  la:"Laos", lv:"Letonya", lb:"Lübnan", ls:"Lesotho", lr:"Liberya", ly:"Libya",
  li:"Lihtenştayn", lt:"Litvanya", lu:"Lüksemburg", mg:"Madagaskar", mw:"Malavi",
  my:"Malezya", mv:"Maldivler", ml:"Mali", mt:"Malta", mh:"Marshall Adaları",
  mr:"Moritanya", mu:"Mauritius", mx:"Meksika", fm:"Mikronezya", md:"Moldova",
  mc:"Monako", mn:"Moğolistan", me:"Karadağ", ma:"Fas", mz:"Mozambik",
  mm:"Myanmar", na:"Namibya", nr:"Nauru", np:"Nepal", nl:"Hollanda",
  nz:"Yeni Zelanda", ni:"Nikaragua", ne:"Nijer", ng:"Nijerya", no:"Norveç",
  om:"Umman", pk:"Pakistan", pw:"Palau", pa:"Panama", pg:"Papua Yeni Gine",
  py:"Paraguay", pe:"Peru", ph:"Filipinler", pl:"Polonya", pt:"Portekiz",
  qa:"Katar", ro:"Romanya", ru:"Rusya", rw:"Ruanda", kn:"Saint Kitts ve Nevis",
  lc:"Saint Lucia", vc:"Saint Vincent ve Grenadinler", ws:"Samoa",
  sm:"San Marino", st:"Sao Tome ve Principe", sa:"Suudi Arabistan",
  sn:"Senegal", rs:"Sırbistan", sc:"Seyşeller", sl:"Sierra Leone",
  sg:"Singapur", sk:"Slovakya", si:"Slovenya", sb:"Solomon Adaları",
  so:"Somali", za:"Güney Afrika", ss:"Güney Sudan", es:"İspanya",
  lk:"Sri Lanka", sd:"Sudan", sr:"Surinam", se:"İsveç", ch:"İsviçre",
  sy:"Suriye", tw:"Tayvan", tj:"Tacikistan", tz:"Tanzanya", th:"Tayland",
  tl:"Doğu Timor", tg:"Togo", to:"Tonga", tt:"Trinidad ve Tobago",
  tn:"Tunus", tr:"Türkiye", tm:"Türkmenistan", tv:"Tuvalu", ug:"Uganda",
  ua:"Ukrayna", ae:"Birleşik Arap Emirlikleri", gb:"Birleşik Krallık",
  us:"Amerika Birleşik Devletleri", uy:"Uruguay", uz:"Özbekistan",
  vu:"Vanuatu", va:"Vatikan", ve:"Venezuela", vn:"Vietnam",
  ye:"Yemen", zm:"Zambiya", zw:"Zimbabve"
};

// ==============================
// 2. ÜLKE METİNLERİ — tek tek düzenlenebilir
// ==============================
// ==============================
// 2. ÜLKE METİNLERİ — Tek tek düzenlenebilir TAM LİSTE
// ==============================
const countryTexts = {
  af: "Afganistan hakkında bilgi ve video.",
  al: "Arnavutluk hakkında bilgi ve video.",
  dz: "Cezayir hakkında bilgi ve video.",
  ad: "Andorra hakkında bilgi ve video.",
  ao: "Angola hakkında bilgi ve video.",
  ag: "Antigua ve Barbuda hakkında bilgi ve video.",
  ar: "Arjantin hakkında bilgi ve video.",
  am: "Ermenistan hakkında bilgi ve video.",
  au: "Avustralya hakkında bilgi ve video.",
  at: "Avusturya hakkında bilgi ve video.",
  az: "Azerbaycan hakkında bilgi ve video.",
  bs: "Bahamalar hakkında bilgi ve video.",
  bh: "Bahreyn hakkında bilgi ve video.",
  bd: "Bangladeş hakkında bilgi ve video.",
  bb: "Barbados hakkında bilgi ve video.",
  by: "Belarus hakkında bilgi ve video.",
  be: "Belçika hakkında bilgi ve video.",
  bz: "Belize hakkında bilgi ve video.",
  bj: "Benin hakkında bilgi ve video.",
  bt: "Butan hakkında bilgi ve video.",
  bo: "Bolivya hakkında bilgi ve video.",
  ba: "Bosna-Hersek hakkında bilgi ve video.",
  bw: "Botsvana hakkında bilgi ve video.",
  br: "Brezilya hakkında bilgi ve video.",
  bn: "Brunei hakkında bilgi ve video.",
  bg: "Bulgaristan hakkında bilgi ve video.",
  bf: "Burkina Faso hakkında bilgi ve video.",
  bi: "Burundi hakkında bilgi ve video.",
  cv: "Cape Verde hakkında bilgi ve video.",
  kh: "Kamboçya hakkında bilgi ve video.",
  cm: "Kamerun hakkında bilgi ve video.",
  ca: "Kanada hakkında bilgi ve video.",
  cf: "Orta Afrika Cumhuriyeti hakkında bilgi ve video.",
  td: "Çad hakkında bilgi ve video.",
  cl: "Şili hakkında bilgi ve video.",
  cn: "Çin hakkında bilgi ve video.",
  co: "Kolombiya hakkında bilgi ve video.",
  km: "Komorlar hakkında bilgi ve video.",
  cg: "Kongo hakkında bilgi ve video.",
  cd: "Kongo Demokratik Cumhuriyeti hakkında bilgi ve video.",
  cr: "Kosta Rika hakkında bilgi ve video.",
  hr: "Hırvatistan hakkında bilgi ve video.",
  cu: "Küba hakkında bilgi ve video.",
  cy: "Kıbrıs hakkında bilgi ve video.",
  cz: "Çekya hakkında bilgi ve video.",
  dk: "Danimarka hakkında bilgi ve video.",
  dj: "Cibuti hakkında bilgi ve video.",
  dm: "Dominika hakkında bilgi ve video.",
  do: "Dominik Cumhuriyeti hakkında bilgi ve video.",
  ec: "Ekvador hakkında bilgi ve video.",
  eg: "Mısır hakkında bilgi ve video.",
  sv: "El Salvador hakkında bilgi ve video.",
  gq: "Ekvator Ginesi hakkında bilgi ve video.",
  er: "Eritre hakkında bilgi ve video.",
  ee: "Estonya hakkında bilgi ve video.",
  sz: "Esvatini hakkında bilgi ve video.",
  et: "Etiyopya hakkında bilgi ve video.",
  fj: "Fiji hakkında bilgi ve video.",
  fi: "Finlandiya hakkında bilgi ve video.",
  fr: "Fransa hakkında bilgi ve video.",
  ga: "Gabon hakkında bilgi ve video.",
  gm: "Gambiya hakkında bilgi ve video.",
  ge: "Gürcistan hakkında bilgi ve video.",
  de: "Almanya hakkında bilgi ve video.",
  gh: "Gana hakkında bilgi ve video.",
  gr: "Yunanistan hakkında bilgi ve video.",
  gd: "Grenada hakkında bilgi ve video.",
  gt: "Guatemala hakkında bilgi ve video.",
  gn: "Gine hakkında bilgi ve video.",
  gw: "Gine-Bissau hakkında bilgi ve video.",
  gy: "Guyana hakkında bilgi ve video.",
  ht: "Haiti hakkında bilgi ve video.",
  hn: "Honduras hakkında bilgi ve video.",
  hu: "Macaristan hakkında bilgi ve video.",
  is: "İzlanda hakkında bilgi ve video.",
  in: "Hindistan hakkında bilgi ve video.",
  id: "Endonezya hakkında bilgi ve video.",
  ir: "İran hakkında bilgi ve video.",
  iq: "Irak hakkında bilgi ve video.",
  ie: "İrlanda hakkında bilgi ve video.",
  il: "İsrail hakkında bilgi ve video.",
  it: "İtalya hakkında bilgi ve video.",
  jm: "Jamaika hakkında bilgi ve video.",
  jp: "Japonya hakkında bilgi ve video.",
  jo: "Ürdün hakkında bilgi ve video.",
  kz: "Kazakistan hakkında bilgi ve video.",
  ke: "Kenya hakkında bilgi ve video.",
  ki: "Kiribati hakkında bilgi ve video.",
  kp: "Kuzey Kore hakkında bilgi ve video.",
  kr: "Güney Kore hakkında bilgi ve video.",
  kw: "Kuveyt hakkında bilgi ve video.",
  kg: "Kırgızistan hakkında bilgi ve video.",
  la: "Laos hakkında bilgi ve video.",
  lv: "Letonya hakkında bilgi ve video.",
  lb: "Lübnan hakkında bilgi ve video.",
  ls: "Lesotho hakkında bilgi ve video.",
  lr: "Liberya hakkında bilgi ve video.",
  ly: "Libya hakkında bilgi ve video.",
  li: "Lihtenştayn hakkında bilgi ve video.",
  lt: "Litvanya hakkında bilgi ve video.",
  lu: "Lüksemburg hakkında bilgi ve video.",
  mg: "Madagaskar hakkında bilgi ve video.",
  mw: "Malavi hakkında bilgi ve video.",
  my: "Malezya hakkında bilgi ve video.",
  mv: "Maldivler hakkında bilgi ve video.",
  ml: "Mali hakkında bilgi ve video.",
  mt: "Malta hakkında bilgi ve video.",
  mh: "Marshall Adaları hakkında bilgi ve video.",
  mr: "Moritanya hakkında bilgi ve video.",
  mu: "Mauritius hakkında bilgi ve video.",
  mx: "Meksika hakkında bilgi ve video.",
  fm: "Mikronezya hakkında bilgi ve video.",
  md: "Moldova hakkında bilgi ve video.",
  mc: "Monako hakkında bilgi ve video.",
  mn: "Moğolistan hakkında bilgi ve video.",
  me: "Karadağ hakkında bilgi ve video.",
  ma: "Fas hakkında bilgi ve video.",
  mz: "Mozambik hakkında bilgi ve video.",
  mm: "Myanmar hakkında bilgi ve video.",
  na: "Namibya hakkında bilgi ve video.",
  nr: "Nauru hakkında bilgi ve video.",
  np: "Nepal hakkında bilgi ve video.",
  nl: "Hollanda hakkında bilgi ve video.",
  nz: "Yeni Zelanda hakkında bilgi ve video.",
  ni: "Nikaragua hakkında bilgi ve video.",
  ne: "Nijer hakkında bilgi ve video.",
  ng: "Nijerya hakkında bilgi ve video.",
  no: "Norveç hakkında bilgi ve video.",
  om: "Umman hakkında bilgi ve video.",
  pk: "Pakistan hakkında bilgi ve video.",
  pw: "Palau hakkında bilgi ve video.",
  pa: "Panama hakkında bilgi ve video.",
  pg: "Papua Yeni Gine hakkında bilgi ve video.",
  py: "Paraguay hakkında bilgi ve video.",
  pe: "Peru hakkında bilgi ve video.",
  ph: "Filipinler hakkında bilgi ve video.",
  pl: "Polonya hakkında bilgi ve video.",
  pt: "Portekiz hakkında bilgi ve video.",
  qa: "Katar hakkında bilgi ve video.",
  ro: "Romanya hakkında bilgi ve video.",
  ru: "Rusya hakkında bilgi ve video.",
  rw: "Ruanda hakkında bilgi ve video.",
  kn: "Saint Kitts ve Nevis hakkında bilgi ve video.",
  lc: "Saint Lucia hakkında bilgi ve video.",
  vc: "Saint Vincent ve Grenadinler hakkında bilgi ve video.",
  ws: "Samoa hakkında bilgi ve video.",
  sm: "San Marino hakkında bilgi ve video.",
  st: "Sao Tome ve Principe hakkında bilgi ve video.",
  sa: "Suudi Arabistan hakkında bilgi ve video.",
  sn: "Senegal hakkında bilgi ve video.",
  rs: "Sırbistan hakkında bilgi ve video.",
  sc: "Seyşeller hakkında bilgi ve video.",
  sl: "Sierra Leone hakkında bilgi ve video.",
  sg: "Singapur hakkında bilgi ve video.",
  sk: "Slovakya hakkında bilgi ve video.",
  si: "Slovenya hakkında bilgi ve video.",
  sb: "Solomon Adaları hakkında bilgi ve video.",
  so: "Somali hakkında bilgi ve video.",
  za: "Güney Afrika hakkında bilgi ve video.",
  ss: "Güney Sudan hakkında bilgi ve video.",
  es: "İspanya hakkında bilgi ve video.",
  lk: "Sri Lanka hakkında bilgi ve video.",
  sd: "Sudan hakkında bilgi ve video.",
  sr: "Surinam hakkında bilgi ve video.",
  se: "İsveç hakkında bilgi ve video.",
  ch: "İsviçre hakkında bilgi ve video.",
  sy: "Suriye hakkında bilgi ve video.",
  tw: "Tayvan hakkında bilgi ve video.",
  tj: "Tacikistan hakkında bilgi ve video.",
  tz: "Tanzanya hakkında bilgi ve video.",
  th: "Tayland hakkında bilgi ve video.",
  tl: "Doğu Timor hakkında bilgi ve video.",
  tg: "Togo hakkında bilgi ve video.",
  to: "Tonga hakkında bilgi ve video.",
  tt: "Trinidad ve Tobago hakkında bilgi ve video.",
  tn: "Tunus hakkında bilgi ve video.",
  tr: "Türkiye hakkında bilgi ve video.",
  tm: "Türkmenistan hakkında bilgi ve video.",
  tv: "Tuvalu hakkında bilgi ve video.",
  ug: "Uganda hakkında bilgi ve video.",
  ua: "Ukrayna hakkında bilgi ve video.",
  ae: "Birleşik Arap Emirlikleri hakkında bilgi ve video.",
  gb: "Birleşik Krallık hakkında bilgi ve video.",
  us: "Amerika Birleşik Devletleri hakkında bilgi ve видео.",
  uy: "Uruguay hakkında bilgi ve video.",
  uz: "Özbekistan hakkında bilgi ve video.",
  vu: "Vanuatu hakkında bilgi ve video.",
  va: "Vatikan hakkında bilgi ve video.",
  ve: "Venezuela hakkında bilgi ve video.",
  vn: "Vietnam hakkında bilgi ve video.",
  ye: "Yemen hakkında bilgi ve video.",
  zm: "Zambiya hakkında bilgi ve video.",
  zw: "Zimbabve hakkında bilgi ve video."
};

// ==============================
// 3. Çok parçalı ülkeler düzeltme (ÇOK ÖNEMLİ)
// ==============================
document.querySelectorAll("path[class*='china'], path[id*='CHINA'], path[id^='CN']")
  .forEach(p => p.setAttribute("data-country", "cn"));

document.querySelectorAll("path[class*='russia'], path[id*='RUSS'], path[id^='RU']")
  .forEach(p => p.setAttribute("data-country", "ru"));

document.querySelectorAll("path[class*='australia'], path[id*='AUST'], path[id^='AU']")
  .forEach(p => p.setAttribute("data-country", "au"));

document.querySelectorAll("path[class*='usa'], path[id*='USA'], path[id^='US']")
  .forEach(p => p.setAttribute("data-country", "us"));

document.querySelectorAll("path[class*='canada'], path[id*='CAN'], path[id^='CA']")
  .forEach(p => p.setAttribute("data-country", "ca"));

// ==============================
// 4. TIKLAMA — TEK DOĞRU SİSTEM (ALERT YOK)
// ==============================
document.querySelectorAll("svg path").forEach(path => {

  let code =
    path.getAttribute("data-country") ||
    path.getAttribute("id") ||
    path.getAttribute("class");

  if (!code) return;

  code = code.toLowerCase();

  if (!countries[code]) return;

  path.style.cursor = "pointer";

  path.addEventListener("click", () => {
    const url = `countries/${code.toUpperCase()}.html`;
    window.open(url, "_blank");
  });

});
