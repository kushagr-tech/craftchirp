# Craftchirp Creations (क्राफ्टचिर्प)
### Virtual Art Gallery & Global Marketplace for Authentic Indian Folk Art
**Solo Artisan-Founder:** Rachana Agarwal (15+ Years Practice)  
**Artisan Focus:** 1-of-1 Original Warli & Madhubani Folk Art on Sun-Dried Cow-Dung Base & Handmade Terracotta Jewellery  
**Primary Collector Markets:** United States, European Union (Germany, France, UK), India (Domestic) & Gated Cultural Inquiries (Russia)

---

## 🌿 The Craftchirp Story & Karigari (Ancestral Technique)

Founded by solo master artisan **Rachana Agarwal**, **Craftchirp Creations** is an eco-luxury art studio and global virtual gallery dedicated to preserving, evolving, and sharing the tactile beauty of ancestral Indian tribal arts.

Unlike mass-market printed replicas, every single piece in the Craftchirp catalog is a singular, **1-of-1 hand-executed original**:
* **The Sacred Base (Gobar Lepan):** Moisture-resistant, high-density MDF boards prepared with a purified, sun-cured alluvial mud and cow-dung wash. This ancient agrarian practice creates a tactile, earthy, shock-resistant surface that is completely odorless, chemical-free, and acts as a natural preservative.
* **Ancestral Mineral Pigments:** Traditional rice flour white paste (*Chawal ka Pitha*), red ochre earth (*Geru*), natural vegetable indigo, charcoal black, and organic plant binders applied with fine bamboo-reed brushes.
* **Ritual Traditions:** 
  - **Warli Art (Maharashtra):** Sacred geometric storytelling celebrating agrarian harvests, community circle dances (*Tarpa*), tribal animism, and harmony with flora and fauna.
  - **Madhubani / Mithila Art (Bihar):** Intricate ritual geometry, auspicious peacocks, celestial mandalas, and the divine *Kohbar* motifs symbolizing fertility and cosmic order.
  - **Wearable Earth Jewellery:** Feather-light, hand-molded riverbed terracotta and clay earrings and pendants cured in wood smoke and fitted exclusively with verified skin-safe, medical-grade 316L surgical stainless steel findings.

---

## 🏛️ Core Platform Capabilities & Architecture

Craftchirp is architected on **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Framer Motion**, engineered to provide an artisanal, museum-grade collecting experience across desktop and mobile devices.

### 1. 1-of-1 Original Art Catalog & Faceted Curatorial Filtering
* **Permanent Collection (`/gallery`):** Real-time URL-synchronized faceted filtering by Category (*Original Paintings, Terracotta Jewellery, Home Artifacts*), Style (*Warli, Madhubani, Folk-Contemporary*), Orientation (*Square, Portrait, Landscape*), and Availability (*Available, Sold/Archived*).
* **Museum Label Technical Block:** Every Artwork Product Detail Page (`/art/[slug]`) presents full curatorial specifications: physical dimensions in cm and inches, gross and packaged weight, substrate thickness, natural pigments used, HTS customs tariff code, and unique serialized Certificate of Authenticity ID.
* **LLM-Readable Raw Markdown Endpoints:** Every artwork exposes a live raw markdown file at `/art/[slug].md` for AI search agents and collectors seeking structured facts.

### 2. Atomic 15-Minute Timed Hold & Acquisition Bag
* Original 1-of-1 art pieces cannot be double-sold.
* When a collector initiates acquisition on `/art/[slug]`, an atomic 15-minute checkout reservation is created in `CartStore`.
* The Acquisition Bag (`/cart`) features a synchronized countdown timer, live dimensional packaging details, and an instant landed-cost estimator based on destination country.
* If a hold expires, the item is released back into the available gallery catalog.

