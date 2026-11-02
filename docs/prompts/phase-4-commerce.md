# Phase 4 Scoped Sub-Prompt: Commerce & Landed Cost Engine

## Objective
Build the e-commerce transaction engine: cart, multi-currency display using owner-set prices, config-driven landed-cost engine (`data/duty-rules.json`), insured shipping calculator, 3-step checkout with address validation, Certificate of Authenticity generator, gated Russian market enforcement (`RU_CHECKOUT=false`), and protected owner admin portal. All payments in TEST mode.

## Starting State
- Phase 1–3 complete: Data models, atomic reservation manager (13/13 tests passing), catalogue, PDP with texture zoom, and virtual exhibitions.
- No checkout or cart pages exist.
- Landed-cost rules and shipping rate tables not yet configured.

## Target State
1. **Duty & Customs Config** (`data/duty-rules.json` & `src/lib/commerce/landed-cost.ts`):
   - Config-driven duty/tax rules with last-verified dates.
   - EU Council Regulation (EU) 2026/382: €3 interim duty for goods $\le €150$ + IOSS VAT; standard customs duty + import VAT for goods $> €150$.
   - US: Section 321 de minimis suspension, formal/informal entry filing, 0% duty on HTS 9701 original art.
   - Russia: `RU_CHECKOUT=false` policy with redirect to `/ru/inquiry`.
2. **Shipping Calculator** (`data/shipping-rates.json` & `src/lib/commerce/shipping.ts`):
   - Dimensional weight formula ($L \times W \times H / 5000$) for custom MDF crating.
   - Zone-based rates with full insurance coverage.
3. **Cart & Timed Hold Integration** (`src/app/cart/page.tsx` & `src/lib/commerce/cart-store.ts`):
   - Single-item cart reflecting owner-set currency prices.
   - 15-minute timed hold countdown timer.
4. **Checkout Engine** (`src/app/checkout/page.tsx`):
   - Step 1: Destination address validation with mandatory international customs phone number.
   - Step 2: Landed-cost breakdown (DDP/DAP transparent itemization).
   - Step 3: Test payment provider simulation (Stripe / Razorpay in TEST mode).
5. **Certificate of Authenticity Generator** (`src/lib/commerce/certificate-generator.ts`):
   - Serialized certificate ID, issuance date, physical dimensions, materials, signed by Rachana Agarwal.
6. **Order Confirmation** (`src/app/order-confirmation/[orderId]/page.tsx`):
   - Success state, delivery timeline, CoA view and print.
7. **Russian Inquiry Portal** (`src/app/ru/inquiry/page.tsx`):
   - Dedicated Russian inquiry flow without payment workarounds.
8. **Owner Admin Portal** (`src/app/admin/page.tsx`):
   - Order management: mark shipped, add tracking number, mark sold, view certificates.
9. **Gate**:
   - All payments in TEST mode; owner approval before any live keys.

## File Scope
- `docs/prompts/phase-4-commerce.md`
- `data/duty-rules.json`
- `data/shipping-rates.json`
- `src/lib/commerce/landed-cost.ts`
- `src/lib/commerce/shipping.ts`
- `src/lib/commerce/cart-store.ts`
- `src/lib/commerce/certificate-generator.ts`
- `src/app/cart/page.tsx`
- `src/app/checkout/page.tsx`
- `src/app/order-confirmation/[orderId]/page.tsx`
- `src/app/ru/inquiry/page.tsx`
- `src/app/admin/page.tsx`
- `task.md`
- `implementation_plan.md`

## Do-Not-Touch List
- Do not enable live payment keys or process real financial charges.
- Do not create payment workarounds for gated markets.
- Do not alter core brand tokens in `globals.css`.

## Stop Conditions
- Stop once all commerce flows, landed-cost calculations, CoA generator, and admin portal are verified with tests and typechecks.
- GATE: Require owner approval before any live payment configuration.

