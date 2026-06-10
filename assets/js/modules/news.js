export const newsSystem = {
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
