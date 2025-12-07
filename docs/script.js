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
    us:"Amerika Birleşik Devletleri: Hollywood, Silikon Vadisi ve küresel kültürde büyük etkisi olan, eyaletler federasyonudur.",
    cn:"Çin: Dünyanın en kalabalık ülkesi, binlerce yıllık tarihi ve hızla gelişen teknolojisiyle bilinir.",
    au:"Avustralya: Eşsiz vahşi yaşamı (Kanguru, Koala) ve geniş çöl bölgeleri (Outback) ile tanınan ada kıtasıdır.",
    ru:"Rusya: Dünyanın en büyük yüzölçümüne sahip ülkesi, köklü edebiyat ve bale geleneği ile bilinir.",
    tr:"Türkiye: Asya ve Avrupa'yı birleştiren, zengin tarihi ve kültürel çeşitliliğe sahip bir ülkedir.",
    al:"Arnavutluk: Balkan folkloru ve sıcak kültürel yapısıyla bilinir.",
    // Lütfen buraya, diğer tüm ülkelerin metinlerini eklemeyi unutmayın.
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
