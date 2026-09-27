import type { ProviderState } from '../domain/models'

const enabled = (value: string | undefined) => value === '1' || value === 'true'

export const readProviderState = (): ProviderState => ({
  aiConfigured: enabled(import.meta.env.VITE_AI_PROVIDER_ENABLED),
  exportProviders: {
    PDF: enabled(import.meta.env.VITE_EXPORT_PDF_ENABLED),
    PPTX: enabled(import.meta.env.VITE_EXPORT_PPTX_ENABLED),
    PNG: enabled(import.meta.env.VITE_EXPORT_PNG_ENABLED),
    JPG: enabled(import.meta.env.VITE_EXPORT_JPG_ENABLED),
    MP4: enabled(import.meta.env.VITE_EXPORT_MP4_ENABLED),
  },
})
