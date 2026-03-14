import { getPhaseLabel, summarizeScene } from './game-logic.js';
import { VISUAL_AUDIT_TARGETS } from './constants.js';

const MANUAL_NOTES = {
  start: {
    contentFit: 'strong',
    notes: 'Acilis karesindeki apartman ve soguk tonlar monoton kent rutini ile uyumlu.'
  },
  ilk_suphe: {
    contentFit: 'strong',
    notes: 'Koridor gorseli isyerindeki gerilimi ve kurumsal baskiyi iyi tasiyor.'
  },
  gizli_hiyerarsi: {
    contentFit: 'strong',
    notes: 'Direnis toplantisi icin yer alti meclisi hissi guclu. Portre daha cizgisel alternatifle eslenebilir.'
  },
  devrim_baslangici: {
    contentFit: 'strong',
    notes: 'Kalabalik protesto kompozisyonu devrim baslangici icin uygun.'
  },
  faz2_baslangic: {
    contentFit: 'strong',
    notes: 'Genis forum alanindaki topluluk sahnesi yeni duzenin acilisina uyuyor.'
  },
  gecis_donemi: {
    contentFit: 'strong',
    notes: 'Baris dolu gecis karesi, Faz 3 oncesi nefes aldiran ton kuruyor.'
  },
  final_karar: {
    contentFit: 'strong',
    notes: 'Toplumsal toplanma gorseli, final degerlendirmesi icin tarafsiz ve kapsayici bir alan sagliyor.'
  }
};

export function buildVisualManifest(storyData, options = {}) {
  const screenshotNodes = new Set(options.screenshotNodes ?? []);
  const nodes = Object.entries(storyData.storyNodes ?? {});
  const backgroundUsage = countUsage(nodes, (node) => node.background);
  const portraitUsage = countUsage(
    nodes,
    (node) => node.character?.portrait
  );

  return nodes.map(([nodeId, node]) => {
    const note = MANUAL_NOTES[nodeId] ?? {};
    const backgroundCount = node.background ? backgroundUsage[node.background] ?? 0 : 0;
    const portraitPath = node.character?.portrait ?? null;
    const portraitCount = portraitPath ? portraitUsage[portraitPath] ?? 0 : 0;

    return {
      nodeId,
      phase: node.phase,
      phaseLabel: getPhaseLabel(node.phase),
      sceneSummary: summarizeScene(node.text),
      background: node.background
        ? {
            path: node.background,
            fileName: extractFileName(node.background),
            usageCount: backgroundCount
          }
        : null,
      portrait: portraitPath
        ? {
            name: node.character.name,
            path: portraitPath,
            fileName: extractFileName(portraitPath),
            usageCount: portraitCount
          }
        : null,
      audit: {
        filenameMatch: 'source-preserved',
        contentFit: note.contentFit ?? 'queued',
        frameCheck: screenshotNodes.has(nodeId) ? 'captured' : (
          VISUAL_AUDIT_TARGETS.includes(nodeId) ? 'targeted' : 'queued'
        ),
        reuse: backgroundCount > 1 || portraitCount > 1 ? 'shared-asset' : 'unique',
        notes: note.notes ?? ''
      }
    };
  });
}

export function buildUnusedCandidateList(candidateFiles, manifest) {
  const usedFiles = new Set();

  manifest.forEach((entry) => {
    if (entry.background?.fileName) {
      usedFiles.add(entry.background.fileName);
    }

    if (entry.portrait?.fileName) {
      usedFiles.add(entry.portrait.fileName);
    }
  });

  return candidateFiles
    .filter((fileName) => !usedFiles.has(fileName))
    .sort((left, right) => left.localeCompare(right))
    .map((fileName) => ({ fileName }));
}

function countUsage(nodes, selector) {
  return nodes.reduce((usage, [, node]) => {
    const filePath = selector(node);

    if (filePath) {
      usage[filePath] = (usage[filePath] ?? 0) + 1;
    }

    return usage;
  }, {});
}

function extractFileName(filePath) {
  return filePath.split('/').pop() ?? filePath;
}
