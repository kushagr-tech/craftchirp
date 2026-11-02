/**
 * Drizzle ORM Schema for Craftchirp Gallery & Marketplace
 * PostgreSQL schema definitions compatible with Neon, Supabase, or standard Postgres.
 */

import { pgTable, text, timestamp, boolean, integer, jsonb, decimal, uuid, primaryKey } from 'drizzle-orm/pg-core';

export const artists = pgTable('artists', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  bio: text('bio').notNull(),
  heritage: text('heritage').notNull(),
  yearsOfExperience: integer('years_of_experience').default(15).notNull(),
  location: text('location').default('India').notNull(),
  avatarUrl: text('avatar_url').notNull(),
  socialLinks: jsonb('social_links').$type<{ instagram?: string; website?: string }>().default({}),
  exhibitions: jsonb('exhibitions').$type<string[]>().default([]),
  statement: text('statement').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const artworks = pgTable('artworks', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  type: text('type').$type<'painting' | 'jewellery' | 'home-decor' | 'other'>().notNull(),
  title: text('title').notNull(),
  story: text('story').notNull(),
  medium: text('medium').notNull(),
  materials: jsonb('materials').$type<string[]>().notNull(),
  style: text('style').$type<'Warli' | 'Madhubani' | 'Abstract' | 'Folk-Contemporary' | 'Other'>().notNull(),
  
  // Dimensions
  widthCm: decimal('width_cm', { precision: 8, scale: 2 }).notNull(),
  heightCm: decimal('height_cm', { precision: 8, scale: 2 }).notNull(),
  depthCm: decimal('depth_cm', { precision: 8, scale: 2 }),
  widthInches: decimal('width_inches', { precision: 8, scale: 2 }).notNull(),
  heightInches: decimal('height_inches', { precision: 8, scale: 2 }).notNull(),
  depthInches: decimal('depth_inches', { precision: 8, scale: 2 }),
  
  // Weights
  weightGrams: integer('weight_grams').notNull(),
  packagedWeightGrams: integer('packaged_weight_grams').notNull(),
  packagedDimensions: jsonb('packaged_dimensions').$type<{ lengthCm: number; widthCm: number; heightCm: number }>().notNull(),
  
  year: integer('year').notNull(),
  edition: text('edition').$type<'original' | 'limited_edition' | 'print'>().default('original').notNull(),
  framed: boolean('framed').default(false).notNull(),
  hangingHardwareIncluded: boolean('hanging_hardware_included').default(true).notNull(),
  orientation: text('orientation').$type<'square' | 'portrait' | 'landscape'>().notNull(),
  dominantColors: jsonb('dominant_colors').$type<string[]>().notNull(),
  roomTags: jsonb('room_tags').$type<string[]>().default([]).notNull(),
  
  // Multi-currency pricing (owner set)
  priceUsd: decimal('price_usd', { precision: 10, scale: 2 }).notNull(),
  priceEur: decimal('price_eur', { precision: 10, scale: 2 }).notNull(),
  priceGbp: decimal('price_gbp', { precision: 10, scale: 2 }).notNull(),
  priceInr: decimal('price_inr', { precision: 12, scale: 2 }).notNull(),
  
  // Inventory status & atomic timed reservation
  status: text('status').$type<'available' | 'reserved' | 'sold' | 'archived'>().default('available').notNull(),
  reservationExpiresAt: timestamp('reservation_expires_at', { withTimezone: true }),
  reservedBySessionId: text('reserved_by_session_id'),
  
  artistId: uuid('artist_id').references(() => artists.id).notNull(),
  images: jsonb('images').$type<Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
    viewType: 'front' | 'angle' | 'texture' | 'room' | 'packaging';
    isPrimary?: boolean;
  }>>().notNull(),
  
  hsCode: text('hs_code').notNull(), // e.g. "9701.21.00" or "7117.90.90"
  certificateData: jsonb('certificate_data').$type<{
    certificateId: string;
    signedBy: string;
    artistTitle: string;
    issuanceDate: string;
    editionNumber?: string;
  }>().notNull(),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const reservations = pgTable('reservations', {
  id: uuid('id').defaultRandom().primaryKey(),
  artworkId: uuid('artwork_id').references(() => artworks.id).notNull(),
  sessionId: text('session_id').notNull(),
  reservedAt: timestamp('reserved_at', { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  status: text('status').$type<'active' | 'expired' | 'completed' | 'cancelled'>().default('active').notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  customerEmail: text('customer_email').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  shippingAddress: jsonb('shipping_address').notNull(),
  billingAddress: jsonb('billing_address'),
  currency: text('currency').notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  shippingAmount: decimal('shipping_amount', { precision: 10, scale: 2 }).notNull(),
  dutyAmount: decimal('duty_amount', { precision: 10, scale: 2 }).default('0').notNull(),
  vatAmount: decimal('vat_amount', { precision: 10, scale: 2 }).default('0').notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  dutyModel: text('duty_model').$type<'DDP' | 'DAP'>().default('DDP').notNull(),
  status: text('status').$type<'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>().default('pending').notNull(),
  paymentStatus: text('payment_status').$type<'unpaid' | 'paid' | 'refunded'>().default('unpaid').notNull(),
  paymentProvider: text('payment_provider').$type<'stripe' | 'razorpay' | 'paypal'>().notNull(),
  paymentReferenceId: text('payment_reference_id'),
  trackingCarrier: text('tracking_carrier'),
  trackingNumber: text('tracking_number'),
  trackingUrl: text('tracking_url'),
  certificateUrl: text('certificate_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  artworkId: uuid('artwork_id').references(() => artworks.id).notNull(),
  pricePaid: decimal('price_paid', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  hsCode: text('hs_code').notNull(),
});

export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  curatorialStatement: text('curatorial_statement').notNull(),
  heroImage: text('hero_image').notNull(),
  featured: boolean('featured').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const collectionArtworks = pgTable('collection_artworks', {
  collectionId: uuid('collection_id').references(() => collections.id).notNull(),
  artworkId: uuid('artwork_id').references(() => artworks.id).notNull(),
}, (t) => [
  primaryKey({ columns: [t.collectionId, t.artworkId] })
]);

export const exhibitions = pgTable('exhibitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  theme: text('theme').notNull(),
  curatorialNote: text('curatorial_note').notNull(),
  heroImage: text('hero_image').notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  audioGuideUrl: text('audio_guide_url'),
  isVirtual: boolean('is_virtual').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const exhibitionArtworks = pgTable('exhibition_artworks', {
  exhibitionId: uuid('exhibition_id').references(() => exhibitions.id).notNull(),
  artworkId: uuid('artwork_id').references(() => artworks.id).notNull(),
}, (t) => [
  primaryKey({ columns: [t.exhibitionId, t.artworkId] })
]);

export const inquiries = pgTable('inquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').$type<'custom_commission' | 'artwork_inquiry' | 'general' | 'russia_inquiry'>().notNull(),
  artworkId: uuid('artwork_id').references(() => artworks.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  country: text('country').notNull(),
  preferredLanguage: text('preferred_language').default('en'),
  message: text('message').notNull(),
  status: text('status').$type<'new' | 'in_progress' | 'replied' | 'closed'>().default('new').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const journalPosts = pgTable('journal_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  author: text('author').default('Rachana Agarwal').notNull(),
  category: text('category').$type<'heritage' | 'process' | 'care' | 'styling'>().notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  coverImage: text('cover_image').notNull(),
  readingTimeMinutes: integer('reading_time_minutes').default(5).notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }).defaultNow().notNull(),
});

