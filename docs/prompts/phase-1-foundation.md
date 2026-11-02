# Phase 1 Scoped Sub-Prompt: Foundation

## Objective
Establish the technical data architecture, one-of-a-kind inventory reservation engine, refined navigation/footer system conforming to brand tokens, and responsive image pipeline with strict aspect-ratio containers and zoom capability.

## Starting State
- Phase 0 complete and ADR-001 through ADR-006 approved.
- Existing Next.js repository with basic pages (`/gallery`, `/about`, `/contact`) and AI placeholders.
- Header and Footer have basic pre-commercial navigation.

## Target State
1. **Data Model & Schemas** (`src/types/models.ts` & `src/db/schema.ts`):
   - `Artist` schema (Rachana Agarwal primary, multi-artist ready).
   - `Artwork/Product` schema (painting, jewellery, home-decor; dimensions, materials, styles: Warli/Madhubani, per-currency pricing in USD, EUR, GBP, INR; status: available, reserved, sold; HS codes; certificates).
   - `Collection` & `Exhibition` schemas.
   - `Order`, `Reservation`, `Inquiry`, and `JournalPost` schemas.
2. **One-of-a-Kind Inventory Engine** (`src/lib/inventory/reservation-manager.ts`):
   - Timed hold mechanism (15 minutes default) during checkout.
   - Atomic lock preventing race conditions / overselling of the same 1/1 original under concurrency.
   - Auto-expiry release worker/function.
   - Mark as sold on payment confirmation.
   - Concurrency unit verification script demonstrating zero overselling.
3. **Design System & Shared Layout** via taste-skill:
   - Shared layout preserving all 6 brand tokens: clay `#8c5a45`, terracotta `#e07a5f`, sand `#d9c5b2`, off-white `#f4f1de`, sage `#818c78`, charcoal `#2d2a26`.
   - Updated Navigation Header: *Gallery*, *Collections*, *Exhibitions*, *Jewellery*, *Journal*, *About*, *Contact*.
   - Updated Footer with compliance policy anchors, currency indicator, and authenticity badge.
4. **Image Pipeline Primitives** (`src/components/ui/ArtImage.tsx`):
   - Strict aspect-ratio containers (`aspect-[4/5]`, `aspect-square`) preventing layout shift (CLS = 0).
   - Clearly labeled dev placeholder badges (*"Placeholder Asset - Pending Studio Photography"*).
   - High-resolution tactile zoom primitive for mud and texture inspection.
5. **Phase Documentation**:
   - Update `task.md` and `implementation_plan.md`.

## File Scope
- `docs/prompts/phase-1-foundation.md`
- `src/types/models.ts`
- `src/db/schema.ts`
- `src/lib/inventory/reservation-manager.ts`
- `src/lib/inventory/__tests__/reservation.test.ts` (or standalone runner script)
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ui/ArtImage.tsx`
- `src/components/ui/TextureZoom.tsx`
- `task.md`
- `implementation_plan.md`

## Do-Not-Touch List
- Do not touch files outside Phase 1 scope (`src/app/gallery/**`, `src/app/checkout/**` are Phase 2 and 4).
- Do not create or touch real `.env` secrets.
- Do not enable live payments.
- Do not remove or alter the 6 brand tokens in `globals.css`.

## Stop Conditions
- Stop once all foundation schemas, reservation engine, layout updates, and image pipeline components are built and verified.
- Report milestone evidence and update task tracking.

