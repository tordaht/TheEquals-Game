// Simple object pool for DOM elements
export class ElementPool {
  constructor(tag, size = 5) {
    this.tag = tag;
    this.pool = [];
    for (let i = 0; i < size; i++) {
      this.pool.push(document.createElement(tag));
    }
  }

  acquire() {
    return this.pool.pop() || document.createElement(this.tag);
  }

  release(el) {
    el.innerHTML = '';
    this.pool.push(el);
  }
}
