# The Equals Game - AI Agent Talimatları

## PROJE BİLGİLERİ
- **Proje Adı:** The Equals Game
- **Versiyon:** 2.4
- **Seri No:** TEG-004
- **Tarih:** 15.07.2025

## OYUN HAKKINDA
The Equals Game, bir devrimci lider olarak Vadi şehrini yönetmeye çalıştığın interaktif bir hikaye oyunudur. Oyun 3 perdeden oluşur ve her seçimin sonuçları farklı yollar açar.

## TEKNİK YAPISI
- **Frontend:** HTML5, CSS3, JavaScript
- **Veri Yapısı:** JSON tabanlı hikaye sistemi
- **Görseller:** 119 adet BG görseli (PNG formatında)
- **Sunucu:** Python HTTP Server (port 8000)

## DOSYA YAPISI
```
TheEquals_Game/
├── index.html (ana oyun dosyası)
├── storyData.json (hikaye verileri)
├── Logo.png (oyun logosu)
├── favicon.ico (tarayıcı ikonu)
├── start_equals_server.bat (sunucu başlatma)
├── README.md (proje açıklaması)
├── assets/
│   ├── css/main.css (oyun stilleri)
│   └── js/app.js (oyun JavaScript kodu)
└── BGs/ (119 adet BG görseli)
```

## OYUN MEKANİKLERİ
1. **Hikaye Akışı:** JSON tabanlı düğüm sistemi
2. **Karakterler:** Arda, Elara, Kaan, Leyla, Ahmet, Albay Sancak
3. **Seçenekler:** Her sahne için 2-4 seçenek
4. **Sonuçlar:** 3 farklı final sonucu
5. **Skip Butonu:** Sayfanın ortasında konumlandırılmış
6. **Oyun Kuralları:** Ayrı buton ile erişilebilir

## GELİŞTİRME TALİMATLARI
- Her değişiklik HATA ÇÖZÜMLERİ.txt dosyasına kaydedilmeli
- Versiyon numarası her güncellemede artırılmalı
- Seri numarası TEG-XXX formatında olmalı
- Test edilmeden hiçbir değişiklik teslim edilmemeli
- Backup klasörü temiz tutulmalı

## ÇALIŞTIRMA
1. `start_equals_server.bat` dosyasını çalıştır
2. Tarayıcıda `http://localhost:8000` adresine git
3. Oyunu oynamaya başla

## NOTLAR
- Oyun tam çalışır durumda
- Tüm BG görselleri mevcut
- Responsive tasarım
- Cross-browser uyumlu
- Modern UI/UX 