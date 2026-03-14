import { RULES_SECTIONS } from '../core/constants.js';

export function createRenderer({
  document,
  onChoiceSelect,
  onSkip,
  onToggleRules,
  onToggleAccessibilityPanel,
  onAccessibilityAction,
  onAudioAction,
  onOverlayDismiss
}) {
  const dom = {
    phaseBadge: document.getElementById('phase-pill'),
    sceneSummary: document.getElementById('scene-summary'),
    storyText: document.getElementById('story-text'),
    choiceHint: document.getElementById('choice-hint'),
    choices: document.getElementById('choices'),
    skipButton: document.getElementById('skip-button'),
    rulesButton: document.getElementById('rules-button'),
    statsList: document.getElementById('stats-list'),
    relationshipsList: document.getElementById('relationships-list'),
    portraitPanel: document.getElementById('portrait-panel'),
    portraitImage: document.getElementById('portrait-image'),
    portraitName: document.getElementById('portrait-name'),
    accessibilityToggle: document.getElementById('accessibility-toggle'),
    accessibilityPanel: document.getElementById('accessibility-panel'),
    textSizeButton: document.getElementById('text-size-button'),
    colorblindButton: document.getElementById('colorblind-button'),
    contrastButton: document.getElementById('contrast-button'),
    motionButton: document.getElementById('motion-button'),
    musicToggle: document.getElementById('music-toggle'),
    volumeDown: document.getElementById('volume-down'),
    volumeUp: document.getElementById('volume-up'),
    volumeDisplay: document.getElementById('volume-display'),
    overlayPanel: document.getElementById('overlay-panel'),
    overlayTitle: document.getElementById('overlay-title'),
    overlayContent: document.getElementById('overlay-content'),
    overlayDismiss: document.getElementById('overlay-dismiss'),
    toastContainer: document.getElementById('toast-container'),
    rulesModal: document.getElementById('rules-modal'),
    rulesBody: document.getElementById('rules-body'),
    rulesClose: document.getElementById('rules-close')
  };

  bindStaticEvents(dom, {
    onSkip,
    onToggleRules,
    onToggleAccessibilityPanel,
    onAccessibilityAction,
    onAudioAction,
    onOverlayDismiss
  });
  renderRulesContent(dom.rulesBody);

  function render(viewModel) {
    const backgroundUrl = new URL(viewModel.backgroundPath, document.baseURI).href;
    document.body.style.setProperty('--scene-background', `url("${backgroundUrl}")`);
    document.body.dataset.phase = String(viewModel.phase ?? 1);
    dom.phaseBadge.textContent = `${viewModel.phaseLabel} / ${viewModel.nodeId}`;
    dom.sceneSummary.textContent = viewModel.sceneSummary;
    dom.storyText.textContent = viewModel.visibleText;
    dom.choiceHint.textContent = viewModel.isTyping
      ? 'Metin yaziliyor...'
      : 'Secim yaparak hikayeyi ilerlet.';

    renderChoices(dom.choices, viewModel.choices, viewModel.isTyping, onChoiceSelect);
    renderStats(dom.statsList, viewModel.stats);
    renderRelationships(dom.relationshipsList, viewModel.relationships);
    renderPortrait(dom, viewModel.portrait);
    renderAccessibility(dom, viewModel.accessibility, viewModel.a11yPanelOpen);
    renderAudio(dom, viewModel.audio);
    renderOverlay(dom, viewModel.overlay);
    renderToasts(dom.toastContainer, viewModel.toasts);
    renderRulesModal(dom.rulesModal, viewModel.rulesOpen);

    dom.skipButton.hidden = !viewModel.isTyping;
    dom.rulesButton.setAttribute('aria-expanded', String(viewModel.rulesOpen));

    if (!viewModel.isTyping && viewModel.choices.length > 0) {
      dom.choices.querySelector('button')?.focus();
    }
  }

  return {
    render,
    getDom: () => dom
  };
}

