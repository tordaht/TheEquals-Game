// The Equals Game - Ana Test Dosyas
// Bu dosya oyunun temel fonksiyonlarını test eder
import { jest } from '@jest/globals';

// Test dosyalarını yükle
import { calculateChoiceEffects, gameState, showNode, selectChoice, updateStats, startGame, loadStoryData } from '../assets/js/app.js';

// Mock DOM elements
global.document = {
  getElementById: jest.fn(() => ({
    innerHTML: '',
    innerText: '',
    textContent: '',
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn()
    }
  })),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(() => []),
  createElement: jest.fn(() => ({
    innerHTML: '',
    appendChild: jest.fn(),
    remove: jest.fn()
  })),
  body: {
    appendChild: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn()
    }
  }
};

global.window = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
};

describe('Game Logic Tests', () => {
  beforeEach(() => {
    // Reset game state before each test
    gameState._adalet_puani = 0;
    gameState._guc_puani = 0;
    gameState._halk_destegi = 0;
    gameState._halk_memnuniyeti = 0;
    gameState._isyan_riski = 0;
    gameState._hazine = 100;
    gameState._kisisel_vicdan = 0;
    gameState.faz = 1;
    gameState.bolum = 1;
  });

  test('Game state initialization', () => {
    expect(gameState.adalet_puani).toBe(0);
    expect(gameState.guc_puani).toBe(0);
    expect(gameState.halk_destegi).toBe(0);
    expect(gameState.halk_memnuniyeti).toBe(0);
    expect(gameState.isyan_riski).toBe(0);
    expect(gameState.hazine).toBe(100);
    expect(gameState.kisisel_vicdan).toBe(0);
  });

  test('Game state setters with boundaries', () => {
    gameState.adalet_puani = 150; // Should be capped at 100
    expect(gameState.adalet_puani).toBe(100);
    
    gameState.adalet_puani = -50; // Should be floored at 0
    expect(gameState.adalet_puani).toBe(0);
    
    gameState.hazine = 300; // Should be capped at 200
    expect(gameState.hazine).toBe(200);
  });

  test('calculateChoiceEffects with valid choice', () => {
    const choice = {
      set: {
        'adalet_puani': 'it +10',
        'guc_puani': 'it -5'
      }
    };
    
    const effects = calculateChoiceEffects(choice);
    expect(effects).toHaveLength(2);
    expect(effects[0].stat).toBe('Adalet');
    expect(effects[0].change).toBe(10);
    expect(effects[1].stat).toBe('Güç');
    expect(effects[1].change).toBe(-5);
  });

  test('calculateChoiceEffects with empty choice', () => {
    const choice = {};
    const effects = calculateChoiceEffects(choice);
    expect(effects).toHaveLength(0);
  });

  test('calculateChoiceEffects with invalid stat', () => {
    const choice = {
      set: {
        'invalid_stat': 'it +10'
      }
    };
    
    const effects = calculateChoiceEffects(choice);
    expect(effects).toHaveLength(1);
    expect(effects[0].stat).toBe('invalid_stat');
  });
});

describe('Game State Management', () => {
  test('Game state updates correctly', () => {
    const initialAdalet = gameState.adalet_puani;
    gameState.adalet_puani += 10;
    expect(gameState.adalet_puani).toBe(initialAdalet + 10);
  });

  test('Game state respects boundaries', () => {
    gameState.adalet_puani = 200;
    expect(gameState.adalet_puani).toBe(100); // Max boundary
    
    gameState.adalet_puani = -50;
    expect(gameState.adalet_puani).toBe(0); // Min boundary
  });
}); 