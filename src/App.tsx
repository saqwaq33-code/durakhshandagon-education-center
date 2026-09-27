import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import {
  HYBRID_TECHNICAL_LAYERS,
  languageOptions,
} from './domain/constants'
import type { MediaAsset, PresentationProject, Scene } from './domain/models'
import { translate } from './i18n'
import { createAssetFromFile } from './services/mediaMetadata'
import { readProviderState } from './services/providers'
import { localStorageProvider } from './services/storage'
import { createProject, createSnapshot, deleteMedia, replaceScenes, upsertMedia } from './state/project'
import { autoArrangePresentation } from './utils/arrange'
import { confirmDestructiveAction } from './utils/confirm'
import { validateMediaFile } from './utils/mediaValidation'

const providers = readProviderState()

function App() {
  const [project, setProject] = useState<PresentationProject>(() => localStorageProvider.load() ?? createProject('tg'))
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'error'>('saved')
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const [fullscreenMode, setFullscreenMode] = useState(false)
  const [playbackIndex, setPlaybackIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [libraryFilter, setLibraryFilter] = useState<'ALL' | 'VIDEOS' | 'IMAGES' | 'USED' | 'UNUSED' | 'FAVORITES'>('ALL')
  const [librarySearch, setLibrarySearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const saveTimerRef = useRef<number | null>(null)
  const fullscreenDialogRef = useRef<HTMLDivElement | null>(null)
  const fullscreenCloseRef = useRef<HTMLButtonElement | null>(null)

  const t = (key: Parameters<typeof translate>[1]) => translate(project.language, key)
  const updateProject = (updater: (current: PresentationProject) => PresentationProject) => {
    setSaveState('saving')
    setProject(updater)
  }

  useEffect(() => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current)
    }

    saveTimerRef.current = window.setTimeout(() => {
      try {
        localStorageProvider.save(project)
        setSaveState('saved')
      } catch {
        setSaveState('error')
      }
    }, 350)

    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current)
    }
  }, [project])

  useEffect(() => {
    if (!fullscreenMode) return
    fullscreenCloseRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault()
        setPlaying((current) => !current)
      } else if (event.key === 'ArrowRight') {
        setPlaybackIndex((index) => Math.min(project.scenes.length - 1, index + 1))
      } else if (event.key === 'ArrowLeft') {
        setPlaybackIndex((index) => Math.max(0, index - 1))
      } else if (event.key === 'Escape') {
        setFullscreenMode(false)
      } else if (event.key.toLowerCase() === 'f') {
        setFullscreenMode((current) => !current)
      } else if (event.key === 'Tab') {
        const focusable = fullscreenDialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        } else if (event.shiftKey && active === first) {
          event.preventDefault()
          last.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [fullscreenMode, project.scenes.length])

  useEffect(() => {
    if (!playing || !fullscreenMode) return
    const scene = project.scenes[playbackIndex]
    if (!scene) return

    const timer = window.setTimeout(() => {
      setPlaybackIndex((index) => {
        if (index >= project.scenes.length - 1) {
          setPlaying(false)
          return index
        }
        return index + 1
      })
    }, scene.duration * 1000)

    return () => window.clearTimeout(timer)
  }, [playing, playbackIndex, project.scenes, fullscreenMode])

  const selectedScene = useMemo(
    () => project.scenes.find((scene) => scene.id === selectedSceneId) ?? project.scenes.at(0) ?? null,
    [project.scenes, selectedSceneId],
  )

  const filteredMedia = useMemo(() => {
    const normalizedSearch = librarySearch.trim().toLowerCase()
    return project.media.filter((media) => {
      const typeMatch =
        libraryFilter === 'ALL'
          ? true
          : libraryFilter === 'VIDEOS'
            ? media.type === 'video'
            : libraryFilter === 'IMAGES'
              ? media.type === 'image'
              : libraryFilter === 'USED'
                ? media.usageCount > 0
                : libraryFilter === 'UNUSED'
                  ? media.usageCount === 0
                  : media.favorite

      if (!typeMatch) return false

      if (!normalizedSearch) return true
      return media.filename.toLowerCase().includes(normalizedSearch)
    })
  }, [project.media, libraryFilter, librarySearch])

  const onUpload = async (inputFiles: FileList | null) => {
    setErrorMessage('')
    if (!inputFiles) return
    const files = Array.from(inputFiles)
    const nextAssets: MediaAsset[] = []

    for (const file of files) {
      const validated = validateMediaFile(file)
      if (!validated.valid) {
        setErrorMessage(validated.error)
        continue
      }
      const asset = await createAssetFromFile(file, validated.value.mediaType)
      nextAssets.push(asset)
    }

    if (nextAssets.length > 0) {
      updateProject((current) => upsertMedia(current, nextAssets))
    }
  }

  const runAutoArrange = () => {
    updateProject((current) => autoArrangePresentation(current, providers.aiConfigured))
    setSelectedSceneId(null)
  }

  const updateScene = (sceneId: string, updater: (scene: Scene) => Scene) => {
    updateProject((current) => {
      const scenes = current.scenes.map((scene) => (scene.id === sceneId ? updater(scene) : scene))
      return replaceScenes(current, scenes)
    })
  }

  const moveScene = (sceneId: string, direction: -1 | 1) => {
    const index = project.scenes.findIndex((scene) => scene.id === sceneId)
    const nextIndex = index + direction
    if (index < 0 || nextIndex < 0 || nextIndex >= project.scenes.length) return

    updateProject((current) => {
      const index = current.scenes.findIndex((scene) => scene.id === sceneId)
      if (index < 0) return current
      const nextIndex = index + direction
      if (nextIndex < 0 || nextIndex >= current.scenes.length) return current
      const scenes = [...current.scenes]
      const [moved] = scenes.splice(index, 1)
      scenes.splice(nextIndex, 0, moved)
      return replaceScenes(current, scenes)
    })
  }

  const deleteMediaById = (mediaId: string) => {
    if (!confirmDestructiveAction('Delete this media from library?')) return
    updateProject((current) => deleteMedia(current, mediaId))
  }

  const createSnapshotNow = () => {
    updateProject((current) => {
      const snapshot = createSnapshot(current)
      return {
        ...current,
        snapshots: [snapshot, ...current.snapshots].slice(0, 10),
        updatedAt: new Date().toISOString(),
      }
    })
  }

  const restoreSnapshot = (snapshotId: string) => {
    if (!confirmDestructiveAction('Restore this snapshot? Unsaved changes in current state will be replaced.')) return
    updateProject((current) => {
      const snapshot = current.snapshots.find((item) => item.id === snapshotId)
      if (!snapshot) return current
      return {
        ...snapshot.project,
        snapshots: current.snapshots,
        updatedAt: new Date().toISOString(),
      }
    })
  }

  const currentFullscreenScene = project.scenes[playbackIndex] ?? null

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">{t('appTitle')}</p>
          <h1>{t('headline')}</h1>
          <p>{t('subtitle')}</p>
          <p>{t('message')}</p>
        </div>
        <div className="toolbar" role="group" aria-label="Project controls">
          <label>
            Language
            <select
              value={project.language}
              onChange={(event) =>
                updateProject((current) => ({
                  ...current,
                  language: event.target.value as PresentationProject['language'],
                  updatedAt: new Date().toISOString(),
                }))
              }
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={createSnapshotNow}>{t('save')}</button>
          <button type="button" onClick={() => setFullscreenMode(true)} disabled={project.scenes.length === 0}>{t('present')}</button>
          <button type="button" onClick={runAutoArrange} disabled={project.media.length === 0}>{t('arrange')}</button>
          <span aria-live="polite">{saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Save failed'}</span>
        </div>
      </header>

      <section className="grid-layout">
        <aside className="panel">
          <h2>{t('uploadTitle')}</h2>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
            onChange={(event) => onUpload(event.target.files)}
            aria-label="Upload images and videos"
          />
          {!providers.aiConfigured && <p role="status">{t('aiUnavailable')}</p>}
          {errorMessage && <p role="alert">{errorMessage}</p>}

          <h2>{t('mediaLibrary')}</h2>
          <label>
            Filter
            <select value={libraryFilter} onChange={(event) => setLibraryFilter(event.target.value as typeof libraryFilter)}>
              <option value="ALL">ALL</option>
              <option value="VIDEOS">VIDEOS</option>
              <option value="IMAGES">IMAGES</option>
              <option value="USED">USED</option>
              <option value="UNUSED">UNUSED</option>
              <option value="FAVORITES">FAVORITES</option>
            </select>
          </label>
          <input
            type="search"
            placeholder="Search filename"
            value={librarySearch}
            onChange={(event) => setLibrarySearch(event.target.value)}
          />

          <div className="media-list" aria-live="polite">
            {filteredMedia.length === 0 && <p>{t('noMedia')}</p>}
            {filteredMedia.map((asset) => (
              <article key={asset.id} className="media-card">
                <header>
                  <strong>{asset.filename}</strong>
                  <span>{asset.type}</span>
                </header>
                {asset.type === 'image' ? (
                  <img src={asset.previewUrl} alt={asset.filename} loading="lazy" />
                ) : (
                  <video src={asset.previewUrl} controls preload="metadata" />
                )}
                <p>Size: {(asset.size / 1024 / 1024).toFixed(2)} MB</p>
                <p>Duration: {asset.duration ? asset.duration.toFixed(1) : 'N/A'}</p>
                <p>Usage: {asset.usageCount}</p>
                <div className="inline-actions">
                  <button
                    type="button"
                    onClick={() =>
                      updateProject((current) => ({
                        ...current,
                        media: current.media.map((item) =>
                          item.id === asset.id
                            ? { ...item, favorite: !item.favorite, updatedAt: new Date().toISOString() }
                            : item,
                        ),
                        updatedAt: new Date().toISOString(),
                      }))
                    }
                  >
                    {asset.favorite ? '★' : '☆'}
                  </button>
                  <button type="button" onClick={() => deleteMediaById(asset.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </aside>

        <section className="panel" aria-label="Scene editor">
          <h2>{t('scenes')}</h2>
          {project.scenes.length === 0 ? <p>Create scenes with AI AUTO-ARRANGE.</p> : (
            <ul className="scene-nav">
              {project.scenes.map((scene) => (
                <li key={scene.id}>
                  <button
                    type="button"
                    aria-pressed={(selectedScene?.id ?? project.scenes[0]?.id) === scene.id}
                    onClick={() => setSelectedSceneId(scene.id)}
                  >
                    {scene.title}
                  </button>
                  <button type="button" onClick={() => moveScene(scene.id, -1)} aria-label={`Move ${scene.title} up`}>↑</button>
                  <button type="button" onClick={() => moveScene(scene.id, 1)} aria-label={`Move ${scene.title} down`}>↓</button>
                </li>
              ))}
            </ul>
          )}

          {selectedScene && (
            <div className="scene-editor">
              <label>
                Scene title
                <input
                  value={selectedScene.title}
                  onChange={(event) => updateScene(selectedScene.id, (scene) => ({ ...scene, title: event.target.value }))}
                />
              </label>
              <label>
                Duration (seconds)
                <input
                  type="number"
                  min={1}
                  value={selectedScene.duration}
                  onChange={(event) => {
                    const parsed = Number(event.target.value)
                    const nextDuration = Number.isFinite(parsed) ? Math.max(1, parsed) : selectedScene.duration
                    updateScene(selectedScene.id, (scene) => ({ ...scene, duration: nextDuration }))
                  }}
                />
              </label>

              {selectedScene.elements.map((element) => (
                <div key={element.id} className="element-editor">
                  <label>
                    Text
                    <textarea
                      value={element.text.editedText}
                      onChange={(event) => updateScene(selectedScene.id, (scene) => ({
                        ...scene,
                        elements: scene.elements.map((item) => item.id === element.id
                          ? { ...item, text: { ...item.text, editedText: event.target.value } }
                          : item),
                      }))}
                    />
                  </label>
                  <label>
                    Media
                    <select
                      value={element.mediaId ?? ''}
                      onChange={(event) => {
                        const mediaId = event.target.value || null
                        const targetSceneId = selectedScene.id
                        updateProject((current) => {
                          const media = current.media.find((item) => item.id === mediaId) ?? null
                          const scenes = current.scenes.map((scene) => {
                            if (scene.id !== targetSceneId) return scene
                            return {
                              ...scene,
                              elements: scene.elements.map((item) => item.id === element.id
                                ? {
                                    ...item,
                                    mediaId,
                                    videoClip: media?.type === 'video'
                                      ? { sourceMediaId: media.id, startTime: 0, endTime: media.duration ?? scene.duration }
                                      : undefined,
                                    imagePosition: media?.type === 'image'
                                      ? { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, fit: 'cover' as const }
                                      : undefined,
                                  }
                                : item),
                            }
                          })
                          return replaceScenes(current, scenes)
                        })
                      }}
                    >
                      <option value="">No media</option>
                      {project.media.map((media) => (
                        <option key={media.id} value={media.id}>{media.filename}</option>
                      ))}
                    </select>
                  </label>
                  {element.videoClip && (
                    <div className="inline-clip">
                      <label>
                        Start
                        <input
                          type="number"
                          min={0}
                          step="0.1"
                          value={element.videoClip.startTime}
                          onChange={(event) => updateScene(selectedScene.id, (scene) => ({
                            ...scene,
                            elements: scene.elements.map((item) => item.id === element.id && item.videoClip
                              ? { ...item, videoClip: { ...item.videoClip, startTime: Number(event.target.value) || 0 } }
                              : item),
                          }))}
                        />
                      </label>
                      <label>
                        End
                        <input
                          type="number"
                          min={element.videoClip.startTime + 0.1}
                          step="0.1"
                          value={element.videoClip.endTime}
                          onChange={(event) => updateScene(selectedScene.id, (scene) => ({
                            ...scene,
                            elements: scene.elements.map((item) => item.id === element.id && item.videoClip
                              ? { ...item, videoClip: { ...item.videoClip, endTime: Number(event.target.value) || item.videoClip.endTime } }
                              : item),
                          }))}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <h2>{t('timeline')}</h2>
          <ol className="timeline">
            {project.timeline.items.map((item) => {
              const scene = project.scenes.find((value) => value.id === item.sceneId)
              return (
                <li key={item.sceneId}>
                  <strong>{scene?.title ?? item.sceneId}</strong>
                  <span>Start: {item.start.toFixed(1)}s</span>
                  <span>Duration: {item.duration.toFixed(1)}s</span>
                </li>
              )
            })}
          </ol>
        </section>

        <aside className="panel">
          <h2>Technical layers</h2>
          <ol>
            {HYBRID_TECHNICAL_LAYERS.map((layer) => <li key={layer}>{layer}</li>)}
          </ol>

          <h2>{t('exportCenter')}</h2>
          <ul>
            {(['PDF', 'PPTX', 'PNG', 'JPG', 'MP4'] as const).map((target) => {
              const available = providers.exportProviders[target] ?? false
              return <li key={target}>{target}: {available ? 'Ready' : 'Not configured'}</li>
            })}
          </ul>

          <h2>Snapshots</h2>
          <ul>
            {project.snapshots.map((snapshot) => (
              <li key={snapshot.id}>
                <button type="button" onClick={() => restoreSnapshot(snapshot.id)}>
                  Restore {new Date(snapshot.createdAt).toLocaleString()}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {fullscreenMode && currentFullscreenScene && (
        <div
          ref={fullscreenDialogRef}
          className="fullscreen-player"
          role="dialog"
          aria-modal="true"
          aria-label="Presentation playback"
        >
          <button ref={fullscreenCloseRef} type="button" onClick={() => setFullscreenMode(false)} className="close-btn">×</button>
          <h2>{currentFullscreenScene.title}</h2>
          <p>{currentFullscreenScene.elements[0]?.text.editedText}</p>
          {(() => {
            const mediaId = currentFullscreenScene.elements[0]?.mediaId
            const media = project.media.find((asset) => asset.id === mediaId)
            if (!media) return null
            if (media.type === 'image') {
              return <img src={media.previewUrl} alt={media.filename} />
            }
            return <video src={media.previewUrl} controls muted={!playing} autoPlay={playing} />
          })()}
          <div className="inline-actions">
            <button type="button" onClick={() => setPlaying((current) => !current)}>{playing ? 'Pause' : 'Play'}</button>
            <button type="button" onClick={() => setPlaybackIndex((index) => Math.max(0, index - 1))}>Previous</button>
            <button type="button" onClick={() => setPlaybackIndex((index) => Math.min(project.scenes.length - 1, index + 1))}>Next</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
