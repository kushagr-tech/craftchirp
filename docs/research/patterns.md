# Reference Marketplace & Gallery UX Research (REA Pattern Analysis)

This document synthesizes public UX, technical architecture, schema, trust signals, and performance patterns across leading digital art marketplaces and artisanal storytelling platforms.

---

## 1. Analyzed Platforms

| Platform | Primary Segment | Geographic Focus | Key Strength Observed |
| :--- | :--- | :--- | :--- |
| **Mojarto** (`mojarto.com`) | Indian original paintings & sculpture | India & Indian Diaspora | Deep folk/traditional art taxonomy (Warli, Madhubani, Gond, Pichwai). |
| **Saatchi Art** (`saatchiart.com`) | Global curated contemporary fine art | Global (US/EU core) | Curatorial authority, "View in a Room" AR scale visualizer, museum metadata. |
| **Artfinder** (`artfinder.com`) | Direct-from-independent-artist | UK / US / Global | B-Corp certified ethical transparency, direct artist connection, Certificate of Authenticity guarantee. |
| **Singulart** (`singulart.com`) | High-end international fine art & craft | Europe / US / Global | Transparent landed pricing (taxes/duties included), white-glove packaging assurance. |
| **Jaypore** (`jaypore.com`) | Indian handmade & artisanal luxury | India, US, Middle East | *"Karigari Ki Kahani"* storytelling—elevating traditional craftsmanship into modern heirlooms. |
| **Etsy (Folk Art)** (`etsy.com`) | Handmade cultural crafts & vintage | Global | High-density seller trust badges, production partner disclosures, material transparency. |

---

## 2. Information Architecture (IA) & Navigation

### Observed Patterns:
- **Primary Header Hierarchy**:
  - Main categories clearly delineate **Art Forms** vs **Objects/Jewellery** vs **Curated Exhibitions**.
  - Top navigation consistently offers: *Paintings / Artworks*, *Collections / Exhibitions*, *Jewellery / Objects*, *The Artisan / Heritage*, *Journal / Stories*, *Contact / Commissions*.
- **Collection-First Grouping**:
  - Instead of dumping all SKUs into a single endless list, high-end galleries organize by **Thematic Exhibition** (e.g., "Stories of the Earth", "Monochrome Warli", "Sacred Geometries").
  - This matches art-buyer psychology: art is collected by emotion and narrative, not just price and category.
- **Search & Query Suggestions**:
  - Search inputs provide autocomplete suggestions across 3 dimensions: **Art Form** (*"Warli"*, *"Madhubani"*), **Medium** (*"Mud Art"*, *"Natural Pigments"*), and **Format** (*"Framed"*, *"Wall Art"*).

---

## 3. Filter Taxonomy for Original Art & Handmade Items

Across all 6 platforms, art-collectors and interior buyers rely on specific multi-faceted taxonomy:

```
├── Art Form / Style
│   ├── Warli (Maharashtra tribal geometric folk art)
│   ├── Madhubani / Mithila (Bihar ritual & nature narrative)
│   ├── Earth & Mud Abstract
│   └── Contemporary Fusion
├── Product Category
│   ├── Original Paintings (MDF / Wooden Board)
│   ├── Handmade Terracotta / Clay Jewellery
│   └── Heritage Home Décor Objects
├── Dimensions & Scale
│   ├── Small (< 30 cm / < 12 in)
│   ├── Medium (30–60 cm / 12–24 in)
│   ├── Large (> 60 cm / > 24 in)
│   └── Dimension Range Sliders (cm / inch dual toggle)
├── Orientation
│   ├── Square (1:1)
│   ├── Portrait (Vertical)
│   └── Landscape (Horizontal)
├── Dominant Earth Palette
│   ├── Terracotta Red / Brick
│   ├── Natural Clay / Umber
│   ├── Sand / Raw Beige
│   ├── Ochre / Mustard
│   └── Charcoal / Soot Black
├── Availability
│   ├── Available for Purchase
│   ├── Reserved (timed hold)
│   └── Archive / Sold (demonstrates artist demand and career archive)
└── Price Filter (Currency Native)
    ├── Under $250 / €250
    ├── $250 – $500
    ├── $500 – $1,000
    └── Custom Range
```

### Technical Lesson for Craftchirp:
- Every filter combination should serialize cleanly to standard URL query parameters (e.g., `/gallery?style=warli&orientation=square&price_max=500`) to enable bookmarking, server-side rendering, and crawlable canonical facets.

