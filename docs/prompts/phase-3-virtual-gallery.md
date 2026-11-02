# Phase 3 Scoped Sub-Prompt: Virtual Gallery

## Objective
Build the virtual exhibition experience at `/exhibitions` and `/exhibitions/[slug]` with scroll-driven walls and wall labels, alongside a client-side "See It On Your Wall" true-scale room visualizer.

## Starting State
- Phase 2 complete: `/gallery`, `/art/[slug]`, `/artists/[slug]`, `/collections/[slug]`, and search modal are fully implemented and verified.
- `EXHIBITIONS_SEED` exists in `src/data/catalogue.ts`.
- `/exhibitions` route does not yet exist.
- "See It On Your Wall" tool is not yet implemented.

## Target State
1. **"See It On Your Wall" Room Visualizer** (`src/components/artwork/WallVisualizerModal.tsx`):
   - Curated sample rooms (Modern Living Room, Wabi-Sabi Study, Terracotta Dining Sanctuary).
   - Custom client-side wall photo upload via local `FileReader` (zero server upload / zero storage).
   - True 1:1 cm-to-pixel scaling based on artwork dimensions (`dimensions.widthCm`, `dimensions.heightCm`).
   - Integrated into Artwork PDP (`/art/[slug]`).
2. **Exhibitions Index Page** (`src/app/exhibitions/page.tsx`):
   - Showcase of curated virtual gallery exhibitions, curatorial themes, and dates.
3. **Virtual Exhibition Detail Page** (`src/app/exhibitions/[slug]/page.tsx`):
   - Server-rendered HTML baseline for search engines and assistive technology.
   - Curatorial entrance portal with audio commentary / artist voice player.
   - Scroll-driven thematic exhibition walls with authentic museum wall labels.
   - Direct link to inspect or acquire each featured original piece.
   - Full `prefers-reduced-motion` support.
4. **Phase Documentation**:
   - Update `task.md` and `implementation_plan.md`.

## File Scope
- `docs/prompts/phase-3-virtual-gallery.md`
- `src/components/artwork/WallVisualizerModal.tsx`
- `src/app/exhibitions/page.tsx`
- `src/app/exhibitions/[slug]/page.tsx`
- `src/components/exhibition/ExhibitionWall.tsx`
- `src/components/exhibition/AudioGuidePlayer.tsx`
- `src/app/art/[slug]/page.tsx` (integrate visualizer button)
- `task.md`
- `implementation_plan.md`

## Do-Not-Touch List
- Do not store user uploaded wall photos on any server.
- Do not touch Phase 4 checkout / payment files.
- Do not remove brand tokens in `globals.css`.

## Stop Conditions
- Stop once virtual exhibitions and the wall visualizer are built, verified with typecheck, and documented.

