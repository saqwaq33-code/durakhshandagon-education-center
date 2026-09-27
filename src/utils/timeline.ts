import type { Scene, Timeline } from '../domain/models'

export const buildTimelineFromScenes = (scenes: Scene[]): Timeline => {
  let cursor = 0
  const items = scenes.map((scene) => {
    const item = {
      sceneId: scene.id,
      start: cursor,
      duration: scene.duration,
    }
    cursor += scene.duration
    return item
  })

  return {
    items,
    totalDuration: cursor,
  }
}
