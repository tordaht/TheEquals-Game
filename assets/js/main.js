import { gameState, updateStats, calculateChoiceEffects } from './modules/stats.js';
import { musicSystem } from './modules/music.js';
import { loadStoryData, startGame, showNode, selectChoice } from './modules/gameLoop.js';

export { gameState, updateStats, calculateChoiceEffects, musicSystem, loadStoryData, startGame, showNode, selectChoice };

document.addEventListener('DOMContentLoaded', async () => {
  await loadStoryData();
  updateStats();
  startGame();
});
