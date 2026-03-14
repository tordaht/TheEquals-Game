import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { createGameApp } from '../src/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const story = JSON.parse(fs.readFileSync(path.join(projectRoot, 'assets', 'data', 'story-data.json'), 'utf8'));

function createFakeAudio() {
  return {
    playCallCount: 0,
    pauseCallCount: 0,
    loop: false,
    volume: 0,
    addEventListener() {},
    play() {
      this.playCallCount += 1;
      return Promise.resolve();
    },
    pause() {
      this.pauseCallCount += 1;
    }
  };
}

function createMemoryStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    }
  };
}

test('app boots, shows choices, and supports rules, audio, accessibility, news, and flashbacks', async () => {
  const dom = new JSDOM(html, {
    url: 'http://127.0.0.1:8111/index.html',
    pretendToBeVisual: true
  });

  const fakeAudio = createFakeAudio();

  const app = await createGameApp({
    document: dom.window.document,
    window: dom.window,
    fetchImpl: async () => ({
      ok: true,
      json: async () => story
    }),
    audioFactory: () => fakeAudio,
    storage: dom.window.localStorage,
    startScheduler: false
  });

  app.skipTyping();
  app.advanceTime(10);

  let snapshot = JSON.parse(app.renderGameToText());
  assert.equal(snapshot.nodeId, 'start');
  assert.equal(snapshot.typing, false);
  assert.equal(snapshot.choices.length, 2);

  dom.window.document.getElementById('rules-button').click();
  assert.equal(dom.window.document.getElementById('rules-modal').hidden, false);
  dom.window.document.getElementById('rules-close').click();
  assert.equal(dom.window.document.getElementById('rules-modal').hidden, true);

  dom.window.document.getElementById('music-toggle').click();
  assert.equal(fakeAudio.playCallCount > 0, true);

  dom.window.document.getElementById('accessibility-toggle').click();
  dom.window.document.getElementById('text-size-button').click();
  assert.equal(dom.window.document.body.dataset.textSize, 'large');

  app.advanceTime(1000);
  snapshot = JSON.parse(app.renderGameToText());
  assert.equal(snapshot.overlay, 'news');
  app.dismissOverlay();
  app.advanceTime(5500);
  snapshot = JSON.parse(app.renderGameToText());
  assert.equal(snapshot.overlay, 'flashback');
  app.dismissOverlay();

  app.selectChoice(1);
  app.skipTyping();
  app.advanceTime(10);
  snapshot = JSON.parse(app.renderGameToText());
  assert.equal(snapshot.nodeId, 'ilk_suphe');
  assert.equal(snapshot.choices.length >= 2, true);
});

test('app boots from a file URL when browser fetch blocks local JSON requests', async () => {
  const dom = new JSDOM(html, {
    url: 'file:///G:/OZAN/TheEquals_Game/FAZ%20-%20TEMIZ/index.html',
    pretendToBeVisual: true
  });
  let fetchCallCount = 0;

  const app = await createGameApp({
    document: dom.window.document,
    window: dom.window,
    fetchImpl: async () => {
      fetchCallCount += 1;
      throw new Error('Local JSON fetch is blocked.');
    },
    audioFactory: () => createFakeAudio(),
    storage: createMemoryStorage(),
    startScheduler: false
  });

  app.skipTyping();
  app.advanceTime(10);

  const snapshot = JSON.parse(app.renderGameToText());
  assert.equal(snapshot.nodeId, 'start');
  assert.equal(snapshot.typing, false);
  assert.equal(snapshot.choices.length, 2);
  assert.equal(fetchCallCount, 0);
});
