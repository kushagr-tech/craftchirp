/**
 * Structured Data (JSON-LD) Components for Google Rich Results & LLM Entities
 */

import { Artwork, Artist } from '@/types/models';

interface ArtworkJsonLdProps {
  artwork: Artwork;
  artist: Artist;
  baseUrl?: string;
}

export function ArtworkJsonLd({ artwork, artist, baseUrl = 'https://craftchirp.com' }: ArtworkJsonLdProps) {
  const primaryImage = artwork.images.find((img) => img.isPrimary) || artwork.images[0];
  const fullImageUrl = `${baseUrl}${primaryImage.url}`;
  const canonicalUrl = `${baseUrl}/art/${artwork.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. VisualArtwork Schema
      {
        '@type': 'VisualArtwork',
        '@id': `${canonicalUrl}#visualartwork`,
        name: artwork.title,
        alternateName: `Original ${artwork.style} Folk Art by ${artist.name}`,
        artMedium: artwork.medium,
        artform: artwork.type === 'painting' ? 'Painting' : 'Sculptural Object',
        artworkSurface: 'Moisture-Resistant MDF Board',
        artEdition: artwork.edition === 'original' ? '1 of 1 (Original)' : 'Limited Edition',
        width: {
          '@type': 'QuantitativeValue',
          value: artwork.dimensions.widthCm,
          unitCode: 'CMT',
        },
        height: {
          '@type': 'QuantitativeValue',
          value: artwork.dimensions.heightCm,
          unitCode: 'CMT',
        },
        depth: artwork.dimensions.depthCm
          ? {
              '@type': 'QuantitativeValue',
              value: artwork.dimensions.depthCm,
              unitCode: 'CMT',
            }
          : undefined,
        creator: {
          '@type': 'Person',
          '@id': `${baseUrl}/artists/${artist.slug}#person`,
          name: artist.name,
          jobTitle: 'Traditional Folk Artist & Founder of Craftchirp',
          sameAs: artist.socialLinks.instagram ? [artist.socialLinks.instagram] : [],
        },
        dateCreated: artwork.year.toString(),
        image: artwork.images.map((img) => `${baseUrl}${img.url}`),
      },

      // 2. Product Schema with Commercial Offer & Return Policy
      {
        '@type': 'Product',
        '@id': `${canonicalUrl}#product`,
        name: `${artwork.title} — Original ${artwork.style} Folk Art`,
        description: `${artwork.title} is an original 1-of-1 ${artwork.style} painting by Rachana Agarwal. Handcrafted on MDF using a purified cow-dung base and natural earth pigments. Includes signed Certificate of Authenticity.`,
        category: artwork.type === 'painting' ? 'Home & Garden > Decor > Artwork > Paintings' : 'Apparel & Accessories > Jewelry',
        image: fullImageUrl,
        brand: {
          '@type': 'Brand',
          name: 'Craftchirp',
        },
        offers: {
          '@type': 'Offer',
          price: artwork.pricePerCurrency.USD.toFixed(2),
          priceCurrency: 'USD',
          availability: artwork.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
          itemCondition: 'https://schema.org/NewCondition',
          url: canonicalUrl,
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'USD',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 2,
                maxValue: 3,
                unitCode: 'DAY',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 5,
                maxValue: 9,
                unitCode: 'DAY',
              },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 14,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
        },
      },

      // 3. BreadcrumbList Schema
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gallery',
            item: `${baseUrl}/gallery`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: artwork.style,
            item: `${baseUrl}/gallery?style=${encodeURIComponent(artwork.style)}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: artwork.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function SiteJsonLd({ baseUrl = 'https://craftchirp.com' }: { baseUrl?: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: 'Craftchirp',
        url: baseUrl,
        logo: `${baseUrl}/assets/hero_mud_art_1776498586869.png`,
        description:
          'Virtual gallery and global marketplace for authentic Warli and Madhubani folk art by solo artist Rachana Agarwal. Handcrafted on MDF using natural cow-dung base and earth pigments.',
        founder: {
          '@type': 'Person',
          name: 'Rachana Agarwal',
        },
        sameAs: ['https://www.instagram.com/craftchirp_creations/'],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        url: baseUrl,
        name: 'Craftchirp Gallery & Marketplace',
        publisher: {
          '@id': `${baseUrl}#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/gallery?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