### 3. Global Landed-Cost (DDP) Customs & Tax Engine
All customs duties, entry processing fees, and import taxes are calculated and collected upfront so international collectors experience **zero surprise invoices upon carrier delivery (Delivered Duty Paid - DDP model)**:
* **United States:** Original works of art enter duty-free (0%) under Harmonized Tariff Schedule (HTS) Code `9701.21.00`. Calculates mandatory CBP Entry Processing fees.
* **European Union (EU):** Fully compliant with **Council Regulation (EU) 2026/382** (effective 2026), applying the €3 flat interim customs duty for parcel consignments ≤ €150, alongside 19% German / 20% French import VAT through the Import One-Stop Shop (IOSS) framework. High-value original art (> €150) enters under the preferential 0% duty cultural schedule.
* **United Kingdom:** Post-Brexit import clearance and VAT calculation.
* **Domestic India:** GST included with standard domestic express logistics.
* **Insured Express Air Cargo:** Real-time freight estimation based on volumetric dimensional weight ($L \times W \times H / 5000$) with custom skeletal wooden crating and transit insurance.

### 4. International Sanctions & Carrier Compliance (Russian Federation Gated Portal)
* In accordance with international payment network and carrier regulations (Visa/Mastercard/Stripe suspensions), automated checkout to Russia is disabled (`RU_CHECKOUT = false`).
* A dedicated Russian collector inquiry desk is hosted at **`/ru/inquiry`** (*Запрос на приобретение картины*). Russian collectors and galleries can submit bespoke acquisition inquiries directly for compliant direct bank invoicing, bespoke packaging, and specialized freight coordination.

### 5. Privacy-First "See It On Your Wall" 1:1 Scale Visualizer
* An interactive client-side tool embedded directly on artwork PDPs.
* Allows collectors to preview how the artwork scales on their actual living room, dining, or sanctuary walls.
* **Collector Privacy Guarantee:** Operates 100% in local browser memory via HTML5 Canvas. Collector room photos are **never uploaded or stored on any server**.

### 6. Serialized Certificate of Authenticity (CoA)
* Every original artwork is cataloged with an official provenance record and physical certificate countersigned by Rachana Agarwal.
* Features a unique serial ID (`CC-2026-WAR-XXXXXX` / `CC-2026-MAD-XXXXXX`) and a cryptographic SHA-256 verification hash generated from the artwork's title, medium, dimensions, and order ID.
* Printable directly from the order confirmation desk (`/order-confirmation?orderId=...`).

### 7. Studio Operations Desk (`/admin`) for Non-Technical Founder
Designed specifically for Rachana Agarwal's day-to-day studio workflow with zero technical barriers:
* **Studio Access Gate:** Protected by a 4-digit PIN (Default: `2026`).
* **Artworks & Inventory Desk:**
  - 1-click status switcher: toggle pieces between Available (🟢), In Hold (🟡), and Sold / Archived (⚪).
  - Add & Edit Artwork Modal: 5 simple sections covering Title, Style, Technique, Dimensions (auto-converts cm to inches), Multi-Currency Pricing (with instant "Auto-convert from USD" button), Imagery, and Cultural Narrative.
  - Search and filter by style, status, or keyword.
* **Orders & Freight Desk:**
  - Monitor international orders in real time.
  - Enter air cargo carrier (DHL Express, FedEx, India Post EMS) and Air Waybill (AWB) tracking numbers.
  - 1-click link to view and print each collector's Certificate of Authenticity.
* **Collector Inquiries Desk:**
  - Centralizes all inbound collector communications: PDP artwork inquiries, bespoke custom commission briefs from `/contact`, and Russian desk inquiries from `/ru/inquiry`.
  - Filter by status (New, Replied, Archived) and 1-click "Draft Email Reply" via `mailto:`.
* **Data Persistence & Sync:**
  - Changes persist immediately in browser local storage for live testing across the site.
  - 1-click **"Download catalogue.json"** button to export active artwork data for repository commits.
  - 1-click **"Export Orders CSV"** button for tax reporting and customs manifests.

