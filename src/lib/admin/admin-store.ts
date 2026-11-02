/**
 * Craftchirp Studio Admin Store
 * LocalStorage-backed state management for Rachana Agarwal's studio desk:
 * - Artworks & 1-of-1 Inventory Management
 * - Orders & International Freight Fulfillment
 * - Inbound Collector Inquiries & Commissions
 * - Studio Access PIN Authentication
 */

import { Artwork, InventoryStatus } from '@/types/models';
import { ARTWORKS_SEED } from '@/data/catalogue';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress?: string;
  destinationCountry: string;
  artworkId: string;
  artworkSlug: string;
  artworkTitle: string;
  artworkImage?: string;
  amount: number;
  currency: string;
  paymentStatus: 'paid' | 'hold' | 'unpaid' | 'refunded';
  shippingStatus: 'pending' | 'shipped' | 'delivered';
  trackingCarrier?: string;
  trackingNumber?: string;
  certificateId?: string;
  createdAt: string;
}

export interface AdminInquiry {
  id: string;
  source: 'pdp_inquiry' | 'contact_form' | 'russia_desk' | 'commission';
  name: string;
  email: string;
  phone?: string;
  country: string;
  artworkId?: string;
  artworkTitle?: string;
  subject?: string;
  message: string;
  status: 'new' | 'replied' | 'archived';
  createdAt: string;
}

const STORAGE_KEYS = {
  ARTWORKS: 'craftchirp_admin_artworks_v2',
  ORDERS: 'craftchirp_admin_orders_v2',
  INQUIRIES: 'craftchirp_admin_inquiries_v2',
  AUTH: 'craftchirp_admin_auth_v2',
};

const DEFAULT_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-2026-894211',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.vance@example.com',
    customerPhone: '+1 (415) 555-0199',
    shippingAddress: '742 Evergreen Terrace, Suite 4B, San Francisco, CA 94107, United States',
    destinationCountry: 'US',
    artworkId: 'art-001',
    artworkSlug: 'rhythm-of-the-tarpa',
    artworkTitle: 'Rhythm of the Tarpa',
    artworkImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200',
    amount: 512.22,
    currency: 'USD',
    paymentStatus: 'paid',
    shippingStatus: 'pending',
    certificateId: 'CC-2026-WAR-733461',
    createdAt: '2026-10-31T14:22:00Z',
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-2026-773412',
    customerName: 'Julian Weber',
    customerEmail: 'j.weber@example.de',
    customerPhone: '+49 30 12345678',
    shippingAddress: 'Kurfürstendamm 194, 10707 Berlin, Germany',
    destinationCountry: 'DE',
    artworkId: 'art-003',
    artworkSlug: 'sacred-mithila-mandala',
    artworkTitle: 'Sacred Mithila Mandala',
    artworkImage: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&q=80&w=1200',
    amount: 672.4,
    currency: 'EUR',
    paymentStatus: 'paid',
    shippingStatus: 'shipped',
    trackingCarrier: 'DHL Express Priority Air',
    trackingNumber: 'DHL-9842109844',
    certificateId: 'CC-2026-MAD-441209',
    createdAt: '2026-10-28T09:15:00Z',
  },
];

const DEFAULT_INQUIRIES: AdminInquiry[] = [
  {
    id: 'inq-201',
    source: 'russia_desk',
    name: 'Mikhail Rostov',
    email: 'mikhail.rostov@spb-art.ru',
    country: 'Russian Federation (Saint Petersburg)',
    artworkTitle: 'Sacred Mithila Mandala',
    message: 'Приветствую Рачану! Заинтересован в приобретении оригинальной работы для частной коллекции в Санкт-Петербурге. Пожалуйста, сообщите условия прямой оплаты и отправки застрахованным курьером.',
    status: 'new',
    createdAt: '2026-11-01T11:45:00Z',
  },
  {
    id: 'inq-202',
    source: 'pdp_inquiry',
    name: 'Dr. Clara Higgins',
    email: 'clara.higgins@oxford-art.ac.uk',
    phone: '+44 1865 270000',
    country: 'United Kingdom',
    artworkTitle: 'Tree of Ancestral Life',
    message: 'We are preparing a showcase on indigenous botanical pigments. Could Rachana provide details on the sun-drying curing duration of the cow dung preparation before pigment application?',
    status: 'new',
    createdAt: '2026-11-02T08:30:00Z',
  },
  {
    id: 'inq-203',
    source: 'contact_form',
    name: 'Sophie & Antoine Laurent',
    email: 'sophie.laurent@paris-design.fr',
    country: 'France',
    subject: 'Custom 100x100cm Warli Wedding Commission',
    message: 'We adore your natural clay textures. We would love to commission a bespoke 100x100 cm square Warli painting depicting a harvest wedding celebration for our new apartment in Lyon.',
    status: 'replied',
    createdAt: '2026-10-29T16:10:00Z',
  },
];

export class AdminStore {
  // --- AUTHENTICATION ---
  public static checkAuth(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'authenticated';
  }

