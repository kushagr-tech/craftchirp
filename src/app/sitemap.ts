import { MetadataRoute } from 'next';
import { ARTWORKS_SEED, COLLECTIONS_SEED, EXHIBITIONS_SEED, RACHANA_AGARWAL } from '@/data/catalogue';
import { JOURNAL_POSTS } from '@/data/journal';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://craftchirp.com';
  const currentDate = new Date().toISOString();

  // 1. Core Primary Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/exhibitions`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/jewellery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    // Policy & Trust Routes
    {
      url: `${baseUrl}/shipping-duties`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/authenticity`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/care-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/ru/inquiry`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 2. Artwork PDP Routes with Image Metadata
  const artworkRoutes: MetadataRoute.Sitemap = ARTWORKS_SEED.map((artwork) => ({
    url: `${baseUrl}/art/${artwork.slug}`,
    lastModified: artwork.updatedAt || currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
    images: artwork.images.map((img) => `${baseUrl}${img.url}`),
  }));

  // 3. Artist Profiles
  const artistRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/artists/${RACHANA_AGARWAL.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${baseUrl}${RACHANA_AGARWAL.avatarUrl}`],
    },
  ];

  // 4. Collection Landing Routes
  const collectionRoutes: MetadataRoute.Sitemap = COLLECTIONS_SEED.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
    images: [`${baseUrl}${col.heroImage}`],
  }));

  // 5. Virtual Exhibition Routes
  const exhibitionRoutes: MetadataRoute.Sitemap = EXHIBITIONS_SEED.map((exh) => ({
    url: `${baseUrl}/exhibitions/${exh.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
    images: [`${baseUrl}${exh.heroImage}`],
  }));

  // 6. Journal Editorial Routes
  const journalRoutes: MetadataRoute.Sitemap = JOURNAL_POSTS.map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.75,
    images: [`${baseUrl}${post.coverImage}`],
  }));

  return [
    ...staticRoutes,
    ...artworkRoutes,
    ...artistRoutes,
    ...collectionRoutes,
    ...exhibitionRoutes,
    ...journalRoutes,
  ];
}