function bindStaticEvents(dom, actions) {
  dom.skipButton.addEventListener('click', actions.onSkip);
  dom.rulesButton.addEventListener('click', actions.onToggleRules);
  dom.rulesClose.addEventListener('click', actions.onToggleRules);
  dom.accessibilityToggle.addEventListener('click', actions.onToggleAccessibilityPanel);
  dom.textSizeButton.addEventListener('click', () => actions.onAccessibilityAction('textSize'));
  dom.colorblindButton.addEventListener('click', () => actions.onAccessibilityAction('colorblind'));
  dom.contrastButton.addEventListener('click', () => actions.onAccessibilityAction('highContrast'));
  dom.motionButton.addEventListener('click', () => actions.onAccessibilityAction('reducedMotion'));
  dom.musicToggle.addEventListener('click', () => actions.onAudioAction('toggle'));
  dom.volumeDown.addEventListener('click', () => actions.onAudioAction('down'));
  dom.volumeUp.addEventListener('click', () => actions.onAudioAction('up'));
  dom.overlayDismiss.addEventListener('click', actions.onOverlayDismiss);
}

function renderChoices(container, choices, isTyping, onChoiceSelect) {
  container.innerHTML = '';

  choices.forEach((choice, index) => {
    const button = container.ownerDocument.createElement('button');
    button.className = 'choice-button';
    button.type = 'button';
    button.disabled = isTyping;
    button.textContent = `${index + 1}. ${choice.text}`;
    button.addEventListener('click', () => onChoiceSelect(index));
    container.appendChild(button);
  });
}

function renderStats(container, stats) {
  container.innerHTML = '';

  stats.forEach((stat) => {
    const item = container.ownerDocument.createElement('div');
    item.className = 'stat-item';
    item.innerHTML = `
      <div class="stat-head">
        <span>${stat.label}</span>
        <span>${stat.value}</span>
      </div>
      <div class="stat-bar">
        <div class="stat-bar-fill" style="width:${(stat.value / stat.max) * 100}%"></div>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderRelationships(container, relationships) {
  container.innerHTML = '';

  relationships.forEach((entry) => {
    const item = container.ownerDocument.createElement('div');
    item.className = 'relationship-card';
    item.innerHTML = `
      <div class="relationship-name">${entry.label}</div>
      <div class="relationship-meta">${entry.status}</div>
      <div class="relationship-meta relationship-meta-secondary">${entry.relation}</div>
    `;
    container.appendChild(item);
  });
}

function renderPortrait(dom, portrait) {
  if (!portrait) {
    dom.portraitPanel.hidden = true;
    dom.portraitImage.removeAttribute('src');
    dom.portraitName.textContent = '';
    return;
  }

  dom.portraitPanel.hidden = false;
  dom.portraitImage.src = portrait.path;
  dom.portraitImage.alt = `${portrait.name} portresi`;
  dom.portraitName.textContent = portrait.name;
}

function renderAccessibility(dom, accessibility, isOpen) {
  dom.accessibilityPanel.hidden = !isOpen;
  dom.accessibilityToggle.setAttribute('aria-expanded', String(isOpen));
  dom.textSizeButton.textContent = `Yazi Boyutu: ${accessibility.textSize}`;
  dom.colorblindButton.textContent = accessibility.colorblind ? 'Renk Modu: Acik' : 'Renk Modu: Kapali';
  dom.contrastButton.textContent = accessibility.highContrast ? 'Kontrast: Yuksek' : 'Kontrast: Normal';
  dom.motionButton.textContent = accessibility.reducedMotion ? 'Hareket: Az' : 'Hareket: Tam';
}

function renderAudio(dom, audio) {
  dom.musicToggle.textContent = audio.isPlaying ? 'Muzik: Acik' : 'Muzik: Kapali';
  dom.volumeDisplay.textContent = `${Math.round(audio.volume * 100)}%`;
  dom.musicToggle.title = audio.error ?? 'Arka plan muzigi';
}

function renderOverlay(dom, overlay) {
  const hidden = !overlay;
  dom.overlayPanel.hidden = hidden;

  if (hidden) {
    dom.overlayTitle.textContent = '';
    dom.overlayContent.textContent = '';
    return;
  }

  dom.overlayTitle.textContent = overlay.title;
  dom.overlayContent.textContent = overlay.content;
}

function renderToasts(container, toasts) {
  container.innerHTML = '';

  toasts.forEach((toast) => {
    const item = container.ownerDocument.createElement('div');
    item.className = `toast toast-${toast.tone}`;
    item.textContent = toast.message;
    container.appendChild(item);
  });
}

function renderRulesModal(modal, isOpen) {
  modal.hidden = !isOpen;
}

function renderRulesContent(container) {
  container.innerHTML = RULES_SECTIONS.map((section) => `
    <section class="rules-section">
      <h3>${section.title}</h3>
      <ul>
        ${section.items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>
  `).join('');
}
