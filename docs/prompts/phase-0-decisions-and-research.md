# Phase 0 Scoped Sub-Prompt: Decisions & Research

## Objective
Execute foundational architecture research, competitor UX pattern analysis, and formal Architecture Decision Records (ADRs) to establish the e-commerce, payment, CMS, hosting, and design specifications for Craftchirp's global marketplace. Zero feature code.

## Starting State
- Existing static export Next.js repository on GitHub Pages (`basePath: "/craftchirp"`).
- Brand tokens established: clay `#8c5a45`, terracotta `#e07a5f`, sand `#d9c5b2`, off-white `#f4f1de`, sage `#818c78`, charcoal `#2d2a26`.
- Existing components: Hero, WhyThisArt, TheProcess, GalleryPreview, InstagramFeed, Header, Footer.
- AI placeholder imagery in `public/assets/`.

## Target State
1. Verified competitor & platform research documented in `docs/research/patterns.md` across 6 public platforms (Mojarto, Saatchi Art, Artfinder, Singulart, Jaypore, Etsy).
2. Architecture Decision Records in `docs/DECISIONS.md` covering:
   - Commerce backend (Custom-Lite Next.js + Postgres + Drizzle)
   - Cross-border payments & Indian exporter compliance (IEC, FIRC, RBI purpose codes, Stripe/Razorpay)
   - CMS for non-technical founder Rachana Agarwal
   - Hosting migration from GitHub Pages to custom domain on Vercel
   - Russia gated market policy (`RU_CHECKOUT=false`)
3. Curated UI component shortlist from 21st.dev in `docs/ui-shortlist.md`.
4. Up to 3 blocking clarifying questions for the founder.
5. Updated `task.md` and `implementation_plan.md`.

## File Scope
- `docs/research/patterns.md`
- `docs/DECISIONS.md`
- `docs/ui-shortlist.md`
- `docs/prompts/phase-0-decisions-and-research.md`
- `task.md`
- `implementation_plan.md`

## Do-Not-Touch List
- Do not write any feature code (`src/app/**`, `src/components/**`).
- Do not add npm dependencies before ADR approval.
- Do not create `.env` or touch secrets.
- Do not delete existing assets or components.

## Stop Conditions
- Stop when research, ADRs, and shortlisted components are documented.
- Stop at Phase 0 Gate: Wait for owner approval of `docs/DECISIONS.md`.

## Done When
- `docs/research/patterns.md` contains evidence-based patterns for IA, taxonomy, PDP, trust signals, checkout, and schema.
- `docs/DECISIONS.md` contains full ADRs with options, decisions, and rationale.
- `docs/ui-shortlist.md` contains evaluated accessible components matching the earthy luxury brief.
- Founder receives at most 3 clarifying questions.

