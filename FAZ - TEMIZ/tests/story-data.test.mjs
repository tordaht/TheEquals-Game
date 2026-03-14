import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildVisualManifest } from '../src/core/visual-audit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const storyPath = path.join(projectRoot, 'assets', 'data', 'story-data.json');
const story = JSON.parse(fs.readFileSync(storyPath, 'utf8'));

test('all nextNode references resolve to existing nodes', () => {
  const storyNodes = story.storyNodes ?? {};

  for (const [nodeId, node] of Object.entries(storyNodes)) {
    for (const choice of node.choices ?? []) {
      if (choice.nextNode) {
        assert.ok(
          storyNodes[choice.nextNode],
          `Missing nextNode "${choice.nextNode}" referenced by "${nodeId}"`
        );
      }
    }
  }
});

test('all nodes carry phase metadata and local asset paths exist', () => {
  for (const [nodeId, node] of Object.entries(story.storyNodes ?? {})) {
    assert.ok([1, 2, 3].includes(node.phase), `Node ${nodeId} is missing valid phase`);

    if (node.background) {
      assert.ok(node.background.startsWith('assets/media/backgrounds/'));
      assert.ok(fs.existsSync(path.join(projectRoot, node.background)));
    }

    if (node.character?.portrait) {
      assert.ok(node.character.portrait.startsWith('assets/media/portraits/'));
      assert.ok(fs.existsSync(path.join(projectRoot, node.character.portrait)));
    }
  }
});

test('visual manifest matches story node count and includes audit metadata', () => {
  const manifest = buildVisualManifest(story, {});
  const nodeCount = Object.keys(story.storyNodes ?? {}).length;

  assert.equal(manifest.length, nodeCount);
  assert.equal(manifest[0].nodeId, 'start');
  assert.ok(manifest.every((entry) => entry.audit?.filenameMatch));
});
