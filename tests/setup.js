// Jest Test Setup - The Equals Game
// Bu dosya test ortamını hazırlar
import { jest } from '@jest/globals';

// DOM ortamını simüle et
document.body.innerHTML = `
  <div id="game-container">
    <div id="story-text"></div>
    <div id="choices"></div>
  </div>
  <div class="stats-panel">
    <div class="stat-row" id="justice-row">
      <div class="stat-value" id="justice-value">0</div>
      <div class="stat-fill" id="justice-fill"></div>
    </div>
    <div class="stat-row" id="power-row">
      <div class="stat-value" id="power-value">0</div>
      <div class="stat-fill" id="power-fill"></div>
    </div>
    <div class="stat-row" id="support-row">
      <div class="stat-value" id="support-value">0</div>
      <div class="stat-fill" id="support-fill"></div>
    </div>
    <div class="stat-row" id="satisfaction-row">
      <div class="stat-value" id="satisfaction-value">0</div>
      <div class="stat-fill" id="satisfaction-fill"></div>
    </div>
    <div class="stat-row" id="rebellion-row">
      <div class="stat-value" id="rebellion-value">0</div>
      <div class="stat-fill" id="rebellion-fill"></div>
    </div>
    <div class="stat-row" id="treasury-row">
      <div class="stat-value" id="treasury-value">100</div>
      <div class="stat-fill" id="treasury-fill"></div>
    </div>
    <div class="stat-row" id="conscience-row">
      <div class="stat-value" id="conscience-value">0</div>
      <div class="stat-fill" id="conscience-fill"></div>
    </div>
  </div>
  <div id="music-toggle">🔇</div>
  <div id="volume-display">15%</div>
`;

// Global test değişkenleri
global.gameState = {
    faz: 1,
    bolum: 1,
    adalet_puani: 0,
    guc_puani: 0,
    halk_destegi: 0,
    halk_memnuniyeti: 0,
    isyan_riski: 0,
    hazine: 100,
    kisisel_vicdan: 0,
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
    _lastHazine: 100,
    _lastHalkMemnuniyeti: 0,
    _lastNewsTime: 0,
    _newsShown: false
};

// Mock storyData
global.storyData = {
    gameInfo: {
        title: "The Equals",
        version: "3.0 Beta",
        author: "Devrimci Oyun Stüdyosu",
        developer: "Ozan BAYAR / Cursor AI"
    },
    storyNodes: {
        start: {
            text: "Test metni",
            background: "test-bg.png",
            choices: [
                {
                    text: "Test seçenek 1",
                    set: { adalet_puani: "it +5" },
                    nextNode: "test_node"
                }
            ]
        },
        test_node: {
            text: "Test node metni",
            background: "test-bg2.png",
            choices: [
                {
                    text: "Test seçenek 2",
                    nextNode: "start"
                }
            ]
        }
    }
};

// Mock functions
global.currentNode = 'start';
global.currentTypingAnimation = null;
global.typewriterInterval = null;
global.typewriterSkip = false;
global.isChoiceMade = false;

// Performance mock
global.performance = {
    now: jest.fn(() => Date.now()),
    memory: {
        usedJSHeapSize: 1024 * 1024
    }
};

// RequestAnimationFrame mock
global.requestAnimationFrame = jest.fn((callback) => {
    setTimeout(callback, 16);
    return 1;
});

// Audio mock
global.Audio = jest.fn().mockImplementation(() => ({
    play: jest.fn().mockResolvedValue(),
    pause: jest.fn(),
    volume: 0.15,
    loop: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
}));

// Fetch mock
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: jest.fn().mockResolvedValue(JSON.stringify(global.storyData))
});

// LocalStorage mock
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};

// Test utilities
global.testUtils = {
    // DOM elementini temizle
    clearDOM: () => {
        document.body.innerHTML = '';
    },
    
    // Game state'i sıfırla
    resetGameState: () => {
        Object.assign(global.gameState, {
            faz: 1,
            bolum: 1,
            adalet_puani: 0,
            guc_puani: 0,
            halk_destegi: 0,
            halk_memnuniyeti: 0,
            isyan_riski: 0,
            hazine: 100,
            kisisel_vicdan: 0
        });
    },
    
    // Mock element oluştur
    createMockElement: (id, className = '') => {
        const element = document.createElement('div');
        element.id = id;
        element.className = className;
        document.body.appendChild(element);
        return element;
    }
}; 