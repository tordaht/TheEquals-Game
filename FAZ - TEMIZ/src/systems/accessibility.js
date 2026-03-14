const STORAGE_KEY = 'the-equals-faz-temiz.accessibility';
const TEXT_SIZES = ['medium', 'large', 'xlarge'];

export function createAccessibilityManager(doc, storage = globalThis.localStorage) {
  const settings = {
    textSize: 'medium',
    colorblind: false,
    highContrast: false,
    reducedMotion: false
  };

  function load() {
    try {
      const saved = storage?.getItem?.(STORAGE_KEY);
      if (saved) {
        Object.assign(settings, JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Accessibility preferences could not be read.', error);
    }

    apply();
    return getSettings();
  }

  function persist() {
    try {
      storage?.setItem?.(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Accessibility preferences could not be saved.', error);
    }
  }

  function apply() {
    doc.body.dataset.textSize = settings.textSize;
    doc.body.classList.toggle('a11y-colorblind', settings.colorblind);
    doc.body.classList.toggle('a11y-high-contrast', settings.highContrast);
    doc.body.classList.toggle('a11y-reduced-motion', settings.reducedMotion);
  }

  function cycleTextSize() {
    const currentIndex = TEXT_SIZES.indexOf(settings.textSize);
    const nextIndex = (currentIndex + 1) % TEXT_SIZES.length;
    settings.textSize = TEXT_SIZES[nextIndex];
    apply();
    persist();
    return getSettings();
  }

  function toggle(key) {
    settings[key] = !settings[key];
    apply();
    persist();
    return getSettings();
  }

  function getSettings() {
    return { ...settings };
  }

  return {
    load,
    getSettings,
    cycleTextSize,
    toggleColorblind: () => toggle('colorblind'),
    toggleHighContrast: () => toggle('highContrast'),
    toggleReducedMotion: () => toggle('reducedMotion')
  };
}
