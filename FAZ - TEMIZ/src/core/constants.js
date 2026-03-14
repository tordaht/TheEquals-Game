export const STAT_DEFS = [
  { key: 'adalet_puani', label: 'Adalet', min: 0, max: 100, uiKey: 'justice' },
  { key: 'guc_puani', label: 'Guc', min: 0, max: 100, uiKey: 'power' },
  { key: 'halk_destegi', label: 'Halk Destegi', min: 0, max: 100, uiKey: 'support' },
  { key: 'halk_memnuniyeti', label: 'Memnuniyet', min: 0, max: 100, uiKey: 'satisfaction' },
  { key: 'isyan_riski', label: 'Isyan Riski', min: 0, max: 100, uiKey: 'rebellion' },
  { key: 'hazine', label: 'Hazine', min: 0, max: 200, uiKey: 'treasury' },
  { key: 'kisisel_vicdan', label: 'Vicdan', min: 0, max: 100, uiKey: 'conscience' }
];

export const STAT_DEF_BY_KEY = Object.fromEntries(
  STAT_DEFS.map((stat) => [stat.key, stat])
);

export const ALLY_LABELS = {
  akademisyen: 'Akademisyenler',
  asker: 'Askerler',
  'sendikaci': 'Sendikacilar',
  'sendikacı': 'Sendikacilar'
};

export const PHASE_LABELS = {
  1: 'Uyanis',
  2: 'Kurulus',
  3: 'Ozurluk Denemesi'
};

export const PHASE_ENTRY_NODES = {
  1: 'start',
  2: 'faz2_baslangic',
  3: 'gecis_donemi'
};

export const VISUAL_AUDIT_TARGETS = [
  'start',
  'gizli_hiyerarsi',
  'faz2_baslangic',
  'gecis_donemi',
  'final_karar'
];

export const RULES_SECTIONS = [
  {
    title: 'Istatistikler',
    items: [
      'Adalet: toplumsal adalet seviyesi.',
      'Guc: siyasi ve askeri etkinlik.',
      'Halk Destegi: halkin sana olan inanci.',
      'Memnuniyet: gundelik yasam memnuniyeti.',
      'Isyan Riski: toplumsal patlama ihtimali.',
      'Hazine: kaynak ve lojistik guc.',
      'Vicdan: kisisel etik sinirlarin.'
    ]
  },
  {
    title: 'Oyun Akisi',
    items: [
      'Her secim geri donusuzdur.',
      'Puanlar birbirini etkiler, tek bir sayiya oynamak risklidir.',
      'Faz degistikce haberler ve atmosfer de degisir.',
      'Flashback sahneleri karakterin ic sesini ve vicdani guclendirir.'
    ]
  },
  {
    title: 'Hedef',
    items: [
      'Devrim sonrasi yeni duzeni kurarken halki, gucu ve vicdani dengede tut.',
      'Final sonucu oyundaki toplam tercihlerin ve puan dagiliminin yansimasidir.'
    ]
  }
];

export const RELATIONSHIP_BASE = {
  elif: { label: 'Elif', status: 'guvende', relation: 'sadik' },
  eski_yoldas: { label: 'Eski Yoldas', status: 'hayatta', relation: 'sadik' },
  aile_uyesi: { label: 'Aile Uyesi', status: 'tehlikede', relation: 'kirgin' }
};

export const DEFAULT_STATE = {
  adalet_puani: 0,
  guc_puani: 0,
  halk_destegi: 0,
  halk_memnuniyeti: 0,
  isyan_riski: 0,
  hazine: 100,
  kisisel_vicdan: 0,
  faz: 1,
  bolum: 1,
  karakter_adi: '',
  secilen_yol: '',
  'müttefik': '',
  yoldas_durumu: '',
  secilen_strateji: '',
  elit_cevabi: '',
  devrim_tipi: '',
  yonetim_stili: '',
  muhalefet_durumu: '',
  son_catisma_secimi: '',
  dis_politika_durumu: 'tarafsiz',
  teknoloji_seviyesi: 5,
  anahtar_karakterler: RELATIONSHIP_BASE
};
