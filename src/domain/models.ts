export type LanguageCode = 'tg' | 'ru' | 'en'

export type MediaType = 'image' | 'video'

export type SceneType =
  | 'HERO'
  | 'VIDEO_HERO'
  | 'IMAGE_HERO'
  | 'TEXT'
  | 'IMAGE_TEXT'
  | 'VIDEO_TEXT'
  | 'SPLIT'
  | 'GALLERY'
  | 'TECHNICAL'
  | 'ENERGY_FLOW'
  | 'APPLICATION'
  | 'BENEFITS'
  | 'SPECIFICATIONS'
  | 'FINAL'

export type PresentationCategory =
  | 'HERO'
  | 'INTRO'
  | 'PRODUCT'
  | 'TECHNICAL'
  | 'ELECTRICAL'
  | 'THERMAL'
  | 'INSTALLATION'
  | 'APPLICATION'
  | 'HOME'
  | 'FARM'
  | 'FACTORY'
  | 'DETAIL'
  | 'PROCESS'
  | 'RESULT'
  | 'FINAL'

export interface NarrativeText {
  originalText: string
  editedText: string
  aiSuggestion: string
}

export interface MediaAsset {
  id: string
  filename: string
  type: MediaType
  mimeType: string
  size: number
  width: number | null
  height: number | null
  duration: number | null
  aspectRatio: number | null
  previewUrl: string
  createdAt: string
  updatedAt: string
  usageCount: number
  category: PresentationCategory | null
  aiAnalysisState: 'not_started' | 'pending' | 'done' | 'unavailable'
  favorite: boolean
}

export interface VideoClip {
  sourceMediaId: string
  startTime: number
  endTime: number
}

export interface ImagePosition {
  x: number
  y: number
  scale: number
  rotation: number
  opacity: number
  fit: 'cover' | 'contain' | 'fill'
}

export interface SceneElement {
  id: string
  mediaId: string | null
  videoClip?: VideoClip
  imagePosition?: ImagePosition
  text: NarrativeText
  suggested: boolean
}

export interface Transition {
  type: 'fade' | 'crossfade' | 'reveal'
  duration: number
}

export interface Scene {
  id: string
  type: SceneType
  title: string
  duration: number
  category: PresentationCategory
  elements: SceneElement[]
  transition: Transition
  visible: boolean
}

export interface TimelineItem {
  sceneId: string
  start: number
  duration: number
}

export interface Timeline {
  items: TimelineItem[]
  totalDuration: number
}

export interface TechnicalSpec {
  dimensions: string
  weight: string
  pvTechnology: string
  thermalSystem: string
  electricalOutput: string
  thermalOutput: string
  voltage: string
  current: string
  inverter: string
  battery: string
  materials: string
  mounting: string
  warranty: string
  certification: string
}

export interface Snapshot {
  id: string
  createdAt: string
  project: PresentationProject
}

export interface ProviderState {
  aiConfigured: boolean
  exportProviders: Partial<Record<'PDF' | 'PPTX' | 'PNG' | 'JPG' | 'MP4', boolean>>
}

export interface PresentationProject {
  id: string
  name: string
  language: LanguageCode
  text: NarrativeText
  technicalInfo: NarrativeText
  technicalSpecs: TechnicalSpec
  media: MediaAsset[]
  scenes: Scene[]
  timeline: Timeline
  snapshots: Snapshot[]
  updatedAt: string
}

export interface SaveState {
  status: 'idle' | 'saving' | 'saved' | 'error'
  message?: string
}
