export function createScheduler() {
  let now = 0;
  let nextId = 1;
  let timerId = null;
  const tasks = [];

  function schedule(delayMs, callback, options = {}) {
    const task = {
      id: nextId += 1,
      callback,
      tag: options.tag ?? null,
      interval: options.interval ?? null,
      runAt: now + delayMs
    };

    tasks.push(task);
    tasks.sort((left, right) => left.runAt - right.runAt);

    return task.id;
  }

  function cancel(taskId) {
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index >= 0) {
      tasks.splice(index, 1);
    }
  }

  function cancelByTag(tag) {
    for (let index = tasks.length - 1; index >= 0; index -= 1) {
      if (tasks[index].tag === tag) {
        tasks.splice(index, 1);
      }
    }
  }

  function advanceBy(deltaMs) {
    const targetTime = now + deltaMs;
    let nextTask = tasks[0];

    while (nextTask && nextTask.runAt <= targetTime) {
      tasks.shift();
      now = nextTask.runAt;
      nextTask.callback();

      if (nextTask.interval !== null) {
        nextTask.runAt += nextTask.interval;
        tasks.push(nextTask);
        tasks.sort((left, right) => left.runAt - right.runAt);
      }

      nextTask = tasks[0];
    }

    now = targetTime;
  }

  function start(tickMs = 50) {
    stop();
    timerId = setInterval(() => {
      advanceBy(tickMs);
    }, tickMs);
  }

  function stop() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  return {
    schedule,
    cancel,
    cancelByTag,
    advanceBy,
    start,
    stop,
    getNow: () => now
  };
}