---

## 4. Artwork Page (PDP) Content Blocks & Visual Layout

A high-converting original artwork page balances **visual immersion**, **museum-grade provenance**, and **frictionless trust**:

```
+-------------------------------------------------------------------------+
| [ Breadcrumb: Home > Collections > Warli > Rhythm of Harvest ]          |
+------------------------------------+------------------------------------+
|                                    |                                    |
|  [ LARGE HIGH-RES ARTWORK DISPLAY] |  [ MUSEUM LABEL BLOCK ]            |
|  - Ultra-sharp zoom for cow-dung   |  Rachana Agarwal                   |
|    & mud texture inspection        |  "Rhythm of Harvest", 2025         |
|  - 4+ standard views:              |  Original Warli folk art on MDF    |
|    1. Straight-on full canvas      |  Natural cow-dung base, rice paste |
|    2. 45° rake angle (texture)     |  & earth pigments                  |
|    3. Macro signature/detail       |  30 x 30 cm (11.8 x 11.8 in)       |
|    4. Framed scale in room         |  Unique (1 of 1)                   |
|    5. Packaging & crating view     |                                    |
|                                    |  [ PRICE & COMMERCE ]              |
|  [ "VIEW ON YOUR WALL" TOOL ]      |  $420 USD (Landed / Taxes Clear)   |
|  - Client-side room visualizer     |  [ ADD TO CART / RESERVE PIECE ]   |
|  - True 1:1 cm-to-pixel scaling    |  [ ENQUIRE ABOUT THIS WORK ]       |
|                                    |                                    |
|                                    |  [ TRUST BADGES ]                  |
|                                    |  - Signed Certificate of Origin    |
|                                    |  - Free Insured Global Air Cargo   |
|                                    |  - 14-Day Global Collector Return  |
+------------------------------------+------------------------------------+
|                                                                         |
|  [ SECTION: KARIGARI KI KAHANI — THE ARTWORK STORY & PROCESS ]          |
|  - Deep narrative of the symbols (Tarpa dance, solar cycle, harvest)    |
|  - Photographic steps: cow-dung purification, sun-drying, hand-painting |
|                                                                         |
|  [ SECTION: SPECIFICATIONS & ARTISAN ATTRIBUTES ]                       |
|  - Surface, framing condition, hanging hardware included, weight        |
|  - HTS Code: 9701.91 (Original paintings, executed entirely by hand)    |
|                                                                         |
|  [ SECTION: CARE GUIDE FOR NATURAL MATERIALS ]                          |
|  - Indoor display recommendations, moisture/sunlight advice            |
|                                                                         |
|  [ SECTION: ABOUT RACHANA AGARWAL ]                                     |
|  - 15+ years experience, cultural lineage, photo of artist in studio    |
|                                                                         |
|  [ SECTION: RELATED ORIGINAL WORKS ]                                    |
+-------------------------------------------------------------------------+
```

---

## 5. Trust Signals & Cross-Border Friction Relief

Buying original fine art or artisanal goods online across international borders (e.g., from an Indian artisan to a collector in California or Munich) triggers high consumer apprehension:
1. **Is this genuine handmade folk art or machine-printed mass décor?**
   - *Pattern*: Provide an auto-generated, serial-numbered **Certificate of Authenticity (CoA)** signed by the artist.
   - *Pattern*: Include high-resolution macro shots of the organic surface relief showing authentic human brushwork and earth textures.
2. **Will the natural materials be durable and odor-free?**
   - *Pattern*: Clear factual disclosure of the traditional preparation process (thoroughly purified, naturally sun-baked, sealed, and completely odorless).
3. **Will it arrive broken or warped?**
   - *Pattern*: Dedicated **Packaging Integrity Section** showing rigid corner guards, waterproof wrapping, shock absorption, and custom crating for MDF boards.
4. **Will I get hit with surprise customs bills upon delivery?**
   - *Pattern (Singulart / Net-a-Porter model)*: Transparent landed cost. Clear statement at checkout whether duties/VAT are prepaid (DDP) or collected by carrier (DAP). No hidden surprises.
5. **What if it doesn't fit my space?**
   - *Pattern*: 14-day collector return policy with clear damage-in-transit claims procedure.

---

## 6. Checkout Steps & Inventory Concurrency

