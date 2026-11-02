# Craftchirp Virtual Gallery + Global Marketplace Implementation Plan

This master plan governs the evolution of Craftchirp into a high-performance virtual art gallery and global e-commerce marketplace for solo Indian folk artist Rachana Agarwal.

---

## 1. Executive Summary & Architecture Strategy

- **Core Founder**: Rachana Agarwal (Craftchirp) — 15+ years creating Warli and Madhubani-inspired folk art on MDF boards with natural cow-dung bases and earth pigments. Non-technical founder who must manage artworks, photography, pricing, and orders independently.
- **Tech Stack**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, React Lenis, TypeScript, Postgres (Neon/Supabase) with Drizzle ORM.
- **Brand Tokens**: Clay `#8c5a45`, Terracotta `#e07a5f`, Sand `#d9c5b2`, Off-white `#f4f1de`, Sage `#818c78`, Charcoal `#2d2a26`.
- **Target Markets**: United States and European Union as primary checkout markets; Russia as a gated, inquiry-only market (`RU_CHECKOUT=false`).
- **Core Principles**:
  - One-of-a-kind inventory protection via atomic reservation holds.
  - Transparent landed-cost engine respecting EU 2026 customs reforms and US entry rules.
  - Zero fake/AI imagery on production product pages; dev placeholders clearly flagged.
  - Dual Schema.org emission (`VisualArtwork` + `Product`) for rich search and LLM discovery.

---

## 2. Phase Breakdown & Execution Sequence

```
Phase 0: Decisions & Research (ADRs, REA competitor patterns, UI shortlist)  <-- [COMPLETED - AT GATE]
    │
    ▼ [GATE: Owner approves DECISIONS.md]
Phase 1: Foundation (Data schemas, atomic reservation engine, layout, image pipeline)
    │
    ▼
Phase 2: Catalogue & Discovery (/gallery faceted filters, /art/[slug] museum PDP, collections)
    │
    ▼
Phase 3: Virtual Gallery (/exhibitions/[slug], "See it on your wall" scale tool)
    │
    ▼
Phase 4: Commerce & Checkout (Cart, landed-cost engine, multi-currency, PDF CoA, admin)
    │
    ▼ [GATE: Test-mode payments verified; owner approves before live keys]
Phase 5: Organic Discovery (Metadata API, JSON-LD, sitemap, hreflang, /journal, LLM layers)
    │
    ▼
Phase 6: Trust & Compliance (Policy pages, claims audit, docs/OWNER-CHECKLIST.md)
    │
    ▼
Phase 7: QA, E2E Testing & Launch (Playwright, accessibility, runbook, walkthrough)
```

---

## 3. Phase 0 Deliverables Summary

1. **Competitor & Market Research** (`docs/research/patterns.md`):
   - In-depth pattern analysis across Mojarto, Saatchi Art, Artfinder, Singulart, Jaypore, and Etsy.
   - Evidence-based guidelines for IA, multi-faceted filtering, museum-label blocks, and trust markers.
2. **Architecture Decision Records** (`docs/DECISIONS.md`):
   - **ADR-001**: Custom-Lite e-commerce engine using Next.js App Router + Postgres + Drizzle ORM for atomic 1/1 inventory holds and full control over landed costs.
   - **ADR-002**: Cross-border payments strategy using a typed `PaymentProvider` interface; verified Indian export requirements (IEC, RBI purpose codes, FIRC/e-FIRA, customer address capture).
   - **ADR-003**: Headless CMS / protected `/admin` tailored for Rachana Agarwal.
   - **ADR-004**: Staged hosting transition from GitHub Pages export to Vercel with custom domain.
   - **ADR-005**: Gated Russian market compliance (`RU_CHECKOUT=false`).
   - **ADR-006**: Strict adherence to the 6 brand color tokens and "museum-label restraint" design philosophy.
3. **UI Component Shortlist** (`docs/ui-shortlist.md`):
   - 12 accessible, Tailwind v4-ready building blocks from 21st.dev.
4. **Scoped Sub-Prompt** (`docs/prompts/phase-0-decisions-and-research.md`):
   - Strict boundaries, do-not-touch lists, and completion criteria.

---

## 4. Gate Verification & Clarifying Questions for the Owner

To proceed through the Phase 0 Gate into **Phase 1: Foundation**, the owner must review and approve `docs/DECISIONS.md`. 

The following 3 clarifying questions require owner confirmation:
1. **Custom Domain & Target Hosting**: What is the final custom domain planned for the marketplace (e.g., `craftchirp.com`), and do you have a preferred hosting account (e.g., Vercel)?
2. **Product Taxonomy Scope**: Beyond original folk art paintings on MDF and handmade clay/terracotta jewellery, are there any other specific product lines (e.g., hand-painted wooden platters, wall plates, bookmarks) planned for the initial launch catalog?
3. **Artist Model**: Will Rachana Agarwal remain the sole artist-founder on the platform for the foreseeable future, or should the artist attribution schema be pre-wired to support additional collaborating rural artisans immediately?
