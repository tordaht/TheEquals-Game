// Oyun durumu
const gameState = {
    perde: 1,
    bolum: 1,
    adalet_puani: 0,
    guc_puani: 0,
    halk_destegi: 0,
    halk_memnuniyeti: 0,
    isyan_riski: 0,
    hazine: 100,
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
    kisisel_vicdan: 0,
    dis_politika_durumu: "tarafsız",
    teknoloji_seviyesi: 5,
    anahtar_karakterler: {
        elif: { durum: 'güvende', iliski: 'sadık' },
        eski_yoldas: { durum: 'hayatta', iliski: 'sadık' },
        aile_uyesi: { durum: 'tehlikede', iliski: 'kırgın' }
    }
};

let storyData = null;
let currentNode = 'start';

let currentTypingAnimation = null; // Mevcut animasyonu tutan değişken

// Hikaye verilerini yükle - UTF-8 GÜVENLİ VERSİYON
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

// Arka plan değiştir
function changeBackground(imagePath) {
    if (imagePath) {
        document.body.style.backgroundImage = `url('${imagePath}')`;
    }
}

// Stat güncelle
function updateStats() {
    const stats = [
        { id: 'justice', value: gameState.adalet_puani, max: 100 },
        { id: 'power', value: gameState.guc_puani, max: 100 },
        { id: 'support', value: gameState.halk_destegi, max: 100 },
        { id: 'satisfaction', value: gameState.halk_memnuniyeti, max: 100 },
        { id: 'rebellion', value: gameState.isyan_riski, max: 100 },
        { id: 'treasury', value: gameState.hazine, max: 200 },
        { id: 'conscience', value: gameState.kisisel_vicdan, max: 100 }
    ];

    stats.forEach(stat => {
        const fill = document.getElementById(`${stat.id}-fill`);
        const value = document.getElementById(`${stat.id}-value`);
        
        if (fill && value) {
            const percentage = Math.min((stat.value / stat.max) * 100, 100);
            fill.style.width = `${percentage}%`;
            value.textContent = stat.value;
        }
    });

    // İsyan riski 70+ ise sallanma efekti
    if (gameState.isyan_riski >= 70) {
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }
}

// İlişkiler panelini güncelle
function updateRelationshipsPanel() {
    const panel = document.getElementById('relationships-panel');
    if (!panel) return;
    
    const characters = gameState.anahtar_karakterler;
    let html = '<h3>Karakterler</h3>';
    
    for (const [name, data] of Object.entries(characters)) {
        const statusClass = data.durum === 'güvende' ? 'status-safe' : 
                          data.durum === 'tehlikede' ? 'status-angry' : 
                          data.durum === 'hayatta' ? 'status-loyal' : 'status-enemy';
        
        const relationClass = data.iliski === 'sadık' ? 'status-loyal' : 
                            data.iliski === 'düşman' ? 'status-enemy' : 'status-angry';
        
        html += `
            <div class="character-card">
                <div class="character-name">${name.charAt(0).toUpperCase() + name.slice(1)}</div>
                <div class="character-status ${statusClass}">Durum: ${data.durum}</div>
                <div class="character-status ${relationClass}">İlişki: ${data.iliski}</div>
            </div>
        `;
    }
    
    panel.innerHTML = html;
}

// Metin yazma efekti - ATOMİK VERSİYON
function typeWriter(text, onComplete) {
    // 1. Mevcut animasyon varsa, İPTAL ET
    if (currentTypingAnimation) {
        clearTimeout(currentTypingAnimation);
        currentTypingAnimation = null;
    }

    const storyTextElement = document.getElementById('story-text');
    storyTextElement.innerHTML = ''; // Önce metin alanını TEMİZLE
    
    // Skip butonu ekle
    let skipBtn = document.createElement('button');
    skipBtn.textContent = 'SKIP';
    skipBtn.className = 'skip-btn';
    skipBtn.onclick = function() {
        // Skip butonuna basıldığında da animasyonu temizle
        if (currentTypingAnimation) {
            clearTimeout(currentTypingAnimation);
            currentTypingAnimation = null;
        }
        storyTextElement.innerHTML = text;
        skipBtn.remove();
        if (onComplete) onComplete();
    };
    storyTextElement.parentElement.appendChild(skipBtn);
    
    let i = 0;
    function type() {
        if (i < text.length) {
            storyTextElement.innerHTML += text.charAt(i);
            i++;
            // 2. Yeni animasyonun ID'sini değişkene ata
            currentTypingAnimation = setTimeout(type, 30);
        } else {
            currentTypingAnimation = null; // Animasyon bitti, bayrağı temizle
            skipBtn.remove();
            if (onComplete) onComplete();
        }
    }
    type();
}

