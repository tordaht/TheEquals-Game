// Oyun durumu
// gameState sınır kontrollü
const gameState = {
    _adalet_puani: 0,
    _guc_puani: 0,
    _halk_destegi: 0,
    _halk_memnuniyeti: 0,
    _isyan_riski: 0,
    _hazine: 100,
    _kisisel_vicdan: 0,
    faz: 1,
    bolum: 1,
    get adalet_puani() { return this._adalet_puani; },
    set adalet_puani(v) { this._adalet_puani = Math.max(0, Math.min(100, v)); },
    get guc_puani() { return this._guc_puani; },
    set guc_puani(v) { this._guc_puani = Math.max(0, Math.min(100, v)); },
    get halk_destegi() { return this._halk_destegi; },
    set halk_destegi(v) { this._halk_destegi = Math.max(0, Math.min(100, v)); },
    get halk_memnuniyeti() { return this._halk_memnuniyeti; },
    set halk_memnuniyeti(v) { this._halk_memnuniyeti = Math.max(0, Math.min(100, v)); },
    get isyan_riski() { return this._isyan_riski; },
    set isyan_riski(v) { this._isyan_riski = Math.max(0, Math.min(100, v)); },
    get hazine() { return this._hazine; },
    set hazine(v) { this._hazine = Math.max(0, Math.min(200, v)); },
    get kisisel_vicdan() { return this._kisisel_vicdan; },
    set kisisel_vicdan(v) { this._kisisel_vicdan = Math.max(0, Math.min(100, v)); },
    karakter_adi: "",
    secilen_yol: "",
    müttefik: "",
    yoldas_durumu: "",
    secilen_strateji: "",
    elit_cevabi: "",
    devrim_tipi: "",
    yonetim_stili: "",
    muhalefet_durumu: "",
    son_catisma_secimi: "",
    dis_politika_durumu: "tarafsız",
    teknoloji_seviyesi: 5,
    anahtar_karakterler: {
        elif: { durum: 'güvende', iliski: 'sadık' },
        eski_yoldas: { durum: 'hayatta', iliski: 'sadık' },
        aile_uyesi: { durum: 'tehlikede', iliski: 'kırgın' }
    },
    // Uyarı sistemi için son değerler
    _lastHazine: 100,
    _lastHalkMemnuniyeti: 0,
    // Haber sistemi için
    _lastNewsTime: 0,
    _newsShown: false
};

