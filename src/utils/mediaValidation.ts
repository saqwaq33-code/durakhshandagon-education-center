import {
  MAX_MEDIA_SIZE_BYTES,
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_VIDEO_TYPES,
} from '../domain/constants'
import type { MediaType } from '../domain/models'

export interface ValidatedMediaInfo {
  mediaType: MediaType
}

export const validateMediaFile = (
  file: Pick<File, 'type' | 'size' | 'name'>,
): { valid: true; value: ValidatedMediaInfo } | { valid: false; error: string } => {
  const isImage = SUPPORTED_IMAGE_TYPES.includes(file.type)
  const isVideo = SUPPORTED_VIDEO_TYPES.includes(file.type)

  if (!isImage && !isVideo) {
    return {
      valid: false,
      error: `Unsupported file type for ${file.name}`,
    }
  }

  if (file.size > MAX_MEDIA_SIZE_BYTES) {
    return {
      valid: false,
      error: `File ${file.name} exceeds the 200MB limit`,
    }
  }

  return {
    valid: true,
    value: { mediaType: isImage ? 'image' : 'video' },
  }
}
