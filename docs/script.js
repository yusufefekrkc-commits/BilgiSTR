document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return;

  // ============================================================
  //  1. CSS STİLLERİ VE MODAL YAPISI EKLE (GÜNCEL)
  // ============================================================

  const modalHTML = `
    <div id="country-modal" style="
        display: none; position: fixed; z-index: 1000; left: 0; top: 0; 
        width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.7);
        backdrop-filter: blur(5px);
    ">
        <div id="modal-content" style="
            background-color: #fefefe; margin: 5% auto; padding: 25px; 
            border: 1px solid #888; width: 90%; max-width: 800px; /* MODAL GENİŞLİĞİ BÜYÜTÜLDÜ */ 
            border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            position: relative;
        ">
            <span id="close-modal" style="
                color: #aaa; float: right; font-size: 32px; font-weight: bold;
                cursor: pointer; transition: color 0.2s;
            " onmouseover="this.style.color='#f00'" onmouseout="this.style.color='#aaa'">&times;</span>
            <h2 id="modal-title" style="
                color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px; 
                margin-top: 0; font-size: 24px;
            "></h2>
            <p id="modal-text" style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;"></p>
            
            <video id="modal-video" autoplay muted controls width="100%" style="
                display: block; width: 100%; height: auto; /* Tam genişlik ve otomatik yükseklik */
                margin-top: 15px; border-radius: 5px; background: #000;
            ">
                <source id="video-source" src="" type="video/mp4">
                Tarayıcınız video etiketini desteklemiyor.
            </video>
        </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('country-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');
  const videoSource = document.getElementById('video-source');
  const modalVideo = document.getElementById('modal-video');
  const closeModal = document.getElementById('close-modal');

  // Kapatma Fonksiyonları
  closeModal.onclick = function() {
    modal.style.display = "none";
    modalVideo.pause(); // Video kapatılınca durdurulur
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalVideo.pause(); // Modal dışına tıklanırsa durdurulur
    }
  }

  // ============================================================
  //  2. TIKLANABİLİRLİK ZORLAMASI
  // ============================================================

  // Tıklamayı zorla aç
  svg.querySelectorAll("*").forEach(el => {
      el.style.pointerEvents = "all";
      el.style.cursor = "pointer";
  });

  // Engel olabilecek şeffaf katmanları devre dışı bırak
  document.querySelectorAll("svg rect, svg defs, svg g[opacity='0'], svg [fill='none'], svg [fill='transparent']")
    .forEach(el => {
        el.style.pointerEvents = "none";
    });

  // ============================================================
  //  3. ÜLKE BİLGİLERİ (TÜM LİSTE)
  // ============================================================

  const countryNames = {
    af:"Afganistan", al:"Arnavutluk", dz:"Cezayir", ad:"Andorra", ao:"Angola",
    ag:"Antigua ve Barbuda", ar:"Arjantin", am:"Ermenistan", au:"Avustralya",
    at:"Avusturya", az:"Azerbaycan", bs:"Bahamalar", bh:"Bahreyn",
    bd:"Bangladeş", bb:"Barbados", by:"Belarus", be:"Belçika", bz:"Belize",
    bj:"Benin", bt:"Bhutan", bo:"Bolivya", ba:"Bosna-Hersek", bw:"Botsvana",
    br:"Brezilya", bn:"Brunei", bg:"Bulgaristan", bf:"Burkina Faso",
    bi:"Burundi", kh:"Kamboçya", cm:"Kamerun", ca:"Kanada", cv:"Yeşil Burun",
    cf:"Orta Afrika Cumhuriyeti", td:"Çad", cl:"Şili", cn:"Çin", co:"Kolombiya",
    km:"Komorlar", cd:"Kongo Demokratik Cumhuriyeti", cg:"Kongo Cumhuriyeti", cr:"Kosta Rika",
    ci:"Fildişi Sahili", hr:"Hırvatistan", cu:"Küba", cy:"Kıbrıs", cz:"Çekya",
    dk:"Danimarka", dj:"Cibuti", dm:"Dominika", do:"Dominik Cumhuriyeti",
    ec:"Ekvador", eg:"Mısır", sv:"El Salvador", gq:"Ekvator Ginesi",
    er:"Eritre", ee:"Estonya", sz:"Esvatini", et:"Etiyopya", fj:"Fiji",
    fi:"Finlandiya", fr:"Fransa", ga:"Gabon", gm:"Gambiya", ge:"Gürcistan",
    de:"Almanya", gh:"Gana", gr:"Yunanistan", gd:"Grenada", gt:"Guatemala",
    gn:"Gine", gw:"Gine-Bissau", gy:"Guyana", ht:"Haiti", hn:"Honduras",
    hu:"Macaristan", is:"İzlanda", in:"Hindistan", id:"Endonezya",
    ir:"İran", iq:"Irak", ie:"İrlanda", il:"İsrail", it:"İtalya",
    jm:"Jamaika", jp:"Japonya", jo:"Ürdün", kz:"Kazakistan", ke:"Kenya",
    ki:"Kiribati", kp:"Kuzey Kore", kr:"Güney Kore", kw:"Kuveyt",
    kg:"Kırgızistan", la:"Laos", lv:"Letonya", lb:"Lübnan", ls:"Lesoto",
    lr:"Liberya", ly:"Libya", li:"Lihtenştayn", lt:"Litvanya",
    lu:"Lüksemburg", mg:"Madagaskar", mw:"Malavi", my:"Malezya",
    mv:"Maldivler", ml:"Mali", mt:"Malta", mh:"Marshall Adaları",
    mr:"Moritanya", mu:"Mauritius", mx:"Meksika", fm:"Mikronezya",
    md:"Moldova", mc:"Monako", mn:"Moğolistan", me:"Karadağ",
    ma:"Fas", mz:"Mozambik", mm:"Myanmar", na:"Namibya", nr:"Nauru",
    np:"Nepal", nl:"Hollanda", nz:"Yeni Zelanda", ni:"Nikaragua",
    ne:"Nijer", ng:"Nijerya", no:"Norveç", om:"Umman", pk:"Pakistan",
    pw:"Palau", pa:"Panama", pg:"Papua Yeni Gine", py:"Paraguay",
    pe:"Peru", ph:"Filipinler", pl:"Polonya", pt:"Portekiz", qa:"Katar",
    ro:"Romanya", ru:"Rusya", rw:"Ruanda", kn:"Saint Kitts ve Nevis",
    lc:"Saint Lucia", vc:"Saint Vincent", ws:"Samoa", sm:"San Marino",
    st:"Sao Tome ve Principe", sa:"Suudi Arabistan", sn:"Senegal", rs:"Sırbistan",
    sc:"Seyşeller", sl:"Sierra Leone", sg:"Singapur", sk:"Slovakya",
    si:"Slovenya", sb:"Solomon Adaları", so:"Somali", za:"Güney Afrika",
    ss:"Güney Sudan", es:"İspanya", lk:"Sri Lanka", sd:"Sudan",
    sr:"Surinam", se:"İsveç", ch:"İsviçre", sy:"Suriye", tw:"Tayvan",
    tj:"Tacikistan", tz:"Tanzanya", th:"Tayland", tl:"Doğu Timor",
    tg:"Togo", to:"Tonga", tt:"Trinidad ve Tobago", tn:"Tunus",
    tr:"Türkiye", tm:"Türkmenistan", tv:"Tuvalu", ug:"Uganda",
    ua:"Ukrayna", ae:"Birleşik Arap Emirlikleri", gb:"Birleşik Krallık", us:"Amerika Birleşik Devletleri",
    uy:"Uruguay", uz:"Özbekistan", vu:"Vanuatu", va:"Vatikan",
    ve:"Venezuela", vn:"Vietnam", ye:"Yemen", zm:"Zambiya",
    zw:"Zimbabve"
  };

  const countryTexts = {
    af:"Afganistan:“Bağlantı Çeken Akşam”
Kabil’in Dasht-e-Barchi bölgesinde, akşam karanlığı çökerken Faridi ailesinin evinde telefon ekranlarının soluk ışığı duvarlara vuruyordu. Elektrikler gün boyu birkaç kez gitmişti ama tam akşam yemeği öncesi gelmişti — ev halkı için artık normal bir rutin.
Anne Şekibe mutfakta sıcak ekmekleri yerleştirirken bir yandan su ısıtıcısının fişini kontrol etti.
“Çok çekiyor bu alet, yine sigortayı atmasın,” diye söylendi kendi kendine.
O sırada on altı yaşındaki kızı Lema, avlunun bir köşesinde telefonunu havaya kaldırmış, daha iyi çekmesi için doğru noktayı arıyordu.
“Anne! Bekle, videoyu indireyim de sonra sofraya gelirim. İki dakikalık şey ama yine dolmuyor!”
Sesi hafif sinirliydi; internet gün içinde zaten neredeyse hiç çalışmamıştı.
Küçük kardeşi Sami ise elindeki eski tabletle duvara yaslanmış “PUBG Mobile Lite” oynuyordu. İnternet yavaş olduğu için oyun sık sık donuyor, her donduğunda da Sami derin bir iç çekiyordu.
Baba Latif kapıdan içeri girince önce çocuklara, sonra avluya yayılan ekran ışıklarına baktı.
“Selamünaleyküm. Yine herkes telefonun içinde kaybolmuş.”
Ama bu cümleyi kızgınlıkla değil, alışılmış bir tonda söyledi. Çünkü kendisi de sabah işe gitmeden önce haberleri telefonundan okuyordu; internet olunca dünyaya bağlanmak artık vazgeçilmezdi.
Şekibe sofrayı hazırlarken Latif’e dönüp:
“Bugün elektrik üç kere gitti ama çocuklar yine telefonları bırakmadı. Okul ödevlerini de telefondan yapıyorlar artık. Bizim zamanımızda defter kalem vardı sadece…” dedi.
Latif gülümsedi.
“Zaman değişti Şekibe. Hem ödevlerini yapsınlar da varsın telefonla olsun.”
Sofra kurulduğunda internet yine bir süreliğine düzeldi. Bu kez Lema masaya otururken bile telefonunu bırakmadı; öğretmeninin gönderdiği PDF ödevini indiriyordu.
Latif, “Kızım, bari yemek yerken kenara koy,” dese de Lema başını kaldırmadan,
“Baba, birazdan yine gidecek. Şimdi indirmezsem sabaha kalır,” dedi.
Sami ise tableti kapatıp iç geçirdi.
“Yarın arkadaşlarla çevrim içi oynamak istiyorduk ama bizim internet böyle olursa nasıl olacak bilmiyorum.”
Latif oğluna dönüp ses tonunu yumuşattı.
“Bak oğlum, oyun iyidir ama fazla kaptırma kendini. Hem internet iyice hızlanınca oynarsın.”
Yemek sırasında aile, telefondan kısa haber videolarını izleyip günün olaylarını konuştu. Bu Afganistan’da sık görülen bir alışkanlıktı; televizyonun yerini çoğu evde akıllı telefon çoktan almıştı.
Yemekten sonra Şekibe çay koydu. Lema ise sosyal medyada yavaşça yüklenen fotoğraflara bakıp arkadaşlarına mesaj yazıyordu.
“Anne, bak Zohra yeni telefon almış… Kamerası çok iyi,” dedi.
Şekibe başını salladı.
“Kızım, bizim önce kira parasını düşünmemiz lazım. Telefon sonra gelir.”
Lema telefonu sessize aldı ama gözleri hâlâ ekrandaydı; hayalleri, bağlantı hızından daha genişti.
Baba Latif çayını karıştırırken hafifçe gülümsedi.
“Biz eskiden akşamları radyo dinlerdik. Şimdi siz dünyayı ceplerinizde taşıyorsunuz.”
Lema babasına baktı, kendi de gülümsedi.
“Baba, radyo zamanı daha güzelmiş belki ama… şimdi de herkes birbirine daha yakın. İnternet çektiği kadarıyla…”
Tam bu sırada ışıklar hafifçe titredi, ardından internet tekrar koptu. Ev bir anda sessizliğe büründü.
Sami tabletini yere bıraktı, Lema telefonu kapattı. Şekibe’nin yüzünde hafif bir rahatlama belirdi.
“Eh, herkes biraz gözünü dinlendirsin. Biraz da birbirimizle konuşalım.”
Bu kez itiraz eden olmadı.
Avluda, loş ampulün altında aile çaylarını yudumlarken günlük hayatın telaşı, teknolojinin hızına yetişemeyen bağlantılar ve yavaşça yüklenen videolar bir süreliğine unutuldu.
Telefonlar sessizdi ama sohbet ilk defa günün en güçlü bağlantısı olmuştu.
",
    al:"Arnavutluk: Balkan folkloru ve sıcak kültürel yapısıyla bilinir.",
    dz:"Cezayir: Berberi ve Arap kültürünün birleştiği köklü bir mirasa sahiptir.",
    ad:"Andorra: Pirene dağ kültürü ve küçük topluluk gelenekleriyle ünlüdür.",
    ao:"Angola: Zengin müzik ve dans kültürüyle tanınır.",
    ag:"Antigua ve Barbuda: Karayip festivalleri ve sahil kültürüyle öne çıkar.",
    ar:"Arjantin: Tango ve Güney Amerika mutfak kültürüyle ünlüdür.",
    am:"Ermenistan: Derin tarih ve halk müziği geleneğine sahiptir.",
    au:"Avustralya: Aborjin kültürü ve modern şehir yaşamı bir aradadır.",
    at:"Avusturya: Klasik müzik ve tarihi Avrupa mimarisiyle tanınır.",
    az:"Azerbaycan: Mugam geleneği ve Kafkas kültürü ile bilinir.",
    bs:"Bahamalar: Rengarenk Junkanoo festivaliyle ve deniz yaşamıyla öne çıkar.",
    bh:"Bahreyn: Antik Dilmun medeniyetine ev sahipliği yapmış, ticaret merkezi bir ada ülkesidir.",
    bd:"Bangladeş: Zengin nehir kültürü ve dinamik tekstil endüstrisi ile bilinir.",
    bb:"Barbados: İngiliz ve Batı Afrika geleneklerinin harmanlandığı kültürüyle tanınır.",
    by:"Belarus: Ormanları, kaleleri ve güçlü halk sanatları geleneğiyle ünlüdür.",
    be:"Belçika: Çikolata, bira ve çeşitli dilleri (Flamanca, Fransızca, Almanca) barındıran kültürüyle tanınır.",
    bz:"Belize: Maya kalıntıları ve Karayip-Meksika kültürü karışımıyla dikkat çeker.",
    bj:"Benin: Vudu'nun doğum yeri olarak bilinen zengin kültürel mirasa sahiptir.",
    bt:"Bhutan: Budist manastırları ve 'Gayri Safi Milli Mutluluk' felsefesiyle tanınır.",
    bo:"Bolivya: And Dağları'nda yer alan yerli kültürün güçlü olduğu bir ülkedir.",
    ba:"Bosna-Hersek: Doğu ve Batı kültürlerinin buluşma noktası olan karmaşık bir tarihe sahiptir.",
    bw:"Botsvana: Afrika'nın en büyük vahşi yaşam koruma alanlarına sahip, elmas zengini bir ülkedir.",
    br:"Brezilya: Samba, karnaval ve devasa Amazon Yağmur Ormanlarına ev sahipliği yapar.",
    bn:"Brunei: Zengin İslam kültürü ve refah seviyesi yüksek bir Asya ülkesidir.",
    bg:"Bulgaristan: Slav kültürü, Ortodoks gelenekleri ve gül yağı üretimiyle bilinir.",
    bf:"Burkina Faso: Afrika sinemasının önemli merkezlerinden biri olan kültürel bir ülkedir.",
    bi:"Burundi: Göl manzaraları ve geleneksel davullarıyla ünlü, yoğun nüfuslu bir ülkedir.",
    kh:"Kamboçya: Angkor Wat tapınakları ve Khmer kültürüyle dünyaya tanınır.",
    cm:"Kamerun: 'Mini Afrika' olarak adlandırılan kültürel ve coğrafi çeşitliliğe sahiptir.",
    ca:"Kanada: Çeşitli etnik kökenlere sahip, geniş doğal alanlara ve iki resmi dile (İngilizce ve Fransızca) sahip bir ülkedir.",
    cv:"Yeşil Burun: Portekiz ve Afrika kültürlerinin harmanlandığı Morna müziğiyle ünlüdür.",
    cf:"Orta Afrika Cumhuriyeti: Yoğun ormanları ve el sanatlarıyla dikkat çeker.",
    td:"Çad: Sahra Çölü kültürü ve göçebe yaşam tarzının yaygın olduğu bir ülkedir.",
    cl:"Şili: Uzun, dar coğrafyası, And Dağları ve köklü şarap üretimiyle tanınır.",
    cn:"Çin: Binlerce yıllık tarihi, Konfüçyüs felsefesi ve geleneksel tıbbıyla ünlüdür.",
    co:"Kolombiya: Latin Amerika edebiyatı, kahvesi ve salsa dansıyla bilinir.",
    km:"Komorlar: Hint Okyanusu'nda yer alan, Arap ve Afrika kültürlerinin izlerini taşıyan volkanik bir adalar ülkesidir.",
    cd:"Kongo Demokratik Cumhuriyeti: Afrika'nın en büyük ikinci ülkesi, Soukous müziği ve doğal kaynaklarıyla tanınır.",
    cg:"Kongo Cumhuriyeti: Tropikal ormanları ve geleneksel Pygme topluluklarıyla bilinir.",
    cr:"Kosta Rika: Biyoçeşitliliği, 'Pura Vida' yaşam felsefesi ve ordusuz bir ülke olmasıyla öne çıkar.",
    ci:"Fildişi Sahili: Kakao ve kahve üretimiyle ünlü, zengin bir Batı Afrika kültürüne sahiptir.",
    hr:"Hırvatistan: Adriyatik kıyıları, tarihi şehirleri ve Slav kültürüyle tanınır.",
    cu:"Küba: Devrimci tarihi, purosu, romu ve eşsiz Afro-Küba müziğiyle ünlüdür.",
    cy:"Kıbrıs: Yunan ve Türk kültürlerinin harmanlandığı, Akdeniz'in doğusunda yer alan bir adadır.",
    cz:"Çekya: Orta Avrupa'nın kalbinde yer alan, tarihi Prag şehri ve Bohemya camlarıyla meşhurdur.",
    dk:"Danimarka: Viking mirası, modern tasarım ve 'hygge' (rahatlık) yaşam tarzıyla bilinir.",
    dj:"Cibuti: Kızıldeniz ticaret yollarının üzerinde stratejik bir konuma sahiptir.",
    dm:"Dominika: 'Karayiplerin Doğal Adası' olarak bilinir, volkanik ve ormanlık yapısıyla öne çıkar.",
    do:"Dominik Cumhuriyeti: Beisbol, merengue ve bachata dansları ile Karayip turizminin merkezlerindendir.",
    ec:"Ekvador: Ekvator çizgisi üzerinde yer alır, Galapagos Adaları ve And medeniyetleriyle tanınır.",
    eg:"Mısır: Piramitler, Nil Nehri ve köklü Antik Mısır tarihiyle dünyanın dikkatini çeker.",
    sv:"El Salvador: Orta Amerika'da yer alır, volkanik manzaralar ve kahve üretimiyle bilinir.",
    gq:"Ekvator Ginesi: Afrika'da İspanyolcanın resmi dil olduğu tek ülkedir.",
    er:"Eritre: İtalya'dan kalma Art Deco mimarisiyle ve Kızıldeniz kıyısıyla öne çıkar.",
    ee:"Estonya: Dijital devleti, Baltık kültürü ve ormanlık doğasıyla tanınır.",
    sz:"Esvatini: Afrika'nın son mutlak monarşilerinden biri olup, geleneksel festivalleriyle bilinir.",
    et:"Etiyopya: Afrika'nın en eski bağımsız devleti, kendine özgü takvimi ve kahvenin anavatanıdır.",
    fj:"Fiji: Pasifik ada kültürü, mercan resifleri ve misafirperverliğiyle ünlüdür.",
    fi:"Finlandiya: Binlerce göl ülkesi, sauna kültürü ve yüksek teknolojiye sahip İskandinav ülkesidir.",
    fr:"Fransa: Sanat, moda, gastronomi ve romantik şehirleriyle dünya çapında etkilidir.",
    ga:"Gabon: Afrika'nın en az nüfuslu ülkelerinden olup, büyük ulusal parklara sahiptir.",
    gm:"Gambiya: Batı Afrika'nın en küçük ülkesidir, nehir kenarındaki yaşam kültürüyle bilinir.",
    ge:"Gürcistan: Antik şarap yapımı geleneği ve Kafkas Dağları'nın kültürüyle tanınır.",
    de:"Almanya: Otomotiv, mühendislik, kültürel festivalleri (Oktoberfest) ve karmaşık tarihiyle ünlüdür.",
    gh:"Gana: Batı Afrika'nın altın ve kakao zengini, demokratik bir ülkesidir.",
    gr:"Yunanistan: Batı medeniyetinin beşiği, antik felsefe ve Akdeniz adalarıyla tanınır.",
    gd:"Grenada: 'Baharat Adası' olarak bilinir, nutmeg (küçük Hindistan cevizi) üretimiyle öne çıkar.",
    gt:"Guatemala: Maya medeniyetinin merkezlerinden biri ve zengin tekstil sanatıyla meşhurdur.",
    gn:"Gine: Zengin mineral yataklarına sahip, Batı Afrika'da Fransızca konuşan bir ülkedir.",
    gw:"Gine-Bissau: Portekiz sömürge mirası ve Atlantik kıyısındaki adalarıyla dikkat çeker.",
    gy:"Guyana: Karayip kültürü ve Güney Amerika'daki tek İngilizce konuşan ülkedir.",
    ht:"Haiti: Latin Amerika'nın ilk bağımsız ülkesi, zengin halk sanatı ve Vudu kültürüyle tanınır.",
    hn:"Honduras: Maya tarihi ve Karayip'teki mercan resifleriyle ünlüdür.",
    hu:"Macaristan: Termal suları, Budapeşte'nin mimarisi ve zengin müzik kültürüyle bilinir.",
    is:"İzlanda: Volkanik manzaralar, gayzerler ve eşsiz Viking mirasıyla öne çıkar.",
    in:"Hindistan: Dünyanın en kalabalık ülkesi, Hinduizm, Yoga ve sinema (Bollywood) kültürüyle tanınır.",
    id:"Endonezya: Binlerce adadan oluşan, dünyanın en büyük takımadalar ülkesidir.",
    ir:"İran: Eski Pers İmparatorluğu'nun mirası, zengin şiir ve İslami mimari geleneğiyle ünlüdür.",
    iq:"Irak: Mezopotamya uygarlıklarının beşiği ve köklü bir Arap kültürüne sahiptir.",
    ie:"İrlanda: Kelt kültürü, yeşil manzaraları ve güçlü edebiyat geleneğiyle bilinir.",
    il:"İsrail: Üç büyük dinin kutsal yerlerini barındıran, teknolojik olarak gelişmiş bir ülkedir.",
    it:"İtalya: Roma İmparatorluğu'nun mirası, Rönesans sanatı, moda ve mutfağıyla meşhurdur.",
    jm:"Jamaika: Reggae müziği, atletizm ve kendine özgü Rastafari kültürüyle dünyaya yayılmıştır.",
    jp:"Japonya: Yüksek teknoloji, Manga/Anime, samuray mirası ve geleneksel sanatlarıyla tanınır.",
    jo:"Ürdün: Petra antik kenti, çöl manzaraları ve Ortadoğu misafirperverliğiyle bilinir.",
    kz:"Kazakistan: Orta Asya'nın en büyük ülkesi, göçebe kültürü ve modern şehirleriyle dikkat çeker.",
    ke:"Kenya: Maasai kültürü, safari turizmi ve Büyük Rift Vadisi'ne ev sahipliği yapar.",
    ki:"Kiribati: Ekvator üzerinde yer alan, iklim değişikliğinden etkilenen Pasifik ada devletidir.",
    kp:"Kuzey Kore: Kapalı rejimi ve nükleer programıyla uluslararası alanda bilinir.",
    kr:"Güney Kore: K-Pop, Samsung gibi markalar ve dinamik teknoloji kültürüyle tanınır.",
    kw:"Kuveyt: Basra Körfezi'nde yer alan, petrol zengini Arap bir devlettir.",
    kg:"Kırgızistan: İpekyolu tarihi, dağlık manzaraları ve göçebe yaşam kültürüyle ünlüdür.",
    la:"Laos: Güneydoğu Asya'nın az nüfuslu, Budist kültürüyle zenginleşmiş bir ülkesidir.",
    lv:"Letonya: Baltık kültürüne sahip, Riga'nın tarihi mimarisiyle öne çıkan bir ülkedir.",
    lb:"Lübnan: Akdeniz ve Ortadoğu kültürlerinin buluştuğu, zengin bir mutfak geleneğine sahiptir.",
    ls:"Lesoto: Güney Afrika Cumhuriyeti'nin içinde yer alan, dağlık bir krallıktır.",
    lr:"Liberya: Afrika'nın ilk bağımsız cumhuriyetlerinden biri, ABD ile tarihi bağları vardır.",
    ly:"Libya: Kuzey Afrika'nın Sahra Çölü'nün büyük kısmını kapsayan zengin bir tarihe sahiptir.",
    li:"Lihtenştayn: İsviçre ve Avusturya arasında, Alpler'de yer alan küçük bir prensliktir.",
    lt:"Litvanya: Baltık ülkelerinden biri, güçlü basketbol geleneği ve tarihi Vilnus kentiyle bilinir.",
    lu:"Lüksemburg: Avrupa'nın kalbinde yer alan, finans merkezi ve çok dilli bir ülkedir.",
    mg:"Madagaskar: Eşsiz biyoçeşitliliği, lemurları ve kendine özgü kültürüyle ünlüdür.",
    mw:"Malavi: 'Afrika'nın Sıcak Kalbi' olarak bilinir, Malavi Gölü çevresinde yaşam yoğundur.",
    my:"Malezya: Malay, Çin ve Hint kültürlerinin birleştiği zengin bir Asya ülkesidir.",
    mv:"Maldivler: Hint Okyanusu'nda yer alan lüks turizm destinasyonu ve alçak mercan adalarıyla tanınır.",
    ml:"Mali: Antik Batı Afrika imparatorluklarının (Mali, Songay) mirasına sahip, Timbuktu'ya ev sahipliği yapar.",
    mt:"Malta: Akdeniz'in ortasında yer alan, tarih boyunca stratejik öneme sahip küçük bir adadır.",
    mh:"Marshall Adaları: Pasifik'te yer alan, II. Dünya Savaşı testlerinin yapıldığı tarihi bir bölgedir.",
    mr:"Moritanya: Kuzey Afrika ve Batı Afrika kültürlerinin kesişim noktası, Sahra'nın büyük bir kısmını kaplar.",
    mu:"Mauritius: Volkanik kökenli, çok kültürlü ve turistik bir Hint Okyanusu adasıdır.",
    mx:"Meksika: Aztek ve Maya medeniyetlerinin mirası, tekila, mariachi ve renkli ölüler günü kültürüyle bilinir.",
    fm:"Mikronezya: Pasifik Okyanusu'nda dağınık adacıklardan oluşan federal bir devlettir.",
    md:"Moldova: Tarihi üzüm bağları ve Doğu Avrupa'daki kültürel konumuyla öne çıkar.",
    mc:"Monako: Dünyanın en küçük ve en zengin ülkelerinden biri, Monte Carlo kumarhaneleriyle tanınır.",
    mn:"Moğolistan: Cengiz Han'ın mirası, göçebe yaşam tarzı ve uçsuz bucaksız bozkırlarıyla bilinir.",
    me:"Karadağ: Adriyatik kıyıları, dağlık manzaralar ve zengin Slav kültürüyle öne çıkar.",
    ma:"Fas: Berberi ve Arap kültürünün birleştiği, renkli çarşıları ve tarihi şehirleriyle ünlüdür.",
    mz:"Mozambik: Portekiz sömürge mirası ve Hint Okyanusu kıyısındaki doğal güzellikleriyle dikkat çeker.",
    mm:"Myanmar: Budist tapınakları, etnik çeşitliliği ve tarihi Bagan kentiyle bilinir.",
    na:"Namibya: Afrika'nın güneybatısında yer alır, Namib Çölü ve vahşi yaşamıyla ünlüdür.",
    nr:"Nauru: Dünyanın en küçük ada ülkesi, fosfat rezervleriyle zenginleşmiştir.",
    np:"Nepal: Himalaya Dağları, Everest Tepesi ve Budizm'in doğum yeri olmasıyla öne çıkar.",
    nl:"Hollanda: Yel değirmenleri, laleler, bisiklet kültürü ve su yönetimi teknolojisiyle tanınır.",
    nz:"Yeni Zelanda: Maori kültürü, dağlık ve yeşil manzaralarıyla (Yüzüklerin Efendisi çekim yeri) bilinir.",
    ni:"Nikaragua: Orta Amerika'da yer alır, volkanlar ve göllerle dolu doğal güzelliklere sahiptir.",
    ne:"Nijer: Batı Afrika'da Sahra çölünün büyük bir kısmını kaplayan sıcak bir ülkedir.",
    ng:"Nijerya: Afrika'nın en kalabalık ülkesi, güçlü sinema (Nollywood) ve müzik kültürüyle öne çıkar.",
    no:"Norveç: Fiyortlar, Viking tarihi, petrol zenginliği ve İskandinav kültürüyle tanınır.",
    om:"Umman: Arap Yarımadası'nın güneydoğusunda yer alır, denizcilik tarihi ve geleneksel mimarisiyle bilinir.",
    pk:"Pakistan: İndus Vadisi Uygarlığı'nın mirası, dağlık bölgeleri ve İslami kültürüyle öne çıkar.",
    pw:"Palau: Mikronezya'da yer alan, eşsiz su altı yaşamı ve mercan resifleriyle ünlüdür.",
    pa:"Panama: Panama Kanalı ile iki okyanusu birbirine bağlayan stratejik bir ülkedir.",
    pg:"Papua Yeni Gine: Dünyanın en çok konuşulan dillerine ev sahipliği yapan kültürel açıdan zengin bir ülkedir.",
    py:"Paraguay: Güney Amerika'nın denize kıyısı olmayan, Guarani kültürüyle tanınan bir ülkesidir.",
    pe:"Peru: İnka İmparatorluğu'nun mirası (Machu Picchu), And kültürü ve zengin mutfağıyla ünlüdür.",
    ph:"Filipinler: Binlerce adadan oluşan, İspanyol ve Amerikan kültürlerinin izlerini taşıyan bir ülkedir.",
    pl:"Polonya: Avrupa'nın ortasında yer alır, güçlü Katolik geleneği ve tarihi şehirleriyle bilinir.",
    pt:"Portekiz: Denizcilik tarihi, Fado müziği ve Atlantik kıyısındaki kültürüyle tanınır.",
    qa:"Katar: Basra Körfezi'nde yer alan, yüksek gelirli petrol ve gaz zengini bir Arap devlettir.",
    ro:"Romanya: Drakula efsanesiyle bilinen Transilvanya ve Doğu Avrupa kültürüyle öne çıkar.",
    ru:"Rusya: Dünyanın en büyük ülkesi, köklü edebiyat, bale ve karmaşık siyasi tarihiyle bilinir.",
    rw:"Ruanda: 'Bin Tepenin Ülkesi' olarak bilinir, Goril turizmi ve hızlı kalkınmasıyla dikkat çeker.",
    kn:"Saint Kitts ve Nevis: Karayipler'de yer alan ikiz adalardan oluşan küçük bir federasyondur.",
    lc:"Saint Lucia: Pitonlar olarak adlandırılan volkanik dağlarıyla ünlü Karayip adasıdır.",
    vc:"Saint Vincent: Volkanik adası, Karayip korsanlarının tarihi ve doğal güzellikleriyle tanınır.",
    ws:"Samoa: Polinezya kültürüne sahip, Pasifik'te yer alan bir adalar ülkesidir.",
    sm:"San Marino: İtalya'nın içinde yer alan dünyanın en eski cumhuriyetlerinden biri olduğu iddia edilir.",
    st:"Sao Tome ve Principe: Afrika'nın batı kıyısında, Ekvator üzerinde yer alan küçük bir adalar ülkesidir.",
    sa:"Suudi Arabistan: İslam'ın kutsal şehirlerine ev sahipliği yapan, petrol zengini Arap bir krallıktır.",
    sn:"Senegal: Batı Afrika'da Fransızca konuşan, zengin müzik ve moda kültürüyle bilinen bir ülkedir.",
    rs:"Sırbistan: Balkanlar'da yer alır, güçlü Ortodoks kültürü ve nehirlere kıyısı olan başkentiyle öne çıkar.",
    sc:"Seyşeller: Hint Okyanusu'nda yer alan, eşsiz plajları ve granit kayalıklarıyla ünlü bir adalar ülkesidir.",
    sl:"Sierra Leone: Batı Afrika'da elmas yataklarına sahip, İngilizce konuşulan bir ülkedir.",
    sg:"Singapur: Asya'nın ticaret ve finans merkezi, çok kültürlü ve yüksek teknolojili bir şehir devletidir.",
    sk:"Slovakya: Orta Avrupa'da yer alır, Tatra Dağları ve zengin kale mirasıyla bilinir.",
    si:"Slovenya: Alp, Akdeniz ve Panoniyen kültürlerinin birleştiği yeşil bir ülkedir.",
    sb:"Solomon Adaları: Pasifik'te yer alır, II. Dünya Savaşı'ndan kalma batık gemileriyle tanınır.",
    so:"Somali: Afrika Boynuzu'nda yer alan, uzun sahil şeridine ve göçebe kültüre sahip bir ülkedir.",
    za:"Güney Afrika: Mandela'nın mirası, zengin biyoçeşitliliği ve elmas/altın madenleriyle ünlüdür.",
    ss:"Güney Sudan: Afrika'nın en yeni ülkesi, etnik çeşitliliği ve Nil Nehri çevresindeki kültürüyle öne çıkar.",
    es:"İspanya: Flamenko, boğa güreşi, Endülüs mimarisi ve zengin Akdeniz kültürüyle tanınır.",
    lk:"Sri Lanka: Eski Seylan, çay üretimi ve Budist kültürüyle Hint Okyanusu'nda yer alır.",
    sd:"Sudan: Nil Nehri'nin geçtiği, köklü Arap ve Afrika kültürlerinin birleştiği bir ülkedir.",
    sr:"Surinam: Güney Amerika'nın en küçük ülkesi, Hollanda sömürge mirası ve tropikal ormanlarıyla dikkat çeker.",
    se:"İsveç: İskandinavya'nın en büyük ülkesi, modern tasarım, yüksek sosyal refah ve ormanlarıyla bilinir.",
    ch:"İsviçre: Alpler, çikolata, saatçilik ve bankacılık merkezi olarak dünya çapında tanınır.",
    sy:"Suriye: Antik medeniyetlerin beşiği, köklü bir Arap kültürüne ve tarihi Şam şehrine sahiptir.",
    tw:"Tayvan: Yüksek teknoloji, zengin Çin kültürü ve modern şehir yapısıyla öne çıkar.",
    tj:"Tacikistan: Orta Asya'da dağlık bir ülke, Farsça konuşan topluluklara ev sahipliği yapar.",
    tz:"Tanzanya: Serengeti, Kilimanjaro Dağı ve Zanzibar adalarıyla turizmde öne çıkan Afrika ülkesidir.",
    th:"Tayland: Budist tapınakları, Tay masajı ve canlı gece hayatıyla Güneydoğu Asya'nın incisidir.",
    tl:"Doğu Timor: Güneydoğu Asya'nın en yeni ülkelerinden biri, Portekiz ve Endonezya etkilerini taşır.",
    tg:"Togo: Batı Afrika'da yer alır, geleneksel Vudu ve Ewe kültürüyle dikkat çeker.",
    to:"Tonga: Polinezya'nın tek yerli krallığı, Pasifik Okyanusu'nda yer alır.",
    tt:"Trinidad ve Tobago: Karayip karnavalı, calypso müziği ve petrol/gaz kaynaklarıyla tanınır.",
    tn:"Tunus: Antik Kartaca'nın bulunduğu Kuzey Afrika ülkesi, Akdeniz kıyısıyla ünlüdür.",
    tr:"Türkiye: Asya ve Avrupa'yı birleştiren, zengin tarihi ve kültürel çeşitliliğe sahip bir ülkedir.",
    tm:"Türkmenistan: Orta Asya'da yer alır, gaz rezervleri ve göçebe Türkmen kültürüyle bilinir.",
    tv:"Tuvalu: Pasifik'te yer alan, deniz seviyesinin yükselmesi tehlikesiyle karşı karşıya olan küçük bir ada ülkesidir.",
    ug:"Uganda: Afrika'nın Büyük Göller bölgesinde yer alır, şempanze ve goril yaşam alanlarıyla dikkat çeker.",
    ua:"Ukrayna: Doğu Avrupa'nın en büyük ülkelerinden biri, zengin Slav kültürü ve tarihiyle bilinir.",
    ae:"Birleşik Arap Emirlikleri: Dubai ve Abu Dabi gibi modern şehirleriyle, petrol zengini, turizm ve finans merkezidir.",
    gb:"Birleşik Krallık: İngiliz İmparatorluğu'nun mirası, Kraliyet ailesi, Shakespeare ve küresel finans merkezi olarak tanınır.",
    us:"Amerika Birleşik Devletleri: Dünya gücü, çok kültürlü yapısı, Hollywood ve teknoloji endüstrileriyle öne çıkar.",
    uy:"Uruguay: Güney Amerika'nın en demokratik ve sosyal açıdan gelişmiş ülkelerinden biridir.",
    uz:"Özbekistan: İpekyolu'nun merkezi şehirleri (Semerkant, Buhara) ile bilinen Orta Asya ülkesidir.",
    vu:"Vanuatu: Pasifik'te yer alan volkanik adalar ülkesi, kabile kültürü ve dalış turizmiyle öne çıkar.",
    va:"Vatikan: Roma içinde yer alan, dünyanın en küçük ülkesi ve Katolik Kilisesi'nin merkezidir.",
    ve:"Venezuela: Güney Amerika'nın kuzeyinde yer alır, zengin petrol rezervleri ve doğal güzellikleriyle bilinir.",
    vn:"Vietnam: Uzun sahil şeridi, pirinç tarlaları, bisiklet kültürü ve karmaşık tarihiyle Güneydoğu Asya'da yer alır.",
    ye:"Yemen: Arap Yarımadası'nın güneyinde yer alır, antik medeniyetlere ve eşsiz mimariye sahiptir.",
    zm:"Zambiya: Afrika'nın güneyinde yer alır, Victoria Şelaleleri ve bakır madenciliğiyle tanınır.",
    zw:"Zimbabve: Shona kültürü ve geleneksel müziğiyle dikkat çeker."
  };

  const fixMap = {
    turkey:"tr", usa:"us", america:"us",
    france:"fr", germany:"de",
    england:"gb", uk:"gb"
  };

  // ============================================================
  //  4. TIKLAMA SİSTEMİ (MODAL GÖSTERİMİ)
  // ============================================================
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

    if (!countryNames[countryCode]) {
        console.warn(`Ülke kodu bulunamadı veya eşleştirilemedi: ${countryCode}`);
        return;
    }

    const name = countryNames[countryCode];
    const text = countryTexts[countryCode] || "Bu ülke için metin henüz eklenmemiş.";
    
    // Modal içeriğini doldur
    modalTitle.textContent = name;
    modalText.textContent = text;
    
    // Video kaynağını güncelle ve videoyu tekrar yükle
    videoSource.src = `video/${countryCode}.mp4`;
    modalVideo.load();
    
    // Otomatik oynatmayı (autoplay) sağlamak için:
    modalVideo.play().catch(error => {
        // Otomatik oynatma hatası (genellikle sesli olduğu için tarayıcılar engeller)
        console.log("Video otomatik oynatılamadı, manuel başlatılması gerekebilir.", error);
    });

    modal.style.display = "block"; // Modalı göster

  });

});

