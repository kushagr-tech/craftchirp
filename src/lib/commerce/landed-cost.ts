/**
 * Config-Driven Landed-Cost Engine
 * Implements EU Council Regulation (EU) 2026/382, U.S. Section 321 de minimis suspension,
 * and transparent DDP/DAP tax calculations for international fine art and handmade goods.
 */

import dutyRulesData from '../../../data/duty-rules.json';
import shippingRatesData from '../../../data/shipping-rates.json';
import { CurrencyCode, LandedCostBreakdown } from '../../types/models';

export interface LandedCostItem {
  id: string;
  title: string;
  price: number;
  currency: CurrencyCode;
  hsCode: string; // e.g. "9701.21.00" or "7117.90.90"
  packagedWeightGrams: number;
  packagedDimensions: {
    lengthCm: number;
    widthCm: number;
    heightCm: number;
  };
}

export interface LandedCostCalculationResult {
  checkoutDisabled: boolean;
  complianceReason?: string;
  breakdown: LandedCostBreakdown;
  shippingCarrier: string;
  transitDaysString: string;
  billableWeightKg: number;
}

export class LandedCostEngine {
  public static calculate(
    destinationCountryCode: string,
    items: LandedCostItem[],
    requestedCurrency?: CurrencyCode
  ): LandedCostCalculationResult {
    const countryUpper = destinationCountryCode.toUpperCase();
    const dutyConfig = (dutyRulesData.countries as any)[countryUpper] || (dutyRulesData.countries as any)['US'];

    // 1. Compliance Gate: Russia & sanctioned jurisdictions
    if (dutyConfig.checkoutDisabled) {
      return {
        checkoutDisabled: true,
        complianceReason: dutyConfig.complianceNote || 'Automated checkout is restricted for this jurisdiction.',
        breakdown: {
          currency: requestedCurrency || 'USD',
          subtotal: 0,
          shipping: 0,
          customsDuty: 0,
          importVat: 0,
          total: 0,
          dutyModel: 'DAP',
        },
        shippingCarrier: 'N/A',
        transitDaysString: 'Inquiry Only',
        billableWeightKg: 0,
      };
    }

    const currency: CurrencyCode = requestedCurrency || (dutyConfig.currency as CurrencyCode) || 'USD';

    // 2. Subtotal
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);

    // 3. Weight & Dimensional Weight
    let totalActualGrams = 0;
    let totalDimWeightKg = 0;

    for (const item of items) {
      totalActualGrams += item.packagedWeightGrams;
      const { lengthCm, widthCm, heightCm } = item.packagedDimensions;
      const dimKg = (lengthCm * widthCm * heightCm) / shippingRatesData.metadata.dimensionalDivisor;
      totalDimWeightKg += dimKg;
    }

    const actualWeightKg = totalActualGrams / 1000;
    const billableWeightKg = Math.max(actualWeightKg, totalDimWeightKg);

    // 4. Shipping Calculation
    let zoneKey = 'ROW';
    if (countryUpper === 'US' || countryUpper === 'CA') zoneKey = 'US';
    else if (dutyConfig.isEuMember || countryUpper === 'DE' || countryUpper === 'FR') zoneKey = 'EU';
    else if (countryUpper === 'GB') zoneKey = 'GB';
    else if (countryUpper === 'IN') zoneKey = 'IN';

    const shippingZone = (shippingRatesData.zones as any)[zoneKey] || (shippingRatesData.zones as any)['ROW'];
    const baseWeight = shippingZone.baseWeightKg;
    const baseRate = shippingZone.baseRate;
    const halfKgRate = shippingZone.additionalHalfKgRate;
    const insurancePercent = shippingZone.insurancePercent;

    let shippingCost = baseRate;
    if (billableWeightKg > baseWeight) {
      const extraWeight = billableWeightKg - baseWeight;
      const extraSteps = Math.ceil(extraWeight / 0.5);
      shippingCost += extraSteps * halfKgRate;
    }

    // Add insurance
    const insuranceFee = (subtotal * insurancePercent) / 100;
    shippingCost += insuranceFee;

    // 5. Customs Duty & Entry Filing Calculations
    let customsDuty = 0;
    let dutyNotes = '';

    for (const item of items) {
      const hsPrefix = item.hsCode.substring(0, 4); // "9701" or "7117"

      // EU Rules (Council Regulation (EU) 2026/382 effective 1 July 2026)
      if (dutyConfig.isEuMember) {
        if (item.price <= dutyConfig.lowValueThresholdEur) {
          // €3 flat interim duty per item line
          customsDuty += dutyConfig.interimFlatDutyEur;
          dutyNotes = 'Includes €3 interim EU customs duty under Regulation (EU) 2026/382 for parcel lines <= €150.';
        } else {
          // Standard duty rate above €150
          const hsRule = dutyConfig.hsRules?.[hsPrefix];
          const rate = hsRule ? hsRule.dutyRateAboveThresholdPercent : 0.0;
          customsDuty += (item.price * rate) / 100;
          dutyNotes = hsRule?.notes || 'Standard EU fine art import tariff applied.';
        }
      }
      // US Rules (Section 321 de minimis suspension)
      else if (countryUpper === 'US') {
        const hsRule = dutyConfig.hsRules?.[hsPrefix];
        if (hsRule) {
          const tariffAmount = (item.price * hsRule.dutyRatePercent) / 100;
          customsDuty += tariffAmount + hsRule.entryProcessingFeeUsd;
          dutyNotes = hsRule.notes;
        } else {
          customsDuty += 2.22; // Baseline informal entry processing fee
        }
      }
      // GB Rules
      else if (countryUpper === 'GB') {
        const hsRule = dutyConfig.hsRules?.[hsPrefix];
        if (hsRule) {
          customsDuty += (item.price * hsRule.dutyRatePercent) / 100;
        }
      }
    }

    // 6. Import VAT / GST Calculation
    let importVat = 0;
    if (dutyConfig.isDomestic && dutyConfig.gstRatePercent) {
      // Domestic India GST on artwork
      importVat = (subtotal * dutyConfig.gstRatePercent) / 100;
    } else if (dutyConfig.vatRatePercent && dutyConfig.vatRatePercent > 0) {
      // Import VAT base = Subtotal + Customs Duty + Shipping (standard CIF valuation)
      const vatTaxableBase = subtotal + customsDuty + shippingCost;
      importVat = (vatTaxableBase * dutyConfig.vatRatePercent) / 100;
    }

    // 7. Landed Total
    const total = Math.round((subtotal + shippingCost + customsDuty + importVat) * 100) / 100;

    return {
      checkoutDisabled: false,
      breakdown: {
        currency,
        subtotal: Math.round(subtotal * 100) / 100,
        shipping: Math.round(shippingCost * 100) / 100,
        customsDuty: Math.round(customsDuty * 100) / 100,
        importVat: Math.round(importVat * 100) / 100,
        total,
        dutyModel: (dutyConfig.dutyModel as 'DDP' | 'DAP') || 'DDP',
        dutyNotes,
      },
      shippingCarrier: shippingZone.carrier,
      transitDaysString: `${shippingZone.transitDaysMin}–${shippingZone.transitDaysMax} business days`,
      billableWeightKg: Math.round(billableWeightKg * 10) / 10,
    };
  }
}
