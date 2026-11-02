# Phase 5 Scoped Sub-Prompt: Organic Discovery (SEO + GEO)

## Objective
Establish full-spectrum technical SEO and Generative Engine Optimization (GEO) for Craftchirp, enabling organic discovery through traditional search engines (Google, Bing, Yandex) and AI search assistants (ChatGPT, Claude, Perplexity). Build the `/journal` E-E-A-T content engine and machine-readable feeds.

## Starting State
- Phases 1–4 complete: Data models, atomic reservation manager, catalogue, artwork PDPs, virtual exhibitions, landed-cost engine, and test checkout.
- Basic `robots.txt` and static `llms.txt` in `public/`.
- Dynamic sitemap with image metadata, JSON-LD rich snippets, and `/journal` content do not yet exist.

## Target State
1. **Dynamic Sitemap & Robots** (`src/app/sitemap.ts` & `src/app/robots.ts`):
   - Dynamic sitemap covering all artworks, collections, exhibitions, journal articles, and policies, with image URLs.
   - Robots file explicitly allowing reputable search crawlers (`Googlebot`, `Bingbot`, `YandexBot`) and AI agents (`OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
2. **Schema.org JSON-LD Generation** (`src/components/seo/JsonLd.tsx`):
   - `VisualArtwork` schema with creator, materials, and physical dimensions.
   - `Product` + `Offer` schema with `shippingDetails`, `hasMerchantReturnPolicy`, and condition.
   - `Organization` and `Person` (Rachana Agarwal) schemas with social/press links.
   - `BreadcrumbList` schema.
3. **LLM & GEO Layer**:
   - Updated `public/llms.txt` and `public/llms-full.txt` with consistent entity definitions.
   - Dynamic per-artwork Markdown endpoint: `/art/[slug].md/route.ts`.
   - Product catalog feed: `/feed/products.json/route.ts`.
   - Structured "Artisan & Material Facts" block on PDP for zero-hallucination quoteability.
4. **Content Engine (`/journal`)**:
   - High E-E-A-T evergreen articles in `src/data/journal.ts`.
   - Journal index at `src/app/journal/page.tsx`.
   - Article detail page at `src/app/journal/[slug]/page.tsx` with author byline, reading time, and internal artwork links.
5. **Press Page** (`src/app/press/page.tsx`):
   - Media coverage and exhibition honors.
6. **Metadata & Hreflang**:
   - Multilingual hreflang alternate links (`en-US`, `en-GB`, `de`, `fr`, `ru`).
   - OpenGraph and Twitter card metadata.

## File Scope
- `docs/prompts/phase-5-organic-discovery.md`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/components/seo/JsonLd.tsx`
- `src/app/art/[slug]/page.tsx`
- `src/app/art/[slug].md/route.ts`
- `src/app/feed/products.json/route.ts`
- `public/llms.txt`
- `public/llms-full.txt`
- `src/data/journal.ts`
- `src/app/journal/page.tsx`
- `src/app/journal/[slug]/page.tsx`
- `src/app/press/page.tsx`
- `task.md`
- `implementation_plan.md`

## Do-Not-Touch List
- Do not remove brand tokens in `globals.css`.
- Do not claim `llms.txt` guarantees ranking.
- Do not fabricate press quotes or awards.

## Stop Conditions
- Stop once all SEO/GEO files, journal engine, JSON-LD schemas, and feeds are created and typecheck with zero errors.

