const SAVE_KEY = 'teg_save_v1';

export function saveGame(state) {
  const data = { version: 1, state };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (data.version === 1) {
      return data.state;
    }
  } catch (e) {
    console.warn('Save parse failed', e);
  }
  return null;
}
