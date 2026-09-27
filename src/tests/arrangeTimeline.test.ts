import { describe, expect, it } from 'vitest'
import { createProject } from '../state/project'
import { autoArrangePresentation } from '../utils/arrange'
import { buildTimelineFromScenes } from '../utils/timeline'

describe('scene creation and timeline synchronization', () => {
  it('creates ordered scenes and synchronized timeline via auto-arrange', () => {
    const project = createProject('en')
    project.media = [
      {
        id: '1',
        filename: 'hero.mp4',
        type: 'video',
        mimeType: 'video/mp4',
        size: 1024,
        width: 1920,
        height: 1080,
        duration: null,
        aspectRatio: 16 / 9,
        previewUrl: 'blob://hero',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        usageCount: 0,
        category: 'HERO',
        aiAnalysisState: 'done',
        favorite: false,
      },
    ]
    project.text.editedText = 'Hero section intro'

    const arranged = autoArrangePresentation(project, false)

    expect(arranged.scenes.length).toBe(6)
    expect(arranged.timeline.items.length).toBe(arranged.scenes.length)
    expect(arranged.media[0]?.usageCount).toBeGreaterThan(0)
    expect(arranged.scenes[0]?.elements[0]?.videoClip?.endTime).toBe(8)
    expect(arranged.media[0]?.updatedAt).not.toBe('2025-01-01T00:00:00.000Z')

    const rebuilt = buildTimelineFromScenes(arranged.scenes)
    expect(arranged.timeline.totalDuration).toBe(rebuilt.totalDuration)
  })
})