  public static login(pin: string): boolean {
    if (typeof window === 'undefined') return false;
    // Default studio PIN: 2026 or quick unlock 'artisan'
    if (pin.trim() === '2026' || pin.trim().toLowerCase() === 'artisan' || pin.trim() === 'rachana') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'authenticated');
      return true;
    }
    return false;
  }

  public static logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  // --- ARTWORKS ---
  public static getArtworks(): Artwork[] {
    if (typeof window === 'undefined') return ARTWORKS_SEED;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ARTWORKS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load admin artworks:', e);
    }
    // Default to seed catalogue
    return ARTWORKS_SEED;
  }

  public static saveArtwork(artwork: Artwork): Artwork[] {
    if (typeof window === 'undefined') return [artwork];
    const current = this.getArtworks();
    const index = current.findIndex((a) => a.id === artwork.id);

    let updated: Artwork[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = { ...artwork, updatedAt: new Date().toISOString() };
    } else {
      updated = [
        {
          ...artwork,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...current,
      ];
    }

    try {
      localStorage.setItem(STORAGE_KEYS.ARTWORKS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save artwork in localStorage:', e);
    }
    return updated;
  }

  public static deleteArtwork(id: string): Artwork[] {
    if (typeof window === 'undefined') return [];
    const current = this.getArtworks();
    const updated = current.filter((a) => a.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.ARTWORKS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete artwork:', e);
    }
    return updated;
  }

  public static toggleArtworkStatus(id: string): InventoryStatus {
    const current = this.getArtworks();
    const target = current.find((a) => a.id === id);
    if (!target) return 'available';

    // Cycle: available -> reserved -> sold -> available
    let nextStatus: InventoryStatus = 'available';
    if (target.status === 'available') nextStatus = 'sold';
    else if (target.status === 'sold') nextStatus = 'available';
    else if (target.status === 'reserved') nextStatus = 'available';

    target.status = nextStatus;
    target.updatedAt = new Date().toISOString();
    this.saveArtwork(target);
    return nextStatus;
  }

  // --- ORDERS ---
  public static getOrders(): AdminOrder[] {
    if (typeof window === 'undefined') return DEFAULT_ORDERS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load admin orders:', e);
    }
    return DEFAULT_ORDERS;
  }

  public static addOrder(order: AdminOrder): AdminOrder[] {
    if (typeof window === 'undefined') return [order];
    const current = this.getOrders();
    // Prepend new order
    const updated = [order, ...current];
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to add admin order:', e);
    }
    return updated;
  }

  public static updateOrderTracking(
    orderId: string,
    carrier: string,
    trackingNumber: string,
    shippingStatus: 'shipped' | 'delivered' = 'shipped'
  ): AdminOrder[] {
    if (typeof window === 'undefined') return [];
    const current = this.getOrders();
    const updated = current.map((ord) => {
      if (ord.id === orderId || ord.orderNumber === orderId) {
        return {
          ...ord,
          shippingStatus,
          trackingCarrier: carrier,
          trackingNumber,
        };
      }
      return ord;
    });

    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update tracking:', e);
    }
    return updated;
  }

  // --- INQUIRIES ---
  public static getInquiries(): AdminInquiry[] {
    if (typeof window === 'undefined') return DEFAULT_INQUIRIES;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load inquiries:', e);
    }
    return DEFAULT_INQUIRIES;
  }

  public static addInquiry(inquiry: Omit<AdminInquiry, 'id' | 'createdAt' | 'status'>): AdminInquiry {
    const newInq: AdminInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      const current = this.getInquiries();
      const updated = [newInq, ...current];
      try {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to add inquiry:', e);
      }
    }
    return newInq;
  }

  public static updateInquiryStatus(id: string, status: 'new' | 'replied' | 'archived'): AdminInquiry[] {
    if (typeof window === 'undefined') return [];
    const current = this.getInquiries();
    const updated = current.map((inq) => {
      if (inq.id === id) {
        return { ...inq, status };
      }
      return inq;
    });

    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update inquiry status:', e);
    }
    return updated;
  }

  // --- EXPORT & RECOVERY ---
  public static exportCatalogJson(): string {
    const artworks = this.getArtworks();
    return JSON.stringify(artworks, null, 2);
  }

  public static exportOrdersCsv(): string {
    const orders = this.getOrders();
    const headers = [
      'OrderNumber',
      'Date',
      'CustomerName',
      'CustomerEmail',
      'DestinationCountry',
      'ArtworkTitle',
      'Amount',
      'Currency',
      'PaymentStatus',
      'ShippingStatus',
      'Carrier',
      'TrackingNumber',
      'CertificateId',
    ];

    const rows = orders.map((o) => [
      `"${o.orderNumber}"`,
      `"${o.createdAt.split('T')[0]}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerEmail}"`,
      `"${o.destinationCountry}"`,
      `"${o.artworkTitle.replace(/"/g, '""')}"`,
      o.amount,
      `"${o.currency}"`,
      `"${o.paymentStatus}"`,
      `"${o.shippingStatus}"`,
      `"${(o.trackingCarrier || '').replace(/"/g, '""')}"`,
      `"${o.trackingNumber || ''}"`,
      `"${o.certificateId || ''}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  public static resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ARTWORKS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  }
}

