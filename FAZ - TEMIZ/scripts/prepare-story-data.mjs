import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(projectRoot, '..');
const storyPath = path.join(projectRoot, 'assets', 'data', 'story-data.json');
const storyModulePath = path.join(projectRoot, 'assets', 'data', 'story-data.module.js');
const fallbackSourcePath = path.join(workspaceRoot, 'storyData.json');

const phaseMap = {
  1: [
    'start',
    'ilk_suphe',
    'gizli_hiyerarsi',
    'yanilsama_catlagi',
    'ilk_direnis',
    'yerel_orgutlenme',
    'devlet_tepkisi',
    'halk_uyanisi',
    'son_hazirlik',
    'devrim_baslangici'
  ],
  2: [
    'faz2_baslangic',
    'ilk_zafer',
    'guc_boslugu',
    'merkezi_toplama',
    'halk_ihaneti',
    'ikinci_direnis',
    'anarsist_alternatif',
    'halk_meclisi',
    'guc_savasi',
    'yeni_sistem_merkezi',
    'yeni_sistem_anarsi',
    'ilk_test'
  ],
  3: [
    'gecis_donemi',
    'yerel_yonetimler',
    'gonullu_birlikler',
    'ekonomik_ozgurluk',
    'ic_catismalar',
    'yeni_tehditler',
    'sistem_testi_merkezi',
    'sistem_testi_anarsi',
    'final_karar',
    'final_otomatik_sonuc',
    'final_yeni_tiranlik',
    'final_zorlu_ozgurluk',
    'final_karma_sistem'
  ]
};

const portraitOverrides = {
  gizli_hiyerarsi: {
    name: 'Direnis Lideri',
    source: path.join(
      workspaceRoot,
      'img',
      'Unused_Images',
      'tordah_A_graphic_novel-style_portrait_of_Arda_the_determined__4fa7596c-1692-4ce0-8c9e-98f8e154d713_3.png'
    )
  }
};

const storySourcePath = fs.existsSync(storyPath) ? storyPath : fallbackSourcePath;
const story = JSON.parse(fs.readFileSync(storySourcePath, 'utf8'));

for (const [nodeId, node] of Object.entries(story.storyNodes ?? {})) {
  node.phase = detectPhase(nodeId);

  if (node.background) {
    const backgroundName = path.basename(node.background);
    node.background = `assets/media/backgrounds/${backgroundName}`;
    copyIfExists(resolveSourceFile(backgroundName), path.join(projectRoot, node.background));
  }

  if (node.character?.portrait) {
    const override = portraitOverrides[nodeId];
    if (override) {
      const portraitName = path.basename(override.source);
      node.character.name = override.name;
      node.character.portrait = `assets/media/portraits/${portraitName}`;
      copyIfExists(override.source, path.join(projectRoot, node.character.portrait));
    } else {
      const portraitName = path.basename(node.character.portrait);
      node.character.portrait = `assets/media/portraits/${portraitName}`;
      copyIfExists(resolveSourceFile(portraitName), path.join(projectRoot, node.character.portrait));
    }
  }
}

fs.writeFileSync(storyPath, JSON.stringify(story, null, 2));
fs.writeFileSync(storyModulePath, buildStoryModule(story));
console.log(`Prepared story data at ${storyPath} and ${storyModulePath}`);

function detectPhase(nodeId) {
  for (const [phase, nodes] of Object.entries(phaseMap)) {
    if (nodes.includes(nodeId)) {
      return Number(phase);
    }
  }

  return 1;
}

function resolveSourceFile(fileName) {
  const candidates = [
    path.join(workspaceRoot, 'img', 'BGs', fileName),
    path.join(workspaceRoot, 'img', 'characters', fileName),
    path.join(workspaceRoot, 'img', 'Unused_Images', fileName),
    path.join(workspaceRoot, 'BGs', fileName)
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}

function copyIfExists(sourcePath, targetPath) {
  if (!sourcePath || !fs.existsSync(sourcePath)) {
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
}

function buildStoryModule(data) {
  return `const storyData = ${JSON.stringify(data, null, 2)};\n\nexport { storyData };\nexport default storyData;\n`;
}
