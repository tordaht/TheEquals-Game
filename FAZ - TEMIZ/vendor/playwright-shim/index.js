import fs from 'node:fs';
import { chromium as coreChromium } from 'playwright-core';

const executablePath = [
  process.env.PLAYWRIGHT_BROWSER_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].find((candidate) => candidate && fs.existsSync(candidate));

export const chromium = new Proxy(coreChromium, {
  get(target, prop, receiver) {
    if (prop === 'launch') {
      return (options = {}) => target.launch({
        executablePath: options.executablePath ?? executablePath,
        ...options
      });
    }

    const value = Reflect.get(target, prop, receiver);
    return typeof value === 'function' ? value.bind(target) : value;
  }
});

export default { chromium };
