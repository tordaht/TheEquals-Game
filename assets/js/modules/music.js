export const musicSystem = {
  audio: null,
  isPlaying: false,
  volume: 0.15,
  init() {
    this.audio = new Audio('Music/adg3.com_shrivelledDissonance.mp3');
    this.audio.loop = true;
    this.audio.volume = this.volume;
  },
  play() { if(this.audio) { this.audio.play(); this.isPlaying = true; } },
  pause() { if(this.audio){ this.audio.pause(); this.isPlaying=false; } },
  toggle(){ this.isPlaying? this.pause() : this.play(); }
};
