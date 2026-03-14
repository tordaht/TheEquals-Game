import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildUnusedCandidateList, buildVisualManifest } from '../src/core/visual-audit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(projectRoot, '..');
const storyPath = path.join(projectRoot, 'assets', 'data', 'story-data.json');
const screenshotDir = path.join(projectRoot, 'docs', 'screenshots');
const story = JSON.parse(fs.readFileSync(storyPath, 'utf8'));
const capturedNodes = fs.existsSync(screenshotDir)
  ? fs.readdirSync(screenshotDir)
      .filter((fileName) => fileName.endsWith('.png'))
      .map((fileName) => fileName.replace(/\.png$/i, ''))
  : [];

const manifest = buildVisualManifest(story, {
  screenshotNodes: capturedNodes
});

const candidateDir = path.join(workspaceRoot, 'img', 'Unused_Images');
const candidateFiles = fs.existsSync(candidateDir)
  ? fs.readdirSync(candidateDir).filter((fileName) => fileName.endsWith('.png'))
  : [];
const unusedCandidates = buildUnusedCandidateList(candidateFiles, manifest);

fs.mkdirSync(path.join(projectRoot, 'docs'), { recursive: true });
fs.writeFileSync(path.join(projectRoot, 'docs', 'visual-manifest.json'), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(projectRoot, 'docs', 'unused-candidates.json'), JSON.stringify(unusedCandidates, null, 2));

console.log(`Visual manifest entries: ${manifest.length}`);
console.log(`Unused candidate count: ${unusedCandidates.length}`);
