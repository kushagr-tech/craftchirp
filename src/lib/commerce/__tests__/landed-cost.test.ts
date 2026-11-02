/**
 * Test Suite: Config-Driven Landed Cost & Customs Engine
 * Verifies EU 2026/382 customs reform, US de minimis suspension, and Russia compliance gating.
 */

import { LandedCostEngine } from '../landed-cost';

async function runLandedCostTests() {
  console.log('🧪 Starting Landed Cost & Duty Rules Verification Tests...\n');
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

  // TEST 1: US Original Art (HTS 9701)
  const usArtResult = LandedCostEngine.calculate('US', [
    {
      id: 'art-001',
      title: 'Rhythm of the Tarpa',
      price: 420,
      currency: 'USD',
      hsCode: '9701.21.00',
      packagedWeightGrams: 1600,
      packagedDimensions: { lengthCm: 38, widthCm: 38, heightCm: 8 },
    },
  ]);

  assert(!usArtResult.checkoutDisabled, 'US checkout is enabled');
  assert(usArtResult.breakdown.dutyModel === 'DDP', 'US defaults to DDP model');
  assert(usArtResult.breakdown.customsDuty === 2.22, 'US charges CBP entry processing fee ($2.22) on 0% duty original art');
  assert(usArtResult.breakdown.importVat === 0, 'US import VAT is 0%');
  assert(usArtResult.breakdown.shipping > 45, 'Shipping cost calculated with dimensional weight and art insurance');

  // TEST 2: EU Low-Value Item (<= €150) under Regulation (EU) 2026/382
  const euLowValueResult = LandedCostEngine.calculate('DE', [
    {
      id: 'art-005',
      title: 'Terracotta Folk Sun Necklace',
      price: 88,
      currency: 'EUR',
      hsCode: '7117.90.90',
      packagedWeightGrams: 200,
      packagedDimensions: { lengthCm: 15, widthCm: 12, heightCm: 5 },
    },
  ]);

  assert(!euLowValueResult.checkoutDisabled, 'EU checkout is enabled');
  assert(
    euLowValueResult.breakdown.customsDuty === 3.0,
    'EU correctly applies €3 flat interim duty under Council Regulation (EU) 2026/382 for parcel lines <= €150'
  );
  assert(euLowValueResult.breakdown.importVat > 0, 'EU calculates German 19% import VAT via IOSS');

  // TEST 3: EU High-Value Original Art (> €150)
  const euHighValueResult = LandedCostEngine.calculate('DE', [
    {
      id: 'art-001',
      title: 'Rhythm of the Tarpa',
      price: 390,
      currency: 'EUR',
      hsCode: '9701.21.00',
      packagedWeightGrams: 1600,
      packagedDimensions: { lengthCm: 38, widthCm: 38, heightCm: 8 },
    },
  ]);

  assert(
    euHighValueResult.breakdown.customsDuty === 0,
    'EU original art (> €150) enters duty-free under standard tariff schedule'
  );
  assert(euHighValueResult.breakdown.importVat > 0, 'EU calculates German 19% import VAT on high-value art');

  // TEST 4: Russia Gated Market Policy (RU_CHECKOUT=false)
  const russiaResult = LandedCostEngine.calculate('RU', [
    {
      id: 'art-001',
      title: 'Rhythm of the Tarpa',
      price: 420,
      currency: 'USD',
      hsCode: '9701.21.00',
      packagedWeightGrams: 1600,
      packagedDimensions: { lengthCm: 38, widthCm: 38, heightCm: 8 },
    },
  ]);

  assert(russiaResult.checkoutDisabled === true, 'Russia automated checkout is disabled');
  assert(
    Boolean(russiaResult.complianceReason?.includes('suspended')),
    'Compliance reason clearly notes international carrier compliance'
  );

  console.log(`\n📊 Landed Cost Test Results: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runLandedCostTests().catch((err) => {
  console.error('Landed cost test error:', err);
  process.exit(1);
});
