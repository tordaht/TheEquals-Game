export const newsByPhase = {
  1: [
    {
      title: 'Elitler luks yasamini surduruyor',
      content: 'Ust sehirde yeni rezidanslar acildi. Halkin yoksullugu ile elitlerin gorkemi arasindaki makas daha da acildi.',
      impact: { halk_memnuniyeti: -5, isyan_riski: 3 }
    },
    {
      title: 'Isci sendikalari toplaniyor',
      content: 'Buyuk fabrikalarda isci temsilcileri gizli toplantilar duzenliyor. Grev soylentileri yayiliyor.',
      impact: { halk_destegi: 2, isyan_riski: 2 }
    },
    {
      title: 'Guvenlik gucleri sokaklarda',
      content: 'Merkez caddelerde denetimler arttirildi. Halkta sessiz ama buyuyen bir huzursuzluk var.',
      impact: { halk_memnuniyeti: -3, guc_puani: 2 }
    },
    {
      title: 'Universite ogrencileri hareketlendi',
      content: 'Ogrenciler artan ucretleri ve sansuru protesto ediyor. Kampus cikislari kapatildi.',
      impact: { halk_destegi: 3, isyan_riski: 2 }
    }
  ],
  2: [
    {
      title: 'Yeni hukumet ilk kararlarini aldi',
      content: 'Eski rejimin mallarina el konuldu. Halk bir yandan umutlu, bir yandan yeni iktidarin tonunu tartiyor.',
      impact: { adalet_puani: 5, hazine: 20 }
    },
    {
      title: 'Ekonomik reform paketi aciklandi',
      content: 'Paylasim odakli yeni model yururluge girdi. Reformlar destek kadar tereddut de uretiyor.',
      impact: { halk_memnuniyeti: 3, hazine: -10 }
    },
    {
      title: 'Eski elitler surgune gonderildi',
      content: 'Devrim karsiti aktorler kent disina cikarildi. Guvenlik birimleri kritik noktalarda nobette.',
      impact: { adalet_puani: 3, guc_puani: 5 }
    },
    {
      title: 'Halk meclisi kuruldu',
      content: 'Temel haklar ve dagitim mekanizmalari acik oturumlarda tartisiliyor. Sokakta ilgi buyuk.',
      impact: { halk_destegi: 5, adalet_puani: 3 }
    }
  ],
  3: [
    {
      title: 'Muhalefet sesleri yukseliyor',
      content: 'Yeni duzende kaybedenler ve hayal kirikligi yasayanlar ayni meydanlarda ses veriyor.',
      impact: { halk_destegi: -3, isyan_riski: 5 }
    },
    {
      title: 'Guvenlik gucleri yeniden sahada',
      content: 'Artan gerilim nedeniyle kontrol noktalarina takviye yapildi. Kentte savas korkusu belirgin.',
      impact: { guc_puani: 3, halk_memnuniyeti: -5 }
    },
    {
      title: 'Ekonomik kriz derinlesiyor',
      content: 'Bazi temel urunler tukendi. Uzun kuyruklar ve tedirginlik gundelik hayatın parcasina donustu.',
      impact: { halk_memnuniyeti: -8, hazine: -15 }
    },
    {
      title: 'Yer alti orgutleri aktif',
      content: 'Karsi-devrimci aglar ve dis destekli hucreler yeniden gorundu. Operasyonlar basladi.',
      impact: { isyan_riski: 8, guc_puani: 2 }
    }
  ]
};

export const flashbacksByNode = {
  start: [
    {
      title: 'Cocukluk anisi',
      content: 'Babanin yorgun elleri ve "bir gun her sey degisecek" diyen sesi hala aklinda.',
      impact: { kisisel_vicdan: 3, halk_destegi: 2 }
    },
    {
      title: 'Okul anisi',
      content: 'Ayni sinifta bile imkanlarin esit olmadigini ilk kez okulda anlamistin.',
      impact: { adalet_puani: 2, kisisel_vicdan: 1 }
    }
  ],
  ilk_suphe: [
    {
      title: 'Ahmetin kovulusu',
      content: 'Ofisin sessizligi, patronun rahat tavri ve arkadasinin yuzundeki bosluk zihninden cikmiyor.',
      impact: { adalet_puani: 4, halk_destegi: 3 }
    }
  ],
  gizli_hiyerarsi: [
    {
      title: 'Yer alti toplantisi',
      content: 'Mum isiginda toplanan kalabaligin sessiz kararliligi ilk kez degisimin yakinligini hissettirdi.',
      impact: { halk_destegi: 4, isyan_riski: 2 }
    }
  ],
  yanilsama_catlagi: [
    {
      title: 'Sistemin yalanlari',
      content: 'Medyanin, egitimin ve is yerinin ayni ezberi tekrarladigi ana geri donuyorsun: "Herkes esit."',
      impact: { adalet_puani: 5, kisisel_vicdan: 3 }
    }
  ],
  ilk_direnis: [
    {
      title: 'Ilk eylem',
      content: 'Bir sokak marsi esliginde yuzlerce yabancinin ayni anda korkuyu asmasi geri donus noktan oldu.',
      impact: { halk_destegi: 6, isyan_riski: 4 }
    }
  ],
  yerel_orgutlenme: [
    {
      title: 'Topluluk guveni',
      content: 'Mahallenin sana guvenmeye baslamasi liderligin agirligini ilk kez omuzlarina koydu.',
      impact: { halk_destegi: 5, kisisel_vicdan: 2 }
    }
  ],
  devlet_tepkisi: [
    {
      title: 'Devlet baskisi',
      content: 'Abluka altindaki mahallede korku kadar inat da buyuyordu. Her ev bir ses oldu.',
      impact: { isyan_riski: 5, halk_destegi: 3 }
    }
  ],
  halk_uyanisi: [
    {
      title: 'Halkin uyanisi',
      content: 'Direnisin tek bir mahalleye ait olmadigini fark ettigin an devrim kacınılmazlasti.',
      impact: { halk_destegi: 7, isyan_riski: 5 }
    }
  ],
  son_hazirlik: [
    {
      title: 'Devrim arifesi',
      content: 'Buyuk kopustan hemen onceki sessizlik, tarihin de nefesini tuttugu bir an gibiydi.',
      impact: { guc_puani: 4, halk_destegi: 3 }
    }
  ],
  faz2_baslangic: [
    {
      title: 'Zafer anisi',
      content: 'Sokaklardaki sarilma, aglama ve gulme bir aradaydi. Zafer, ayni anda hem umut hem sorumluluktu.',
      impact: { halk_destegi: 5, adalet_puani: 3 }
    }
  ],
  final_karar: [
    {
      title: 'Fedakarlik anisi',
      content: 'Arkadaslarinin bakislari, kaybedilenler ve kurtarilanlar ayni anda geri donuyor. Secimlerinin bedeli ortada.',
      impact: { kisisel_vicdan: 5, adalet_puani: 3 }
    }
  ]
};
