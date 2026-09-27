import { SCENE_CATEGORY_ORDER } from '../domain/constants'
import type {
  MediaAsset,
  NarrativeText,
  PresentationProject,
  Scene,
  SceneElement,
} from '../domain/models'
import { pickBestMedia } from './scoring'
import { buildTimelineFromScenes } from './timeline'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const chooseSceneType = (media: MediaAsset | null): Scene['type'] => {
  if (!media) return 'TEXT'
  if (media.type === 'video') return 'VIDEO_TEXT'
  return 'IMAGE_TEXT'
}

const createText = (source: string): NarrativeText => ({
  originalText: source,
  editedText: source,
  aiSuggestion: '',
})

export const autoArrangePresentation = (
  project: PresentationProject,
  aiConfigured: boolean,
): PresentationProject => {
  const narrative = `${project.text.editedText}\n${project.technicalInfo.editedText}`
  const usedMediaIds: string[] = []

  const scenes: Scene[] = SCENE_CATEGORY_ORDER.slice(0, 6).map((category, index) => {
    const picked = pickBestMedia(project.media, category, narrative, usedMediaIds)

    if (picked.media) {
      usedMediaIds.push(picked.media.id)
    }

    const sceneText =
      index === 0
        ? project.text.editedText || project.text.originalText
        : `Section: ${category}`

    const element: SceneElement = {
      id: createId(),
      mediaId: picked.media?.id ?? null,
      videoClip: picked.media?.type === 'video'
        ? { sourceMediaId: picked.media.id, startTime: 0, endTime: picked.media.duration ?? 8 }
        : undefined,
      imagePosition: picked.media?.type === 'image'
        ? { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, fit: 'cover' }
        : undefined,
      text: createText(sceneText),
      suggested: !aiConfigured || picked.confidence === 'suggested',
    }

    return {
      id: createId(),
      type: chooseSceneType(picked.media),
      title: category,
      duration: 7,
      category,
      elements: [element],
      transition: { type: 'fade', duration: 0.8 },
      visible: true,
    }
  })

  const mediaUsageCounts = new Map<string, number>()
  for (const scene of scenes) {
    for (const element of scene.elements) {
      if (!element.mediaId) continue
      mediaUsageCounts.set(element.mediaId, (mediaUsageCounts.get(element.mediaId) ?? 0) + 1)
    }
  }

  const media = project.media.map((asset) => ({
    ...asset,
    usageCount: mediaUsageCounts.get(asset.id) ?? 0,
    updatedAt: new Date().toISOString(),
  }))

  return {
    ...project,
    media,
    scenes,
    timeline: buildTimelineFromScenes(scenes),
    updatedAt: new Date().toISOString(),
  }
}