### 8. Generative Engine Optimization (GEO) & Technical SEO
* **`/llms.txt` & `/llms-full.txt`:** Fully structured, human and machine-readable briefings designed for LLM search engines (Perplexity, ChatGPT Search, Claude, Google Gemini).
* **JSON Catalog Feed (`/feed/products.json`):** Standard JSON Feed 1.1 exposing complete inventory data, image assets, and provenance attributes.
* **Dynamic Sitemap & Robots (`/sitemap.xml`, `/robots.txt`):** Automated XML sitemap featuring image metadata for all PDPs, curatorial collections, and journal articles.
* **Schema.org JSON-LD:** Structured linked data emitted across all pages (`VisualArtwork`, `Product`, `Person`, `Organization`, `BreadcrumbList`).

---

## 🎨 Brand Identity & Design Tokens

Craftchirp follows an aesthetic of **"museum-label restraint meets earthy warmth"** — art-first, generous whitespace, and tactile textures that honor the earth:

| Token Name | Hex Code | Description & Usage |
|:---|:---|:---|
| **Clay** | `#8c5a45` | Primary brand accent, artisan CTA buttons, key headings |
| **Terracotta** | `#e07a5f` | Secondary warm accent, badges, active timed hold alerts |
| **Sand** | `#d9c5b2` | Structural borders, card containers, divider lines |
| **Off-White Canvas** | `#f4f1de` | Primary background, gallery wall canvas |
| **Olive / Sage** | `#818c78` | Trust badges, authenticity seals, eco-certifications |
| **Deep Earth Charcoal** | `#2d2a26` | High-contrast typography, footer background, primary body text |

**Typography:**
* **Headings & Titles:** Playfair Display (Serif)
* **Metadata & Body Text:** Inter (Clean Sans-Serif)

---

## 📂 Project Directory Structure

```
craftchirp_web/
├── docs/                           # Architecture Decision Records (ADRs) & research
│   └── DECISIONS.md                # Memory block & key technical choices
├── public/                         # Static assets & public crawler endpoints
│   ├── art/                        # Pre-generated raw markdown datasheets (.md)
│   ├── feed/                       # Public product feeds (products.json)
│   ├── images/                     # Studio artwork photography & thumbnails
│   ├── llms.txt                    # Concise AI crawler summary
│   ├── llms-full.txt               # Full technical & curatorial AI documentation
│   └── robots.txt                  # Public crawler permissions & sitemap reference
├── scripts/                        # Build & automation scripts
│   └── generate-static-assets.js   # Generates public/art/*.md and public/feed/products.json
├── src/
│   ├── app/                        # Next.js App Router routes & pages
│   │   ├── about/                  # About Rachana Agarwal & the studio
│   │   ├── admin/                  # Studio Operations Desk (PIN-gated)
│   │   ├── art/[slug]/             # Artwork Product Detail Page (PDP)
│   │   ├── artists/[slug]/         # Artist profile & statement
│   │   ├── authenticity/           # Certificate of Authenticity guarantee
│   │   ├── care-guide/             # Installation & care instructions for MDF art
│   │   ├── cart/                   # 15-Minute timed hold acquisition bag
│   │   ├── checkout/               # 3-step DDP checkout wizard (Test Mode)
│   │   ├── collections/[slug]/     # Thematic series & curatorial collections
│   │   ├── contact/                # Bespoke commission inquiry form
│   │   ├── cookies/                # Interactive cookie preference center
│   │   ├── exhibitions/[slug]/     # Virtual exhibition salon with audio guides
│   │   ├── gallery/                # Permanent collection with faceted filters
│   │   ├── jewellery/              # Handcrafted terracotta jewellery catalog
│   │   ├── journal/[slug]/         # Karigari, tribal history & conservation guides
│   │   ├── order-confirmation/     # Order verification & printable certificate
│   │   ├── press/                  # Media features & curatorial exhibitions
│   │   ├── privacy/                # Privacy policy (GDPR / CCPA / DPDPA)
│   │   ├── returns/                # 14-day collector return guarantee
│   │   ├── robots.ts               # Dynamic Next.js robots configuration
│   │   ├── ru/inquiry/             # Russian Federation gated inquiry portal
│   │   ├── shipping-duties/        # Transparent landed-cost & DDP policy
│   │   ├── sitemap.ts              # Dynamic sitemap generator with images
│   │   └── terms/                  # Terms of service
│   ├── components/                 # Reusable UI & domain components
│   │   ├── admin/                  # ArtworkModal, ShipmentModal, InquiryModalView
│   │   ├── artwork/                # ArtworkGallery, ArtworkCommerceActions, WallVisualizer
│   │   ├── commerce/               # OrderConfirmationDetails, LandedCostBreakdown
│   │   ├── exhibition/             # ExhibitionWall, AudioGuidePlayer
│   │   ├── gallery/                # GalleryCatalogView, ArtworkCard, GalleryFilters
│   │   ├── layout/                 # Header (with cart indicator), Footer
│   │   ├── seo/                    # Schema.org JSON-LD components
│   │   └── ui/                     # ArtImage, CookieConsent, SearchModal
│   ├── data/                       # Seed catalogs & journal content
│   │   ├── catalogue.ts            # Artworks, collections, exhibitions & artist seed
│   │   └── journal.ts              # Curatorial articles & educational stories
│   ├── lib/                        # Business logic engines & stores
│   │   ├── admin/admin-store.ts    # Studio Desk state & LocalStorage persistence
│   │   ├── commerce/               # LandedCostEngine, CartStore, CertificateGenerator
│   │   └── inventory/              # ReservationManager (atomic 15m holds)
│   └── types/                      # TypeScript domain definitions (Artwork, Order, Inquiry)
└── tests/                          # Automated test suites
    └── e2e/                        # End-to-end integration & Playwright tests
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
* Node.js 18.18+ or Node.js 20+
* npm or pnpm

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/kushagragarwal/craftchirp_web.git
cd craftchirp_web
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Accessing the Studio Desk (`/admin`)
Visit [http://localhost:3000/admin](http://localhost:3000/admin):
* **Default Studio PIN:** `2026`
* Or click **"Quick Unlock (Dev / Default PIN: 2026) →"** to access the inventory, orders, and inquiry desks immediately.

### 4. Updating Static Feed & Markdown Datasheets
If you edit artworks in `src/data/catalogue.ts`, re-generate the static assets:
```bash
node scripts/generate-static-assets.js
```

---

## 🧪 Testing & Verification

The codebase includes comprehensive unit, concurrency, and end-to-end test suites:

```bash
# 1. Typecheck the entire project
npx tsc --noEmit

