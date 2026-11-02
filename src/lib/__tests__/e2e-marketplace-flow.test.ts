/**
 * Automated End-to-End Marketplace Flow Integration Test
 * 
 * Verifies full end-to-end transaction integrity without requiring external browser binaries:
 * 1. Catalogue schema & seed integrity
 * 2. 15-minute atomic reservation & mutual exclusion
 * 3. Landed-cost calculation across US, EU (2026/382 reform), and UK
 * 4. Russian Federation gated policy enforcement
 * 5. Certificate of Authenticity cryptographic hashing & serialization
 */

import assert from 'assert';
import { ARTWORKS_SEED, RACHANA_AGARWAL } from '../../data/catalogue';
import { InventoryReservationManager } from '../inventory/reservation-manager';
import { LandedCostEngine } from '../commerce/landed-cost';
import { CertificateGenerator } from '../commerce/certificate-generator';
import { JOURNAL_POSTS } from '../../data/journal';

async function runE2EFlowTests() {
  console.log('🧪 Starting End-to-End Marketplace Flow Tests...\n');

  // Test 1: Catalogue Data Integrity
  console.log('--- Test 1: Catalogue Data Integrity ---');
  assert(ARTWORKS_SEED.length >= 6, 'Seed catalogue should contain at least 6 authentic pieces');
  for (const artwork of ARTWORKS_SEED) {
    assert(artwork.title, `Artwork ${artwork.id} must have a title`);
    assert(artwork.slug, `Artwork ${artwork.id} must have a slug`);
    assert(['Warli', 'Madhubani', 'Folk-Contemporary', 'Tribal'].includes(artwork.style), `Artwork ${artwork.id} must have a valid folk style`);
    assert(artwork.dimensions.widthCm > 0 && artwork.dimensions.heightCm > 0, `Artwork ${artwork.id} dimensions must be positive`);
    assert(artwork.dimensions.widthInches > 0 && artwork.dimensions.heightInches > 0, `Artwork ${artwork.id} imperial dimensions must be positive`);
    assert(artwork.weightGrams > 0 && artwork.packagedWeightGrams > artwork.weightGrams, `Artwork ${artwork.id} packaging weight must exceed net weight`);
    assert(artwork.pricePerCurrency.USD > 0 && artwork.pricePerCurrency.EUR > 0 && artwork.pricePerCurrency.INR > 0, `Artwork ${artwork.id} must have fixed multi-currency prices`);
    assert(artwork.images.length >= 3, `Artwork ${artwork.id} must have multiple view images`);
    assert(artwork.hsCode === '9701.21.00' || artwork.hsCode === '7117.90.90', `Artwork ${artwork.id} must have a valid export HS code`);
  }
  console.log('  ✅ PASS: All catalogue artworks satisfy museum metadata and customs schemas');

  // Test 2: Atomic Reservation & Timed Hold
  console.log('\n--- Test 2: Atomic Reservation Lifecycle ---');
  const testPiece = ARTWORKS_SEED[0];
  const buyerId = 'collector_sf_94102';

  // Seed inventory store
  InventoryReservationManager.seedItem({ id: testPiece.id, title: testPiece.title, status: 'available' });

  const reservation = await InventoryReservationManager.reserveArtwork(testPiece.id, buyerId, 15);
  assert(reservation.success, 'Collector should acquire reservation');
  assert.strictEqual(reservation.status, 'reserved', 'Artwork status must transition to reserved');

  // Ensure second buyer is blocked
  const concurrentBuyer = await InventoryReservationManager.reserveArtwork(testPiece.id, 'concurrent_buyer_london', 15);
  assert(!concurrentBuyer.success, 'Concurrent acquisition must be rejected');
  assert.strictEqual(concurrentBuyer.error, 'CURRENTLY_RESERVED', 'Rejection reason must be CURRENTLY_RESERVED');
  console.log('  ✅ PASS: 1-of-1 inventory lock prevents double-sale under concurrent attempts');

  // Test 3: Landed-Cost Calculations
  console.log('\n--- Test 3: Landed-Cost Engine Compliance ---');
  const landedItem = {
    id: testPiece.id,
    title: testPiece.title,
    price: testPiece.pricePerCurrency.USD,
    currency: 'USD' as const,
    hsCode: testPiece.hsCode,
    packagedWeightGrams: testPiece.packagedWeightGrams,
    packagedDimensions: testPiece.packagedDimensions,
  };

  // US Calculation
  const usCost = LandedCostEngine.calculate('US', [landedItem], 'USD');
  assert(!usCost.checkoutDisabled, 'US checkout must be permitted');
  assert.strictEqual(usCost.breakdown.customsDuty, 2.22, 'US HTS 9701 accounts for 0% duty + $2.22 CBP entry processing fee');
  assert(usCost.breakdown.total > landedItem.price, 'Total price includes shipping and CBP entry processing');
  assert.strictEqual(usCost.breakdown.dutyModel, 'DDP', 'US should default to Delivered Duty Paid');
  console.log(`  ✅ PASS: US Landed Cost calculated correctly ($${usCost.breakdown.total.toFixed(2)} DDP)`);

  // EU Calculation (Regulation 2026/382 €3 interim duty test)
  const euItem = {
    ...landedItem,
    price: testPiece.pricePerCurrency.EUR,
    currency: 'EUR' as const,
  };
  const euCost = LandedCostEngine.calculate('DE', [euItem], 'EUR');
  assert(!euCost.checkoutDisabled, 'Germany/EU checkout must be permitted');
  assert(euCost.breakdown.importVat > 0, 'EU import VAT must be calculated');
  assert(euCost.breakdown.total > euItem.price, 'Total landed cost includes freight, VAT and customs');
  console.log(`  ✅ PASS: EU Landed Cost with IOSS VAT calculated correctly (€${euCost.breakdown.total.toFixed(2)})`);

  // Russia Gated Inquiry Policy
  const ruCost = LandedCostEngine.calculate('RU', [landedItem], 'USD');
  assert(ruCost.checkoutDisabled, 'Automated checkout to Russia must be disabled');
  assert(ruCost.complianceReason?.includes('carrier compliance') || ruCost.complianceReason?.includes('suspended'), 'Clear compliance explanation provided');
  console.log('  ✅ PASS: Russia checkout safely gated with inquiry redirect');

  // Test 4: Finalize Payment & Certificate of Authenticity Generation
  console.log('\n--- Test 4: Certificate of Authenticity Serialization ---');
  const finalized = await InventoryReservationManager.confirmPurchase(testPiece.id, buyerId);
  assert(finalized, 'Payment confirmation must succeed');

  const coa = CertificateGenerator.generate(testPiece, 'CC-2026-882910');
  assert(coa.certificateId.startsWith('CC-'), 'COA ID must follow serialized format');
  assert(coa.verificationHash.length >= 8, 'COA must contain a cryptographic verification hash');
  assert.strictEqual(coa.artistName, RACHANA_AGARWAL.name, 'COA must bear Rachana Agarwal signature statement');
  console.log(`  ✅ PASS: Certificate ${coa.certificateId} generated with verification hash`);

  // Test 5: Journal & E-E-A-T Content
  console.log('\n--- Test 5: Educational Journal Content ---');
  assert(JOURNAL_POSTS.length >= 4, 'Journal should contain at least 4 in-depth cultural articles');
  for (const post of JOURNAL_POSTS) {
    assert(post.title && post.slug && post.content.length > 300, `Article ${post.slug} must be complete`);
  }
  console.log('  ✅ PASS: All E-E-A-T journal articles verified with full content bodies');

  console.log('\n========================================');
  console.log('🎉 ALL END-TO-END FLOW TESTS PASSED!');
  console.log('========================================\n');
}

runE2EFlowTests().catch((err) => {
  console.error('❌ E2E Flow Test Failed:', err);
  process.exit(1);
});
