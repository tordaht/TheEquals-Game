# TheEquals_Game - Teknik ve Fonksiyonel Çalışma Şeması (v2.1)

## 1. Genel Bakış
TheEquals_Game, HTML/JS tabanlı, hikaye tabanlı bir interaktif oyun projesidir. Oyun, kullanıcıdan alınan bilgilerle başlar, hikaye akışı ve dallanmalar storyData.json dosyasından dinamik olarak yüklenir. Arayüzde lider paneli, ilişkiler paneli ve modern cam efektiyle tasarlanmış ana oyun alanı bulunur.

---

## 2. Ana Dosyalar ve Görevleri

- **index.html**: Tüm arayüz, oyun mantığı ve JS kodlarının bulunduğu ana dosya. Oyun burada başlatılır ve yönetilir.
- **storyData.json**: Hikaye akışının, tüm dallanmaların ve metinlerin bulunduğu ana veri dosyası. Oyun akışı buradan çekilir.
- **BGs/**: Oyun içi arka plan görselleri.
- **HikayeYapisiYeni.txt**: Hikaye taslağının metinsel ve insan tarafından okunabilir hali. JSON’a aktarılarak storyData.json’a dönüştürülür.
- **HATA ÇÖZÜMLERİ.txt**: Tüm hata ve çözümlerin kaydedildiği zorunlu log dosyası.

---

## 3. Oyun Akışı ve Veri Akışı

### 3.1. Oyun Başlatma
1. Kullanıcıya açılış modalı gösterilir (isim, IP vs. alınır ve localStorage’a kaydedilir).
2. Kullanıcı “BAŞLA” butonuna tıkladığında, storyData.json dosyası fetch ile yüklenir.
3. Hikaye akışı storyData.json’daki `storyNodes` objesinden başlar (`start` düğümü).

### 3.2. Hikaye Akışı
- Her düğüm (node), bir metin (`text`), arka plan (`background`) ve seçenekler (`choices`) içerir.
- Seçenekler tıklandığında, ilgili statlar güncellenir ve bir sonraki düğüme (`nextNode`) geçilir.
- Statlar (adalet, güç, halk, memnuniyet, isyan, hazine, vicdan) ve karakter ilişkileri güncellenir.
- Oyun boyunca dallanma ve farklı sonlar storyData.json’daki yapıya göre ilerler.

### 3.3. Arayüz ve Paneller
- **Lider Paneli**: Stat barları ve değerleri.
- **İlişkiler Paneli**: Anahtar karakterlerin durumu ve ilişkisi.
- **Toggle Butonları**: Panelleri aç/kapat.
- **Ana Oyun Alanı**: Hikaye metni ve seçenekler.

---

## 4. Fonksiyonlar ve Mantık

- **loadStoryData()**: storyData.json’u fetch ile yükler, global değişkene atar.
- **showNode(nodeId)**: İlgili hikaye düğümünü ekrana basar, metin ve seçenekleri gösterir.
- **selectChoice(choice)**: Seçilen seçeneğe göre statları ve ilişkileri günceller, bir sonraki düğüme geçer.
- **updateStats()**: Stat barlarını ve değerlerini günceller.
- **updateRelationshipsPanel()**: Karakter ilişkilerini günceller.
- **typeWriter(text, onComplete)**: Metni yazma efektiyle ekrana basar.
- **changeBackground(imagePath)**: Arka planı değiştirir.

---

## 5. Veri Akışı ve İlişkiler

- **Kullanıcıdan alınan bilgiler** (isim, IP, tarayıcı, vs.) localStorage’a kaydedilir.
- **Hikaye akışı** storyData.json’daki dallanmalara göre ilerler.
- **Statlar ve karakter ilişkileri** her seçimde güncellenir ve arayüze yansır.
- **Oyun sonu**: Farklı sonlar (güçlü lider, demokratik, bağımlı) storyData.json’daki final düğümlerine göre gösterilir.

---

## 6. Hata Yönetimi ve Loglama

- Her hata ve çözüm, HATA ÇÖZÜMLERİ.txt dosyasına tarih, açıklama ve çözümle birlikte kaydedilir.
- Oyun başlatılmadan önce bu dosya incelenir, tekrar eden hatalar önlenir.
- Konsolda hata çıkarsa, try/catch ile yakalanır ve loglanır.

---

## 7. Geliştirme ve Güncelleme Akışı

- Hikaye güncellemeleri önce HikayeYapisiYeni.txt’de yapılır, ardından storyData.json’a aktarılır.
- Her yeni sürümde versiyon numarası hem arayüzde hem dosyalarda güncellenir.
- Her değişiklik sonrası test yapılır, sonuçlar HATA ÇÖZÜMLERİ.txt’ye yazılır.

---

## 8. Olası Sorunlar ve Çözüm Yöntemleri

- **JSON yüklenmiyor**: Dosya encoding’i, fetch yolu, sunucu cache, dosya bozukluğu kontrol edilir.
- **Arayüz yükleniyor ama hikaye gelmiyor**: storyData.json, fetch ve showNode fonksiyonları debug edilir.
- **Statlar/ilişkiler güncellenmiyor**: updateStats ve updateRelationshipsPanel fonksiyonları kontrol edilir.
- **Sunucu portu meşgul**: start_equals_server.bat ile port temizlenir ve sunucu başlatılır.

---

## 9. Dosya ve Fonksiyon İlişki Şeması

```mermaid
graph TD;
    index.html -->|fetch| storyData.json
    index.html -->|görseller| BGs
    index.html -->|log| "HATA ÇÖZÜMLERİ.txt"
    index.html -->|arayüz| LiderPaneli
    index.html -->|arayüz| İlişkilerPaneli
    index.html -->|arayüz| OyunAlanı
    storyData.json -->|düğümler| HikayeAkışı
    HikayeYapisiYeni.txt -->|taslak| storyData.json
```

---

## 10. Kısa Akış Özeti
1. Kullanıcı açılış modalında bilgilerini girer.
2. “Başla” ile storyData.json yüklenir.
3. Hikaye dallanarak ilerler, statlar ve ilişkiler güncellenir.
4. Oyun sonu farklı final düğümlerine çıkar.
5. Her hata ve çözüm loglanır, tekrar eden hata önlenir.

---

**Not:**
Bu dosya her büyük güncellemede güncellenmeli ve proje kökünde tutulmalıdır. 