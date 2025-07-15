export default class ObjectPool {
  constructor(createFn) {
    this.createFn = createFn;
    this.pool = [];
  }

  acquire() {
    return this.pool.pop() || this.createFn();
  }

  release(obj) {
    if (obj) {
      this.pool.push(obj);
    }
  }
}