// Haber sistemi
const newsSystem = {
    // Haber veritabanı
    news: {
        perde1: [
            {
                title: "ELİT'LER LÜKS YAŞAM SÜRÜYOR",
                content: "Vadi'nin üst kesimlerinde yaşayan Elit'ler, halkın açlığına rağmen lüks yaşamlarına devam ediyor. Yeni açılan 'Altın Kule' rezidansında bir daire 50 milyon kredi.",
                impact: { halk_memnuniyeti: -5, isyan_riski: +3 }
            },
            {
                title: "İŞÇİ SENDİKALARI TOPLANIYOR",
                content: "Vadi'nin en büyük fabrikalarında çalışan işçiler, sendika temsilcileri etrafında toplanmaya başladı. Grev tehdidi giderek artıyor.",
                impact: { halk_destegi: +2, isyan_riski: +2 }
            },
            {
                title: "GÜVENLİK GÜÇLERİ SOKAKLARDA",
                content: "Son protestolardan sonra güvenlik güçleri şehir merkezinde yoğunlaştı. Vatandaşlar endişeli.",
                impact: { halk_memnuniyeti: -3, guc_puani: +2 }
            },
            {
                title: "ÜNİVERSİTE ÖĞRENCİLERİ HAREKETE GEÇTİ",
                content: "Aethelburg Üniversitesi öğrencileri, eğitim ücretlerinin artırılmasını protesto ediyor. Kampüs çıkışları kapatıldı.",
                impact: { halk_destegi: +3, isyan_riski: +2 }
            }
        ],
        perde2: [
            {
                title: "YENİ HÜKÜMET İLK KARARLARINI ALDI",
                content: "Devrim sonrası kurulan yeni hükümet, ilk kararlarını açıkladı. Eski Elit'lerin mallarına el konuldu.",
                impact: { adalet_puani: +5, hazine: +20 }
            },
            {
                title: "EKONOMİK REFORM PAKETİ AÇIKLANDI",
                content: "Yeni ekonomik sistem, 'herkese eşit pay' prensibi üzerine kuruldu. Vatandaşlar arasında karışık tepkiler var.",
                impact: { halk_memnuniyeti: +3, hazine: -10 }
            },
            {
                title: "ESKİ ELİT'LER SÜRGÜN EDİLDİ",
                content: "Devrim karşıtı olduğu tespit edilen eski Elit'ler, şehrin dışına sürgün edildi. Güvenlik güçleri nöbet tutuyor.",
                impact: { adalet_puani: +3, guc_puani: +5 }
            },
            {
                title: "HALK MECLİSİ KURULDU",
                content: "Yeni demokratik sistem için halk meclisi kuruldu. İlk toplantıda temel haklar tartışıldı.",
                impact: { halk_destegi: +5, adalet_puani: +3 }
            }
        ],
        perde3: [
            {
                title: "MUHALEFET SESLERİ YÜKSELİYOR",
                content: "Yeni rejime karşı muhalefet sesleri giderek artıyor. Bazı vatandaşlar 'eski düzen daha iyiydi' diyor.",
                impact: { halk_destegi: -3, isyan_riski: +5 }
            },
            {
                title: "GÜVENLİK GÜÇLERİ SOKAKLARDA",
                content: "Artışan protestolar nedeniyle güvenlik güçleri tekrar sokaklara çıktı. Sıkıyönetim uygulanıyor.",
                impact: { guc_puani: +3, halk_memnuniyeti: -5 }
            },
            {
                title: "EKONOMİK KRİZ DERİNLEŞİYOR",
                content: "Yeni sistemin ekonomik sorunları giderek artıyor. Bazı temel gıda maddeleri bulunamıyor.",
                impact: { halk_memnuniyeti: -8, hazine: -15 }
            },
            {
                title: "YERALTI ÖRGÜTLERİ AKTİF",
                content: "Devrim karşıtı yeraltı örgütleri aktif hale geldi. Güvenlik güçleri operasyon düzenliyor.",
                impact: { isyan_riski: +8, guc_puani: +2 }
            }
        ]
    },
    
    // Haber gösterme fonksiyonu
    showNews: function() {
        // Her faz için farklı haberler
        const currentFaz = gameState.faz;
        const newsPool = this.news[`perde${currentFaz}`] || this.news.perde1;
        
        // Rastgele haber seç
        const randomNews = newsPool[Math.floor(Math.random() * newsPool.length)];
        
        // Haber mesaj kutusu oluştur
        const newsBox = document.createElement('div');
        newsBox.className = 'news-messagebox';
        newsBox.innerHTML = `
            <div class="news-header">
                <div class="news-icon">📰</div>
                <div class="news-title">${randomNews.title}</div>
                <div class="news-close" onclick="this.parentElement.parentElement.remove()">✕</div>
            </div>
            <div class="news-content">
                ${randomNews.content}
            </div>
            <div class="news-footer">
                <div class="news-time">${new Date().toLocaleTimeString()}</div>
                <div class="news-source">Vadi Haber Ajansı</div>
                <button class="news-ok-btn" onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        
        // Haber efektlerini uygula
        if (randomNews.impact) {
            Object.entries(randomNews.impact).forEach(([stat, change]) => {
                if (gameState[stat] !== undefined) {
                    gameState[stat] = Math.max(0, Math.min(100, gameState[stat] + change));
                }
            });
            updateStats();
        }
        
        document.body.appendChild(newsBox);
        
        // 5 saniye sonra otomatik kapat
        setTimeout(() => {
            if (newsBox.parentElement) {
                newsBox.remove();
            }
        }, 5000);
    },
    
    // Haber kontrolü
    checkNews: function() {
        const now = Date.now();
        const timeSinceLastNews = now - gameState._lastNewsTime;
        
        // Her 30-60 saniye arası rastgele haber göster
        if (timeSinceLastNews > 30000 && timeSinceLastNews < 60000 && !gameState._newsShown) {
            this.showNews();
            gameState._lastNewsTime = now;
            gameState._newsShown = true;
            
            // 30 saniye sonra haber bayrağını sıfırla
            setTimeout(() => {
                gameState._newsShown = false;
            }, 30000);
        }
    }
};

// Duygusal dönemeçler sistemi
const emotionalSystem = {
    // Flashback veritabanı
    flashbacks: {
        'start': [
            {
                id: 'childhood_memory',
                title: 'Çocukluk Anısı',
                content: 'Küçükken babamın fabrikada çalıştığını hatırlıyorum. Her akşam yorgun argın eve gelir, ellerindeki nasırları gösterirdi. "Oğlum," derdi, "biz eşit değiliz. Ama bir gün değişecek."',
                emotion: 'nostalgia',
                impact: { kisisel_vicdan: +3, halk_destegi: +2 }
            },
            {
                id: 'school_memory',
                title: 'Okul Anısı',
                content: 'İlkokulda öğretmenimiz bize "herkes eşittir" diye öğretirdi. Ama aynı sınıfta, zengin çocukların daha iyi kalemleri, daha güzel çantaları vardı. O zaman anladım: eşitlik sadece kelimelerdeydi.',
                emotion: 'realization',
                impact: { adalet_puani: +2, kisisel_vicdan: +1 }
            },
            {
                id: 'first_job_memory',
                title: 'İlk İş Anısı',
                content: 'İlk işime başladığım gün, patronum bana "sen de bizim ailemizden sayılırsın" dedi. Ama aynı gün, temizlikçi kadına "sen buraya ait değilsin" diye bağırdı. O gün anladım: aile sadece parayla oluyordu.',
                emotion: 'anger',
                impact: { adalet_puani: +3, isyan_riski: +2 }
            }
        ],
        'ilk_suphe': [
            {
                id: 'friend_fired',
                title: 'Arkadaşımın İşten Çıkarılması',
                content: 'Ahmet\'in işten çıkarıldığı gün, ofiste herkes sessizdi. Kimse bir şey söylemiyordu. Ama hepimiz biliyorduk: Ahmet en çalışkanımızdı. O gün anladım: adalet yoktu, sadece güç vardı.',
                emotion: 'frustration',
                impact: { adalet_puani: +4, halk_destegi: +3 }
            }
        ],
        'gizli_hiyerarsi': [
            {
                id: 'underground_meeting',
                title: 'Yeraltı Toplantısı',
                content: 'İlk kez yeraltı toplantısına katıldığımda, odada sadece mum ışığı vardı. Herkesin yüzünde aynı ifade: kararlılık. O gün anladım: değişim yakındı.',
                emotion: 'hope',
                impact: { halk_destegi: +4, isyan_riski: +2 }
            }
        ],
        'yanilsama_catlagi': [
            {
                id: 'system_lies',
                title: 'Sistemin Yalanları',
                content: 'Sistemin yalanlarını gördüğüm gün, her şey netleşti. Medya, eğitim, iş hayatı... Hepsi aynı yalanı tekrarlıyordu: "Herkes eşit." Ama gerçekte kimse eşit değildi.',
                emotion: 'enlightenment',
                impact: { adalet_puani: +5, kisisel_vicdan: +3 }
            }
        ],
        'ilk_direnis': [
            {
                id: 'first_action',
                title: 'İlk Eylem',
                content: 'İlk eylemimizde, sokaklarda yüzlerce insan vardı. Hepimiz aynı şarkıyı söylüyorduk. O gün anladım: halk uyanıyordu. Değişim artık durdurulamazdı.',
                emotion: 'unity',
                impact: { halk_destegi: +6, isyan_riski: +4 }
            }
        ],
        'yerel_orgutlenme': [
            {
                id: 'community_trust',
                title: 'Topluluk Güveni',
                content: 'Mahallede insanlar bana güvenmeye başladığında, sorumluluğun ağırlığını hissettim. Her kararım, onların hayatını etkiliyordu. O gün anladım: liderlik, hizmet etmekti.',
                emotion: 'responsibility',
                impact: { halk_destegi: +5, kisisel_vicdan: +2 }
            }
        ],
        'devlet_tepkisi': [
            {
                id: 'state_repression',
                title: 'Devlet Baskısı',
                content: 'Devlet güçleri mahallemizi ablukaya aldığında, korku her yerdeydi. Ama halk pes etmedi. Her evden bir ses çıkıyordu. O gün anladım: baskı, direnişi artırıyordu.',
                emotion: 'defiance',
                impact: { isyan_riski: +5, halk_destegi: +3 }
            }
        ],
        'halk_uyanisi': [
            {
                id: 'people_awakening',
                title: 'Halkın Uyanışı',
                content: 'Diğer mahallelerde de direniş başladığında, şehrin her yerinden sesler geliyordu. Halk uyanıyordu. O gün anladım: devrim, artık kaçınılmazdı.',
                emotion: 'inspiration',
                impact: { halk_destegi: +7, isyan_riski: +5 }
            }
        ],
        'son_hazirlik': [
            {
                id: 'revolution_eve',
                title: 'Devrim Arifesi',
                content: 'Devrim arifesinde, herkes sessizdi. Ama bu sessizlik, fırtına öncesi sessizlikti. O gün anladım: tarih, bizimle birlikte yazılacaktı.',
                emotion: 'determination',
                impact: { guc_puani: +4, halk_destegi: +3 }
            }
        ],
        'devrim_baslangici': [
            {
                id: 'revolution_start',
                title: 'Devrimin Başlangıcı',
                content: 'Devrim başladığında, sokaklar insanlarla doluydu. Herkes aynı hedef için savaşıyordu. O gün anladım: özgürlük, bedel isterdi.',
                emotion: 'revolution',
                impact: { halk_destegi: +8, isyan_riski: +6 }
            }
        ],
        'faz2_baslangic': [
            {
                id: 'victory_memory',
                title: 'Zafer Anısı',
                content: 'Devrim başarılı olduğunda sokaklardaki sevinci hatırlıyorum. İnsanlar birbirini kucaklıyordu. O gün her şey mümkün görünüyordu.',
                emotion: 'joy',
                impact: { halk_destegi: +5, adalet_puani: +3 }
            }
        ],
        'final_sınav': [
            {
                id: 'sacrifice_memory',
                title: 'Fedakarlık Anısı',
                content: 'Son karar anında, arkadaşlarımın gözlerindeki güveni hatırlıyorum. Bazen doğru olan şey, en zor olanıdır.',
                emotion: 'sadness',
                impact: { kisisel_vicdan: +5, adalet_puani: +3 }
            }
        ]
    },
    
    // Flashback gösterme fonksiyonu
    showFlashback: function(nodeId) {
        const flashbacks = this.flashbacks[nodeId];
        if (!flashbacks || flashbacks.length === 0) return;
        
        // Önceki flashback'leri temizle
        const existingDialogs = document.querySelectorAll('.flashback-dialog');
        existingDialogs.forEach(dialog => dialog.remove());
        
        // Rastgele flashback seç
        const randomFlashback = flashbacks[Math.floor(Math.random() * flashbacks.length)];
        
        // Flashback dialog'u oluştur
        const flashbackDialog = document.createElement('div');
        flashbackDialog.className = 'flashback-dialog';
        flashbackDialog.innerHTML = `
            <div class="flashback-content">
                <div class="flashback-header">
                    <div class="flashback-icon">💭</div>
                    <div class="flashback-title">${randomFlashback.title}</div>
                    <div class="flashback-close" onclick="closeFlashback()">✕</div>
                </div>
                <div class="flashback-body">
                    <div class="flashback-text">${randomFlashback.content}</div>
                </div>
                <div class="flashback-footer">
                    <div class="flashback-emotion">${this.getEmotionIcon(randomFlashback.emotion)}</div>
                    <button class="flashback-ok-btn" onclick="closeFlashback()">OK</button>
                </div>
            </div>
        `;
        
        // Flashback efektlerini uygula
        if (randomFlashback.impact) {
            Object.entries(randomFlashback.impact).forEach(([stat, change]) => {
                if (gameState[stat] !== undefined) {
                    gameState[stat] = Math.max(0, Math.min(100, gameState[stat] + change));
                }
            });
            updateStats();
        }
        
        document.body.appendChild(flashbackDialog);
        
        // 8 saniye sonra otomatik kapat
        setTimeout(() => {
            if (flashbackDialog.parentElement) {
                closeFlashback();
            }
        }, 8000);
    },
    
    // Duygu ikonu getir
    getEmotionIcon: function(emotion) {
        const icons = {
            'nostalgia': '🏠',
            'courage': '⚔️',
            'joy': '🎉',
            'sadness': '💔'
        };
        return icons[emotion] || '💭';
    }
};

// Müzik sistemi
const musicSystem = {
    audio: null,
    isPlaying: false,
    volume: 0.15, // %15 ses seviyesi ile başla
    
    // Müzik başlat
    init: function() {
        this.audio = new Audio('Music/adg3.com_shrivelledDissonance.mp3');
        this.audio.loop = true; // Sürekli döngü
        this.audio.volume = this.volume;
        this.isPlaying = false; // Başta kapalı
        
        // Hata durumunda
        this.audio.addEventListener('error', (e) => {
            console.warn('Müzik yüklenemedi:', e);
        });
        
        // Otomatik başlatma için kullanıcı etkileşimi bekle
        this.setupAutoPlay();
    },
    
    // Otomatik başlatma kurulumu
    setupAutoPlay: function() {
        const startAutoPlay = () => {
            this.autoPlay();
            // Event listener'ları temizle
            document.removeEventListener('click', startAutoPlay);
            document.removeEventListener('keydown', startAutoPlay);
            document.removeEventListener('touchstart', startAutoPlay);
        };
        
        // İlk kullanıcı etkileşiminde müziği başlat
        document.addEventListener('click', startAutoPlay, { once: true });
        document.addEventListener('keydown', startAutoPlay, { once: true });
        document.addEventListener('touchstart', startAutoPlay, { once: true });
    },
    
    // Müzik çal
    play: function() {
        if (this.audio && !this.isPlaying) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.updateMusicButton();
            }).catch(e => {
                console.warn('Müzik çalınamadı:', e);
            });
        }
    },
    
    // Müziği otomatik başlat
    autoPlay: function() {
        if (this.audio && !this.isPlaying) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.updateMusicButton();
                this.updateVolumeDisplay();
            }).catch(e => {
                console.warn('Otomatik müzik başlatılamadı:', e);
            });
        }
    },
    
    // Müziği durdur
    pause: function() {
        if (this.audio && this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.updateMusicButton();
        }
    },
    
    // Müziği aç/kapat
    toggle: function() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },
    
    // Ses seviyesini ayarla
    setVolume: function(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.audio) {
            this.audio.volume = this.volume;
        }
        this.updateVolumeDisplay();
    },
    
    // Ses seviyesini artır
    increaseVolume: function() {
        this.setVolume(this.volume + 0.1);
    },
    
    // Ses seviyesini azalt
    decreaseVolume: function() {
        this.setVolume(this.volume - 0.1);
    },
    
    // Müzik butonunu güncelle
    updateMusicButton: function() {
        const musicBtn = document.getElementById('music-toggle');
        if (musicBtn) {
            musicBtn.innerHTML = this.isPlaying ? '🔊' : '🔇';
            musicBtn.title = this.isPlaying ? 'Müziği Durdur' : 'Müziği Başlat';
        }
    },
    
    // Ses seviyesi göstergesini güncelle
    updateVolumeDisplay: function() {
        const volumeDisplay = document.getElementById('volume-display');
        if (volumeDisplay) {
            const percentage = Math.round(this.volume * 100);
            volumeDisplay.textContent = `${percentage}%`;
        }
    }
};

let storyData = null;
let currentNode = 'start';
let currentTypingAnimation = null; // Mevcut animasyonu tutan değişken
let typewriterInterval = null; // Animasyon ID'sini global olarak tutmak için
let typewriterSkip = false;
let isChoiceMade = false; // Bir seçim yapılıp yapılmadığını kontrol eden bayrak

// Hikaye verilerini yükle
async function loadStoryData() {
    try {
        const response = await fetch('storyData.json', {
            headers: {
                'Accept': 'application/json; charset=utf-8'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Önce text olarak oku, sonra JSON parse et
        const text = await response.text();
        storyData = JSON.parse(text);
        console.log('Hikaye verileri yüklendi:', storyData.gameInfo);
        
        // Debug bilgisi güncelle
        const debugStatus = document.getElementById('storydata-status');
        if (debugStatus) debugStatus.textContent = 'Yüklendi ✓';
        
        return storyData;
    } catch (error) {
        console.error('Hikaye verileri yüklenemedi:', error);
        
        // Debug bilgisi güncelle
        const debugStatus = document.getElementById('storydata-status');
        if (debugStatus) debugStatus.textContent = 'Hata ✗';
        
        throw error; // Hatayı yeniden fırlat
    }
}

// Karakter portreleri için fonksiyonlar
function showCharacterPortrait(characterName, portraitPath) {
    const portraitContainer = document.getElementById('character-portrait');
    const storyText = document.getElementById('story-text');
    
    // Portre container'ını temizle
    portraitContainer.innerHTML = '';
    
    // Yeni portre oluştur
    const portraitImg = document.createElement('img');
    portraitImg.src = portraitPath;
    portraitImg.alt = `${characterName} portresi`;
    portraitImg.title = characterName;
    
    portraitContainer.appendChild(portraitImg);
    
    // Portreyi göster
    portraitContainer.style.display = 'block';
    portraitContainer.classList.add('show');
    portraitContainer.classList.remove('hide');
    
    // Story text'i sola kaydır
    storyText.style.flex = '1';
}

function hideCharacterPortrait() {
    const portraitContainer = document.getElementById('character-portrait');
    const storyText = document.getElementById('story-text');
    
    // Portreyi gizle
    portraitContainer.classList.add('hide');
    portraitContainer.classList.remove('show');
    
    // Animasyon bittikten sonra gizle
    setTimeout(() => {
        portraitContainer.style.display = 'none';
        portraitContainer.classList.remove('hide');
        storyText.style.flex = 'none';
    }, 300);
}

// Mevcut changeBackground fonksiyonunu güncelle
function changeBackground(backgroundPath) {
    if (backgroundPath) {
        const fullPath = backgroundPath.startsWith('http') ? backgroundPath : backgroundPath;
        document.body.style.backgroundImage = `url('${fullPath}')`;
    }
}

// Geliştirilmiş Stat Güncelleme Sistemi
function updateStats() {
    const stats = [
        { id: 'justice', value: gameState.adalet_puani, max: 100, name: 'Adalet' },
        { id: 'power', value: gameState.guc_puani, max: 100, name: 'Güç' },
        { id: 'support', value: gameState.halk_destegi, max: 100, name: 'Halk Desteği' },
        { id: 'satisfaction', value: gameState.halk_memnuniyeti, max: 100, name: 'Memnuniyet' },
        { id: 'rebellion', value: gameState.isyan_riski, max: 100, name: 'İsyan Riski' },
        { id: 'treasury', value: gameState.hazine, max: 200, name: 'Hazine' },
        { id: 'conscience', value: gameState.kisisel_vicdan, max: 100, name: 'Vicdan' }
    ];

    stats.forEach(stat => {
        const fill = document.getElementById(`${stat.id}-fill`);
        const value = document.getElementById(`${stat.id}-value`);
        const row = document.getElementById(`${stat.id}-row`);
        
        if (fill && value) {
            const oldValue = parseInt(value.textContent) || 0;
            const newValue = stat.value;
            const percentage = Math.min((newValue / stat.max) * 100, 100);
            
            // Animasyonlu güncelleme
            fill.style.width = `${percentage}%`;
            value.textContent = newValue;
            
            // Değişim animasyonu
            if (oldValue !== newValue) {
                animateStatChange(stat.id, oldValue, newValue);
            }
            
            // Kritik seviye kontrolü
            checkCriticalLevel(stat.id, newValue, stat.max);
        }
    });

    // Özel efektler
    checkSpecialEffects();
}

// Puan değişim animasyonu
function animateStatChange(statId, oldValue, newValue) {
    const valueElement = document.getElementById(`${statId}-value`);
    const fillElement = document.getElementById(`${statId}-fill`);
    const rowElement = document.getElementById(`${statId}-row`);
    
    if (!valueElement || !fillElement || !rowElement) return;
    
    // Değişim göstergesi
    const change = newValue - oldValue;
    const changeText = change > 0 ? `+${change}` : `${change}`;
    const changeClass = change > 0 ? 'positive' : 'negative';
    
    // Mevcut göstergeleri temizle
    const existingIndicator = rowElement.querySelector('.stat-change-indicator');
    if (existingIndicator) existingIndicator.remove();
    
    // Yeni gösterge oluştur
    const indicator = document.createElement('div');
    indicator.className = `stat-change-indicator ${changeClass}`;
    indicator.textContent = changeText;
    rowElement.appendChild(indicator);
    
    // Animasyon başlat
    setTimeout(() => {
        indicator.classList.add('show');
        valueElement.classList.add('changed');
        fillElement.classList.add('changed');
        
        // Animasyonları temizle
        setTimeout(() => {
            valueElement.classList.remove('changed');
            fillElement.classList.remove('changed');
            indicator.classList.remove('show');
            setTimeout(() => indicator.remove(), 500);
        }, 800);
    }, 100);
}

// Kritik seviye kontrolü
function checkCriticalLevel(statId, value, max) {
    const rowElement = document.getElementById(`${statId}-row`);
    if (!rowElement) return;
    
    const percentage = (value / max) * 100;
    
    // Kritik seviyeleri temizle
    rowElement.classList.remove('critical', 'danger');
    
    // Yeni kritik seviyeleri uygula
    if (statId === 'rebellion' && percentage >= 80) {
        rowElement.classList.add('critical');
    } else if (statId === 'rebellion' && percentage >= 60) {
        rowElement.classList.add('danger');
    } else if (statId === 'satisfaction' && percentage <= 20) {
        rowElement.classList.add('critical');
    } else if (statId === 'satisfaction' && percentage <= 40) {
        rowElement.classList.add('danger');
    } else if (statId === 'treasury' && percentage <= 15) {
        rowElement.classList.add('critical');
    } else if (statId === 'treasury' && percentage <= 30) {
        rowElement.classList.add('danger');
    }
}

// Özel efektler
function checkSpecialEffects() {
    // İsyan riski 70+ ise sallanma efekti
    if (gameState.isyan_riski >= 70) {
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }
    
    // Hazine kritik seviyede ise uyarı (sadece büyük düşüşlerde)
    if (gameState.hazine <= 30 && gameState.hazine < gameState._lastHazine - 10) {
        showWarning('Hazine kritik seviyede!');
    }
    
    // Halk memnuniyeti çok düşükse uyarı (sadece büyük düşüşlerde)
    if (gameState.halk_memnuniyeti <= 20 && gameState.halk_memnuniyeti < gameState._lastHalkMemnuniyeti - 15) {
        showWarning('Halk memnuniyeti çok düşük!');
    }
    
    // Son değerleri güncelle
    gameState._lastHazine = gameState.hazine;
    gameState._lastHalkMemnuniyeti = gameState.halk_memnuniyeti;
}

// Uyarı gösterme
function showWarning(message) {
    const warning = document.createElement('div');
    warning.className = 'warning-message';
    warning.textContent = message;
    warning.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(225, 112, 85, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: warningPulse 2s ease-in-out;
    `;
    
    document.body.appendChild(warning);
    
    setTimeout(() => {
        warning.remove();
    }, 3000);
}

// İlişkiler panelini güncelle
function updateRelationshipsPanel() {
    const panel = document.getElementById('relationships-panel');
    if (!panel) return;
    
    const characters = gameState.anahtar_karakterler;
    let html = '<h3>Karakter İlişkileri</h3>';
    
    Object.entries(characters).forEach(([name, data]) => {
        const statusClass = data.durum === 'güvende' ? 'status-safe' : 
                           data.durum === 'hayatta' ? 'status-loyal' : 'status-angry';
        
        html += `
            <div class="character-card">
                <div class="character-name">${name.charAt(0).toUpperCase() + name.slice(1)}</div>
                <div class="character-status ${statusClass}">${data.durum}</div>
            </div>
        `;
    });
    
    panel.innerHTML = html;
}

// Typewriter efekti
/**
 * Metni "typewriter" efektiyle güvenli bir şekilde ekrana yazar.
 * 1. Önceki animasyonları iptal ederek render çakışmasını engeller.
 * 2. Newline karakterlerini (\n) HTML satır sonu (<br>) etiketlerine dönüştürür.
 * 3. Animasyonu atlama (skip) mantığını içerir.
 */
function typeWriter(text, onComplete) {
    const storyTextElement = document.getElementById('story-text');
    const skipButton = document.getElementById('skip-button');
    if (!storyTextElement) return;

    // --- EN KRİTİK ADIM: MEVCUT ANİMASYONU HER ZAMAN DURDUR ---
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    if (currentTypingAnimation) {
        clearTimeout(currentTypingAnimation);
        currentTypingAnimation = null;
    }
    
    // Metni HTML için formatla
    const formattedText = text.replace(/\n/g, '<br>');
    storyTextElement.innerHTML = ''; // İçeriği temizle
    typewriterSkip = false;
    
    // Skip butonunu göster
    if (skipButton) {
        skipButton.style.display = 'block';
    }
    
    let i = 0;
    typewriterInterval = setInterval(() => {
        if (typewriterSkip) {
            clearInterval(typewriterInterval);
            storyTextElement.innerHTML = formattedText;
            // Skip butonunu gizle
            if (skipButton) {
                skipButton.style.display = 'none';
            }
            if (onComplete) onComplete();
            return;
        }

        if (i < formattedText.length) {
            // '<br>' etiketini tek seferde atlamak için
            if (formattedText.substring(i, i + 4) === '<br>') {
                storyTextElement.innerHTML += '<br>';
                i += 4;
            } else {
                storyTextElement.innerHTML += formattedText[i];
                i++;
            }
        } else {
            clearInterval(typewriterInterval);
            // Skip butonunu gizle
            if (skipButton) {
                skipButton.style.display = 'none';
            }
            if (onComplete) onComplete();
        }
    }, 25); // Yazma hızı
}

// Seçenekleri göster
function showChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    if (!choicesContainer) return;
    
    choicesContainer.innerHTML = '';
    
    // Koşullu seçenekleri filtrele
    const validChoices = choices.filter(choice => {
        if (!choice.if) return true; // Koşul yoksa göster
        
        // Koşul değerlendirmesi
        const condition = choice.if;
        
        // Basit koşul değerlendirmesi
        if (condition.includes('>')) {
            const [stat, value] = condition.split('>').map(s => s.trim());
            return gameState[stat] > parseInt(value);
        } else if (condition.includes('<')) {
            const [stat, value] = condition.split('<').map(s => s.trim());
            return gameState[stat] < parseInt(value);
        } else if (condition.includes('&&')) {
            // Çoklu koşul
            const conditions = condition.split('&&').map(c => c.trim());
            return conditions.every(cond => {
                if (cond.includes('>')) {
                    const [stat, value] = cond.split('>').map(s => s.trim());
                    return gameState[stat] > parseInt(value);
                } else if (cond.includes('<')) {
                    const [stat, value] = cond.split('<').map(s => s.trim());
                    return gameState[stat] < parseInt(value);
                }
                return false;
            });
        }
        
        return true; // Bilinmeyen koşul durumunda göster
    });
    
    validChoices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.onclick = () => {
            if (navigator.vibrate) {
                navigator.vibrate(12);
            }
            selectChoice(choice);
        };
        button.setAttribute('tabindex', index + 1);
        choicesContainer.appendChild(button);
    });
}

