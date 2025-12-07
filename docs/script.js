document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) {
    console.error("SVG haritası bulunamadı. Lütfen SVG elementinin sayfada olduğundan emin olun.");
    return;
  }

  // ============================================================
  //  1. CSS STİLLERİ VE MODAL YAPISI EKLE
  // ============================================================

  const modalHTML = `
    <div id="country-modal" style="
        display: none; position: fixed; z-index: 1000; left: 0; top: 0; 
        width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.8); /* Daha koyu arka plan */
        backdrop-filter: blur(5px); transition: opacity 0.3s;
    ">
        <div id="modal-content" style="
            background-color: #fefefe; margin: 5% auto; padding: 25px; 
            border: 1px solid #888; width: 90%; max-width: 800px; /* Büyütülmüş Genişlik */
            border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,0.5); /* Daha belirgin gölge */
            position: relative; animation: slideDown 0.4s;
        ">
            <span id="close-modal" style="
                color: #aaa; float: right; font-size: 32px; font-weight: bold;
                cursor: pointer; transition: color 0.2s;
            " onmouseover="this.style.color='#f00'" onmouseout="this.style.color='#aaa'">&times;</span>
            <h2 id="modal-title" style="
                color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; 
                margin-top: 0; font-size: 28px;
            "></h2>
            <p id="modal-text" style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 25px;"></p>
            
            <video id="modal-video" autoplay muted controls width="100%" style="
                display: block; width: 100%; height: auto; 
                margin-top: 15px; border-radius: 8px; background: #000;
            ">
                <source id="video-source" src="" type="video/mp4">
                Tarayıcınız video etiketini desteklemiyor veya video dosyası bulunamadı.
            </video>
        </div>
    </div>
    <style>
      @keyframes slideDown {
        from { top: -300px; opacity: 0; }
        to { top: 0; opacity: 1; }
      }
    </style>
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
    modalVideo.pause(); 
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalVideo.pause(); 
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
  //  3. ÜLKE BİLGİLERİ VE GÜÇLENDİRİLMİŞ FIXMAP
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
af:"Afganistan: Zengin sözlü şiir ve misafirperverlik geleneği ile tanınır.",
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
    de:"Almanya:“Sessiz Akşam, Parlak Ekranlar”
Münih’te, sakin bir apartman dairesinin üçüncü katında Schneider ailesi işten ve okuldan döndükten sonra akşam rutinine giriyordu. Dairede ilk dikkat çeken şey sessizlik değil, ekranların hafif mavi ışığıydı.
Baba Thomas, mutfak tezgâhına dizilmiş market poşetlerini tarayıp telefondaki alışveriş uygulamasına bir şeyleri işaretliyordu.
“Yine peynirin fiyatı artmış,” diye mırıldandı.
Uygulama otomatik fiş taraması yapmıştı bile; Almanya’da dijitalleşmenin avantajları onların evine çoktan yerleşmişti.
Anne Miriam, salonun bir köşesindeki akıllı hoparlöre dönüp “Licht dimmen” dedi. Işıklar hafifçe kısıldı. Elinde dizüstü bilgisayarı vardı; ertesi günki toplantı için sunum hazırlıyordu. Pandemi döneminden beri haftanın iki günü evden çalışmaya alışmıştı.
On üç yaşındaki Lina, masanın başında kulaklıklarıyla YouTube’da çizim videoları izlerken bir yandan da tabletinden dijital çizim yapıyordu. Tabletin yanındaki akıllı telefonuna sürekli mesajlar düşüyordu.
Grup sohbetlerindeki bildirimler onu sürekli bölse de bu, Almanya’daki birçok genç gibi onun için rahatsız edici değil, günün normaliydi.
Sekiz yaşındaki Max ise oturma odasında Switch’inde oyun oynuyor, ara sıra televizyonla konsol arasında geçiş yapıyordu. Televizyonda Netflix’in menüsü açık kalmıştı.
Miriam, gözlerini bilgisayardan ayırıp çocuklara seslendi:
“Yemek on dakika sonra hazır. Lütfen oyunu ve videoları yavaş yavaş bırakın.”
Lina kulaklığını çıkarmadan, “Bir saniye anne, burayı bitiriyorum,” dedi.
Max ise oyununu durdurdu ama akıllı hoparlöre seslendi:
“Timer auf fünf Minuten!”
Odada beş dakikalık bir zamanlayıcı başladı.
Thomas güldü.
“Çocuklar artık her şeyi sesle kontrol ediyor. Bizim zamanımızda böyle değildi.”
Sofraya oturduklarında bile ekranlar tamamen ortadan kalkmadı. Thomas’ın akıllı saati titreyip yeni bir e-posta bildirimi verdi. Lina gizlice telefonuna baktı, arkadaşları okul gruplarına yeni mesaj bırakmıştı.
Miriam hafifçe kaşlarını kaldırdı.
“Lina, lütfen. En azından yemek sırasında kenara koy.”
Lina biraz isteksizce telefonunu masanın yanındaki dolaba bıraktı.
“Tamam anne. Ama öğretmen yarınki duyuruyu Telegram’dan gönderecekmiş, kaçırmayayım.”
Thomas çayı doldururken konuşmaya başladı:
“Ali bugün iş yerinde yeni otomasyon sistemi kurdu. Artık stok kontrolünü tamamen yazılım yapıyor. Her şey dijitalleşiyor.”
Miriam başını salladı.
“Hastanede de öyle. Randevu sistemleri bile tamamen online. İnsan yüzü görmek zorlaştı aslında.”
Çocuklar sustu; teknoloji onlar için doğal, normaldi. Miriam için ise bazen yorucu bir hızdı.
Yemekten sonra herkes kendi köşesine çekildi.
Lina odasına gidip tabletinde çizim yapmaya devam etti. İnce ve güçlü internet bağlantısı sayesinde videolar hiç takılmıyordu.
Max, arkadaşlarıyla çevrim içi oyun oynamak için konsolunu yeniden açtı.
Thomas kanepede dizüstü bilgisayarından bankacılık işlemlerini halletti, faturaların çoğu otomatik ödemedeydi.
Miriam ise bilgisayarındaki sunumu tamamlarken aynı anda telefonundan market teslimat saatini değiştirdi.
Evin içinde konuşmalar azdı ama iletişim kopuk değildi. Günün yoğunluğu, teknolojiyle birlikte gelişen sessiz bir uyum yaratmıştı.
Gece yarısına doğru Lina odasından seslendi:
“Anne, bir şey sorabilir miyim?”
Miriam odasına gittiğinde Lina yatağında oturmuş, elinde tabletle bir çizimi gösteriyordu.
“Bunu sergiye göndermeyi düşünüyorum. Sence uygun mu?”
Miriam’ın yüzü aydınlandı.
“Harika olmuş! Teknoloji olmasa bu kadar rahat çizemeyecektin, değil mi?”
Lina gülümsedi.
“Ama seninle konuşmak daha güzel,” dedi ve tabletini kapattı.
Ekranlar sonunda sessizleşirken, Schneider ailesi günün en gerçek iletişimini tam da o anda kuruyordu.",
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
    // Yaygın kullanılan alternatif SVG ID/Class isimlerinin düzeltilmesi:
    turkey:"tr", 
    usa:"us", 
    america:"us",
    france:"fr", 
    germany:"de",
    england:"gb", 
    uk:"gb",
    russia:"ru",       // Rusya için yaygın isim
    china:"cn",        // Çin için yaygın isim
    australia:"au",    // Avustralya için yaygın isim
    unitedstates:"us", // ABD'nin tam adı
    ussr:"ru"          
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

    // SVG ID/Class değerini al ve fixMap ile eşleştir
    let rawCode = tokens.find(t => fixMap[t] || countryNames[t]) || tokens[0] || "";
    
    if (!rawCode) return;
    
    let countryCode = fixMap[rawCode] || rawCode;

    if (!countryNames[countryCode]) {
        console.warn(`[Tıklama Başarısız]: Ülke kodu bulunamadı veya eşleştirilemedi: ${rawCode} -> ${countryCode}`);
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
    
    // Otomatik oynatmayı dene (tarayıcı ayarları buna izin vermeyebilir)
    modalVideo.play().catch(error => {
        console.log(`Video otomatik oynatılamadı. Lütfen video oynat düğmesine basın. Kod: ${countryCode}`, error);
    });

    modal.style.display = "block"; // Modalı göster
  });

});

