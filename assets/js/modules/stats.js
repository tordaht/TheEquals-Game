export const gameState = {
  adalet_puani: 0,
  guc_puani: 0,
  halk_destegi: 0,
  halk_memnuniyeti: 0,
  isyan_riski: 0,
  hazine: 100,
  kisisel_vicdan: 0
};

export function updateStats() {
  ['adalet_puani','guc_puani','halk_destegi','halk_memnuniyeti','isyan_riski','hazine','kisisel_vicdan'].forEach(key => {
    const value = gameState[key];
    const el = document.getElementById(`${key.replace(/_/g,'-')}-value`);
    if (el) el.textContent = value;
  });
}

export function calculateChoiceEffects(choice) {
  const effects = [];
  if (choice.set) {
    Object.entries(choice.set).forEach(([stat, val]) => {
      effects.push({stat, change: parseInt(val.replace('it ',''))});
    });
  }
  return effects;
}
