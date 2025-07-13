# Oyun Mekanikleri

## Değişkenler

### Karakter Değişkenleri
- `$karakter_adi`: Oyuncunun seçtiği karakter adı
- `$puan`: Oyuncunun topladığı puan
- `$seviye`: Oyuncunun mevcut seviyesi

### Durum Değişkenleri
- `$bolum`: Mevcut bölüm numarası
- `$secim_sayisi`: Yapılan seçim sayısı
- `$zaman`: Geçen süre

## Oyun Kuralları

### Puan Sistemi
- Doğru seçim: +10 puan
- Yanlış seçim: -5 puan
- Bonus: +20 puan

### Seviye Sistemi
- Seviye 1: 0-50 puan
- Seviye 2: 51-100 puan
- Seviye 3: 101+ puan

### Özel Kurallar
[Buraya özel oyun kuralları gelecek]

## Koşullar

### Seçim Koşulları
```javascript
// Örnek koşul
if ($puan >= 50) {
    // Yüksek puanlı seçenek
} else {
    // Düşük puanlı seçenek
}
```

---
*Versiyon: 1.0.0*
*Seri No: TEG-003* 