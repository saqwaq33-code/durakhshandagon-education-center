import { defaultTechnicalSpec } from '../domain/constants'
import type {
  LanguageCode,
  MediaAsset,
  NarrativeText,
  PresentationProject,
  Scene,
  Snapshot,
} from '../domain/models'
import { buildTimelineFromScenes } from '../utils/timeline'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const createNarrative = (text = ''): NarrativeText => ({
  originalText: text,
  editedText: text,
  aiSuggestion: '',
})

export const createProject = (language: LanguageCode = 'tg'): PresentationProject => ({
  id: createId(),
  name: 'HYBRID 3-IN-1 Project',
  language,
  text: createNarrative(''),
  technicalInfo: createNarrative(''),
  technicalSpecs: defaultTechnicalSpec(),
  media: [],
  scenes: [],
  timeline: { items: [], totalDuration: 0 },
  snapshots: [],
  updatedAt: new Date().toISOString(),
})

export const upsertMedia = (
  project: PresentationProject,
  incoming: MediaAsset[],
): PresentationProject => ({
  ...project,
  media: [...project.media, ...incoming],
  updatedAt: new Date().toISOString(),
})

export const replaceScenes = (
  project: PresentationProject,
  scenes: Scene[],
): PresentationProject => ({
  ...project,
  scenes,
  timeline: buildTimelineFromScenes(scenes),
  updatedAt: new Date().toISOString(),
})

export const createSnapshot = (project: PresentationProject): Snapshot => ({
  id: createId(),
  createdAt: new Date().toISOString(),
  project: JSON.parse(JSON.stringify(project)) as PresentationProject,
})

export const deleteMedia = (project: PresentationProject, mediaId: string): PresentationProject => {
  const scenes = project.scenes.map((scene) => ({
    ...scene,
    elements: scene.elements.map((element) =>
      element.mediaId === mediaId
        ? { ...element, mediaId: null, videoClip: undefined, imagePosition: undefined }
        : element,
    ),
  }))

  const usageByMediaId = new Map<string, number>()
  for (const scene of scenes) {
    for (const element of scene.elements) {
        if (!element.mediaId) continue
        usageByMediaId.set(element.mediaId, (usageByMediaId.get(element.mediaId) ?? 0) + 1)
    }
  }

  return {
    ...project,
    media: project.media
        .filter((asset) => asset.id !== mediaId)
        .map((asset) => ({
          ...asset,
          usageCount: usageByMediaId.get(asset.id) ?? 0,
          updatedAt: new Date().toISOString(),
        })),
    scenes,
    timeline: buildTimelineFromScenes(scenes),
    updatedAt: new Date().toISOString(),
  }
}