// Seçenekleri göster
function showChoices(choices) {
    const choicesElement = document.getElementById('choices');
    choicesElement.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.addEventListener('click', () => selectChoice(choice));
        choicesElement.appendChild(button);
    });
}

// Seçim yap
function selectChoice(choice) {
    // Stat güncellemeleri
    if (choice.set) {
        Object.entries(choice.set).forEach(([key, value]) => {
            if (typeof value === 'string' && value.startsWith('it ')) {
                const change = parseInt(value.substring(3));
                // Statlar 0-100 arası, mantıksız artış/azalış engelle
                if (["adalet", "guc", "halk_destegi", "halk_memnuniyeti", "isyan_riski", "kisisel_vicdan", "vicdan"].includes(key)) {
                    gameState[key] = Math.max(0, Math.min(100, (gameState[key] || 0) + change));
                } else if (key === "hazine") {
                    gameState[key] = Math.max(0, Math.min(200, (gameState[key] || 0) + change));
                } else {
                    gameState[key] = (gameState[key] || 0) + change;
                }
            } else {
                gameState[key] = value;
            }
        });
    }
    updateStats();
    updateRelationshipsPanel();
    if (choice.nextNode) {
        showNode(choice.nextNode);
    }
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
    
    // Arka plan değiştir
    if (node.background) {
        changeBackground(node.background);
    }
    
    // Metni yaz
    let text = node.text;
    
    // Değişkenleri değiştir
    Object.entries(gameState).forEach(([key, value]) => {
        text = text.replace(new RegExp(`{${key}}`, 'g'), value);
    });
    
    typeWriter(text, () => {
        if (node.choices) {
            showChoices(node.choices);
        }
    });
}

// Oyunu başlat
function startGame() {
    // Debug bilgisi güncelle
    const gameStatus = document.getElementById('game-status');
    if (gameStatus) gameStatus.textContent = 'Çalışıyor ✓';
    
    showNode('start');
}

// Event listener'lar
document.addEventListener('DOMContentLoaded', function() {
    // Debug panelini göster (F12 ile gizle/göster)
    const debugInfo = document.getElementById('debug-info');
    if (debugInfo) debugInfo.style.display = 'block';
    
    // F12 ile debug panelini gizle/göster
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12') {
            e.preventDefault();
            if (debugInfo) debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
        }
    });
    document.getElementById('relationships-toggle').addEventListener('click', () => {
        const panel = document.getElementById('relationships-panel');
        panel.classList.toggle('show');
        if (panel.classList.contains('show')) {
            updateRelationshipsPanel();
        }
    });

    document.getElementById('leader-toggle').addEventListener('click', () => {
        const board = document.getElementById('leader-board');
        board.classList.toggle('hidden');
    });

    // Oyun kuralları modal event listener'ları
    document.getElementById('rules-toggle').addEventListener('click', () => {
        const modal = document.getElementById('rules-modal');
        modal.style.display = 'flex';
    });

    document.getElementById('rules-close-btn').addEventListener('click', () => {
        const modal = document.getElementById('rules-modal');
        modal.style.display = 'none';
    });

    // Modal dışına tıklayınca kapat
    document.getElementById('rules-modal').addEventListener('click', (e) => {
        if (e.target.id === 'rules-modal') {
            e.target.style.display = 'none';
        }
    });

    // Açılış modalı - KRİTİK ASENKRON HATA DÜZELTİLDİ
    document.getElementById('welcome-start-btn').onclick = async function() {
        let name = prompt('Adınızı giriniz:') || 'İsimsiz';
        gameState.karakter_adi = name;
        let ip = '', country = '', city = '';
        
        try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            ip = data.ip || '';
            country = data.country_name || '';
            city = data.city || '';
        } catch(e) {
            console.warn('IP bilgisi alınamadı:', e);
        }
        
        const browser = navigator.userAgent;
        const lang = navigator.language;
        const screenRes = window.screen.width + 'x' + window.screen.height;
        const now = new Date().toISOString();
        
        let arr = JSON.parse(localStorage.getItem('equals_userdata')||'[]');
        arr.push({name, ip, country, city, browser, lang, screenRes, now});
        localStorage.setItem('equals_userdata', JSON.stringify(arr));
        
        try {
            await loadStoryData(); // Verinin yüklenmesini BEKLE
            document.getElementById('welcome-modal').style.display = 'none';
            startGame(); // Veri yüklendikten SONRA oyunu başlat
        } catch (error) {
            console.error("KRİTİK HATA: Oyun başlatılamadı.", error);
            document.getElementById('story-text').innerText = "Oyun verileri yüklenemedi. Lütfen sayfayı yenileyin veya yöneticiyle iletişime geçin.";
        }
    };

    // Oyunu başlat
    loadStoryData().then(() => {
        updateStats();
        updateRelationshipsPanel();
    }).catch(error => {
        console.error('Oyun başlatılamadı:', error);
    });
}); 