const STORAGE_KEY = 'the-equals-faz-temiz.audio';

export function createAudioController({
  audioFactory = (src) => new Audio(src),
  storage = globalThis.localStorage,
  onChange = () => {}
} = {}) {
  const state = {
    isPlaying: false,
    volume: 0.15,
    ready: false,
    error: null
  };

  let audio = null;

  function load() {
    try {
      const saved = storage?.getItem?.(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.volume === 'number') {
          state.volume = clamp(parsed.volume, 0, 1);
        }
      }
    } catch (error) {
      console.warn('Audio preferences could not be read.', error);
    }
  }

  function persist() {
    try {
      storage?.setItem?.(STORAGE_KEY, JSON.stringify({ volume: state.volume }));
    } catch (error) {
      console.warn('Audio preferences could not be saved.', error);
    }
  }

  function init(src) {
    if (audio) {
      return getState();
    }

    load();
    audio = audioFactory(src);
    audio.loop = true;
    audio.volume = state.volume;
    audio.addEventListener?.('error', () => {
      state.error = 'Ses dosyasi yuklenemedi.';
      state.ready = false;
      state.isPlaying = false;
      emit();
    });

    state.ready = true;
    emit();
    return getState();
  }

  function play() {
    if (!audio) {
      return getState();
    }

    const maybePromise = audio.play?.();

    if (maybePromise?.then) {
      maybePromise.then(() => {
        state.isPlaying = true;
        state.error = null;
        emit();
      }).catch(() => {
        state.error = 'Tarayici muzik oynatmaya izin vermedi.';
        state.isPlaying = false;
        emit();
      });
      return getState();
    }

    state.isPlaying = true;
    state.error = null;
    emit();
    return getState();
  }

  function pause() {
    audio?.pause?.();
    state.isPlaying = false;
    emit();
    return getState();
  }

  function toggle() {
    return state.isPlaying ? pause() : play();
  }

  function setVolume(volume) {
    state.volume = clamp(volume, 0, 1);
    if (audio) {
      audio.volume = state.volume;
    }

    persist();
    emit();
    return getState();
  }

  function increaseVolume() {
    return setVolume(state.volume + 0.1);
  }

  function decreaseVolume() {
    return setVolume(state.volume - 0.1);
  }

  function getState() {
    return {
      ...state
    };
  }

  function emit() {
    onChange(getState());
  }

  return {
    init,
    play,
    pause,
    toggle,
    setVolume,
    increaseVolume,
    decreaseVolume,
    getState
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
