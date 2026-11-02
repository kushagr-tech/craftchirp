# Architecture Decision Records (ADRs) & Memory Block

This document preserves the foundational decisions for the Craftchirp Virtual Gallery and Global Marketplace. It serves as the active Memory Block re-injected into each implementation phase.

---

## ADR-001: Commerce Backend Architecture

### Context
Craftchirp represents a solo artisan-founder (Rachana Agarwal) producing one-of-a-kind (1 of 1) original folk art paintings (Warli and Madhubani on MDF with natural cow-dung base), small-batch handmade jewellery, and artisanal decor. The active catalog will range between 20 and 100 high-ticket, high-touch items. The site requires:
1. Timed inventory reservations (holds) to prevent race conditions on one-of-one pieces during checkout.
2. Custom landed-cost calculations (EU 2026 customs duty rules, US formal declarations, country-specific VAT/duty).
3. Automated generation of signed PDF Certificates of Authenticity with unique serial IDs.
4. Deep integration with interactive editorial experiences (virtual exhibitions, "See it on your wall" scale tool).

### Options Considered
1. **Option A: Custom-Lite (Next.js 16 App Router + Postgres on Neon/Supabase + Drizzle ORM)**
   - *Pros*: Completely unified codebase; zero cold starts; atomic database transactions (`FOR UPDATE` locking for 1/1 inventory hold); zero monthly platform subscription fees; total freedom to implement exact landed-cost and GEO/SEO logic.
   - *Cons*: We maintain the database schema and order fulfillment flows.
2. **Option B: Headless Shopify (Shopify Storefront API + Admin)**
   - *Pros*: Pre-built admin app for the artist; built-in international tax settings.
   - *Cons*: Recurring monthly fees ($39–$399/mo); Shopify checkout redirects disrupt custom museum styling; timed reservation locks on one-of-a-kind items require complex cart lock apps; vendor lock-in.
3. **Option C: Open-Source Engine (Medusa v2 or Saleor)**
   - *Pros*: Purpose-built e-commerce primitives.
   - *Cons*: Requires maintaining a separate Node.js/Python server process and separate database; massive overkill and excessive dev/ops overhead for a catalog under 100 items.

### Decision
**Adopt Option A: Custom-Lite (Next.js App Router + Postgres via Neon/Supabase + Drizzle ORM).**

### Rationale
A 20–100 SKU gallery of high-value, one-of-one art pieces does not need bloated multi-warehouse ERP software. It requires an artisanal, high-trust experience with atomic inventory reservations, custom multi-currency pricing, and clean landed-cost transparency. Drizzle ORM provides lightweight, type-safe transactions perfectly suited for single-piece inventory locking.

---

## ADR-002: Cross-Border Payments Strategy for Indian Exporter

### Context
Craftchirp ships physical goods from India to buyers primarily in the US and Europe. The Indian regulatory framework governing cross-border e-commerce exports mandates:
- Mandatory **Importer-Exporter Code (IEC)** issued by the DGFT, mapped to business PAN.
- Strict RBI Purpose Codes for merchandise exports (e.g., `S0102` / `P0102`).
- Generation of **Foreign Inward Remittance Certificates (FIRC)** or **Electronic Foreign Inward Remittance Advices (e-FIRA / FIRS)** to prove zero-rated export status under GST and reconcile with the RBI's Export Data Processing and Monitoring System (EDPMS).
- Mandatory capture and transmission of buyer shipping addresses and itemized declarations.
- Payouts in Indian Rupees (INR) to an Indian commercial bank account, while presenting prices in USD ($), EUR (€), GBP (£), and INR (₹).

### Verification of Providers (2025/2026 Grounding)
1. **Stripe India**:
   - Status: Operational on an invite/application basis for Indian exporters.
   - Requirements: Valid IEC, verified Indian business entity (Proprietorship, LLP, or Pvt Ltd), full corporate KYC.
   - Compliance: Mandates passing customer shipping addresses on export charges. Supports multi-currency presentment across 135+ currencies with INR bank settlement.
2. **Razorpay International (PA-CB Authorized)**:
   - Status: Fully authorized by the RBI as a Cross-Border Payment Aggregator.
   - Requirements: Business PAN, verified IEC.
   - Strengths: Automated dashboard generation of FIRS/e-FIRA statements; direct support for international Visa, Mastercard, and American Express with INR settlement.
3. **PayPal India**:
   - Status: Ubiquitous buyer trust in US/EU markets.
   - Requirements: Full KYC, IEC linked to account, P-code selection for goods exports. FIRA issued via partner bank (Citibank).
   - Limitations: High transaction fee structure (~4.4% + fixed fee + 3-4% currency spread).

### Decision
**Build behind a unified `PaymentProvider` TypeScript interface.**
- **Default Core Adapter**: Stripe (with Stripe Elements / Hosted Checkout) in **TEST mode** during development.
- **Secondary Adapter**: Razorpay PA-CB / PayPal adapter conforming to the identical interface.
- **Compliance Enforcement**: The checkout engine will enforce capturing full postal address, phone number, and HS code metadata before payment intent creation.

