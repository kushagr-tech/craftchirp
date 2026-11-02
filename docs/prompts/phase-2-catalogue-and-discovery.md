# Phase 2 Scoped Sub-Prompt: Catalogue & Discovery

## Objective
Implement a server-rendered, URL-driven catalogue at `/gallery`, a museum-grade Artwork Detail Page at `/art/[slug]` with texture zoom and Karigari Ki Kahani storytelling, dedicated jewellery specifications, artist profile page at `/artists/[slug]`, and collection pages at `/collections/[slug]`.

## Starting State
- Phase 1 complete: Domain models (`src/types/models.ts`), Drizzle schema (`src/db/schema.ts`), atomic reservation manager (`src/lib/inventory/reservation-manager.ts`), brand layout (`Header.tsx`, `Footer.tsx`), and image primitives (`ArtImage.tsx`, `TextureZoom.tsx`).
- `/gallery` is currently a static placeholder page.
- `/art/[slug]`, `/artists/[slug]`, and `/collections/[slug]` do not yet exist.

## Target State
1. **Curated Catalogue Seed Data** (`src/data/catalogue.ts`):
   - Realistic seed artworks and jewellery representing Rachana Agarwal's 15+ years of Warli and Madhubani folk art on MDF with purified cow-dung base.
   - Complete metadata: dimensions (cm + in), weights, multi-currency prices, HS codes, 4+ view images, certificate details, and stories.
2. **Faceted Filter Catalogue** (`src/app/gallery/page.tsx`):
   - Server-rendered, URL-driven filter facets: `type`, `style`, `size`, `orientation`, `color`, `price_min`, `price_max`, `availability`, `sort`.
   - Clean canonical URLs and mobile filter drawer.
   - Museum-label artwork cards displaying 1-of-1 status, dimensions, materials, and currency price.
   - Elegant empty state with reset filters and commission inquiry CTA.
3. **Museum Artwork Detail Page (PDP)** (`src/app/art/[slug]/page.tsx`):
   - 4+ image views (front, 45° angle, macro texture, room scale, packaging).
   - High-resolution tactile zoom (`TextureZoom`).
   - Museum-label metadata block (title, artist, year, medium, materials, dimensions in cm/in, 1-of-1 edition).
   - Active inventory status display (`Available`, `Reserved in Checkout`, `Sold`).
   - "Reserve & Acquire" button (integrating reservation manager) + "Enquire About This Piece" modal.
   - *Karigari Ki Kahani* story & process narrative.
   - Certificate of Authenticity guarantee, shipping/duties summary, and 14-day return policy.
   - Related original works section.
4. **Jewellery Specifics**:
   - Material disclosures, dimensions, weight in grams, care guide.
5. **Artist Profile** (`src/app/artists/[slug]/page.tsx`):
   - Dedicated Rachana Agarwal profile with 15+ years background, heritage statement, studio process, and her portfolio of available and collected works.
6. **Collection Landing Page** (`src/app/collections/[slug]/page.tsx`):
   - Thematic curatorial presentation with hero statement and curated artwork grid.
7. **Search Component** (`src/components/ui/SearchModal.tsx`):
   - Instant search across folk style, medium, theme, and materials.

## File Scope
- `docs/prompts/phase-2-catalogue-and-discovery.md`
- `src/data/catalogue.ts`
- `src/app/gallery/page.tsx`
- `src/components/gallery/GalleryFilters.tsx`
- `src/components/gallery/ArtworkCard.tsx`
- `src/app/art/[slug]/page.tsx`
- `src/components/artwork/ArtworkGallery.tsx`
- `src/components/artwork/InquiryModal.tsx`
- `src/app/artists/[slug]/page.tsx`
- `src/app/collections/[slug]/page.tsx`
- `src/components/ui/SearchModal.tsx`
- `task.md`
- `implementation_plan.md`

## Do-Not-Touch List
- Do not touch files for Phase 3/4/5/6/7 (e.g. checkout payment gateways, live webhook handlers).
- Do not alter core brand tokens in `globals.css`.
- Do not create or touch real `.env` secrets.

## Stop Conditions
- Stop once `/gallery`, `/art/[slug]`, `/artists/[slug]`, `/collections/[slug]`, and search are implemented and typecheck cleanly with zero errors.
- Update `task.md` and report verification results.

