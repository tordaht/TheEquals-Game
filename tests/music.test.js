import { jest } from '@jest/globals';
import { musicSystem } from '../assets/js/app.js';

// Mock Audio API
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn().mockResolvedValue(),
  pause: jest.fn(),
  load: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  volume: 0.15,
  loop: false,
  currentTime: 0,
  duration: 0
}));

// Mock DOM
global.document = {
  getElementById: jest.fn(() => ({
    innerHTML: '',
    textContent: '',
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn()
    }
  })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  body: {
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

describe('Music System Tests', () => {
  beforeEach(() => {
    // Reset music system before each test
    if (musicSystem) {
      musicSystem.audio = null;
      musicSystem.isPlaying = false;
      musicSystem.volume = 0.15;
    }
  });

  test('Music system initialization', () => {
    expect(musicSystem).toBeDefined();
    expect(typeof musicSystem.init).toBe('function');
    expect(typeof musicSystem.play).toBe('function');
    expect(typeof musicSystem.pause).toBe('function');
    expect(typeof musicSystem.toggle).toBe('function');
  });

  test('Music system init creates audio object', () => {
    musicSystem.init();
    expect(musicSystem.audio).toBeDefined();
    expect(musicSystem.audio.loop).toBe(true);
    expect(musicSystem.audio.volume).toBe(0.15);
  });

  test('Music system volume controls', () => {
    musicSystem.init();
    
    // Test volume setting
    musicSystem.setVolume(0.5);
    expect(musicSystem.volume).toBe(0.5);
    expect(musicSystem.audio.volume).toBe(0.5);
    
    // Test volume boundaries
    musicSystem.setVolume(1.5); // Should be capped at 1
    expect(musicSystem.volume).toBe(1);
    
    musicSystem.setVolume(-0.5); // Should be floored at 0
    expect(musicSystem.volume).toBe(0);
  });

  test('Music system play/pause functionality', async () => {
    musicSystem.init();

    musicSystem.play();
    await Promise.resolve();
    expect(musicSystem.isPlaying).toBe(true);
    expect(musicSystem.audio.play).toHaveBeenCalled();

    musicSystem.pause();
    expect(musicSystem.isPlaying).toBe(false);
    expect(musicSystem.audio.pause).toHaveBeenCalled();
  });

  test('Music system toggle functionality', async () => {
    musicSystem.init();

    musicSystem.toggle();
    await Promise.resolve();
    expect(musicSystem.isPlaying).toBe(true);

    musicSystem.toggle();
    expect(musicSystem.isPlaying).toBe(false);
  });

  test('Music system volume increase/decrease', () => {
    musicSystem.init();
    musicSystem.setVolume(0.3);
    
    // Test volume increase
    musicSystem.increaseVolume();
    expect(musicSystem.volume).toBeCloseTo(0.4);
    
    // Test volume decrease
    musicSystem.decreaseVolume();
    expect(musicSystem.volume).toBeCloseTo(0.3);
  });

  test('Music system error handling', () => {
    // Mock audio error
    const mockAudio = {
      play: jest.fn().mockRejectedValue(new Error('Audio error')),
      pause: jest.fn(),
      addEventListener: jest.fn(),
      volume: 0.15,
      loop: false
    };
    
    musicSystem.audio = mockAudio;
    
    // Should not throw error when play fails
    expect(() => musicSystem.play()).not.toThrow();
  });
}); 