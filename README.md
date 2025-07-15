# The Equals Game - v3.0 Beta

## 🎮 Oyun Hakkında

**The Equals Game**, devrimci bir lider olarak Vadi şehrini yönetme deneyimi sunan interaktif bir metin tabanlı oyun. Oyun, toplumsal adalet, güç dengesi ve halk desteği arasında kritik kararlar vermenizi gerektirir.

## 🚀 Özellikler

- **İnteraktif Hikaye**: 50+ farklı hikaye düğümü
- **Dinamik İstatistikler**: 7 farklı puan sistemi
- **Çoklu Son**: Kararlarınıza göre değişen sonlar
- **Erişilebilirlik**: Renk körlüğü desteği, yüksek kontrast modu
- **Müzik Sistemi**: Atmosferik arka plan müziği
- **Responsive Tasarım**: Tüm cihazlarda uyumlu

## 🎯 Oyun Mekanikleri

### İstatistikler
- **Adalet**: Toplumsal adalet seviyesi (0-100)
- **Güç**: Siyasi ve askeri güç (0-100)
- **Halk Desteği**: Halkın size olan desteği (0-100)
- **Memnuniyet**: Halkın genel memnuniyeti (0-100)
- **İsyan Riski**: Halk ayaklanması riski (0-100)
- **Hazine**: Devlet hazinesi (0-200)
- **Vicdan**: Kişisel ahlaki değerler (0-100)

### Oyun Akışı
1. **Başlangıç**: Rutin hayatınızda ilk şüpheler
2. **Direniş**: Farklı gruplarla birleşme
3. **Devrim**: Halk ayaklanması ve yönetim değişikliği
4. **Yeni Düzen**: Güç boşluğu ve iç çatışmalar
5. **Final**: Seçimlerinizin sonuçları

## 🛠️ Kurulum

### Otomatik Başlatma (Windows)
```bash
# Oyunu başlatmak için
start-game.bat
```

### Manuel Başlatma
```bash
# Python HTTP sunucusu ile
python -m http.server 8000

# Node.js ile
npx http-server

# PHP ile
php -S localhost:8000
```

## 📁 Proje Yapısı

```
TheEquals_Game/
├── Index.HTML          # Ana oyun dosyası
├── storyData.json      # Hikaye verileri
├── assets/
│   ├── css/
│   │   └── main.css    # Stil dosyaları
│   └── js/
│       └── app.js      # Oyun mantığı
├── BGs/                # Arka plan görselleri
├── Music/              # Müzik dosyaları
└── start-game.bat      # Otomatik başlatma
```

## 🎨 Teknolojiler

- **HTML5**: Yapısal markup
- **CSS3**: Modern styling ve animasyonlar
- **JavaScript (ES6+)**: Oyun mantığı ve etkileşim
- **JSON**: Veri yönetimi

## 🔧 Geliştirme

### Gereksinimler
- Modern web tarayıcısı
- HTTP sunucusu (geliştirme için)

### Katkıda Bulunma
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 İletişim

- **Geliştirici**: Devrimci Oyun Stüdyosu
- **Versiyon**: 3.0 Beta
- **Seri No**: TEG-007

## 🎮 Oynama

Oyunu oynamak için `Index.HTML` dosyasını bir web tarayıcısında açın veya `start-game.bat` dosyasını çalıştırın.

---

**⚠️ Not**: Bu oyun şu anda Beta aşamasındadır. Geliştirme sürecinde olabilir. 