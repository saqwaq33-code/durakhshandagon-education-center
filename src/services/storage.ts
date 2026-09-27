import { STORAGE_KEY } from '../domain/constants'
import type { PresentationProject } from '../domain/models'

export interface StorageProvider {
  load: () => PresentationProject | null
  save: (project: PresentationProject) => void
}

export const localStorageProvider: StorageProvider = {
  load: () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    try {
      return JSON.parse(raw) as PresentationProject
    } catch {
      return null
    }
  },
  save: (project) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project))
  },
}