```typescript
export interface PaymentProvider {
  createPaymentIntent(params: {
    orderId: string;
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'INR';
    customer: { email: string; name: string; shippingAddress: Address };
    lineItems: LineItem[];
  }): Promise<{ clientSecret: string; externalId: string }>;

  verifyWebhook(req: Request): Promise<PaymentWebhookEvent>;
  handleRefund(orderId: string, amount?: number): Promise<boolean>;
}
```

---

## ADR-003: Content Management System (CMS) for Non-Technical Founder

### Context
Rachana Agarwal is a solo, non-technical artist. She must be able to:
- Take photos of a finished artwork on her phone and upload them with automatic WebP/AVIF optimization.
- Write or dictate the story, symbols, and inspirations behind the piece.
- Select category (*Original Painting, Jewellery, Home Decor*), style (*Warli, Madhubani, Contemporary*), dimensions (cm), weight (grams).
- Set distinct prices per currency (USD, EUR, GBP, INR) without relying on automated FX rates.
- Mark an item as Available, Reserved, or Sold.
- Manage exhibitions, write journal posts, and view inbound commissions.

### Options Considered
1. **Sanity.io Studio**:
   - *Pros*: Exceptional hosted visual editing UI, generous free tier, built-in focal point image cropping, mobile-friendly studio, zero server maintenance.
   - *Cons*: Separate schema sync and third-party dashboard.
2. **Payload CMS 3.0**:
   - *Pros*: Native Next.js App Router integration, shares the same Postgres database and TypeScript types.
   - *Cons*: More complex initial configuration and schema migrations for custom multi-currency inputs.
3. **Protected Custom `/admin` with NextAuth / Server Actions**:
   - *Pros*: Zero third-party dependencies, 100% custom-tailored to Rachana's exact 5-step artwork creation workflow.
   - *Cons*: We must build the form UI, image upload drag-and-drop, and auth guard ourselves.

### Decision
**Primary Choice: Sanity.io Studio (hosted at `/admin` or dedicated studio domain) OR a purpose-built lightweight protected `/admin` in Next.js.**
- To maximize ease of use for Rachana while keeping maintenance frictionless, we will configure clean schema definitions that can sync directly into our Postgres catalog or function through Sanity Studio's intuitive visual editor.

---

## ADR-004: Hosting & Infrastructure Transition

### Context
The current repository is configured for GitHub Pages with `output: "export"` and `basePath: "/craftchirp"`. This configuration cannot support:
- Server-side inventory reservation transactions and atomic locking.
- Secure payment webhook endpoints.
- Server-rendered dynamic filter queries.
- Protected admin routes and dynamic OpenGraph generation.

### Decision
1. **Target Hosting**: Vercel (or Cloudflare Workers / Node.js host) with a custom domain (`craftchirp.com`).
2. **Transition Strategy**:
   - **Phase 0 & Foundation**: Retain GitHub Pages export compatibility flag where possible during local asset staging.
   - **Phase 1 Cutover**: Remove `output: "export"` and `basePath: "/craftchirp"` in `next.config.ts` when moving to full Next.js App Router dynamic SSR and API endpoints.

---

## ADR-005: Russia Gated Market Policy (Inquiry-Only)

### Context
Due to international payment processing restrictions and shipping logistics, standard automated e-commerce checkout to Russia is suspended. However, Russian art collectors and cultural institutions maintain significant interest in traditional Indian folk art.

### Decision
- Implement an explicit feature flag: `RU_CHECKOUT = false`.
- For Russian visitors / language routes (`/ru/...`):
  - Disable cart and automated checkout completely.
  - Present a dedicated **Inquiry Form** for direct private gallery consultation, packaging discussions, and compliant offline logistics coordination.
  - Strict compliance: No payment workarounds, crypto, or unvetted intermediaries will be constructed.

---

## ADR-006: Brand System & Design Integrity

### Context
Craftchirp represents handmade luxury born from the earth. The aesthetic must reflect **"museum-label restraint meets earthy warmth"** rather than generic AI tech templates.

### Decision
1. **Preserve All 6 Core Brand Tokens**:
   - Clay: `#8c5a45`
   - Terracotta: `#e07a5f`
   - Sand / Beige: `#d9c5b2`
   - Off-white Canvas: `#f4f1de`
   - Olive / Sage: `#818c78`
   - Deep Earth Charcoal: `#2d2a26`
2. **Typography**: Pair an authentic editorial serif (Playfair Display / Cormorant Garamond) for titles with a clean, highly legible sans-serif (Inter) for metadata and body copy.
3. **Imagery Integrity**: NEVER use AI-generated images masquerading as genuine artworks. In development, placeholder badges must clearly read *"Placeholder Asset - Pending Studio Photography"*. Production launch is blocked until Rachana's authentic artwork photos are staged.

