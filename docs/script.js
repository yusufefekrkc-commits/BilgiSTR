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
  const countryTexts = {
  "af": "Afganistan: Zengin sözlü şiir ve misafirperverlik geleneği ile tanınır; el sanatları ve halk müziği önemlidir.",
  "al": "Arnavutluk: Balkan mirası, güçlü folklor ve geleneksel danslarla zengin kültürel bir geçmişe sahiptir.",
  "dz": "Cezayir: Berber, Arap ve Akdeniz etkilerinin harmanlandığı mutfak, müzik ve el sanatları kültürü vardır.",
  "ad": "Andorra: Pireneler kökenli küçük ülke; dağ yaşamı, halk festivalleri ve katalanca miras öne çıkar.",
  "ao": "Angola: Afrika ritimleri, dansları ve Portekiz etkili mutfağıyla canlı bir kültürel karma sunar.",
  "ag": "Antigua ve Barbuda: Karayip adası kültürü, karnaval, calypso ve denizcilik geleneği ile bilinir.",
  "ar": "Arjantin: Tango, maté kültürü ve Güney Amerika mutfağıyla güçlü bir kültürel kimliğe sahiptir.",
  "am": "Ermenistan: Antik kiliseler, halk müziği ve zengin mutfak geleneğiyle derin tarihi kültüre sahiptir.",
  "au": "Avustralya: Yerli Aborjin kültürü, açık hava yaşamı ve çokkültürlü şehir kültürü dikkat çeker.",
  "at": "Avusturya: Klasik müzik, kafe kültürü ve Alp folkloru ile tanınan bir kültürel mirasa sahiptir.",
  "az": "Azerbaycan: Kafkas müziği (mugham), misafirperverlik ve zengin el sanatları geleneğine sahiptir.",
  "bs": "Bahamalar: Karayip kültürü, müzik, dans ve denizcilik gelenekleri ile canlı bir ada kültürü sunar.",
  "bh": "Bahreyn: Körfez Arap kültürü, deniz tarihçesi ve modern şehir yaşamının bileşimi vardır.",
  "bd": "Bangladeş: Zengin halk edebiyatı, tekstil gelenekleri ve dini bayramların öne çıktığı kültür.",
  "bb": "Barbados: Karayip müziği, karnaval ve İngiliz mirasını harmanlayan ada kültürü bulunur.",
  "by": "Belarus: Slav gelenekleri, folklor ve klasik halk el sanatları kültürde öne çıkar.",
  "be": "Belçika: Çikolata, bira, fırıncılık ve çokdilli (Fransızca/Flemenkçe) zengin bir şehir kültürü vardır.",
  "bz": "Belize: Maya mirası, Karayip etkileri ve zengin doğa-yerli kültür ilişkisi dikkat çeker.",
  "bj": "Benin: Vodun inançları, geleneksel danslar ve Batı Afrika ritimleri ile kültürel zenginlik sunar.",
  "bt": "Bhutan: Budist manastırları, mutluluk ve geleneksel dağ kültürü ile öne çıkar.",
  "bo": "Bolivya: Yerli And yerleşimleri, renkli festivaller ve zengin folklor geleneği vardır.",
  "ba": "Bosna-Hersek: Balkanlarla Osmanlı mirasının karıştığı mutfak, müzik ve el sanatları bulunur.",
  "bw": "Botsvana: Tswana kültürü, avcılık geleneği ve doğa merkezli yaşam biçimi dikkat çeker.",
  "br": "Brezilya: Samba, karnaval ve çokkültürlü mutfağıyla enerjik bir kültürel mozaik sunar.",
  "bn": "Brunei: Malay kültürü, İslami gelenekler ve kraliyet törenleriyle belirgin bir kimliğe sahiptir.",
  "bg": "Bulgaristan: Balkan halk müziği, geleneksel danslar ve zengin el sanatları geleneği vardır.",
  "bf": "Burkina Faso: Afrika ritimleri, maskeler ve güçlü yerel festival geleneği ile tanınır.",
  "bi": "Burundi: Geleneksel davul ritimleri, halk dansları ve topluluk merkezli kültür öne çıkar.",
  "kh": "Kamboçya: Kamboçya dansları, Angkor mirası ve Budist gelenekleri kültürü şekillendirir.",
  "cm": "Kamerun: Çeşitli etnik müzikleri, dansları ve zengin mutfak gelenekleri ile kültürel çeşitlilik sunar.",
  "ca": "Kanada: Çokkültürlülük, yerli First Nations mirası ve doğa ile iç içe yaşam kültürü önemlidir.",
  "cv": "Yeşil Burun Adaları: Kabo Verde müziği, Portekiz etkisi ve ada kültürü hakimdir.",
  "cf": "Orta Afrika Cumhuriyeti: Yerel kabile gelenekleri, sözlü halk kültürü ve ritüeller önem taşır.",
  "td": "Çad: Sahra ve Sudan kültürlerinin birleştiği, göçebe ve yerleşik geleneklerin karışımı vardır.",
  "cl": "Şili: And ve Pasifik etkileri, folklor ve edebiyat geleneğiyle öne çıkar.",
  "cn": "Çin: Binlerce yıllık gelenekler, konfucianizm, opera ve zengin mutfak çeşitliliği mevcuttur.",
  "co": "Kolombiya: Cumbia ve vallenato gibi müzikleri, canlı dans ve kahve kültürüyle tanınır.",
  "km": "Komorlar: Afrika, Arap ve Fransız etkilerinin harmanlandığı ada kültürü vardır.",
  "cd": "Kongo Demokratik Cumhuriyeti: Zengin müzik gelenekleri (Rumba) ve kabile sanatlarıyla bilinir.",
  "cg": "Kongo: Orta Afrika ritimleri, dans ve sözlü gelenekler kültürde öne çıkar.",
  "cr": "Kosta Rika: 'Pura Vida' yaşam felsefesi, doğa ve çevre odaklı kültür hakimdir.",
  "ci": "Fildişi Sahili: Afro-karayip ritimleri, zengin el sanatları ve dans kültürü bulunur.",
  "hr": "Hırvatistan: Adriyatik kıyı kültürü, tarihsel miras ve folklor gelenekleri önemlidir.",
  "cu": "Küba: Salsa, son müziği, devrim etkileri ve canlı sokak kültürü ile ünlüdür.",
  "cy": "Kıbrıs: Akdeniz kültürü, Yunan ve Türk miraslarının karışımıyla özgün bir kültür sunar.",
  "cz": "Çekya: Klasik müzik, masal geleneği ve zengin bira kültürüyle dikkat çeker.",
  "dk": "Danimarka: Hygge kültürü, tasarım ve denizcilik mirasıyla modern sosyal geleneklere sahiptir.",
  "dj": "Cibuti: Kızıldeniz kıyısı etkileri, göçebe gelenekler ve Karayip-Arap karışımı kültür vardır.",
  "dm": "Dominika: Karayip adası gelenekleri, müzik ve doğa temelli topluluk kültürü bulunur.",
  "do": "Dominik Cumhuriyeti: Merengue, bachata ve Karayip ada yaşam tarzı kültürü öndedir.",
  "ec": "Ekvador: And ve Amazon kültürleri, yerli miras ve zengin el sanatları dikkat çeker.",
  "eg": "Mısır: Antik medeniyet mirası, Arap kültürü ve güçlü halk gelenekleriyle tanınır.",
  "sv": "El Salvador: Orta Amerika halk kültürü, kafe ve geleneksel el sanatlarıyla bilinir.",
  "gq": "Ekvator Ginesi: Bantu ve Fang kültürü ile İspanyol sömürge etkileri karışır.",
  "er": "Eritre: Kızıldeniz kültürü, kahve ritüelleri ve Arap-Afrika karışımı gelenekler vardır.",
  "ee": "Estonya: Baltık gelenekleri, dijital yenilikçilik ve folklorik müzik kültürü önemlidir.",
  "sz": "Esvatini: Kral kültürü, geleneksel danslar ve Zulu etkili folklor öne çıkar.",
  "et": "Etiyopya: Antik Ortodoks gelenekleri, zengin mutfak ve kahve seremoni kültürü mevcuttur.",
  "fj": "Fiji: Pasifik ada kültürü, dans ve topluluk merkezli gelenekleriyle bilinir.",
  "fi": "Finlandiya: Sauna kültürü, halk masalları ve doğa odaklı yaşam tarzı hakimdir.",
  "fr": "Fransa: Gurme mutfak, sanat ve uzun kültürel miras ile dünyaca tanınır.",
  "ga": "Gabon: Orta Afrika orman kültürü, maske ritüelleri ve yerli gelenekler öne çıkar.",
  "gm": "Gambiya: Müzik ve dans, griot gelenekleri ve nehir kültürü önemlidir.",
  "ge": "Gürcistan: Kafkas misafirperverliği, şarap kültürü ve zengin folklor geleneği vardır.",
  "de": "Almanya: Klasik müzik, festivaller (Oktoberfest) ve bölgesel mutfak geleneği öne çıkar.",
  "gh": "Gana: Akan gelenekleri, dans ve canlı müzik kültürü ile zengin bir mirasa sahiptir.",
  "gr": "Yunanistan: Antik miras, Akdeniz mutfağı ve folklorik danslarla kültürü şekillenir.",
  "gd": "Grenada: Baharat adası kültürü, Karayip müzikleri ve ada gelenekleri dikkat çeker.",
  "gt": "Guatemala: Maya mirası, renkli tekstil ve yerli ritüellerle güçlü bir kültüre sahiptir.",
  "gn": "Gine: Müzik ve dans, ritüel ritimleri ve geleneksel el sanatları önemlidir.",
  "gw": "Gine-Bissau: Batı Afrika ritimleri, ada etkileri ve yerel festivaller kültürde var.",
  "gy": "Guyana: Kızılderili, Afrika ve Hint etkilerinin karıştığı çokkültürlü bir kültür sunar.",
  "ht": "Haiti: Voodoo ritüelleri, Fransız-Karayip karışımı ve canlı halk sanatlarıyla bilinir.",
  "hn": "Honduras: Maya kalıntıları, Karayip kıyı kültürü ve yerli gelenekler öne çıkar.",
  "hu": "Macaristan: Folk müzik, dans ve zengin mutfak geleneği ile kültürel açıdan zengindir.",
  "is": "İzlanda: Eşsiz mitoloji, sagalar ve doğa temelli kültürel yaşam ön plandadır.",
  "in": "Hindistan: Çok katmanlı dinler, renkli festivaller, mutfak ve sinema kültürü ile çeşitlilik sunar.",
  "id": "Endonezya: Ada kültürleri, gamelan müziği ve zengin ritüellerle çoklu kültürel mirasa sahiptir.",
  "ir": "İran: Pers edebiyatı, hat sanatları ve misafirperverlik göze çarpan kültürel öğelerdir.",
  "iq": "Irak: Mezopotamya'nın mirası, şiir ve tarihsel kültür izleriyle zengin bir geçmişe sahiptir.",
  "ie": "İrlanda: Halk müziği, anlatı geleneği ve pub kültürüyle güçlü folklorik yaşam vardır.",
  "il": "İsrail: Dinî çeşitlilik, tarihî mekanlar ve Akdeniz mutfağı kültürü belirler.",
  "it": "İtalya: Sanat, mutfak, moda ve tarih boyunca şekillenmiş güçlü bir kültürel miras sunar.",
  "jm": "Jamaika: Reggae müziği, rastafaryanizm ve canlı ada kültürüyle tanınır.",
  "jp": "Japonya: Geleneksel ritüeller, çay seremonisi, manga/anime ve modern teknoloji kültürü harmanlar.",
  "jo": "Ürdün: Arap misafirperverliği, tarihî siteler ve Bedouin kültürü öne çıkar.",
  "kz": "Kazakistan: Göçebe mirası, at kültürü ve Orta Asya halk gelenekleri dikkat çeker.",
  "ke": "Kenya: Maasai kültürü, kahvelik bölgeler ve güçlü doğa-yerli etkileşimi vardır.",
  "ki": "Kiribati: Pasifik ada gelenekleri, balıkçılık ve topluluk odaklı kültür hakimdir.",
  "kp": "Kuzey Kore: Devlet merkezli törenler ve izole edilmiş modern geleneklerle karakterizedir.",
  "kr": "Güney Kore: K-pop, geleneksel hanok mimarisi ve güçlü yemek kültürü ile öne çıkar.",
  "kw": "Kuveyt: Körfez Arap gelenekleri, denizcilik geçmişi ve misafirperverlik kültürü vardır.",
  "kg": "Kırgızistan: Göçebe hayat, atlı kültür ve zengin efsane-epik geleneği bulunur.",
  "la": "Laos: Budist ritüeller, nehir kültürü ve sakin köy yaşamı kültürü belirler.",
  "lv": "Letonya: Baltık halk müzikleri, korolar ve halk danslarıyla güçlü bir kültür vardır.",
  "lb": "Lübnan: Akdeniz mutfağı, şiir ve müzik geleneği ile kültürel çeşitlilik gösterir.",
  "ls": "Lesoto: Sotho kültürü, dağ yaşamı ve geleneksel el sanatları önemlidir.",
  "lr": "Liberya: Afrikalı Amerikan mirası ve yerel etnik geleneklerin karıştığı kültür bulunur.",
  "ly": "Libya: Arap-Berber mirası, göçebe gelenekler ve Akdeniz etkileri göze çarpar.",
  "li": "Lihtenştayn: Alp kültürü, küçük devlet gelenekleri ve Orta Avrupa mirası hakimdir.",
  "lt": "Litvanya: Baltık folkloru, pagan miras ve güçlü müzik geleneği ile bilinir.",
  "lu": "Lüksemburg: Çokdilli, Avrupa kurumsal kültürü ve kent-ülke yaşamının harmanıdır.",
  "mg": "Madagaskar: Endemik kültür, yerli ritüeller ve benzersiz müzik geleneği vardır.",
  "mw": "Malavi: Topluluk temelli yaşam, müzik ve göl kültürü ile tanınır.",
  "my": "Malezya: Malay, Çin ve Hint etkilerinin karıştığı çokkültürlü bir toplumdur.",
  "mv": "Maldivler: İslami ada kültürü, denizcilik ve turizm merkezli gelenekler hakimdir.",
  "ml": "Mali: Griot müzik geleneği, tarihî Timbuktu mirası ve güçlü sözlü kültür vardır.",
  "mt": "Malta: Akdeniz tarihi, dil karışımı ve ada törenleriyle kültürel bir mozaik sunar.",
  "mh": "Marshall Adaları: Pasifik ada gelenekleri, navigasyon ve topluluk ritüelleri önemlidir.",
  "mr": "Moritanya: Sahra kültürü, göçebe hayat ve Arap-Berber karışımı gelenekler vardır.",
  "mu": "Mauritius: Hint, Afrika ve Avrupa etkilerinin kaynaştığı çokkültürlü ada kültürü mevcuttur.",
  "mx": "Meksika: Maya/Aztek mirası, renkli festivaller ve zengin mutfak-tradisyon kültürü ön plandadır.",
  "fm": "Mikronezya: Pasifik adaları kültürü, navigasyon ve yerel törenlerle örülüdür.",
  "md": "Moldova: Doğu Avrupa halk müzikleri, şarap kültürü ve kırsal gelenekler önem taşır.",
  "mc": "Monako: Lüks yaşam, Akdeniz kültürü ve törenleştirilmiş şehir etkinlikleriyle tanınır.",
  "mn": "Moğolistan: Göçebe kültür, atçılık ve geleneksel yurt hayatı merkezi öğelerdir.",
  "me": "Karadağ: Balkan ve Adriyatik kültür karışımı, geleneksel müzik ve misafirperverlik öne çıkar.",
  "ma": "Fas: Maghrebi mutfağı, medina kültürü ve zengin el sanatlarıyla tanınır.",
  "mz": "Mozambik: Portekiz ve Afrika ritimlerinin harmanı, deniz kültürü ve dans önemlidir.",
  "mm": "Myanmar: Budist manastır kültürü, pagodalar ve geleneksel el işleri belirgindir.",
  "na": "Namibya: Güney Afrika yerli kültürleri, avcı-toplayıcı miras ve doğa yaşamı önemlidir.",
  "nr": "Nauru: Küçük ada topluluğu kültürü, balıkçılık ve yerel dayanışma ön plandadır.",
  "np": "Nepal: Himalaya kültürü, Budist ve Hindu geleneklerin iç içe geçtiği bir miras sunar.",
  "nl": "Hollanda: Denizcilik mirası, bisiklet kültürü ve liberal şehir yaşamı öne çıkar.",
  "nz": "Yeni Zelanda: Maori mirası, açık hava sporları ve doğa odaklı kültür dikkat çeker.",
  "ni": "Nikaragua: Orta Amerika folkloru, kahve kültürü ve kıyı-yerli gelenekleri vardır.",
  "ne": "Nijer: Sahra ve Sahel kültürleri, göçebe toplum gelenekleriyle belirgindir.",
  "ng": "Nijerya: Afrobeat, Nollywood ve çok sayıda etnik müzik geleneği ile zengindir.",
  "no": "Norveç: Viking mirası, doğa sevgisi ve güçlü halk masal geleneği vardır.",
  "om": "Umman: Göçebe Arap kültürü, denizcilik geleneği ve misafirperverlik ön plandadır.",
  "pk": "Pakistan: Zengin şiir, müzik ve güçlü misafirperverlik geleneğine sahip bir kültür sunar.",
  "pw": "Palau: Mikronezya ada kültürü, deniz ve topluluk ritüelleri ile örülüdür.",
  "pa": "Panama: Kanal etkisi, Karayip ve Latin kültürlerinin birleştiği canlı bir mozaik sunar.",
  "pg": "Papua Yeni Gine: Kabilesel gelenekler, maskeler ve dansla zengin bir kültüre sahiptir.",
  "py": "Paraguay: Guarani mirası, folklor ve yerel müzik geleneğiyle karakterizedir.",
  "pe": "Peru: İnka mirası, karnaval ve And kültürleri ile zengin tarih sunar.",
  "ph": "Filipinler: Katolik törenleri, ada festivalleri ve çokkültürlü miras hakimdir.",
  "pl": "Polonya: Slav folkloru, edebiyat ve güçlü geleneksel kutlama ritüelleri vardır.",
  "pt": "Portekiz: Denizcilik tarihi, fado müziği ve Akdeniz mutfağı ile tanınır.",
  "qa": "Katar: Körfez Arap geleneği, zengin modernleşme ile birleşen törensel kültür vardır.",
  "ro": "Romanya: Balkan ve Karpat folkloru, efsaneler ve zengin halk dansları bulunur.",
  "ru": "Rusya: Klasik edebiyat, balet, ikonik halk melodileri ve geniş bölgesel çeşitlilik sunar.",
  "rw": "Ruanda: Topluluk kültürü, dans ve sözlü geleneklerin önem taşıdığı bir toplumdur.",
  "kn": "Saint Kitts ve Nevis: Karayip ada kültürü, müzik ve festivallerle bilinir.",
  "lc": "Saint Lucia: Karayip ritimleri, ada törenleri ve doğal güzelliklerin kültürel yansımaları vardır.",
  "vc": "Saint Vincent ve Grenadinler: Ada kültürü, müzik ve festival geleneği ön plandadır.",
  "ws": "Samoa: Pasifik ada törenleri, dans ve topluluk odaklı gelenekler hakimdir.",
  "sm": "San Marino: Ortaçağ gelenekleri ve İtalyan kültürünün etkileriyle küçük bir miras sunar.",
  "st": "Sao Tome ve Principe: Ada tarım kültürü, Portekiz etkisi ve balıkçılık geleneği vardır.",
  "sa": "Suudi Arabistan: İslami gelenekler, hac ve Arap misafirperverliği kültürü öne çıkar.",
  "sn": "Senegal: Goree adası tarihi, mbalax müziği ve canlı folklor geleneği vardır.",
  "rs": "Sırbistan: Balkan ritimleri, folklor ve zengin tarihi halk gelenekleri bulunur.",
  "sc": "Seyşeller: Ada yaşamı, Creole mutfağı ve çokkültürlü ada gelenekleri önemlidir.",
  "sl": "Sierra Leone: Batı Afrika ritimleri, yerel törenler ve sözlü kültür hakimdir.",
  "sg": "Singapur: Çokkültürlü toplum, Çin-Malay-Hint etkilerinin harmanlandığı modern bir kültürdür.",
  "sk": "Slovakya: Karpat folkloru, halk dansları ve geleneksel el sanatlarıyla bilinir.",
  "si": "Slovenya: Alp ve Karst kültürü, halk festivalleri ve doğa temelli geleneklere sahiptir.",
  "sb": "Solomon Adaları: Melanezya kültürü, kabile gelenekleri ve deniz yaşamı önem taşır.",
  "so": "Somali: Sahil ve göçebe Arap-Afrika karışımı kültür, şiir ve ağıt geleneği vardır.",
  "za": "Güney Afrika: Çokkültürlü toplum, dans, müzik ve zengin etnik miras sunar.",
  "ss": "Güney Sudan: Yeni kurulan ülke olarak yerel kabile gelenekleri ve ritüeller önemlidir.",
  "es": "İspanya: Flamenko, bölgesel kutlamalar ve İber yarımadası mutfak kültürü öne çıkar.",
  "lk": "Sri Lanka: Budist törenler, tekstil ve ada festivalleriyle zengin bir kültüre sahiptir.",
  "sd": "Sudan: Nil kültürü, Arap ve Afrika karışımı gelenekler ile topluluk törenleri vardır.",
  "sr": "Surinam: Çokkültürlü miras, Hindistan, Afrika ve Javan etkileriyle zengin bir kültür sunar.",
  "se": "İsveç: Kuzeyli tasarım, folk müzik ve toplum temelli kutlama gelenekleri önemlidir.",
  "ch": "İsviçre: Alp gelenekleri, saatçilik kültürü ve bölgesel dillerin harmonisi mevcuttur.",
  "sy": "Suriye: Antik medeniyetler, Arap kültürü ve zengin mutfak geleneğiyle tanınır.",
  "tw": "Tayvan: Çin kültürü, gece pazarları ve güçlü popüler kültür öğeleri vardır.",
  "tj": "Tacikistan: Pamir dağ kültürü, şiir ve göçebe mirası ile karakterizedir.",
  "tz": "Tanzanya: Swahili kıyı kültürü, safari gelenekleri ve çok etnili folklor bulunur.",
  "th": "Tayland: Budist tapınaklar, festival kültürü ve zengin mutfak geleneği ön plandadır.",
  "tl": "Doğu Timor: Yerli Timorese gelenekleri, ritüeller ve toplum temelli törenler vardır.",
  "tg": "Togo: Batı Afrika ritimleri, pazar kültürü ve geleneksel heykel-işleri ile bilinir.",
  "to": "Tonga: Pasifik ada kraliyet törenleri, dans ve toplum yaşamı öne çıkar.",
  "tt": "Trinidad ve Tobago: Calypso, soca müziği ve karnaval kültürü ile ünlüdür.",
  "tn": "Tunus: Akdeniz ve Arap mirası, mozaik sanatları ve geleneksel pazar kültürü vardır.",
  "tr": "Türkiye: Osmanlı ve Anadolu mirası, zengin mutfak, müzik ve misafirperverlik kültürü sunar.",
  "tm": "Türkmenistan: Göçebe halı dokumacılığı, destan geleneği ve İpek Yolu mirası önemlidir.",
  "tv": "Tuvalu: Minik ada topluluk kültürü, deniz ve balıkçılık gelenekleri merkezidir.",
  "ug": "Uganda: Bantu ve Nilotik gelenekleri, dans ve müzik zenginliği ile bilinir.",
  "ua": "Ukrayna: Halk müziği, nakışlı tekstiller ve güçlü kırsal folklor geleneği vardır.",
  "ae": "Birleşik Arap Emirlikleri: Modern şehir kültürü ile Arap misafirperverliği birleşir.",
  "gb": "Birleşik Krallık: Edebiyat, tiyatro ve bölgesel geleneklerle zengin bir kültürel çeşitlilik sunar.",
  "us": "Amerika Birleşik Devletleri: Çeşitli göçmen mirasları, popüler kültür ve bölgesel gelenekler bulunur.",
  "uy": "Uruguay: Güney Amerika gaucho kültürü, mate içme geleneği ve sakin yaşam tarzı vardır.",
  "uz": "Özbekistan: İpek Yolu şehirleri, halıcılık ve İslam öncesi kültür izlerini taşır.",
  "vu": "Vanuatu: Melanezya ritüelleri, kastom kültürü ve dans gelenekleri önemlidir.",
  "va": "Vatikan: Katolik liturjisi, kutsal törenler ve dini mirasın merkezi olarak bilinir.",
  "ve": "Venezuela: Latin müzikleri, dans ve güçlü sokak festivalleri kültürü vardır.",
  "vn": "Vietnam: Konfüçyüs ve Budist etkili törenler, sokak yemek kültürü ve zanaat öne çıkar.",
  "ye": "Yemen: Arap yarımadası gelenekleri, mimari ve kahve kültürü ile dikkat çeker.",
  "zm": "Zambiya: Bemba ve diğer kabile gelenekleri, müzik ve topluluk ritüelleri önemlidir.",
  "zw": "Zimbabve: Shona kültürü, mbira müziği ve zengin el sanatları mirası vardır."
};

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

