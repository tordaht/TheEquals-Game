# The Equals Game - v3.0 Beta

## 🎮 Oyun Hakkında

**The Equals Game**, devrimci bir lider olarak Vadi şehrini yönetme deneyimi sunan interaktif bir metin tabanlı oyun. Oyun, toplumsal adalet, güç dengesi ve halk desteği arasında kritik kararlar vermenizi gerektirir.

## 🚀 Özellikler

- **İnteraktif Hikaye**: 50+ farklı hikaye düğümü
- **Dinamik İstatistikler**: 7 farklı puan sistemi
- **Çoklu Son**: Kararlarınıza göre değişen sonlar
- **Erişilebilirlik**: Renk körlüğü desteği, yüksek kontrast modu
- **Müzik Sistemi**: Atmosferik arka plan müziği (%15 otomatik başlatma)
- **Responsive Tasarım**: Tüm cihazlarda uyumlu
- **Modern Altyapı**: npm scripts, CI/CD pipeline, metrik sistemi

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

### Modern Altyapı (Önerilen)
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu başlat
npm run dev

# Production build
npm run build

# Test çalıştır
npm test
```

### Alternatif Başlatma Yöntemleri
```bash
# Python HTTP sunucusu ile
npm run serve

# PHP ile
npm run serve-php

# Node.js ile
npm start
```

### Eski Yöntem (Windows)
```bash
# Oyunu başlatmak için
start-game.bat
```

## 📊 Metrik Sistemi

### Lighthouse Skorları
- **Performance**: Web performansı
- **Accessibility**: Erişilebilirlik
- **SEO**: Arama motoru optimizasyonu
- **Best Practices**: En iyi uygulamalar

### Test Coverage
- **Hedef**: %85 test coverage
- **Mevcut**: Sürekli güncelleniyor

### Performance Metrikleri
- **FCP**: First Contentful Paint
- **LCP**: Largest Contentful Paint
- **FID**: First Input Delay
- **CLS**: Cumulative Layout Shift

## 📁 Proje Yapısı

```
TheEquals_Game/
├── Index.HTML          # Ana oyun dosyası
├── storyData.json      # Hikaye verileri
├── package.json        # Modern npm yapılandırması
├── metrics.js          # Metrik sistemi
├── assets/
│   ├── css/
│   │   └── main.css    # Stil dosyaları
│   └── js/
│       └── app.js      # Oyun mantığı
├── BGs/                # Arka plan görselleri
├── Music/              # Müzik dosyaları
├── .github/
│   ├── workflows/      # CI/CD pipeline
│   └── branch-protection.yml
└── start-game.bat      # Eski başlatma (kaldırılacak)
```

## 🎨 Teknolojiler

- **HTML5**: Yapısal markup
- **CSS3**: Modern styling ve animasyonlar
- **JavaScript (ES6+)**: Oyun mantığı ve etkileşim
- **JSON**: Veri yönetimi
- **npm**: Modern paket yönetimi
- **GitHub Actions**: CI/CD pipeline
- **Lighthouse**: Performance monitoring

## 🔧 Geliştirme

### Gereksinimler
- Node.js >= 14.0.0
- Modern web tarayıcısı
- HTTP sunucusu (geliştirme için)

### Güvenlik
- Branch protection rules aktif
- Pull Request zorunlu
- Code review gerekli
- Otomatik test ve linting

### Katkıda Bulunma
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 İletişim

- **Geliştirici**: Ozan BAYAR / Cursor AI
- **Stüdyo**: Devrimci Oyun Stüdyosu
- **Versiyon**: 3.0 Beta
- **Seri No**: TEG-007

## 🎮 Oynama

Oyunu oynamak için:
```bash
npm install
npm run dev
```

Veya `Index.HTML` dosyasını bir web tarayıcısında açın.

---

**⚠️ Not**: Bu oyun şu anda Beta aşamasındadır. Modern altyapı ile geliştirilmektedir. 