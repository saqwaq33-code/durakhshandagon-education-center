import { describe, expect, it } from 'vitest'
import { MAX_MEDIA_SIZE_BYTES } from '../domain/constants'
import { validateMediaFile } from '../utils/mediaValidation'

describe('media validation', () => {
  it('accepts supported image types under size limit', () => {
    const result = validateMediaFile({ name: 'frame.png', type: 'image/png', size: 1024 })
    expect(result.valid).toBe(true)
    if (result.valid) {
      expect(result.value.mediaType).toBe('image')
    }
  })

  it('rejects unsupported types and oversized files', () => {
    const badType = validateMediaFile({ name: 'archive.zip', type: 'application/zip', size: 100 })
    const badSize = validateMediaFile({
      name: 'big.mp4',
      type: 'video/mp4',
      size: MAX_MEDIA_SIZE_BYTES + 1,
    })

    expect(badType.valid).toBe(false)
    expect(badSize.valid).toBe(false)
  })
})
