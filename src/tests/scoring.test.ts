import { describe, expect, it } from 'vitest'
import type { MediaAsset } from '../domain/models'
import { pickBestMedia, scoreMediaForScene } from '../utils/scoring'

const createMedia = (overrides: Partial<MediaAsset>): MediaAsset => ({
  id: 'm1',
  filename: 'hero-electrical.mp4',
  type: 'video',
  mimeType: 'video/mp4',
  size: 1024,
  width: 1920,
  height: 1080,
  duration: 12,
  aspectRatio: 16 / 9,
  previewUrl: 'blob://hero',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  usageCount: 0,
  category: 'HERO',
  aiAnalysisState: 'done',
  favorite: false,
  ...overrides,
})

describe('deterministic scoring', () => {
  it('produces stable score for same input', () => {
    const media = createMedia({})

    const score1 = scoreMediaForScene({
      media,
      sceneCategory: 'HERO',
      topicTokens: ['hero', 'electrical'],
      usedMediaIds: [],
    })

    const score2 = scoreMediaForScene({
      media,
      sceneCategory: 'HERO',
      topicTokens: ['hero', 'electrical'],
      usedMediaIds: [],
    })

    expect(score1).toBe(score2)
  })

  it('penalizes duplicates and keeps confidence truthful', () => {
    const first = createMedia({ id: 'a', filename: 'hero-intro.mp4', category: 'HERO' })
    const second = createMedia({ id: 'b', filename: 'thermal-detail.png', type: 'image', mimeType: 'image/png', category: 'THERMAL' })

    const baseScore = scoreMediaForScene({
      media: first,
      sceneCategory: 'HERO',
      topicTokens: ['hero', 'intro'],
      usedMediaIds: [],
    })
    const duplicateScore = scoreMediaForScene({
      media: first,
      sceneCategory: 'HERO',
      topicTokens: ['hero', 'intro'],
      usedMediaIds: ['a'],
    })

    const picked = pickBestMedia([first, second], 'HERO', 'hero intro', ['a'])

    expect(duplicateScore).toBeLessThan(baseScore)
    expect(picked.media).not.toBeNull()
    expect(['confirmed', 'suggested']).toContain(picked.confidence)
  })
})
