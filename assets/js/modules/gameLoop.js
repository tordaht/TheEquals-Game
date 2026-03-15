let lastTime = 0;
let running = false;
let callbackFn;
const FRAME_DURATION = 1000 / 60; // 60fps

function loop(time) {
  if (!running) return;
  const delta = time - lastTime;
  if (delta >= FRAME_DURATION) {
    lastTime = time;
    callbackFn(delta);
  }
  requestAnimationFrame(loop);
}

export function startLoop(cb) {
  callbackFn = cb;
  running = true;
  lastTime = performance.now();
  requestAnimationFrame(loop);
}

export function stopLoop() {
  running = false;
}
