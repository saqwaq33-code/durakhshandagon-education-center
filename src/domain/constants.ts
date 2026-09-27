import type { LanguageCode, PresentationCategory, TechnicalSpec } from './models'

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']
export const MAX_MEDIA_SIZE_BYTES = 200 * 1024 * 1024

export const STORAGE_KEY = 'hybrid-3-in-1-project'

export const SCENE_CATEGORY_ORDER: PresentationCategory[] = [
  'HERO',
  'INTRO',
  'PRODUCT',
  'TECHNICAL',
  'ELECTRICAL',
  'THERMAL',
  'INSTALLATION',
  'APPLICATION',
  'DETAIL',
  'PROCESS',
  'RESULT',
  'FINAL',
]

export const EMPTY_SPEC_VALUE = 'NOT PROVIDED'

export const defaultTechnicalSpec = (): TechnicalSpec => ({
  dimensions: EMPTY_SPEC_VALUE,
  weight: EMPTY_SPEC_VALUE,
  pvTechnology: EMPTY_SPEC_VALUE,
  thermalSystem: EMPTY_SPEC_VALUE,
  electricalOutput: EMPTY_SPEC_VALUE,
  thermalOutput: EMPTY_SPEC_VALUE,
  voltage: EMPTY_SPEC_VALUE,
  current: EMPTY_SPEC_VALUE,
  inverter: EMPTY_SPEC_VALUE,
  battery: EMPTY_SPEC_VALUE,
  materials: EMPTY_SPEC_VALUE,
  mounting: EMPTY_SPEC_VALUE,
  warranty: EMPTY_SPEC_VALUE,
  certification: EMPTY_SPEC_VALUE,
})

export const languageOptions: { code: LanguageCode; label: string }[] = [
  { code: 'tg', label: 'Тоҷикӣ' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
]

export const HYBRID_TECHNICAL_LAYERS = [
  '1. Front protective photovoltaic glass',
  '2. Photovoltaic solar-cell layer',
  '3. Electrical conducting / connection layer',
  '4. Thermal heat-collection layer directly behind PV cells',
  '5. Heat-transfer channels / thermal fluid circulation layer',
  '6. Thermal insulation layer',
  '7. Rear protective backing',
  '8. Aluminum structural frame and mounting structure',
  '9. External electrical connections leading to inverter',
  '10. Smart inverter and energy-management unit',
  '11. Battery energy-storage module',
]
