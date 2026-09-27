import type { MediaAsset, PresentationCategory } from '../domain/models'

interface ScoringInput {
  media: MediaAsset
  sceneCategory: PresentationCategory
  topicTokens: string[]
  usedMediaIds: string[]
}

const categoryKeywords: Partial<Record<PresentationCategory, string[]>> = {
  HERO: ['hero', 'intro', 'cover'],
  TECHNICAL: ['technical', 'layer', 'component', 'specification'],
  ELECTRICAL: ['electrical', 'inverter', 'battery', 'voltage', 'current'],
  THERMAL: ['thermal', 'heat'],
  APPLICATION: ['home', 'farm', 'factory', 'application'],
  FINAL: ['final', 'result', 'closing'],
}

export const scoreMediaForScene = ({
  media,
  sceneCategory,
  topicTokens,
  usedMediaIds,
}: ScoringInput): number => {
  let score = 0

  if (media.category === sceneCategory) score += 45

  const lowerName = media.filename.toLowerCase()
  const matchedTopicCount = topicTokens.filter((token) => lowerName.includes(token)).length
  score += matchedTopicCount * 5

  for (const keyword of categoryKeywords[sceneCategory] ?? []) {
    if (lowerName.includes(keyword)) score += 6
  }

  if (media.type === 'video' && (sceneCategory === 'HERO' || sceneCategory === 'APPLICATION')) {
    score += 15
  }

  if (media.type === 'image' && sceneCategory === 'TECHNICAL') {
    score += 10
  }

  if (usedMediaIds.includes(media.id)) {
    score -= 25
  }

  if (media.aspectRatio !== null) {
    const landscapeDistance = Math.abs(media.aspectRatio - 16 / 9)
    score += Math.max(0, 12 - landscapeDistance * 10)
  }

  return Number(score.toFixed(4))
}

export const pickBestMedia = (
  medias: MediaAsset[],
  sceneCategory: PresentationCategory,
  topicText: string,
  usedMediaIds: string[],
): { media: MediaAsset | null; confidence: 'confirmed' | 'suggested' } => {
  const topicTokens = topicText
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length > 2)

  const scored = medias
    .map((media) => ({
      media,
      score: scoreMediaForScene({ media, sceneCategory, topicTokens, usedMediaIds }),
    }))
    .sort((a, b) => b.score - a.score || a.media.id.localeCompare(b.media.id))

  const best = scored.at(0)
  if (!best) return { media: null, confidence: 'suggested' }

  return {
    media: best.media,
    confidence: best.score >= 40 ? 'confirmed' : 'suggested',
  }
}