// Seçim onay dialog'u
function showChoiceConfirmation(choice) {
    const effects = calculateChoiceEffects(choice);
    
    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';
    dialog.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-header">
                <h3>Seçim Onayı</h3>
                <div class="confirmation-close" onclick="closeConfirmation()">✕</div>
            </div>
            <div class="confirmation-body">
                <p><strong>Seçiminiz:</strong> ${choice.text}</p>
                <div class="effects-preview">
                    <h4>Beklenen Etkiler:</h4>
                    ${effects.map(effect => `
                        <div class="effect-item">
                            <span class="effect-stat">${effect.stat}</span>
                            <span class="effect-change ${effect.change > 0 ? 'positive' : 'negative'}">
                                ${effect.change > 0 ? '+' : ''}${effect.change}
                            </span>
                        </div>
                    `).join('')}
                </div>
                <div class="confirmation-warning">
                    <p>⚠️ Bu seçim geri alınamaz!</p>
                </div>
            </div>
            <div class="confirmation-actions">
                <button class="confirm-btn" onclick="confirmChoice('${choice.text}')">Onayla</button>
                <button class="cancel-btn" onclick="closeConfirmation()">İptal</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
}

// Seçim etkilerini hesapla
function calculateChoiceEffects(choice) {
    const effects = [];
    
    if (choice.set) {
        Object.entries(choice.set).forEach(([stat, change]) => {
            const changeValue = parseInt(change.replace('it ', ''));
            effects.push({
                stat: getStatName(stat),
                change: changeValue
            });
        });
    }
    
    return effects;
}

