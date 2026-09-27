# HYBRID 3-IN-1 AI Cinematic Presentation Studio

A working vertical slice for creating editable cinematic presentations from user-uploaded videos, images, text, and technical data.

## What is implemented

- Real local media upload (images/videos) with format + size validation
- Metadata extraction (image dimensions; video metadata currently unavailable in this secure client-only slice)
- Media library with preview, search, filters (all/videos/images/used/unused/favorites), favorite toggle, delete confirmation
- Serializable project model (project/media/scenes/timeline/technical specs/snapshots)
- Deterministic auto-arrangement engine (`AUTO-ARRANGE`) with duplicate penalty and low-confidence suggestions
- Editable scene list and timeline synchronization
- Non-destructive video clipping config (`startTime`, `endTime`)
- Editable text preserving `originalText`, `editedText`, `aiSuggestion`
- Local autosave persistence and snapshot/restore with confirmation
- Fullscreen player with keyboard controls: `Space`, `ArrowLeft`, `ArrowRight`, `Esc`, `F`
- Localization architecture for Tajik (`tg`), Russian (`ru`), English (`en`)
- Truthful provider status for AI/export (no fake success when unconfigured)
- Responsive dark visual system and reduced-motion support

## Architecture

- **UI**: `src/App.tsx`, `src/App.css`
- **Domain models**: `src/domain/models.ts`
- **Validation/logic**:
  - `src/utils/mediaValidation.ts`
  - `src/utils/scoring.ts`
  - `src/utils/arrange.ts`
  - `src/utils/timeline.ts`
  - `src/utils/confirm.ts`
- **Services**:
  - `src/services/mediaMetadata.ts`
  - `src/services/storage.ts`
  - `src/services/providers.ts`
- **State helpers**: `src/state/project.ts`
- **Localization**: `src/i18n/index.ts`

## Setup

```bash
npm install
npm run dev
```

## Validation commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Environment variables

Copy `.env.example` to `.env` and set values.

- `VITE_AI_PROVIDER_ENABLED` controls whether AI is reported as configured
- `VITE_EXPORT_*_ENABLED` controls truthful export target availability display

## Limitations (truthful)

- AI provider integration is an abstraction/status layer; no external AI calls are faked.
- Export providers are status-driven; non-configured targets are reported as unavailable.
- Persistence is browser `localStorage` in this slice (no server storage in this repo yet).