Original artworks are strictly **one-of-one (1/1)**. Standard retail checkout models fail here because two buyers can attempt to purchase the same original simultaneously.

### The Proven Art Gallery Checkout Pattern:
1. **Timed Inventory Reservation (Hold)**:
   - When a buyer clicks "Proceed to Checkout", the item is placed into `status: 'reserved'` with an expiring Redis/DB timestamp (e.g., 15 minutes).
   - Other visitors see a tasteful badge: *"Currently in another collector's checkout"*.
   - If payment does not complete within 15 minutes, a background cron/worker atomically releases the reservation back to `available`.
2. **Simplified 3-Step Checkout Flow**:
   - **Step 1: Contact & Delivery Destination** (captures country, street, postal code, phone number for DHL/FedEx customs clearance).
   - **Step 2: Landed Cost & Shipping Method** (express air courier with full insurance; displays duties/taxes breakdown).
   - **Step 3: Secure Payment** (Multi-currency card checkout with 3D Secure / Stripe / Razorpay).
3. **Webhook-Driven Finality**:
   - Only on verified `payment_intent.succeeded` or payment gateway capture webhook is the status updated to `sold`.
   - Idempotent database transaction prevents duplicate order processing.

---

## 7. Structured Data & Schema.org Emission

Analysis of top-ranking art pages reveals Google Rich Results and image discovery require dual Schema typing:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VisualArtwork",
      "@id": "https://craftchirp.com/art/rhythm-of-harvest#artwork",
      "name": "Rhythm of Harvest",
      "alternateName": "Original Warli Harvest Folk Painting",
      "artMedium": "Natural cow-dung base, natural earth pigments, acrylic binder on MDF board",
      "artform": "Painting",
      "artworkSurface": "MDF Board",
      "artEdition": "1 of 1 (Original)",
      "width": {
        "@type": "QuantitativeValue",
        "value": 30,
        "unitCode": "CMT"
      },
      "height": {
        "@type": "QuantitativeValue",
        "value": 30,
        "unitCode": "CMT"
      },
      "creator": {
        "@type": "Person",
        "name": "Rachana Agarwal",
        "jobTitle": "Traditional Folk Artist & Founder of Craftchirp",
        "sameAs": [
          "https://www.instagram.com/craftchirp_creations/"
        ]
      },
      "dateCreated": "2025",
      "image": [
        "https://craftchirp.com/assets/art/rhythm-of-harvest-front.webp",
        "https://craftchirp.com/assets/art/rhythm-of-harvest-angle.webp",
        "https://craftchirp.com/assets/art/rhythm-of-harvest-texture.webp"
      ]
    },
    {
      "@type": "Product",
      "@id": "https://craftchirp.com/art/rhythm-of-harvest#product",
      "name": "Rhythm of Harvest - Original Warli Folk Art",
      "description": "Original Warli folk art painting by Rachana Agarwal. Handcrafted on MDF using natural cow-dung base and earth pigments. Includes Certificate of Authenticity.",
      "category": "Home & Garden > Decor > Artwork > Paintings",
      "image": "https://craftchirp.com/assets/art/rhythm-of-harvest-front.webp",
      "brand": {
        "@type": "Brand",
        "name": "Craftchirp"
      },
      "offers": {
        "@type": "Offer",
        "price": "420.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "url": "https://craftchirp.com/art/rhythm-of-harvest",
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "USD"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 3,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 5,
              "maxValue": 9,
              "unitCode": "DAY"
            }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 14,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        }
      }
    }
  ]
}
```

---

## 8. Performance Budget & Page Weight Audit

Observations of heavy art marketplaces:
- **Pain Points on Reference Sites**:
  - Uncompressed PNGs and oversized JPEGs driving page weight above 8–15 MB.
  - Heavy 3D WebGL rooms blocking initial thread and pushing mobile LCP past 5.5s.
  - Cumulative Layout Shift (CLS) caused by dynamic image masonry and banner loaders.
- **Rules for Craftchirp High Performance**:
  1. Next.js Image component with explicit aspect-ratio containers (`aspect-square`, `aspect-[4/5]`) to guarantee **0 layout shift**.
  2. AVIF / WebP format generation with low-quality image placeholder (LQIP) blurs.
  3. Defer all heavy interactive tools ("See It On Your Wall", 3D viewer) behind user action triggers / dynamic imports.
  4. Core HTML and metadata must render server-side for immediate indexability by search engines and LLM crawlers.

