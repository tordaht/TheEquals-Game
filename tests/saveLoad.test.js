import { jest } from '@jest/globals';
import { saveGame, loadGame, clearSave } from '../assets/js/modules/saveLoad.js';

describe('Save/Load System', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saves and loads game state', () => {
    const state = { score: 5 };
    saveGame(state);
    const loaded = loadGame();
    expect(loaded).toEqual(state);
  });

  test('returns null when no save', () => {
    expect(loadGame()).toBeNull();
  });
});
