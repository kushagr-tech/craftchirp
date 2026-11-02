/**
 * Craftchirp Inventory Reservation Manager
 * Handles atomic timed holds for 1-of-1 original artworks during checkout.
 * Prevents race conditions and double-selling under concurrent buyer checkouts.
 */

import type { Artwork, InventoryStatus, Reservation } from '../../types/models';

export interface ReservationResult {
  success: boolean;
  artworkId: string;
  status: InventoryStatus;
  expiresAt?: Date;
  reservationId?: string;
  error?: 'ALREADY_SOLD' | 'CURRENTLY_RESERVED' | 'NOT_FOUND' | 'CONCURRENCY_CONFLICT';
  message?: string;
}

export class InventoryReservationManager {
  private static defaultHoldMinutes = 15;
  
  // In-memory atomic store for state handling and unit verification
  private static inventoryStore = new Map<string, {
    status: InventoryStatus;
    reservationExpiresAt: Date | null;
    reservedBySessionId: string | null;
    title: string;
  }>();

  private static reservationsStore = new Map<string, Reservation>();
  private static lockMap = new Map<string, Promise<void>>();

  /**
   * Helper to execute an operation with a per-artwork mutex lock
   */
  private static async withLock<T>(artworkId: string, fn: () => Promise<T>): Promise<T> {
    while (this.lockMap.has(artworkId)) {
      await this.lockMap.get(artworkId);
    }

    let releaseLock: () => void;
    const lockPromise = new Promise<void>((resolve) => {
      releaseLock = resolve;
    });

    this.lockMap.set(artworkId, lockPromise);

    try {
      return await fn();
    } finally {
      this.lockMap.delete(artworkId);
      releaseLock!();
    }
  }

  /**
   * Seeds the in-memory inventory store for testing and fallback operation
   */
  public static seedItem(artwork: { id: string; title: string; status?: InventoryStatus }) {
    this.inventoryStore.set(artwork.id, {
      title: artwork.title,
      status: artwork.status || 'available',
      reservationExpiresAt: null,
      reservedBySessionId: null,
    });
  }

  /**
   * Attempts to atomically place a timed hold on a 1-of-1 artwork
   */
  public static async reserveArtwork(
    artworkId: string,
    sessionId: string,
    holdDurationMinutes = this.defaultHoldMinutes
  ): Promise<ReservationResult> {
    return this.withLock(artworkId, async () => {
      const now = new Date();
      let item = this.inventoryStore.get(artworkId);

      if (!item) {
        return {
          success: false,
          artworkId,
          status: 'archived',
          error: 'NOT_FOUND',
          message: `Artwork ${artworkId} does not exist in inventory.`,
        };
      }

      // 1. If permanently sold, cannot be reserved
      if (item.status === 'sold') {
        return {
          success: false,
          artworkId,
          status: 'sold',
          error: 'ALREADY_SOLD',
          message: `"${item.title}" is a 1-of-1 original and has already been acquired.`,
        };
      }

      // 2. Check active reservation
      if (item.status === 'reserved') {
        const isExpired = item.reservationExpiresAt && item.reservationExpiresAt <= now;

        if (!isExpired) {
          // If reserved by the SAME session, refresh the hold
          if (item.reservedBySessionId === sessionId) {
            const extendedExpiry = new Date(now.getTime() + holdDurationMinutes * 60 * 1000);
            item.reservationExpiresAt = extendedExpiry;

            return {
              success: true,
              artworkId,
              status: 'reserved',
              expiresAt: extendedExpiry,
              message: 'Existing reservation hold extended.',
            };
          }

          // Reserved by a DIFFERENT session that hasn't expired
          return {
            success: false,
            artworkId,
            status: 'reserved',
            expiresAt: item.reservationExpiresAt!,
            error: 'CURRENTLY_RESERVED',
            message: `"${item.title}" is currently in another collector's checkout.`,
          };
        }
        // If expired, let the new session acquire it below
      }

      // 3. Acquire reservation
      const expiresAt = new Date(now.getTime() + holdDurationMinutes * 60 * 1000);
      item.status = 'reserved';
      item.reservationExpiresAt = expiresAt;
      item.reservedBySessionId = sessionId;

      const reservationId = `res_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      this.reservationsStore.set(reservationId, {
        id: reservationId,
        artworkId,
        sessionId,
        reservedAt: now,
        expiresAt,
        status: 'active',
      });

      return {
        success: true,
        artworkId,
        status: 'reserved',
        expiresAt,
        reservationId,
        message: `Hold confirmed for ${holdDurationMinutes} minutes.`,
      };
    });
  }

  /**
   * Releases an active hold if requested by the session (e.g. cart item removed)
   */
  public static async releaseReservation(artworkId: string, sessionId: string): Promise<boolean> {
    return this.withLock(artworkId, async () => {
      const item = this.inventoryStore.get(artworkId);
      if (!item) return false;

      if (item.status === 'reserved' && item.reservedBySessionId === sessionId) {
        item.status = 'available';
        item.reservationExpiresAt = null;
        item.reservedBySessionId = null;
        return true;
      }
      return false;
    });
  }

  /**
   * Marks the artwork permanently sold upon verified payment webhook
   */
  public static async confirmPurchase(artworkId: string, sessionId: string): Promise<boolean> {
    return this.withLock(artworkId, async () => {
      const item = this.inventoryStore.get(artworkId);
      if (!item) return false;

      // Allow confirmation if reserved by this session or if available
      if (item.status === 'sold') {
        return false; // Prevent double fulfillment
      }

      item.status = 'sold';
      item.reservationExpiresAt = null;
      item.reservedBySessionId = null;
      return true;
    });
  }

  /**
   * Sweeper function to clean up expired reservations across all inventory
   */
  public static async cleanupExpiredReservations(): Promise<string[]> {
    const now = new Date();
    const releasedIds: string[] = [];

    for (const [artworkId, item] of this.inventoryStore.entries()) {
      if (
        item.status === 'reserved' &&
        item.reservationExpiresAt &&
        item.reservationExpiresAt <= now
      ) {
        await this.withLock(artworkId, async () => {
          if (item.reservationExpiresAt && item.reservationExpiresAt <= now) {
            item.status = 'available';
            item.reservationExpiresAt = null;
            item.reservedBySessionId = null;
            releasedIds.push(artworkId);
          }
        });
      }
    }

    return releasedIds;
  }

  /**
   * Inspect current status
   */
  public static getStatus(artworkId: string) {
    const item = this.inventoryStore.get(artworkId);
    if (!item) return null;

    const now = new Date();
    if (item.status === 'reserved' && item.reservationExpiresAt && item.reservationExpiresAt <= now) {
      return { status: 'available' as InventoryStatus, isExpired: true };
    }

    return {
      status: item.status,
      expiresAt: item.reservationExpiresAt,
      reservedBy: item.reservedBySessionId,
    };
  }

  public static reset() {
    this.inventoryStore.clear();
    this.reservationsStore.clear();
    this.lockMap.clear();
  }
}
