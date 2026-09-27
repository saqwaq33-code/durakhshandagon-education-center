import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createAssetFromFile } from '../services/mediaMetadata'

describe('media metadata extraction', () => {
  beforeEach(() => {
    if (!('createObjectURL' in URL)) {
      Object.defineProperty(URL, 'createObjectURL', {
        value: () => 'blob:test',
        writable: true,
      })
    }
    if (!('revokeObjectURL' in URL)) {
      Object.defineProperty(URL, 'revokeObjectURL', {
        value: () => undefined,
        writable: true,
      })
    }

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('uses safe fallback metadata for video files', async () => {
    const file = new File(['video-bytes'], 'clip.mp4', { type: 'video/mp4' })
    const asset = await createAssetFromFile(file, 'video')

    expect(asset.type).toBe('video')
    expect(asset.width).toBeNull()
    expect(asset.height).toBeNull()
    expect(asset.duration).toBeNull()
  })
})
