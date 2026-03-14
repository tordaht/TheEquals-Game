# The Equals Game - FAZ - TEMIZ

Bu klasor, `The Equals Game` icin bagimsiz ve temizlenmis surumdur.

## Komutlar

```bash
npm install
npm run prepare:data
npm run dev
```

Ek komutlar:

```bash
npm run lint
npm test
npm run audit:assets
npm run test:visual
```

## Icerik

- `assets/data/story-data.json`: faz bilgisi eklenmis hikaye verisi
- `src/`: moduler oyun runtime'i
- `scripts/`: veri uretimi, asset audit ve screenshot akisi
- `docs/visual-manifest.json`: node, asset ve audit durumu

## Notlar

- Bu surum yalnizca gerekli assetleri kullanir.
- Root repodaki backup klasorlerine bagimli degildir.
- Gorsel audit akisi sistemdeki Edge/Chrome tarayicisini kullanmaya calisir.
