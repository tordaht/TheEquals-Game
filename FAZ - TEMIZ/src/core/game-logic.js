import {
  ALLY_LABELS,
  DEFAULT_STATE,
  PHASE_LABELS,
  RELATIONSHIP_BASE,
  STAT_DEFS,
  STAT_DEF_BY_KEY
} from './constants.js';

export function createInitialState() {
  return structuredClone(DEFAULT_STATE);
}

export function clampStatValue(key, value) {
  const stat = STAT_DEF_BY_KEY[key];

  if (!stat) {
    return value;
  }

  return Math.min(stat.max, Math.max(stat.min, value));
}

export function parseEffectValue(rawValue) {
  if (typeof rawValue === 'number') {
    return rawValue;
  }

  if (typeof rawValue !== 'string') {
    return rawValue;
  }

  const normalized = rawValue.replace(/^it\s*/i, '').trim();
  const parsed = Number.parseInt(normalized, 10);

  return Number.isNaN(parsed) ? rawValue : parsed;
}

export function collectChoiceEffects(choice) {
  if (!choice?.set) {
    return [];
  }

  return Object.entries(choice.set).map(([key, value]) => ({
    key,
    label: STAT_DEF_BY_KEY[key]?.label ?? key,
    value: parseEffectValue(value)
  }));
}

export function applyChoiceEffects(state, choice) {
  const applied = [];

  if (!choice?.set) {
    return applied;
  }

  Object.entries(choice.set).forEach(([key, rawValue]) => {
    const parsedValue = parseEffectValue(rawValue);
    const currentValue = state[key];

    if (typeof parsedValue === 'number' && typeof currentValue === 'number') {
      const nextValue = clampStatValue(key, currentValue + parsedValue);
      state[key] = nextValue;
      applied.push({ key, value: nextValue, delta: nextValue - currentValue });
      return;
    }

    state[key] = parsedValue;
    applied.push({ key, value: parsedValue, delta: null });
  });

  return applied;
}

export function resolveAllyLabel(state) {
  const allyKey = state['müttefik'];
  return ALLY_LABELS[allyKey] ?? allyKey ?? '';
}

export function formatStoryText(text, state) {
  const replacements = {
    ...state,
    'müttefik': resolveAllyLabel(state)
  };

  return Object.entries(replacements).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, value ?? '');
  }, text);
}

export function buildRelationshipEntries(state) {
  const relationships = structuredClone(RELATIONSHIP_BASE);
  const allyKey = state['müttefik'];

  if (allyKey) {
    relationships[allyKey] = {
      label: ALLY_LABELS[allyKey] ?? allyKey,
      status: state.guc_puani >= 55 ? 'sahada' : 'beklemede',
      relation: state.halk_destegi >= 45 ? 'guveniyor' : 'temkinli'
    };
  }

  return Object.entries(relationships).map(([key, value]) => ({
    key,
    ...value
  }));
}

export function evaluateCondition(condition, state) {
  if (!condition) {
    return true;
  }

  const groups = condition.split('&&').map((item) => item.trim()).filter(Boolean);

  return groups.every((group) => evaluateSingleCondition(group, state));
}

function evaluateSingleCondition(group, state) {
  const operators = ['>=', '<=', '==', '>', '<'];
  const operator = operators.find((candidate) => group.includes(candidate));

  if (!operator) {
    return true;
  }

  const [left, right] = group.split(operator).map((item) => item.trim());
  const leftValue = state[left];
  const rightValue = Number.parseInt(right, 10);

  switch (operator) {
    case '>=':
      return leftValue >= rightValue;
    case '<=':
      return leftValue <= rightValue;
    case '==':
      return leftValue === rightValue;
    case '>':
      return leftValue > rightValue;
    case '<':
      return leftValue < rightValue;
    default:
      return true;
  }
}

export function buildChoiceList(node, state) {
  return (node?.choices ?? []).filter((choice) => evaluateCondition(choice.if, state));
}

export function determineFinalResult(state) {
  const gucPuani = state.guc_puani;
  const adaletPuani = state.adalet_puani;
  const halkDestegi = state.halk_destegi;
  const halkMemnuniyeti = state.halk_memnuniyeti;
  const isyanRiski = state.isyan_riski;
  const hazine = state.hazine;
  const vicdan = state.kisisel_vicdan;
  const enYuksekPuan = Math.max(
    gucPuani,
    adaletPuani,
    halkDestegi,
    halkMemnuniyeti,
    isyanRiski,
    vicdan
  );

  if (gucPuani > 75) {
    return {
      title: 'Yeni Tiranlik',
      body: `Guc puanin ${gucPuani}. Duzen korunurken devrimin ozgurluk vaadi eridi ve yeni bir elit dogdu.`
    };
  }

  if (adaletPuani > 70 && halkDestegi > 60) {
    return {
      title: 'Zorlu Ozgurluk',
      body: `Adalet puanin ${adaletPuani}, halk destegin ${halkDestegi}. Kaotik ama ozgur bir toplumu ayakta tuttun.`
    };
  }

  if (halkDestegi > 80) {
    return {
      title: 'Halk Devrimi',
      body: `Halk destegin ${halkDestegi}. Kararlar tabandan yukari kuruldu ve meclisler duzeni sekillendirdi.`
    };
  }

  if (isyanRiski > 80) {
    return {
      title: 'Kaos ve Anarsi',
      body: `Isyan riskin ${isyanRiski}. Kontrol dagildi ve devrim kendi agirligini tasiyamadi.`
    };
  }

  if (hazine > 150) {
    return {
      title: 'Ekonomik Basari',
      body: `Hazine ${hazine}. Refah buyudu ama esitlik ile zenginlik arasindaki gerilim de derinlesti.`
    };
  }

  if (vicdan > 70) {
    return {
      title: 'Vicdanli Lider',
      body: `Vicdan puanin ${vicdan}. Kararlarinda ahlaki sinirlarini kaybetmedin ve toplum merhamet ekseninde bicimlendi.`
    };
  }

  if (halkMemnuniyeti > 70) {
    return {
      title: 'Halk Mutlulugu',
      body: `Memnuniyet ${halkMemnuniyeti}. Refah hissi buyudu ama devrimin sert enerjisi yumusadi.`
    };
  }

  return {
    title: 'Kirilgan Denge',
    body: `En yuksek puanin ${enYuksekPuan}. Sistem ne tamamen ozgur ne tamamen otoriter; denge her an bozulabilir.`
  };
}

export function injectFinalText(node, state) {
  if (!node || node.id !== 'final_otomatik_sonuc') {
    return node?.text ?? '';
  }

  const result = determineFinalResult(state);

  return node.text
    .replace('{final_sonuc_baslik}', result.title)
    .replace('{final_sonuc_metin}', result.body);
}

export function getPhaseLabel(phase) {
  return PHASE_LABELS[phase] ?? `Faz ${phase}`;
}

export function summarizeScene(text) {
  const firstParagraph = (text ?? '').split('\n').find((line) => line.trim().length > 0) ?? '';
  return firstParagraph.trim();
}

export function buildStatsSnapshot(state) {
  return STAT_DEFS.map((stat) => ({
    key: stat.key,
    label: stat.label,
    value: state[stat.key],
    min: stat.min,
    max: stat.max,
    uiKey: stat.uiKey
  }));
}