# 2. Test 1-of-1 inventory holds & 50-way concurrent locking
npm run test:inventory

# 3. Test Landed-Cost Engine (US 0% duty vs EU 2026/382 €3 interim duty + IOSS VAT)
npm run test:landed-cost

# 4. Run end-to-end marketplace flow test
npm run test:e2e
```

**Test Suite Coverage:**
* ✅ **Inventory Concurrency:** Verified that 50 simultaneous checkout requests for a 1-of-1 original grant exactly 1 lock and safely reject the other 49 with `CURRENTLY_RESERVED`.
* ✅ **Landed Cost Compliance:** Verified US HTS 9701 0% duty, CBP entry fees, EU Council Regulation 2026/382 €3 interim duties, and 19% IOSS VAT.
* ✅ **Sanctions Gating:** Verified that automated checkout to Russia is safely blocked with an inquiry redirection.
* ✅ **Certificate Generation:** Verified serialized certificate issuance and cryptographic SHA-256 verification hash creation.

---

## 📦 Production Build & Deployment

Craftchirp is optimized for modern edge and static hosting platforms (Vercel, Cloudflare Pages, GitHub Pages):

```bash
npm run build
```

This compiles static routes, generates pre-rendered HTML shells, optimizes styles via Tailwind CSS v4, and generates `/sitemap.xml` and `/robots.txt`.

---

## 📜 Provenance & Rights

All original paintings, jewellery designs, stories, photographs, and certificates are the intellectual property of artist **Rachana Agarwal** (Craftchirp Creations).  
© 2011–2026 Craftchirp Creations. All rights reserved.
