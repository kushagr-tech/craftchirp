/**
 * Craftchirp Virtual Gallery & Global Marketplace Domain Models
 * Type definitions for artworks, artists, orders, reservations, and compliance.
 */

export type ProductType = 'painting' | 'jewellery' | 'home-decor' | 'other';
export type ArtworkStyle = 'Warli' | 'Madhubani' | 'Abstract' | 'Folk-Contemporary' | 'Other';
export type ArtworkOrientation = 'square' | 'portrait' | 'landscape';
export type ArtworkEdition = 'original' | 'limited_edition' | 'print';
export type InventoryStatus = 'available' | 'reserved' | 'sold' | 'archived';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyPrices {
  USD: number;
  EUR: number;
  GBP: number;
  INR: number;
}

export interface Dimensions {
  widthCm: number;
  heightCm: number;
  depthCm?: number;
  widthInches: number;
  heightInches: number;
  depthInches?: number;
}

export interface PackagedDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

export interface ArtImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  viewType: 'front' | 'angle' | 'texture' | 'room' | 'packaging';
  isPrimary?: boolean;
}

export interface CertificateOfAuthenticity {
  certificateId: string;
  signedBy: string;
  artistTitle: string;
  issuanceDate: string;
  editionNumber?: string;
  blockchainVerificationUrl?: string;
}

export interface Artwork {
  id: string;
  slug: string;
  type: ProductType;
  title: string;
  story: string;
  medium: string;
  materials: string[];
  style: ArtworkStyle;
  dimensions: Dimensions;
  weightGrams: number;
  packagedWeightGrams: number;
  packagedDimensions: PackagedDimensions;
  year: number;
  edition: ArtworkEdition;
  framed: boolean;
  hangingHardwareIncluded: boolean;
  orientation: ArtworkOrientation;
  dominantColors: string[];
  roomTags: string[];
  pricePerCurrency: CurrencyPrices;
  status: InventoryStatus;
  reservationExpiresAt?: string | null;
  reservedBySessionId?: string | null;
  artistId: string;
  images: ArtImage[];
  hsCode: string; // e.g. "9701.21.00" (paintings) or "7117.90.90" (clay jewellery)
  certificate: CertificateOfAuthenticity;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  bio: string;
  heritage: string;
  yearsOfExperience: number;
  location: string;
  avatarUrl: string;
  socialLinks: {
    instagram?: string;
    website?: string;
  };
  exhibitions?: string[];
  statement: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  curatorialStatement: string;
  heroImage: string;
  artworkIds: string[];
  featured: boolean;
}

export interface Exhibition {
  id: string;
  slug: string;
  title: string;
  theme: string;
  curatorialNote: string;
  heroImage: string;
  startDate: string;
  endDate?: string;
  artworkIds: string[];
  audioGuideUrl?: string;
  isVirtual: boolean;
}

export interface Address {
  fullName: string;
  streetAddress1: string;
  streetAddress2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryCode: string; // ISO 2-letter (US, DE, FR, GB, IN, etc.)
  phone: string; // Required for international customs & express carriers
}

export interface OrderItem {
  artworkId: string;
  slug: string;
  title: string;
  type: ProductType;
  price: number;
  currency: CurrencyCode;
  image: string;
  hsCode: string;
}

export interface LandedCostBreakdown {
  currency: CurrencyCode;
  subtotal: number;
  shipping: number;
  customsDuty: number;
  importVat: number;
  total: number;
  dutyModel: 'DDP' | 'DAP';
  dutyNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    shippingAddress: Address;
    billingAddress?: Address;
  };
  items: OrderItem[];
  pricing: LandedCostBreakdown;
  status: 'pending' | 'reserved' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'hold' | 'paid' | 'failed' | 'refunded';
  paymentProvider: 'stripe' | 'razorpay' | 'paypal';
  paymentReferenceId?: string;
  tracking?: {
    carrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
  };
  certificateUrls?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  artworkId: string;
  sessionId: string;
  reservedAt: Date;
  expiresAt: Date;
  status: 'active' | 'expired' | 'completed' | 'cancelled';
}

export interface Inquiry {
  id: string;
  type: 'custom_commission' | 'artwork_inquiry' | 'general' | 'russia_inquiry';
  artworkId?: string;
  artworkTitle?: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  preferredLanguage?: string;
  message: string;
  status: 'new' | 'in_progress' | 'replied' | 'closed';
  createdAt: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: 'heritage' | 'process' | 'care' | 'styling';
  tags: string[];
  coverImage: string;
  readingTimeMinutes: number;
}

