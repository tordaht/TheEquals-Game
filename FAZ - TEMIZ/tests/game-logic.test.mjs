import assert from 'node:assert/strict';
import test from 'node:test';
import {
  applyChoiceEffects,
  buildChoiceList,
  createInitialState,
  determineFinalResult
} from '../src/core/game-logic.js';

test('applyChoiceEffects clamps stats and stores string flags', () => {
  const state = createInitialState();
  const choice = {
    set: {
      adalet_puani: 'it +120',
      hazine: 'it -40',
      'müttefik': 'akademisyen'
    }
  };

  applyChoiceEffects(state, choice);

  assert.equal(state.adalet_puani, 100);
  assert.equal(state.hazine, 60);
  assert.equal(state['müttefik'], 'akademisyen');
});

test('buildChoiceList respects simple numeric conditions', () => {
  const state = createInitialState();
  state.halk_destegi = 45;

  const node = {
    choices: [
      { text: 'A', if: 'halk_destegi > 40' },
      { text: 'B', if: 'halk_destegi < 30' },
      { text: 'C' }
    ]
  };

  const choices = buildChoiceList(node, state);

  assert.deepEqual(choices.map((item) => item.text), ['A', 'C']);
});

test('determineFinalResult picks authoritarian ending for high power', () => {
  const state = createInitialState();
  state.guc_puani = 88;

  const result = determineFinalResult(state);

  assert.equal(result.title, 'Yeni Tiranlik');
  assert.match(result.body, /88/);
});
