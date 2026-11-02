# Craftchirp Virtual Gallery + Global Marketplace Task Board

## Master Roadmap & Phase Tracking

### Phase 0: Decisions and Research (No Feature Code)
- [x] Run REA pattern analysis across 6 public platforms (Mojarto, Saatchi Art, Artfinder, Singulart, Jaypore, Etsy) -> Output: `docs/research/patterns.md`
- [x] Author Architecture Decision Records (ADRs) with trade-offs -> Output: `docs/DECISIONS.md`
  - [x] Commerce backend (Custom-Lite Next.js + Postgres + Drizzle)
  - [x] Cross-border payments verification (Stripe, Razorpay, PayPal, IEC, FIRC, RBI purpose codes)
  - [x] CMS selection for non-technical founder Rachana Agarwal
  - [x] Hosting migration path (GitHub Pages to Vercel + custom domain)
  - [x] Gated Russian market policy (`RU_CHECKOUT=false`)
- [x] Curate accessible UI building blocks from 21st.dev -> Output: `docs/ui-shortlist.md`
- [x] Run prompt-master for Phase 0 -> Output: `docs/prompts/phase-0-decisions-and-research.md`
- [x] Formulate up to 3 blocking clarifying questions for the owner
- [x] **GATE: Owner approves `docs/DECISIONS.md`** (Approved with Option A)

---

### Phase 1: Foundation
- [x] Run prompt-master for Phase 1 -> `docs/prompts/phase-1-foundation.md`
- [x] Define TypeScript & Drizzle ORM schemas:
  - [x] Artwork/Product (type, slug, title, story, medium, materials, style, dimensions cm+inch, weight, packaged dims, edition, framed, orientation, dominant colors, room tags, currency prices, status, images, HS code, CoA) -> `src/types/models.ts`
  - [x] Artist (schema ready for multi-artist, Rachana Agarwal first)
  - [x] Collection, Exhibition, Order, Inquiry, JournalPost
  - [x] PostgreSQL Drizzle schema -> `src/db/schema.ts`
- [x] Implement one-of-a-kind inventory reservation engine (timed hold, auto-release worker, atomic lock) -> `src/lib/inventory/reservation-manager.ts`
  - [x] Concurrency stress test verifying no overselling under 50 simultaneous checkout requests -> `src/lib/inventory/__tests__/reservation.test.ts` (13/13 passed)
- [x] Establish design system using taste-skill ("museum-label restraint meets earthy warmth", token preservation)
  - [x] Updated Header with Gallery, Collections, Exhibitions, Jewellery, Journal, About, Contact, Currency selector, and Cart -> `src/components/layout/Header.tsx`
  - [x] Updated Footer with collector care, policy anchors, authenticity guarantee, and Russian inquiry route -> `src/components/layout/Footer.tsx`
- [x] Image pipeline:
  - [x] Strict aspect-ratio containers, blur skeleton, dev placeholder warning badge -> `src/components/ui/ArtImage.tsx`
  - [x] Tactile inspection magnifier for mud relief & cow-dung texture -> `src/components/ui/TextureZoom.tsx`

---

### Phase 2: Catalogue and Discovery
- [x] Run prompt-master for Phase 2 -> `docs/prompts/phase-2-catalogue-and-discovery.md`
- [x] Curate realistic catalogue seed data (Warli, Madhubani, Terracotta Jewellery) -> `src/data/catalogue.ts`
- [x] `/gallery`: Server-rendered, URL-driven faceted filters (type, style, size, orientation, availability, sort), mobile filter drawer, museum-label cards, empty state with commission CTA -> `src/app/gallery/page.tsx`, `src/components/gallery/GalleryFilters.tsx`, `src/components/gallery/ArtworkCard.tsx`
- [x] `/art/[slug]` Artwork PDP:
  - [x] Gallery-grade tactile zoom with `TextureZoom`
  - [x] 4+ image views (front, 45° angle, macro texture, room scale, packaging) -> `src/components/artwork/ArtworkGallery.tsx`
  - [x] Museum-label block, multi-currency price toggle (USD, EUR, GBP, INR)
  - [x] "Reserve & Acquire" CTA + "Enquire About This Piece" modal -> `src/components/artwork/InquiryModal.tsx`
  - [x] Karigari Ki Kahani story & 4-step craft journey
  - [x] Certificate of Authenticity guarantee with ID, shipping & customs summary, 14-day return policy
  - [x] Related original works grid
- [x] Dedicated jewellery showcase with verified hypoallergenic claims (316L surgical steel), weights in grams, natural wax seal -> `src/app/jewellery/page.tsx`
- [x] `/artists/[slug]` Rachana Agarwal profile with 15+ years heritage statement, studio timeline, and portfolio -> `src/app/artists/[slug]/page.tsx`
- [x] `/collections` & `/collections/[slug]` curatorial landing pages -> `src/app/collections/page.tsx`, `src/app/collections/[slug]/page.tsx`
- [x] Instant search modal (`Cmd+K`) with autocomplete suggestions -> `src/components/ui/SearchModal.tsx`

---

