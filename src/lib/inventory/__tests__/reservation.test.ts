/**
 * Test Suite: Inventory Reservation Manager Concurrency & Timed Holds
 * Verifies that one-of-a-kind artworks cannot be oversold under high concurrency.
 */

import { InventoryReservationManager } from '../reservation-manager';

async function runTests() {
  console.log('🧪 Starting Inventory Reservation Concurrency & Timed Hold Tests...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // TEST 1: Basic reservation
  InventoryReservationManager.reset();
  const artwork1 = 'art-warli-001';
  InventoryReservationManager.seedItem({ id: artwork1, title: 'Tarpa Dance Harvest' });

  const res1 = await InventoryReservationManager.reserveArtwork(artwork1, 'session-buyer-A', 15);
  assert(res1.success === true, 'Buyer A successfully reserves available 1-of-1 artwork');
  assert(res1.status === 'reserved', 'Artwork status transitions to reserved');
  assert(res1.expiresAt instanceof Date, 'Reservation receives a valid expiration timestamp');

  // TEST 2: Second buyer blocked during active hold
  const res2 = await InventoryReservationManager.reserveArtwork(artwork1, 'session-buyer-B', 15);
  assert(res2.success === false, 'Buyer B is blocked from reserving an artwork held by Buyer A');
  assert(res2.error === 'CURRENTLY_RESERVED', 'Error correctly identifies CURRENTLY_RESERVED');

  // TEST 3: Same buyer extends hold
  const res3 = await InventoryReservationManager.reserveArtwork(artwork1, 'session-buyer-A', 20);
  assert(res3.success === true, 'Buyer A can refresh/extend their active reservation');

  // TEST 4: Voluntary release returns item to available
  await InventoryReservationManager.releaseReservation(artwork1, 'session-buyer-A');
  const statusAfterRelease = InventoryReservationManager.getStatus(artwork1);
  assert(statusAfterRelease?.status === 'available', 'Voluntary release returns artwork to available');

  // TEST 5: High-concurrency race condition test
  // 50 concurrent buyers simultaneously trying to reserve the exact same 1-of-1 piece!
  console.log('\n  ⚡ Running Concurrency Stress Test: 50 simultaneous checkout requests for 1 piece...');
  const artworkRace = 'art-sacred-geometry';
  InventoryReservationManager.seedItem({ id: artworkRace, title: 'Sacred Mandala I' });

  const concurrentRequests = Array.from({ length: 50 }).map((_, index) => {
    const sessionId = `buyer-${index}`;
    return InventoryReservationManager.reserveArtwork(artworkRace, sessionId, 15);
  });

  const results = await Promise.all(concurrentRequests);

  const successfulReservations = results.filter((r) => r.success);
  const rejectedReservations = results.filter((r) => !r.success && r.error === 'CURRENTLY_RESERVED');

  assert(
    successfulReservations.length === 1,
    `Exactly ONE buyer acquired the lock under 50-way concurrency (Got: ${successfulReservations.length})`
  );
  assert(
    rejectedReservations.length === 49,
    `Exactly 49 buyers were safely rejected with CURRENTLY_RESERVED (Got: ${rejectedReservations.length})`
  );

  // TEST 6: Payment confirmation locks as sold permanently
  const winningSession = successfulReservations[0].reservationId ? results.find(r => r.success) : null;
  const winnerSessionId = results.findIndex(r => r.success);
  const soldSuccess = await InventoryReservationManager.confirmPurchase(artworkRace, `buyer-${winnerSessionId}`);
  assert(soldSuccess === true, 'Payment confirmation marks item as sold');

  // Any subsequent attempt to reserve a sold piece must be rejected
  const resAfterSold = await InventoryReservationManager.reserveArtwork(artworkRace, 'buyer-late', 15);
  assert(resAfterSold.success === false && resAfterSold.error === 'ALREADY_SOLD', 'Post-purchase reservation rejected with ALREADY_SOLD');

  // TEST 7: Expired hold auto-cleanup
  const artworkExpired = 'art-tarpa-ancient';
  InventoryReservationManager.seedItem({ id: artworkExpired, title: 'Ancient Sun Motif' });
  // Set hold with 0 minutes (instant expiry)
  await InventoryReservationManager.reserveArtwork(artworkExpired, 'buyer-timeout', -1);
  
  const released = await InventoryReservationManager.cleanupExpiredReservations();
  assert(released.includes(artworkExpired), 'Expired reservation is cleanly swept and released by cleanup worker');
  assert(InventoryReservationManager.getStatus(artworkExpired)?.status === 'available', 'Status returns to available after expiry cleanup');

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test runner encountered an error:', err);
  process.exit(1);
});
