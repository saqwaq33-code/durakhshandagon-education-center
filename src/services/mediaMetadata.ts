import type { MediaAsset, MediaType } from '../domain/models'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

interface MediaDims {
  width: number | null
  height: number | null
  duration: number | null
}

const readImageMeta = (url: string): Promise<MediaDims> =>
  new Promise((resolve) => {
    const image = new Image()

    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight, duration: null })
      image.src = ''
    }

    image.onerror = () => {
      resolve({ width: null, height: null, duration: null })
      image.src = ''
    }

    image.src = url
  })

const readVideoMeta = (_file: File): Promise<MediaDims> =>
  Promise.resolve({ width: null, height: null, duration: null })

export const createAssetFromFile = async (
  file: File,
  mediaType: MediaType,
): Promise<MediaAsset> => {
  const previewUrl = URL.createObjectURL(file)
  const now = new Date().toISOString()
  const dims = mediaType === 'image' ? await readImageMeta(previewUrl) : await readVideoMeta(file)
  const aspectRatio = dims.width && dims.height ? dims.width / dims.height : null

  return {
    id: createId(),
    filename: file.name,
    type: mediaType,
    mimeType: file.type,
    size: file.size,
    width: dims.width,
    height: dims.height,
    duration: dims.duration,
    aspectRatio,
    previewUrl,
    createdAt: now,
    updatedAt: now,
    usageCount: 0,
    category: null,
    aiAnalysisState: 'unavailable',
    favorite: false,
  }
}
