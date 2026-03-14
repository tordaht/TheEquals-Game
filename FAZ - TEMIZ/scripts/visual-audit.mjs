import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { VISUAL_AUDIT_TARGETS } from '../src/core/constants.js';
import { buildVisualManifest } from '../src/core/visual-audit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const storyPath = path.join(projectRoot, 'assets', 'data', 'story-data.json');
const screenshotDir = path.join(projectRoot, 'docs', 'screenshots');
const reportPath = path.join(projectRoot, 'docs', 'visual-audit-report.json');
const browserPath = resolveBrowserPath();

if (!browserPath) {
  throw new Error('No Edge/Chrome executable found for visual audit.');
}

fs.mkdirSync(screenshotDir, { recursive: true });
const server = createStaticServer(projectRoot);
await new Promise((resolve) => server.listen(0, resolve));
const { port } = server.address();
const browser = await chromium.launch({
  executablePath: browserPath,
  headless: true
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1400 }
});
const consoleErrors = [];

page.on('console', (message) => {
  if (message.type() === 'error') {
    consoleErrors.push(message.text());
  }
});

await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => Boolean(window.render_game_to_text && window.debugApi));

const captures = [];

for (const nodeId of VISUAL_AUDIT_TARGETS) {
  await page.evaluate((targetNode) => {
    window.debugApi.goToNode(targetNode);
  }, nodeId);
  await page.evaluate(() => {
    window.debugApi.skipTyping();
    window.debugApi.dismissOverlay();
  });
  await page.waitForTimeout(250);

  const screenshotPath = path.join(screenshotDir, `${nodeId}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  const snapshot = await page.evaluate(() => JSON.parse(window.render_game_to_text()));
  captures.push({
    nodeId,
    screenshot: path.relative(projectRoot, screenshotPath).replaceAll('\\', '/'),
    snapshot
  });
}

const story = JSON.parse(fs.readFileSync(storyPath, 'utf8'));
const manifest = buildVisualManifest(story, {
  screenshotNodes: captures.map((capture) => capture.nodeId)
});
const report = {
  browserPath,
  consoleErrors,
  captures,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(path.join(projectRoot, 'docs', 'visual-manifest.json'), JSON.stringify(manifest, null, 2));
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

await browser.close();
server.close();

if (consoleErrors.length > 0) {
  throw new Error(`Visual audit found console errors: ${consoleErrors.join(' | ')}`);
}

console.log(`Visual audit completed with ${captures.length} screenshots.`);

function resolveBrowserPath() {
  const candidates = [
    process.env.PLAYWRIGHT_BROWSER_PATH,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function createStaticServer(rootDir) {
  return http.createServer((request, response) => {
    const requestPath = request.url === '/' ? '/index.html' : request.url.split('?')[0];
    const normalizedPath = path.normalize(path.join(rootDir, requestPath));

    if (!normalizedPath.startsWith(rootDir)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    try {
      const data = fs.readFileSync(normalizedPath);
      response.writeHead(200, { 'Content-Type': contentType(normalizedPath) });
      response.end(data);
    } catch {
      console.warn(`404 ${requestPath}`);
      response.writeHead(404);
      response.end('Not found');
    }
  });
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8';
  if (filePath.endsWith('.png')) return 'image/png';
  if (filePath.endsWith('.ico')) return 'image/x-icon';
  if (filePath.endsWith('.mp3')) return 'audio/mpeg';
  return 'application/octet-stream';
}
