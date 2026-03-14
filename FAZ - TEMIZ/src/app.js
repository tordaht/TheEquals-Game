import { flashbacksByNode, newsByPhase } from './content/ambient-content.js';
import embeddedStoryData from '../assets/data/story-data.module.js';
import { STAT_DEFS } from './core/constants.js';
import {
  applyChoiceEffects,
  buildChoiceList,
  buildRelationshipEntries,
  buildStatsSnapshot,
  createInitialState,
  formatStoryText,
  getPhaseLabel,
  injectFinalText,
  summarizeScene
} from './core/game-logic.js';
import { createScheduler } from './core/scheduler.js';
import { createAccessibilityManager } from './systems/accessibility.js';
import { createAudioController } from './systems/audio-controller.js';
import { createRenderer } from './ui/render.js';

const AUDIO_PATH = 'assets/media/music/main-theme.mp3';
const STORY_DATA_PATH = 'assets/data/story-data.json';
const TYPING_TAG = 'typing';
const OVERLAY_TAG = 'overlay';
const TOAST_TAG = 'toast';

export async function createGameApp(options = {}) {
  const doc = options.document ?? document;
  const win = options.window ?? window;
  const fetchImpl = options.fetchImpl ?? fetch.bind(globalThis);
  const scheduler = options.scheduler ?? createScheduler();
  const audioController = createAudioController({
    audioFactory: options.audioFactory,
    storage: options.storage,
    onChange: () => render()
  });
  const accessibility = createAccessibilityManager(doc, options.storage);
  const state = {
    game: createInitialState(),
    storyData: null,
    currentNodeId: 'start',
    currentNode: null,
    fullText: '',
    visibleText: '',
    choices: [],
    overlay: null,
    toasts: [],
    rulesOpen: false,
    a11yPanelOpen: false,
    isTyping: false,
    phaseNewsShown: new Set(),
    consoleErrors: []
  };

  const renderer = createRenderer({
    document: doc,
    onChoiceSelect: (index) => selectChoice(index),
    onSkip: () => skipTyping(),
    onToggleRules: () => toggleRules(),
    onToggleAccessibilityPanel: () => toggleAccessibilityPanel(),
    onAccessibilityAction: (action) => handleAccessibilityAction(action),
    onAudioAction: (action) => handleAudioAction(action),
    onOverlayDismiss: () => dismissOverlay()
  });

  installGlobalHooks();
  bindWindowEvents();
  accessibility.load();
  audioController.init(AUDIO_PATH);

  if (options.startScheduler !== false) {
    scheduler.start(50);
  }

  if (options.autoStart !== false) {
    await start();
  }

  return {
    start,
    goToNode,
    selectChoice,
    skipTyping,
    toggleRules,
    advanceTime,
    dismissOverlay,
    getState: () => ({
      ...state,
      phaseNewsShown: [...state.phaseNewsShown]
    }),
    renderGameToText
  };

  async function start() {
    await loadStoryData();
    goToNode('start');
    armAutoplay();
    return true;
  }

  async function loadStoryData() {
    if (win.location?.protocol === 'file:') {
      state.storyData = cloneStoryData(options.storyData ?? embeddedStoryData);
      return;
    }

    try {
      const response = await fetchImpl(STORY_DATA_PATH);
      if (!response.ok) {
        throw new Error(`Story data could not be loaded: ${response.status}`);
      }

      state.storyData = response.json ? await response.json() : JSON.parse(await response.text());
    } catch (error) {
      console.warn('Story data fetch failed. Falling back to embedded story data.', error);
      state.storyData = cloneStoryData(options.storyData ?? embeddedStoryData);
    }
  }

  function goToNode(nodeId) {
    const node = state.storyData?.storyNodes?.[nodeId];

    if (!node) {
      queueToast('Secilen hikaye dugumu bulunamadi.', 'danger');
      return;
    }

    scheduler.cancelByTag(TYPING_TAG);
    scheduler.cancelByTag(OVERLAY_TAG);
    state.currentNodeId = nodeId;
    state.currentNode = { ...node, id: nodeId };
    state.game.faz = node.phase ?? state.game.faz;
    state.fullText = formatStoryText(injectFinalText({ ...node, id: nodeId }, state.game), state.game);
    state.visibleText = '';
    state.choices = [];
    state.overlay = null;
    state.isTyping = true;
    render();
    beginTyping();
  }

  function beginTyping() {
    const text = state.fullText;
    let index = 0;

    const typeNext = () => {
      if (index >= text.length) {
        finishTyping();
        return;
      }

      state.visibleText += text[index];
      index += 1;
      render();
      scheduler.schedule(getTypingDelay(text[index - 1]), typeNext, { tag: TYPING_TAG });
    };

    scheduler.schedule(0, typeNext, { tag: TYPING_TAG });
  }

  function getTypingDelay(character) {
    if (doc.body.classList.contains('a11y-reduced-motion')) {
      return 0;
    }

    if (character === '\n') {
      return 10;
    }

    return 22;
  }

  function finishTyping() {
    scheduler.cancelByTag(TYPING_TAG);
    state.visibleText = state.fullText;
    state.isTyping = false;
    state.choices = buildChoiceList(state.currentNode, state.game);
    queueAmbientEvents();
    render();
  }

  function skipTyping() {
    if (!state.isTyping) {
      return;
    }

    finishTyping();
  }

  function selectChoice(index) {
    if (state.isTyping) {
      return;
    }

    const choice = state.choices[index];
    if (!choice) {
      return;
    }

    const beforeState = structuredClone(state.game);
    applyChoiceEffects(state.game, choice);
    emitWarnings(beforeState, state.game);

    if (choice.nextNode) {
      goToNode(choice.nextNode);
    } else {
      render();
    }
  }

  function emitWarnings(previousState, nextState) {
    if (previousState.hazine > 30 && nextState.hazine <= 30) {
      queueToast('Hazine kritik seviyeye dustu.', 'warning');
    }

    if (previousState.halk_memnuniyeti > 20 && nextState.halk_memnuniyeti <= 20) {
      queueToast('Halk memnuniyeti ciddi sekilde dustu.', 'warning');
    }

    if (previousState.isyan_riski < 70 && nextState.isyan_riski >= 70) {
      queueToast('Isyan riski tehlikeli seviyeye ulasti.', 'danger');
    }
  }

  function queueAmbientEvents() {
    const phase = state.currentNode.phase ?? state.game.faz;
    const newsPool = newsByPhase[phase] ?? [];
    const flashbackPool = flashbacksByNode[state.currentNodeId] ?? [];
    let nextDelay = 900;

    if (newsPool.length > 0 && !state.phaseNewsShown.has(phase)) {
      const newsItem = newsPool[(phase - 1) % newsPool.length];
      state.phaseNewsShown.add(phase);
      scheduler.schedule(nextDelay, () => {
        showOverlay({
          type: 'news',
          title: newsItem.title,
          content: newsItem.content
        });
        applyAmbientImpact(newsItem.impact);
      }, { tag: OVERLAY_TAG });
      nextDelay += 5200;
    }

    if (flashbackPool.length > 0) {
      const flashback = flashbackPool[0];
      scheduler.schedule(nextDelay, () => {
        showOverlay({
          type: 'flashback',
          title: flashback.title,
          content: flashback.content
        });
        applyAmbientImpact(flashback.impact);
      }, { tag: OVERLAY_TAG });
    }
  }

  function applyAmbientImpact(impact = {}) {
    Object.entries(impact).forEach(([key, delta]) => {
      const currentValue = state.game[key];
      if (typeof currentValue === 'number') {
        const stat = STAT_DEFS.find((item) => item.key === key);
        if (stat) {
          state.game[key] = Math.min(stat.max, Math.max(stat.min, currentValue + delta));
        } else {
          state.game[key] = currentValue + delta;
        }
      }
    });

    render();
  }

  function showOverlay(overlay) {
    state.overlay = overlay;
    render();
    scheduler.schedule(4200, () => {
      if (state.overlay?.type === overlay.type) {
        dismissOverlay();
      }
    }, { tag: OVERLAY_TAG });
  }

  function dismissOverlay() {
    state.overlay = null;
    render();
  }

  function queueToast(message, tone = 'info') {
    const toast = {
      id: `${Date.now()}-${Math.random()}`,
      message,
      tone
    };

    state.toasts = [...state.toasts, toast];
    render();
    scheduler.schedule(2800, () => {
      state.toasts = state.toasts.filter((item) => item.id !== toast.id);
      render();
    }, { tag: TOAST_TAG });
  }

  function toggleRules() {
    state.rulesOpen = !state.rulesOpen;
    render();
  }

  function toggleAccessibilityPanel() {
    state.a11yPanelOpen = !state.a11yPanelOpen;
    render();
  }

  function handleAccessibilityAction(action) {
    switch (action) {
      case 'textSize':
        accessibility.cycleTextSize();
        break;
      case 'colorblind':
        accessibility.toggleColorblind();
        break;
      case 'highContrast':
        accessibility.toggleHighContrast();
        break;
      case 'reducedMotion':
        accessibility.toggleReducedMotion();
        break;
      default:
        break;
    }

    render();
  }

  function handleAudioAction(action) {
    switch (action) {
      case 'toggle':
        audioController.toggle();
        break;
      case 'down':
        audioController.decreaseVolume();
        break;
      case 'up':
        audioController.increaseVolume();
        break;
      default:
        break;
    }

    render();
  }

  function armAutoplay() {
    const tryPlay = () => {
      audioController.play();
      doc.removeEventListener('pointerdown', tryPlay);
      doc.removeEventListener('keydown', tryPlay);
    };

    doc.addEventListener('pointerdown', tryPlay, { once: true });
    doc.addEventListener('keydown', tryPlay, { once: true });
  }

  function bindWindowEvents() {
    doc.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (state.overlay) {
          dismissOverlay();
          return;
        }

        if (state.rulesOpen) {
          toggleRules();
        }
      }

      if (event.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }

      const numericChoice = Number.parseInt(event.key, 10);
      if (!Number.isNaN(numericChoice) && numericChoice >= 1) {
        selectChoice(numericChoice - 1);
      }
    });

    win.addEventListener('error', (event) => {
      state.consoleErrors.push(event.message);
    });

    win.addEventListener('unhandledrejection', (event) => {
      state.consoleErrors.push(String(event.reason));
    });
  }

  function toggleFullscreen() {
    if (!doc.fullscreenElement) {
      doc.documentElement.requestFullscreen?.();
      return;
    }

    doc.exitFullscreen?.();
  }

  function render() {
    const portrait = state.currentNode?.character?.portrait
      ? {
          name: state.currentNode.character.name,
          path: state.currentNode.character.portrait
        }
      : null;

    renderer.render({
      nodeId: state.currentNodeId,
      phase: state.currentNode?.phase ?? state.game.faz,
      phaseLabel: getPhaseLabel(state.currentNode?.phase ?? state.game.faz),
      sceneSummary: summarizeScene(state.currentNode?.text ?? 'Sahne yukleniyor.'),
      backgroundPath: state.currentNode?.background ?? 'assets/media/backgrounds/tordah_Urban_outskirts_gray_concrete_apartment_blocks_working_9beac87a-9211-4f41-abe8-aa8b13b93e36_1.png',
      visibleText: state.visibleText,
      isTyping: state.isTyping,
      choices: state.choices,
      portrait,
      stats: buildStatsSnapshot(state.game),
      relationships: buildRelationshipEntries(state.game),
      accessibility: accessibility.getSettings(),
      a11yPanelOpen: state.a11yPanelOpen,
      audio: audioController.getState(),
      overlay: state.overlay,
      toasts: state.toasts,
      rulesOpen: state.rulesOpen
    });
  }

  function renderGameToText() {
    return JSON.stringify({
      mode: 'story',
      nodeId: state.currentNodeId,
      phase: state.currentNode?.phase ?? state.game.faz,
      phaseLabel: getPhaseLabel(state.currentNode?.phase ?? state.game.faz),
      visibleText: state.visibleText,
      fullText: state.fullText,
      typing: state.isTyping,
      choices: state.choices.map((choice) => choice.text),
      stats: Object.fromEntries(STAT_DEFS.map((item) => [item.key, state.game[item.key]])),
      ally: state.game['müttefik'],
      overlay: state.overlay?.type ?? null,
      portrait: state.currentNode?.character?.name ?? null,
      background: state.currentNode?.background ?? null,
      consoleErrors: state.consoleErrors
    });
  }

  function advanceTime(ms) {
    scheduler.advanceBy(ms);
    render();
  }

  function installGlobalHooks() {
    win.render_game_to_text = renderGameToText;
    win.advanceTime = advanceTime;
    win.debugApi = {
      goToNode,
      skipTyping,
      selectChoice,
      dismissOverlay,
      getSnapshot: () => JSON.parse(renderGameToText()),
      toggleRules
    };
  }
}

function cloneStoryData(storyData) {
  return structuredClone(storyData);
}

function showBootError(error) {
  console.error(error);
  const phasePill = document.getElementById('phase-pill');
  const sceneSummary = document.getElementById('scene-summary');
  const storyText = document.getElementById('story-text');
  const choiceHint = document.getElementById('choice-hint');

  if (phasePill) {
    phasePill.textContent = 'Yukleme Hatasi';
  }

  if (sceneSummary) {
    sceneSummary.textContent = 'Sahne baslatilirken bir sorun olustu.';
  }

  if (storyText) {
    storyText.textContent = 'Oyun acilirken bir hata olustu. Sayfayi yenileyip tekrar deneyin.';
  }

  if (choiceHint) {
    choiceHint.textContent = error instanceof Error ? error.message : String(error);
  }
}

if (
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  !window.__THE_EQUALS_DISABLE_AUTO_BOOT__
) {
  window.addEventListener('DOMContentLoaded', async () => {
    if (!window.__theEqualsCleanBooted) {
      window.__theEqualsCleanBooted = true;
      try {
        await createGameApp();
      } catch (error) {
        showBootError(error);
      }
    }
  });
}
