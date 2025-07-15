export const emotionalSystem = {
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
            "nostalgia": "🏠",
            "courage": "⚔️",
            "joy": "🎉",
            "sadness": "💔"
        };
        return icons[emotion] || "💭";
    }
};