// Stat adını getir
function getStatName(statKey) {
    const statNames = {
        'adalet_puani': 'Adalet',
        'guc_puani': 'Güç',
        'halk_destegi': 'Halk Desteği',
        'halk_memnuniyeti': 'Memnuniyet',
        'isyan_riski': 'İsyan Riski',
        'hazine': 'Hazine',
        'kisisel_vicdan': 'Vicdan'
    };
    return statNames[statKey] || statKey;
}

// Onay dialog'unu kapat
function closeConfirmation() {
    const dialog = document.querySelector('.confirmation-dialog');
    if (dialog) {
        dialog.remove();
    }
}

// Seçimi onayla
function confirmChoice(choiceText) {
    const choices = document.querySelectorAll('.choice-button');
    for (let choice of choices) {
        if (choice.textContent === choiceText) {
            selectChoice({ text: choiceText });
            break;
        }
    }
    closeConfirmation();
}

// Final sonucu hesapla
function calculateFinalResult() {
    const storyText = document.getElementById('story-text');
    if (!storyText) return;
    
    let finalBaslik = '';
    let finalMetin = '';
    
    // Puanlara göre sonuç belirle - daha detaylı analiz
    const gucPuani = gameState.guc_puani;
    const adaletPuani = gameState.adalet_puani;
    const halkDestegi = gameState.halk_destegi;
    const halkMemnuniyeti = gameState.halk_memnuniyeti;
    const isyanRiski = gameState.isyan_riski;
    const hazine = gameState.hazine;
    const vicdan = gameState.kisisel_vicdan;
    
    // En yüksek puanı bul
    const enYuksekPuan = Math.max(gucPuani, adaletPuani, halkDestegi, halkMemnuniyeti, isyanRiski, vicdan);
    
    if (gucPuani > 75) {
        finalBaslik = 'YENİ TİRANLIK';
        finalMetin = `Güç zehirlenmesi yaşadın. Güç puanın ${gucPuani} ile en yüksek. Özgürlük ideali, düzen ve güvenlik uğruna feda edildi. Halkın devrimi, yeni bir elit sınıf yarattı. İsimler değişti, ama sistemin özü aynı kaldı. Tarih, kendini bir kez daha tekrar etti.`;
    } else if (adaletPuani > 70 && halkDestegi > 60) {
        finalBaslik = 'ZORLU ÖZGÜRLÜK';
        finalMetin = `Adalet puanın ${adaletPuani}, halk desteğin ${halkDestegi}. Kaotik, verimsiz ve sürekli krizlerle boğuşan bir toplum yarattın. Ama özgür bir toplum. İnsanlar kendi kaderlerini tayin ediyor. Bu zorlu yolda yürümek, her gün verilen bir mücadele. Ama bu mücadele, yaşamın ta kendisi.`;
    } else if (halkDestegi > 80) {
        finalBaslik = 'HALK DEVRİMİ';
        finalMetin = `Halk desteğin ${halkDestegi} ile çok yüksek. Halkın gücüyle gerçek bir değişim sağladın. Toplum, tabandan yukarıya doğru örgütlendi. Her karar halk meclislerinde alınıyor. Bu, gerçek demokrasinin ilk adımı.`;
    } else if (isyanRiski > 80) {
        finalBaslik = 'KAOS VE ANARŞİ';
        finalMetin = `İsyan riskin ${isyanRiski} ile çok yüksek. Kontrolü tamamen kaybettin. Şehir kaos içinde, herkes kendi başının çaresine bakıyor. Devrim, kendi çocuklarını yedi. Bu, özgürlüğün en karanlık yüzü.`;
    } else if (hazine > 150) {
        finalBaslik = 'EKONOMİK BAŞARI';
        finalMetin = `Hazine puanın ${hazine} ile çok yüksek. Zenginlik ve refah sağladın, ama eşitsizlik de arttı. Yeni bir ekonomik elit oluştu. Para her şeyi satın alıyor. Bu, kapitalizmin zaferi mi, yoksa devrimin ihaneti mi?`;
    } else if (vicdan > 70) {
        finalBaslik = 'VİCDANLI LİDER';
        finalMetin = `Vicdan puanın ${vicdan} ile çok yüksek. Ahlaki değerlerle yönettin. Her kararında vicdanını dinledin. Toplum, adalet ve merhamet üzerine kuruldu. Ama bu idealizm, gerçek dünyanın zorluklarıyla başa çıkabiliyor mu?`;
    } else if (halkMemnuniyeti > 70) {
        finalBaslik = 'HALK MUTLULUĞU';
        finalMetin = `Halk memnuniyetin ${halkMemnuniyeti} ile yüksek. Halkı mutlu ettin ama belki de çok fazla taviz verdin. Toplum refah içinde ama belki de devrimin ruhu kayboldu. Bu, başarı mı yoksa ihanet mi?`;
    } else {
        finalBaslik = 'KIRILGAN DENGE';
        finalMetin = `Hiçbir puanın çok yüksek değil. En yüksek puanın ${enYuksekPuan}. Ne tam bir özgürlük ne de tam bir tiranlık. İdealizm ve pragmatizm arasında bir denge kurmaya çalıştın. Toplum, sürekli olarak merkeziyetçilik ve anarşizm arasında gidip geliyor. Bu kırılgan denge ne kadar sürecek, kimse bilmiyor.`;
    }
    
    // Metni güncelle
    let text = storyText.innerHTML;
    text = text.replace('{final_sonuc_baslik}', finalBaslik);
    text = text.replace('{final_sonuc_metin}', finalMetin);
    storyText.innerHTML = text;
}