### Phase 3: Virtual Gallery
- [x] Run prompt-master for Phase 3 -> `docs/prompts/phase-3-virtual-gallery.md`
- [x] "See It On Your Wall" client-side scale visualizer -> `src/components/artwork/WallVisualizerModal.tsx`:
  - [x] Curated sample sanctuaries (Modern Living, Wabi-Sabi Study, Terracotta Dining)
  - [x] Private client-side wall upload (zero server storage)
  - [x] True 1:1 cm-to-pixel scaling from artwork dimensions
  - [x] Frame simulation & drag-to-position
  - [x] Integrated into Artwork PDP -> `src/components/artwork/ArtworkCommerceActions.tsx`
- [x] Exhibitions index page -> `src/app/exhibitions/page.tsx`
- [x] Virtual exhibition detail page -> `src/app/exhibitions/[slug]/page.tsx`:
  - [x] Server-rendered HTML baseline for complete SEO & accessibility
  - [x] Audio guide commentary player with transcripts -> `src/components/exhibition/AudioGuidePlayer.tsx`
  - [x] Scroll-driven thematic exhibition walls -> `src/components/exhibition/ExhibitionWall.tsx`
  - [x] Museum placards & direct acquisition links
  - [x] Full `prefers-reduced-motion` compliance

---

### Phase 4: Commerce & International Checkout
- [x] Run prompt-master for Phase 4 -> `docs/prompts/phase-4-commerce.md`
- [x] Cart & checkout with address validation & mandatory phone -> `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`
- [x] Multi-currency display (USD, EUR, GBP, INR) using owner-set prices
- [x] Config-driven Landed-Cost Engine -> `data/duty-rules.json`, `src/lib/commerce/landed-cost.ts`:
  - [x] EU: Council Regulation (EU) 2026/382 eliminating €150 de minimis, €3 per-line duty, IOSS VAT
  - [x] US: Elimination of Section 321 de minimis, formal/informal entry declarations, HTS 9701 vs 7117
  - [x] Verified via test suite: `src/lib/commerce/__tests__/landed-cost.test.ts` (12/12 passed)
- [x] Shipping rate tables & carrier integration (DHL Express, FedEx) with dimensional weight -> `data/shipping-rates.json`
- [x] Post-purchase pipeline: automated serialized Certificate of Authenticity generator & order confirmation -> `src/lib/commerce/certificate-generator.ts`, `src/app/order-confirmation/[orderId]/page.tsx`
- [x] Russia gated inquiry mode (`RU_CHECKOUT=false`) -> `src/app/ru/inquiry/page.tsx`
- [x] Owner admin dashboard -> `src/app/admin/page.tsx`:
  - [x] Orders list, add carrier tracking number, mark shipped
  - [x] Quick toggle status (Available / Sold)
  - [x] Print Certificate of Authenticity
- [x] **GATE: All payments in TEST mode; owner approves before any live keys**

---

### Phase 5: Organic Discovery (SEO & GEO)
- [ ] Run prompt-master for Phase 5
- [ ] Metadata API on every route with unique canonical, OpenGraph, Twitter cards
- [ ] `app/sitemap.ts` (with artwork images) and `app/robots.ts` configured for search and AI crawlers
- [ ] Validated JSON-LD schemas: `VisualArtwork`, `Product`, `Offer`, `Person`, `Organization`, `BreadcrumbList`, `FAQPage`
- [ ] International hreflang tags (`en-US`, `en-GB`, `de`, `fr`, `ru`)
- [ ] LLM & GEO Layer:
  - Updated `llms.txt` and `llms-full.txt`
  - Per-artwork clean Markdown at `/art/[slug].md`
  - `/feed/products.json`
  - Structured "facts" blocks on product pages
- [ ] Merchant feeds: Google Merchant Center product feed, Pinterest catalog, IndexNow ping
- [ ] `/journal` evergreen content engine (Warli heritage, care guides, framing, styling)
- [ ] Mobile Lighthouse audit ($\ge 90$ across all 4 categories, LCP $< 2.5s$, CLS $< 0.1$)

---

### Phase 6: Trust & Compliance
- [ ] Run prompt-master for Phase 6
- [ ] Dedicated policy pages: Shipping & Duties, Returns & Damages, Privacy Policy (GDPR/CCPA), Cookie Consent Banner, Terms of Service, Authenticity Guarantee, Care Guide
- [ ] Claims discipline: strict audit of all materials and ecological statements
- [ ] Create `docs/OWNER-CHECKLIST.md` (IEC, GST LUT/refunds, purpose codes, bank e-FIRC, HS customs codes, packaging spec, real photo shot list)

---

### Phase 7: QA, End-to-End Testing & Launch
- [ ] Run prompt-master for Phase 7
- [ ] Playwright E2E test suite:
  - Browse, filter, view artwork
  - Timed reservation lock & concurrent checkout prevention
  - Test payment processing & webhook handling
  - Post-purchase CoA generation
- [ ] Schema validation via Rich Results Test
- [ ] Accessibility audit (axe-core, WCAG 2.1 AA)
- [ ] Produce `walkthrough.md` with verification evidence and `docs/RUNBOOK.md` (10-step owner guide)
