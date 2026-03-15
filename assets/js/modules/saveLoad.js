const STORAGE_KEY = 'teg-save';
const VERSION = 1;

export function saveGame(state) {
  const data = { version: VERSION, state };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (data.version === VERSION) {
      return data.state;
    }
  } catch (err) {
    console.warn('Save data corrupted', err);
  }
  return null;
}

export function clearSave() {
  localStorage.removeItem(STORAGE_KEY);
}