// Seçim yap
function selectChoice(choice) {
    // Eğer zaten bir seçim yapıldıysa ve animasyon sürüyorsa, ikinci tıklamayı engelle
    if (isChoiceMade) return;
    isChoiceMade = true;

    // Seçim etkilerini uygula
    if (choice.set) {
        Object.entries(choice.set).forEach(([stat, change]) => {
            const changeValue = parseInt(change.replace('it ', ''));
            if (gameState[stat] !== undefined) {
                // Stat sınırlandırması - kritik düzeltme
                const statKeys = ["adalet_puani", "guc_puani", "halk_destegi", "halk_memnuniyeti", "isyan_riski", "kisisel_vicdan"];
                if (statKeys.includes(stat)) {
                    gameState[stat] = Math.max(0, Math.min(100, gameState[stat] + changeValue));
                } else if (stat === "hazine") {
                    gameState[stat] = Math.max(0, Math.min(200, gameState[stat] + changeValue));
                } else {
                    gameState[stat] = gameState[stat] + changeValue;
                }
            }
        });
        updateStats();
    }
    
            // Faz değişikliği kontrolü
        if (choice.set && choice.set.faz) {
            gameState.faz = choice.set.faz;
            // Faz değiştiğinde haber sistemini sıfırla
        gameState._lastNewsTime = 0;
        gameState._newsShown = false;
    }
    
    // İlişkiler panelini güncelle
    updateRelationshipsPanel();
    
    // Sonraki düğüme geç
    if (choice.nextNode) {
        showNode(choice.nextNode);
    }

    // Animasyon tamamlandıktan sonra bayrağı sıfırla
    setTimeout(() => {
        isChoiceMade = false;
    }, 1000); // 1 saniyelik bekleme süresi
}

