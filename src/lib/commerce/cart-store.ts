/**
 * Client Cart & Reservation State Manager
 * Handles single-item original art acquisition with timed hold synchronization.
 */

import { Artwork, CurrencyCode } from '@/types/models';

export interface CartState {
  item: Artwork | null;
  currency: CurrencyCode;
  sessionId: string;
  reservationId: string | null;
  expiresAt: string | null; // ISO string
  destinationCountry?: string;
}

const STORAGE_KEY = 'craftchirp_cart_session_v1';

function getOrGenerateSessionId(): string {
  if (typeof window === 'undefined') return 'server-session';
  let sid = localStorage.getItem('craftchirp_session_id');
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('craftchirp_session_id', sid);
  }
  return sid;
}

export class CartStore {
  public static get(): CartState {
    if (typeof window === 'undefined') {
      return {
        item: null,
        currency: 'USD',
        sessionId: 'server-session',
        reservationId: null,
        expiresAt: null,
      };
    }

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load cart state from localStorage:', e);
    }

    const initial: CartState = {
      item: null,
      currency: 'USD',
      sessionId: getOrGenerateSessionId(),
      reservationId: null,
      expiresAt: null,
    };
    return initial;
  }

  public static setItem(
    artwork: Artwork,
    currency: CurrencyCode = 'USD',
    holdMinutes = 15
  ): CartState {
    const sessionId = getOrGenerateSessionId();
    const expiresAt = new Date(Date.now() + holdMinutes * 60 * 1000).toISOString();
    const reservationId = `res_${Date.now()}_${artwork.id.substring(0, 6)}`;

    const newState: CartState = {
      item: artwork,
      currency,
      sessionId,
      reservationId,
      expiresAt,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    }
    return newState;
  }

  public static setDestinationCountry(country: string): void {
    if (typeof window === 'undefined') return;
    try {
      const current = CartStore.get();
      current.destinationCountry = country;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.error('Failed to update destination country:', e);
    }
  }

  public static clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  public static getRemainingSeconds(expiresAtIso: string | null): number {
    if (!expiresAtIso) return 0;
    const diffMs = new Date(expiresAtIso).getTime() - Date.now();
    return Math.max(0, Math.floor(diffMs / 1000));
  }
}

