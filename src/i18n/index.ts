import type { LanguageCode } from '../domain/models'

const dictionary = {
  tg: {
    appTitle: 'HYBRID 3-IN-1 AI Cinematic Presentation Studio',
    headline: 'Панели гибриди 3 дар 1',
    subtitle: 'Барои хонаҳо, фермаҳо ва корхонаҳо',
    message: 'Барои сарфачӯӣ кардани энергия ва барқ — барои мардум дастрас',
    createPresentation: 'Создать презентацию',
    uploadTitle: 'Боркунии медиа',
    mediaLibrary: 'Китобхонаи медиа',
    arrange: 'AI AUTO-ARRANGE',
    scenes: 'Саҳнаҳо',
    timeline: 'Timeline',
    present: 'Fullscreen',
    save: 'Save',
    aiUnavailable: 'AI analysis is not configured.',
    noMedia: 'Ҳанӯз медиа нест. Аввалин видео ё тасвири худро бор кунед.',
    exportCenter: 'Маркази содирот',
  },
  ru: {
    appTitle: 'HYBRID 3-IN-1 AI Cinematic Presentation Studio',
    headline: 'Панели гибриди 3 дар 1',
    subtitle: 'Для домов, ферм и заводов',
    message: 'Для экономии энергии и электричества — доступно людям',
    createPresentation: 'Создать презентацию',
    uploadTitle: 'Загрузка медиа',
    mediaLibrary: 'Медиатека',
    arrange: 'AI AUTO-ARRANGE',
    scenes: 'Сцены',
    timeline: 'Таймлайн',
    present: 'Полный экран',
    save: 'Сохранить',
    aiUnavailable: 'AI analysis is not configured.',
    noMedia: 'Медиа пока нет. Загрузите первое видео или изображение.',
    exportCenter: 'Центр экспорта',
  },
  en: {
    appTitle: 'HYBRID 3-IN-1 AI Cinematic Presentation Studio',
    headline: 'Панели гибриди 3 дар 1',
    subtitle: 'For homes, farms, and factories',
    message: 'Energy and electricity savings — accessible for people',
    createPresentation: 'Create presentation',
    uploadTitle: 'Media upload',
    mediaLibrary: 'Media library',
    arrange: 'AI AUTO-ARRANGE',
    scenes: 'Scenes',
    timeline: 'Timeline',
    present: 'Fullscreen',
    save: 'Save',
    aiUnavailable: 'AI analysis is not configured.',
    noMedia: 'No media yet. Upload your first video or image.',
    exportCenter: 'Export center',
  },
} as const

export type TranslationKey = keyof (typeof dictionary)['en']

export const translate = (lang: LanguageCode, key: TranslationKey): string => dictionary[lang][key]

export const createLanguageSwitcher = (
  current: LanguageCode,
  next: LanguageCode,
): LanguageCode => (current === next ? current : next)