// Düğümü göster
function showNode(nodeId) {
    if (!storyData || !storyData.storyNodes[nodeId]) {
        console.error('Düğüm bulunamadı:', nodeId);
        document.getElementById('story-text').innerText = "Hata: Hikaye düğümü bulunamadı. Lütfen sayfayı yenileyin.";
        return;
    }
    
    const node = storyData.storyNodes[nodeId];
    currentNode = nodeId;
    
    // Debug bilgisi güncelle
    const debugNode = document.getElementById('current-node');
    if (debugNode) debugNode.textContent = nodeId;
    
    // Arka plan değiştir
    if (node.background) {
        changeBackground(node.background);
    }

    // Karakter portresini göster/gizle
    if (node.character && node.character.portrait) {
        showCharacterPortrait(node.character.name, node.character.portrait);
    } else {
        hideCharacterPortrait();
    }
    
    // Metni yaz
    let text = node.text;
    
    // Değişkenleri değiştir
    Object.entries(gameState).forEach(([key, value]) => {
        text = text.replace(new RegExp(`{${key}}`, 'g'), value);
    });
    
    // Özel değişkenler
    if (gameState.müttefik) {
        const müttefikNames = {
            'akademisyen': 'Akademisyenler',
            'asker': 'Askerler', 
            'sendikacı': 'Sendikacılar'
        };
        text = text.replace(/{müttefik}/g, müttefikNames[gameState.müttefik] || gameState.müttefik);
    }
    
    typeWriter(text, () => {
        if (node.choices) {
            showChoices(node.choices);
        }
        
        // Final sonucu hesapla
        if (nodeId === 'final_otomatik_sonuc') {
            calculateFinalResult();
        }
        
        // Haber kontrolü - sahne geçişlerinde haber göster
        setTimeout(() => {
            newsSystem.checkNews();
        }, 2000); // 2 saniye sonra haber kontrolü
        
        // Flashback kontrolü - önemli sahnelerde flashback göster
        setTimeout(() => {
            if (emotionalSystem && emotionalSystem.showFlashback) {
                emotionalSystem.showFlashback(nodeId);
            }
        }, 4000); // 4 saniye sonra flashback kontrolü
    });
}

