# CraftChirp Creations Website Implementation Plan

This document outlines the proposed architecture, tech stack, and execution plan for the CraftChirp Creations digital art gallery.

## Goal Description

Build a premium, visually-strong, high-performance, frontend-only digital art gallery for CraftChirp Creations. The website will highlight eco-luxury handmade mud art using natural materials and cow dung. The presentation will emulate a modern, high-end art exhibition using visual storytelling and smooth animations. 

## Proposed Architecture & Tech Stack

*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion (for staggered grid reveals, fades, scroll-triggered animations) & Lenis (for premium smooth scrolling across the entire site)
*   **Icons:** Lucide React
*   **Fonts:** Inter & a premium serif font like Playfair Display (for high-end elegance)
*   **Deployment Target:** Frontend-only (Static export or standard Next.js deployment)

## Proposed Changes

### 1. Global Setup
*   Initialize Next.js project with App Router and Tailwind CSS.
*   Configure color palette in `tailwind.config.ts`:
    *   Clay brown (`#8c5a45`)
    *   Terracotta (`#e07a5f`)
    *   Sand / beige (`#d9c5b2`)
    *   Off-white (`#f4f1de`)
    *   Olive / sage green (`#818c78`)
*   Setup global CSS and typography.
*   Configure Lenis smooth scrolling provider to wrap the application.

### 2. Layout & Components (`src/components/`)
*   [NEW] `Layout/Header.tsx`: Minimal modern sticky/transparent navigation bar.
*   [NEW] `Layout/Footer.tsx`: Simple footer with contact/socials.
*   [NEW] `UI/Section.tsx`: Reusable container with padding and animation wrappers.
*   [NEW] `UI/Lightbox.tsx`: Custom Framer Motion powered lightbox for viewing artwork in high resolution.
*   [NEW] `UI/SmoothScroll.tsx`: Wrapper utilizing Lenis.

### 3. Homepage Sections (`src/components/sections/`)
*   [NEW] `Hero.tsx`: Full-screen hero section. Headline: "Art Born from Earth". Large immersive background image with parallax effect, trust signal badges (Natural, Sustainable, Handmade, Odor-Free).
*   [NEW] `WhyThisArt.tsx`: Visual storytelling showcasing eco-friendly, zero-chemical, odorless, and durable qualities.
*   [NEW] `TheProcess.tsx`: Scroll-based storytelling of the process (Raw materials, Preparation, Crafting, Drying, Final artwork).
*   [NEW] `GalleryPreview.tsx`: Glimpse into the collections with hover zoom/glow effects.
*   [NEW] `InstagramFeed.tsx`: Curated fake feed layout for Instagram.

### 4. Pages Structure (`src/app/`)
*   [NEW] `page.tsx`: Composes all the homepage sections sequentially.
*   [NEW] `gallery/page.tsx`: Masonry layout for gallery items with filtering and Lightbox integration.
*   [NEW] `about/page.tsx`: Contains the story, passion, and cultural roots of CraftChirp.
*   [NEW] `contact/page.tsx`: Minimal contact form and commission inquiries layout.

## Open Questions

> [!IMPORTANT]
> - Do you have the specific high-resolution images required right now, or should I generate premium AI placeholders (using Midjourney/DALL-E style prompts via `generate_image`) that fit the described aesthetics for the time being?
> - Would you prefer a standard server-side rendering setup for Next.js, or a static HTML export (`output: export`)? This depends on your preferred hosting (Vercel vs. GitHub Pages/S3).

## Verification Plan

### Automated Checks
*   Verify application compiles with zero warnings `npm run build`.
*   Ensure Lighthouse score tests pass for Performance and SEO.

### Manual Verification
*   Test responsive design across simulated mobile, tablet, and desktop viewports.
*   Verify framer-motion animations trigger smoothly on scroll.
*   Check that Lenis scrolling provides a premium 60fps feel without jank.
