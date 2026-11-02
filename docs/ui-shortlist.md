# 21st.dev UI Component Shortlist

This document curates high-craft, accessible UI building blocks from **21st.dev** and the `shadcn/ui` ecosystem to accelerate Craftchirp's UI development. 

> **Guiding Principle**: Museum-label restraint meets earthy warmth. Art must be the hero. Zero heavy WebGL or distracting shader backgrounds; focus on generous whitespace, crisp typography, and tactile organic warmth.

---

## 1. Candidate Component Shortlist

| # | Category | Component Name & 21st.dev Reference | Where Used in Craftchirp | Why It Fits the Brief | Tailwind v4 & A11y Verification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Gallery / Grid** | *Color Filter Image Gallery* / *Responsive Masonry Grid* ([21st.dev/tag/galleries](https://21st.dev/tag/galleries)) | `/gallery` main catalog & collection landing pages | Provides smooth staggered transitions and maintains strict aspect-ratio containers without layout shift (CLS < 0.05). | Radix Dialog / Framer Motion compatible; full keyboard navigation. |
| **2** | **Artwork Card** | *Spotlight Artwork Card* ([21st.dev/tag/cards](https://21st.dev/tag/cards)) | `/gallery`, `/collections/[slug]`, related artworks | Subtle 2% image scale on hover, clean museum caption beneath showing title, artist, medium, and currency price. | Uses CSS transforms only; zero layout thrashing. |
| **3** | **Navigation** | *Minimalist Blur Header* ([21st.dev/tag/navigation](https://21st.dev/tag/navigation)) | Root Layout Header (`src/components/layout/Header.tsx`) | Transparent on hero, transforms to `bg-brand-offwhite/90` with subtle backdrop blur on scroll. Restrained and unobtrusive. | Mobile hamburger dialog with trap-focus and Escape key handler. |
| **4** | **Filter System** | *Facet Filter Drawer & Multi-Select Accordion* ([21st.dev/tag/filters](https://21st.dev/tag/filters)) | `/gallery` filter bar and mobile filter drawer | Clean chip pills for style (*Warli, Madhubani*), orientation, and dimension sliders (dual cm/inch). | Radix Accordion primitive; accessible ARIA expanded states. |
| **5** | **Dialog / Modal** | *Animated Modal Dialog* ([21st.dev/tag/dialogs](https://21st.dev/tag/dialogs)) | "See It On Your Wall" visualizer, Inquiry Modal, Certificate of Authenticity preview | Clean modal overlay with smooth fade-in and scale; backdrop blur; non-intrusive. | Radix Dialog; autofocus management, screen reader labels. |
| **6** | **Checkout Stepper** | *Minimal Progress Stepper* ([21st.dev/tag/steppers](https://21st.dev/tag/steppers)) | Checkout page (`/checkout`) | Clear 3-step indicator: (1) Destination & Shipping, (2) Duties & Review, (3) Payment. Instills collector trust. | Semantic `<ol>` with `aria-current="step"`. |
| **7** | **FAQ Accordion** | *Editorial FAQ Accordion* ([21st.dev/tag/accordions](https://21st.dev/tag/accordions)) | `/shipping-duties`, `/returns`, and PDP care section | Clean horizontal divider lines with serif questions and smooth height expansion. | Radix Accordion with keyboard arrow navigation. |
| **8** | **Provenance Quote** | *Minimalist Testimonial Card* ([21st.dev/tag/testimonials](https://21st.dev/tag/testimonials)) | `/about`, artwork provenance blocks | Elegant serif pull-quotes emphasizing the 15+ year artistic lineage and cultural heritage of Warli art. | Semantic `<blockquote>` with `<cite>`. |
| **9** | **Footer** | *Multi-Column Editorial Footer* ([21st.dev/tag/footers](https://21st.dev/tag/footers)) | Root Layout Footer (`src/components/layout/Footer.tsx`) | Deep charcoal background (`#2d2a26`) with sand accents (`#d9c5b2`); policy links, currency selector, and newsletter. | Semantic `<footer>` with structured link groups. |
| **10** | **Toast Notifications**| *Clean Floating Toast* ([21st.dev/tag/toasts](https://21st.dev/tag/toasts)) | Reservation timer warnings, Cart actions, Copied share links | Lightweight floating notification with high-contrast earthy border and progress countdown. | Uses Sonner / Radix Toast with `aria-live="polite"`. |
| **11** | **Empty State** | *Artisanal Empty State* ([21st.dev/tag/empty-states](https://21st.dev/tag/empty-states)) | `/gallery` when active filters return 0 matching pieces | Warm illustrative outline with "Reset All Filters" button and option to "Request a Custom Commission". | Accessible heading and focusable reset button. |
| **12** | **Pagination / Load** | *Curatorial Pagination & Infinite Load* ([21st.dev/tag/pagination](https://21st.dev/tag/pagination)) | `/gallery`, `/journal` | Clean numbered pagination with URL pushState, canonical links, and graceful "Showing 1–12 of 36 original works". | Accessible `<nav aria-label="Pagination">`. |

---

## 2. Adoption & Integration Rules

1. **Brand Token Strictness**: Replace any generic zinc, slate, or blue color variables with Craftchirp tokens (`--color-brand-clay`, `--color-brand-terracotta`, `--color-brand-sand`, `--color-brand-offwhite`, `--color-brand-charcoal`).
2. **Tailwind v4 Native**: All components must be checked against Tailwind v4 syntax (no obsolete `@apply` patterns from v3 that trigger PostCSS warnings; use modern `@theme` CSS custom properties).
3. **No Heavy Shader Dependencies**: Discard any component requiring `@react-three/fiber` or heavy Three.js canvas in the critical rendering path.

