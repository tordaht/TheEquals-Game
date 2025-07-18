// Game state with clamped setters
export const gameState = {
  _adalet_puani: 0,
  _guc_puani: 0,
  _halk_destegi: 0,
  _halk_memnuniyeti: 0,
  _isyan_riski: 0,
  _hazine: 100,
  _kisisel_vicdan: 0,
  faz: 1,
  bolum: 1,
  get adalet_puani() { return this._adalet_puani; },
  set adalet_puani(v) { this._adalet_puani = Math.max(0, Math.min(100, v)); },
  get guc_puani() { return this._guc_puani; },
  set guc_puani(v) { this._guc_puani = Math.max(0, Math.min(100, v)); },
  get halk_destegi() { return this._halk_destegi; },
  set halk_destegi(v) { this._halk_destegi = Math.max(0, Math.min(100, v)); },
  get halk_memnuniyeti() { return this._halk_memnuniyeti; },
  set halk_memnuniyeti(v) { this._halk_memnuniyeti = Math.max(0, Math.min(100, v)); },
  get isyan_riski() { return this._isyan_riski; },
  set isyan_riski(v) { this._isyan_riski = Math.max(0, Math.min(100, v)); },
  get hazine() { return this._hazine; },
  set hazine(v) { this._hazine = Math.max(0, Math.min(200, v)); },
  get kisisel_vicdan() { return this._kisisel_vicdan; },
  set kisisel_vicdan(v) { this._kisisel_vicdan = Math.max(0, Math.min(100, v)); },
  karakter_adi: '',
  secilen_yol: '',
  müttefik: '',
  yoldas_durumu: '',
  secilen_strateji: '',
  elit_cevabi: '',
  devrim_tipi: '',
  yonetim_stili: '',
  muhalefet_durumu: '',
  son_catisma_secimi: '',
  dis_politika_durumu: 'tarafsız',
  teknoloji_seviyesi: 5,
  anahtar_karakterler: {
    elif: { durum: 'güvende', iliski: 'sadık' },
    eski_yoldas: { durum: 'hayatta', iliski: 'sadık' },
    aile_uyesi: { durum: 'tehlikede', iliski: 'kırgın' }
  },
  _lastHazine: 100,
  _lastHalkMemnuniyeti: 0
};

export function updateStats() {
  const stats = [
    { id: 'justice', value: gameState.adalet_puani, max: 100 },
    { id: 'power', value: gameState.guc_puani, max: 100 },
    { id: 'support', value: gameState.halk_destegi, max: 100 },
    { id: 'satisfaction', value: gameState.halk_memnuniyeti, max: 100 },
    { id: 'rebellion', value: gameState.isyan_riski, max: 100 },
    { id: 'treasury', value: gameState.hazine, max: 200 },
    { id: 'conscience', value: gameState.kisisel_vicdan, max: 100 }
  ];

  stats.forEach(stat => {
    const fill = document.getElementById(`${stat.id}-fill`);
    const value = document.getElementById(`${stat.id}-value`);
    const row = document.getElementById(`${stat.id}-row`);

    if (fill && value) {
      const oldValue = parseInt(value.textContent) || 0;
      const newValue = stat.value;
      const percentage = Math.min((newValue / stat.max) * 100, 100);
      fill.style.width = `${percentage}%`;
      value.textContent = newValue;
      if (oldValue !== newValue) {
        animateStatChange(stat.id, oldValue, newValue);
      }
      checkCriticalLevel(stat.id, newValue, stat.max);
    }
  });

  checkSpecialEffects();
}

export function animateStatChange(statId, oldValue, newValue) {
  const valueElement = document.getElementById(`${statId}-value`);
  const fillElement = document.getElementById(`${statId}-fill`);
  const rowElement = document.getElementById(`${statId}-row`);
  if (!valueElement || !fillElement || !rowElement) return;

  const change = newValue - oldValue;
  const indicator = document.createElement('div');
  indicator.className = `stat-change-indicator ${change > 0 ? 'positive' : 'negative'}`;
  indicator.textContent = change > 0 ? `+${change}` : `${change}`;
  rowElement.appendChild(indicator);

  requestAnimationFrame(() => indicator.classList.add('show'));
  setTimeout(() => {
    indicator.classList.remove('show');
    indicator.remove();
  }, 800);
}

export function checkCriticalLevel(statId, value, max) {
  const rowElement = document.getElementById(`${statId}-row`);
  if (!rowElement) return;
  const percentage = (value / max) * 100;
  rowElement.classList.remove('critical', 'danger');
  if (statId === 'rebellion' && percentage >= 80) {
    rowElement.classList.add('critical');
  } else if (statId === 'rebellion' && percentage >= 60) {
    rowElement.classList.add('danger');
  } else if (statId === 'satisfaction' && percentage <= 20) {
    rowElement.classList.add('critical');
  } else if (statId === 'satisfaction' && percentage <= 40) {
    rowElement.classList.add('danger');
  } else if (statId === 'treasury' && percentage <= 15) {
    rowElement.classList.add('critical');
  } else if (statId === 'treasury' && percentage <= 30) {
    rowElement.classList.add('danger');
  }
}

export function checkSpecialEffects() {
  if (gameState.isyan_riski >= 70) {
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);
  }
  if (gameState.hazine <= 30 && gameState.hazine < gameState._lastHazine - 10) {
    showWarning('Hazine kritik seviyede!');
  }
  if (gameState.halk_memnuniyeti <= 20 && gameState.halk_memnuniyeti < gameState._lastHalkMemnuniyeti - 15) {
    showWarning('Halk memnuniyeti çok düşük!');
  }
  gameState._lastHazine = gameState.hazine;
  gameState._lastHalkMemnuniyeti = gameState.halk_memnuniyeti;
}

export function showWarning(message) {
  const warning = document.createElement('div');
  warning.className = 'warning-message';
  warning.textContent = message;
  document.body.appendChild(warning);
  setTimeout(() => warning.remove(), 3000);
}