// Story gösterme fonksiyonu
function displayStory(nodeId) {
    const node = storyData.storyNodes[nodeId];
    if (!node) return;

    // Arka planı değiştir
    if (node.background) {
        changeBackground(node.background);
    }

    // Karakter portresini göster/gizle
    if (node.character && node.character.portrait) {
        showCharacterPortrait(node.character.name, node.character.portrait);
    } else {
        hideCharacterPortrait();
    }

    // Story metnini göster
    const storyText = document.getElementById('story-text');
    storyText.textContent = '';
    
    let index = 0;
    const text = node.text;
    
    function typeWriter() {
        if (index < text.length) {
            storyText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        } else {
            // Metin yazma tamamlandığında seçenekleri göster
            showChoices(node.choices);
        }
    }
    
    typeWriter();
}

// Oyunu başlat
function startGame() {
    // Debug bilgisi güncelle
    const gameStatus = document.getElementById('game-status');
    if (gameStatus) gameStatus.textContent = 'Çalışıyor ✓';
    
    // Müzik sistemi otomatik başlatılacak
    musicSystem.updateMusicButton();
    musicSystem.updateVolumeDisplay();
    
    showNode('start');
}

// Erişilebilirlik kontrolleri
function toggleAccessibilityControls() {
    const controls = document.getElementById('accessibility-controls');
    controls.classList.toggle('show');
}

function toggleTextSize() {
    const body = document.body;
    const currentSize = body.className.match(/text-size-(\w+)/);
    
    if (currentSize) {
        body.className = body.className.replace(/text-size-\w+/, '');
    }
    
    const sizes = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = sizes.findIndex(size => body.className.includes(`text-size-${size}`));
    const nextIndex = (currentIndex + 1) % sizes.length;
    
    body.classList.add(`text-size-${sizes[nextIndex]}`);
    
    // Kullanıcı tercihini kaydet
    localStorage.setItem('textSize', sizes[nextIndex]);
}

function toggleColorblindMode() {
    const body = document.body;
    body.classList.toggle('colorblind-friendly');
    
    // Kullanıcı tercihini kaydet
    localStorage.setItem('colorblindMode', body.classList.contains('colorblind-friendly'));
}

function toggleHighContrast() {
    const body = document.body;
    body.classList.toggle('high-contrast');
    
    // Kullanıcı tercihini kaydet
    localStorage.setItem('highContrast', body.classList.contains('high-contrast'));
}

function toggleReducedMotion() {
    const body = document.body;
    body.classList.toggle('reduced-motion');
    
    // Kullanıcı tercihini kaydet
    localStorage.setItem('reducedMotion', body.classList.contains('reduced-motion'));
}

// Erişilebilirlik tercihlerini yükle
function loadAccessibilityPreferences() {
    const textSize = localStorage.getItem('textSize');
    const colorblindMode = localStorage.getItem('colorblindMode') === 'true';
    const highContrast = localStorage.getItem('highContrast') === 'true';
    const reducedMotion = localStorage.getItem('reducedMotion') === 'true';
    
    const body = document.body;
    
    if (textSize) {
        body.classList.add(`text-size-${textSize}`);
    }
    
    if (colorblindMode) {
        body.classList.add('colorblind-friendly');
    }
    
    if (highContrast) {
        body.classList.add('high-contrast');
    }
    
    if (reducedMotion) {
        body.classList.add('reduced-motion');
    }
}

function upsertMetaTag(name, content, attribute = 'name') {
    const selector = `meta[${attribute}="${name}"]`;
    let meta = document.querySelector(selector);

    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
}

function ensureLinkTag(rel, href) {
    let link = document.querySelector(`link[rel="${rel}"]`);

    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
    }

    link.setAttribute('href', href);
}

