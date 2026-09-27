import { beforeEach, describe, expect, it } from 'vitest'
import { STORAGE_KEY } from '../domain/constants'
import { createLanguageSwitcher } from '../i18n'
import { localStorageProvider } from '../services/storage'
import { createProject } from '../state/project'
import { confirmDestructiveAction } from '../utils/confirm'

describe('persistence, language switching, and destructive confirmation', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves and loads a project', () => {
    const project = createProject('tg')
    project.name = 'Persisted project'

    localStorageProvider.save(project)
    const loaded = localStorageProvider.load()

    expect(loaded?.name).toBe('Persisted project')
    expect(localStorage.getItem(STORAGE_KEY)).toContain('Persisted project')
  })

  it('switches language deterministically', () => {
    expect(createLanguageSwitcher('tg', 'ru')).toBe('ru')
    expect(createLanguageSwitcher('en', 'en')).toBe('en')
  })

  it('requires explicit confirmation for destructive action', () => {
    const denied = confirmDestructiveAction('Delete?', () => false)
    const allowed = confirmDestructiveAction('Delete?', () => true)

    expect(denied).toBe(false)
    expect(allowed).toBe(true)
  })
})
