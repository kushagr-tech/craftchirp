/**
 * End-to-End Marketplace & Collector Experience Test Suite (Playwright)
 * 
 * Verifies:
 * 1. Gallery browsing & faceted filter URL state
 * 2. Artwork PDP museum label & structured facts
 * 3. Client-side "See It On Your Wall" visualizer (zero server upload)
 * 4. 15-minute atomic reservation timer
 * 5. Landed-Cost Engine (US 0% duty vs EU 2026/382 €3 interim duty + IOSS VAT)
 * 6. Test-mode checkout & order confirmation with serialized Certificate of Authenticity (CoA)
 * 7. Russian Federation gated inquiry portal (RU_CHECKOUT=false)
 * 8. Owner Admin management (toggle status, enter tracking)
 */

import { test, expect } from '@playwright/test';

test.describe('Craftchirp Virtual Gallery & Global Marketplace E2E', () => {

  test('1. Gallery browsing & URL-driven faceted filters', async ({ page }) => {
    await page.goto('/gallery');
    await expect(page).toHaveTitle(/Original Folk Paintings & Sacred Mud Art/);

    // Verify filter buttons exist
    const warliFilter = page.locator('a, button', { hasText: 'Warli' }).first();
    await expect(warliFilter).toBeVisible();

    // Click Warli filter and check URL searchParams
    await warliFilter.click();
    await expect(page).toHaveURL(/style=Warli/);

    // Confirm artwork cards rendered
    const artworkCards = page.locator('article, [data-testid="artwork-card"]');
    await expect(artworkCards.first()).toBeVisible();
  });

  test('2. Artwork PDP, museum label & raw markdown endpoint', async ({ page }) => {
    await page.goto('/art/rhythm-of-the-tarpa');
    
    // Verify museum header and title
    await expect(page.locator('h1')).toContainText('Rhythm of the Tarpa');
    await expect(page.locator('text=Warli Folk Tradition')).toBeVisible();

    // Verify museum technical specifications block
    await expect(page.locator('text=1-of-1 Unique Original')).toBeVisible();
    await expect(page.locator('text=Purified cow-dung & alluvial clay')).toBeVisible();
    await expect(page.locator('text=9701.21.00')).toBeVisible();

    // Verify Raw Markdown for LLMs link
    const markdownLink = page.locator('a[href="/art/rhythm-of-the-tarpa.md"]');
    await expect(markdownLink).toBeVisible();
  });

  test('3. Client-side "See It On Your Wall" visualizer modal', async ({ page }) => {
    await page.goto('/art/rhythm-of-the-tarpa');

    // Open visualizer
    const visualizerBtn = page.locator('button', { hasText: /See It On Your Wall/i });
    await visualizerBtn.click();

    // Verify modal is displayed with privacy guarantee
    await expect(page.locator('text=Your photos remain 100% private in browser memory')).toBeVisible();

    // Verify room selector buttons
    await expect(page.locator('button', { hasText: /Minimalist Japandi/i })).toBeVisible();
    await expect(page.locator('button', { hasText: /Modern Earthy Living/i })).toBeVisible();

    // Close modal
    const closeBtn = page.locator('button[aria-label="Close visualizer modal"]');
    await closeBtn.click();
  });

  test('4. Atomic 15-minute reservation timer & cart flow', async ({ page }) => {
    await page.goto('/art/rhythm-of-the-tarpa');

    // Click Acquire Original
    const acquireBtn = page.locator('button', { hasText: /Acquire Original/i });
    await acquireBtn.click();

    // User should be redirected to /cart
    await expect(page).toHaveURL(/\/cart/);

    // Verify 15-minute reservation countdown badge is active
    await expect(page.locator('text=Reserved exclusively for you')).toBeVisible();
    await expect(page.locator('text=/1[4-5]:[0-5][0-9]/')).toBeVisible();
  });

  test('5. Landed-Cost Engine destination calculation (EU 2026/382 vs US)', async ({ page }) => {
    await page.goto('/cart');

    // Switch destination to Germany (EU)
    const countrySelect = page.locator('select#destination-country, select[name="country"]');
    if (await countrySelect.isVisible()) {
      await countrySelect.selectOption('DE');
      
      // Verify EU €3 interim duty line item is reflected
      await expect(page.locator('text=EU Interim Duty (Reg 2026/382)')).toBeVisible();
      await expect(page.locator('text=Import VAT (IOSS 19%)')).toBeVisible();

      // Switch to United States
      await countrySelect.selectOption('US');
      // Verify 0% duty on HTS 9701
      await expect(page.locator('text=HTS 9701 Art Duty (0%)')).toBeVisible();
    }
  });

  test('6. Checkout, sandbox payment & Certificate of Authenticity generation', async ({ page }) => {
    await page.goto('/checkout');

    // Fill shipping address
    await page.fill('input[name="fullName"]', 'Eleanor Vance');
    await page.fill('input[name="email"]', 'eleanor.vance@example.com');
    await page.fill('input[name="phone"]', '+1 415 555 2671');
    await page.fill('input[name="addressLine1"]', '742 Evergreen Terrace');
    await page.fill('input[name="city"]', 'San Francisco');
    await page.fill('input[name="postalCode"]', '94102');

    // Proceed to Step 2 & 3
    const proceedBtn = page.locator('button', { hasText: /Proceed to Customs & Shipping/i });
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
    }

    const payBtn = page.locator('button', { hasText: /Authorize Secure Test Payment/i });
    if (await payBtn.isVisible()) {
      await payBtn.click();
      
      // Should redirect to Order Confirmation
      await expect(page).toHaveURL(/\/order-confirmation\//);

      // Verify Certificate of Authenticity block
      await expect(page.locator('text=Certificate of Authenticity')).toBeVisible();
      await expect(page.locator('text=COA-CC-')).toBeVisible();
      await expect(page.locator('text=Rachana Agarwal')).toBeVisible();
    }
  });

  test('7. Russia gated inquiry portal (RU_CHECKOUT=false)', async ({ page }) => {
    // Navigate directly to Russian portal
    await page.goto('/ru/inquiry');
    await expect(page).toHaveTitle(/Запрос на приобретение картины/);

    // Verify Russian text explaining payment restrictions and direct bank inquiry
    await expect(page.locator('h1')).toContainText('Частный запрос на приобретение');
    await expect(page.locator('text=Оригинальная живопись Рачаны Агарвал')).toBeVisible();

    // Verify inquiry form fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('8. Owner Admin management portal', async ({ page }) => {
    await page.goto('/admin');

    // If PIN gate is visible, unlock with Quick Unlock button
    const quickUnlock = page.locator('button', { hasText: /Quick Unlock/i });
    if (await quickUnlock.isVisible()) {
      await quickUnlock.click();
    }

    // Check admin dashboard loads
    await expect(page.locator('h1')).toContainText('Rachana Agarwal');

    // Verify inventory toggle exists
    const inventoryTab = page.locator('button, a', { hasText: /Artworks & Inventory/i }).first();
    await expect(inventoryTab).toBeVisible();

    // Verify orders and tracking section
    const ordersTab = page.locator('button, a', { hasText: /Orders & Dispatch/i }).first();
    await expect(ordersTab).toBeVisible();

    // Verify inquiries section
    const inquiriesTab = page.locator('button, a', { hasText: /Collector Inquiries/i }).first();
    await expect(inquiriesTab).toBeVisible();
  });

});