function isIOSDevice() {
    const platform = navigator.platform || '';
    const userAgent = navigator.userAgent || '';
    const touchMac = platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return /iPad|iPhone|iPod/.test(userAgent) || touchMac;
}

function setupIOSExperience() {
    if (!isIOSDevice()) return;

    document.body.classList.add('ios-device');

    if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone) {
        document.body.classList.add('ios-standalone');
    }

    upsertMetaTag('apple-mobile-web-app-capable', 'yes');
    upsertMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    upsertMetaTag('apple-mobile-web-app-title', 'The Equals Game');
    upsertMetaTag('format-detection', 'telephone=no');
    upsertMetaTag('theme-color', '#0b1021');
    ensureLinkTag('apple-touch-icon', 'logo.png');
}

function applyMobileViewportMetrics() {
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const vh = Math.max(viewportHeight, 320) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Mobil dokunmatik optimizasyonu
function setupMobileOptimization() {
    // Dokunmatik cihaz kontrolü
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Viewport ayarları
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5.0, user-scalable=yes');
    }
    
    applyMobileViewportMetrics();
    window.addEventListener('resize', applyMobileViewportMetrics, { passive: true });
    window.addEventListener('orientationchange', applyMobileViewportMetrics, { passive: true });
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', applyMobileViewportMetrics, { passive: true });
    }
}

function setupTouchFeedback() {
    document.addEventListener('pointerdown', (event) => {
        const target = event.target.closest('button, .choice-button, .rules-close, .news-close');
        if (!target) return;
        target.classList.add('is-pressed');
    });

    const clearPressedState = (event) => {
        const target = event.target.closest('button, .choice-button, .rules-close, .news-close');
        if (!target) return;
        target.classList.remove('is-pressed');
    };

    document.addEventListener('pointerup', clearPressedState);
    document.addEventListener('pointercancel', clearPressedState);
    document.addEventListener('pointerleave', clearPressedState, true);
}

// Klavye navigasyonu
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab ile seçenekler arası geçiş
        if (e.key === 'Tab') {
            const choices = document.querySelectorAll('.choice-button');
            const currentIndex = Array.from(choices).findIndex(choice => choice === document.activeElement);
            
            if (e.shiftKey) {
                // Geriye doğru
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : choices.length - 1;
                choices[prevIndex].focus();
            } else {
                // İleriye doğru
                const nextIndex = currentIndex < choices.length - 1 ? currentIndex + 1 : 0;
                choices[nextIndex].focus();
            }
            e.preventDefault();
        }
        
        // Enter ile seçim
        if (e.key === 'Enter' && document.activeElement.classList.contains('choice-button')) {
            document.activeElement.click();
        }
        
        // Escape ile dialog kapatma
        if (e.key === 'Escape') {
            const dialog = document.querySelector('.confirmation-dialog');
            if (dialog) {
                closeConfirmation();
            }
        }
    });
}

// Flashback'i kapat
function closeFlashback() {
    const dialogs = document.querySelectorAll('.flashback-dialog');
    dialogs.forEach(dialog => {
        dialog.classList.add('removing');
        setTimeout(() => {
            if (dialog.parentElement) {
                dialog.remove();
            }
        }, 300);
    });
}

// Oyun kurallarını göster
function showRules() {
    const modal = document.getElementById('rules-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        console.log('Rules modal opened');
    } else {
        console.error('Rules modal not found');
    }
}

// Oyun kurallarını kapat
function closeRules() {
    const modal = document.getElementById('rules-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        console.log('Rules modal closed');
    } else {
        console.error('Rules modal not found');
    }
}

// Animasyonu atla
function skipAnimation() {
    typewriterSkip = true;
    
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
    }
    if (currentTypingAnimation) {
        clearTimeout(currentTypingAnimation);
        currentTypingAnimation = null;
    }
    
    // Skip butonunu gizle
    const skipButton = document.getElementById('skip-button');
    if (skipButton) {
        skipButton.style.display = 'none';
    }
    
    const storyText = document.getElementById('story-text');
    if (storyText && currentNode) {
        const node = storyData.storyNodes[currentNode];
        if (node) {
            let text = node.text;
            Object.entries(gameState).forEach(([key, value]) => {
                text = text.replace(new RegExp(`{${key}}`, 'g'), value);
            });
            // Metni HTML için formatla
            const formattedText = text.replace(/\n/g, '<br>');
            storyText.innerHTML = formattedText;
            
            if (node.choices) {
                showChoices(node.choices);
            }
        }
    }
}

// HTML onclick'lerin çalışması için global scope'a ata (DOMContentLoaded'dan önce)
window.skipAnimation = skipAnimation;
window.toggleAccessibilityControls = toggleAccessibilityControls;
window.toggleTextSize = toggleTextSize;
window.toggleColorblindMode = toggleColorblindMode;
window.toggleHighContrast = toggleHighContrast;
window.toggleReducedMotion = toggleReducedMotion;
window.showRules = showRules;
window.closeRules = closeRules;
window.closeFlashback = closeFlashback;
window.musicSystem = musicSystem;

// Event listener'lar
document.addEventListener('DOMContentLoaded', function() {
    // Önceki event listener'ları temizle (flashback üst üste çıkmasını engelle)
    const existingListeners = document.querySelectorAll('.flashback-dialog');
    existingListeners.forEach(listener => listener.remove());
    
    // Debug panelini göster (F12 ile gizle/göster)
    const debugInfo = document.getElementById('debug-info');
    if (debugInfo) debugInfo.style.display = 'block';
    
    // Erişilebilirlik tercihlerini yükle
    loadAccessibilityPreferences();
    
    // Mobil optimizasyonu kur
    setupMobileOptimization();
    
    // iOS deneyim ayarları
    setupIOSExperience();
    
    // Dokunmatik basış geri bildirimi
    setupTouchFeedback();
    
    // Klavye navigasyonu kur
    setupKeyboardNavigation();
    
    // Müzik sistemini başlat
    musicSystem.init();
    
    // F12 ile debug panelini gizle/göster
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12') {
            e.preventDefault();
            if (debugInfo) debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    // Oyunu başlat - storyData yükleme sırasını düzelt
    loadStoryData().then(() => {
        // storyData yüklendikten sonra oyunu başlat
        setTimeout(() => {
            startGame();
        }, 100); // 100ms gecikme ile storyData'nın tam yüklenmesini bekle
    }).catch(error => {
        console.error('Oyun başlatılamadı:', error);
        document.getElementById('story-text').innerText = "Hata: Oyun yüklenemedi. Lütfen sayfayı yenileyin.";
    });
}); 

export {
  gameState,
  calculateChoiceEffects,
  updateStats,
  showNode,
  selectChoice,
  startGame,
  loadStoryData,
  musicSystem
  // metricsSystem // varsa ekle
}; 
