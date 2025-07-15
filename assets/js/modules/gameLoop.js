import { gameState, updateStats } from './stats.js';
import { musicSystem } from './music.js';

let storyData = null;

export async function loadStoryData() {
  const res = await fetch('storyData.json');
  storyData = await res.json();
  return storyData;
}

export function startGame() {
  musicSystem.init();
  musicSystem.play();
  showNode('start');
}

export function showNode(id) {
  if(!storyData) return;
  const node = storyData.storyNodes[id];
  if(!node) return;
  const textEl = document.getElementById('story-text');
  textEl.textContent = node.text;
  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML='';
  (node.choices||[]).forEach(ch=>{
    const btn=document.createElement('button');
    btn.textContent=ch.text;
    btn.onclick=()=>selectChoice(ch);
    choicesEl.appendChild(btn);
  });
}

export function selectChoice(choice){
  if(choice.set){
    Object.entries(choice.set).forEach(([k,v])=>{
      gameState[k]+=parseInt(v.replace('it ',''));
    });
    updateStats();
  }
  if(choice.nextNode) showNode(choice.nextNode);
}
