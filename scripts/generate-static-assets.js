const fs = require('fs');
const path = require('path');

// Compile or require catalogue data
// Since catalogue.ts is TypeScript, we can extract ARTWORKS_SEED or write them directly
const { ARTWORKS_SEED, RACHANA_AGARWAL } = require('/tmp/test-build/src/data/catalogue.js');

const baseUrl = 'https://craftchirp.com';
const publicArtDir = path.join(__dirname, '..', 'public', 'art');
const publicFeedDir = path.join(__dirname, '..', 'public', 'feed');

if (!fs.existsSync(publicArtDir)) fs.mkdirSync(publicArtDir, { recursive: true });
if (!fs.existsSync(publicFeedDir)) fs.mkdirSync(publicFeedDir, { recursive: true });

// 1. Generate per-artwork markdown files
for (const artwork of ARTWORKS_SEED) {
  const markdownContent = `# ${artwork.title}
*Original ${artwork.style} Folk Art by ${RACHANA_AGARWAL.name}*

## Artwork Overview
- **Title**: ${artwork.title}
- **Artist**: ${RACHANA_AGARWAL.name} (Founder of Craftchirp, 15+ years of folk art practice)
- **Folk Tradition**: ${artwork.style} Tribal / Ritual Art
- **Classification**: ${artwork.edition === 'original' ? '1-of-1 Unique Original Painting' : 'Handmade Limited Edition'}
- **Year of Creation**: ${artwork.year}
- **Status**: ${artwork.status.toUpperCase()}
- **Origin**: Maharashtra, India

## Technical Specifications
- **Medium**: ${artwork.medium}
- **Surface**: Moisture-resistant High-Density MDF Board (${artwork.dimensions.depthCm || 1.5} cm depth)
- **Surface Preparation**: Triple-purified cow-dung slurry, alluvial earth clay ground, naturally sun-cured for 7 days (100% odorless).
- **Pigments**: Natural ground white rice flour paste with acacia gum binder, lampblack charcoal soot, and red mineral slip.
- **Sealant**: Organic matte beeswax and plant-gum sealant (non-toxic, breathable).
- **Dimensions (Metric)**: ${artwork.dimensions.widthCm} cm wide × ${artwork.dimensions.heightCm} cm high
- **Dimensions (Imperial)**: ${artwork.dimensions.widthInches} inches wide × ${artwork.dimensions.heightInches} inches high
- **Actual Weight**: ${artwork.weightGrams} grams
- **Packaged Weight**: ${artwork.packagedWeightGrams} grams
- **Packaged Dimensions**: ${artwork.packagedDimensions.lengthCm} × ${artwork.packagedDimensions.widthCm} × ${artwork.packagedDimensions.heightCm} cm
- **Framing**: ${artwork.framed ? 'Framed' : 'Unframed; ready to hang with pre-installed heavy-duty brass hanging hardware'}
- **Harmonized Tariff (HTS) Code**: ${artwork.hsCode}

## Commercial & Landed Pricing
- **United States**: $${artwork.pricePerCurrency.USD.toLocaleString()} USD (Delivered Duty Paid / DDP)
- **European Union**: €${artwork.pricePerCurrency.EUR.toLocaleString()} EUR (EU 2026 Customs Compliant)
- **United Kingdom**: £${artwork.pricePerCurrency.GBP.toLocaleString()} GBP
- **India (Domestic)**: ₹${artwork.pricePerCurrency.INR.toLocaleString()} INR (GST Included)

## Authenticity & Provenance
- **Certificate ID**: ${artwork.certificate.certificateId}
- **Signatory**: ${artwork.certificate.signedBy} (${artwork.certificate.artistTitle})
- **Issuance Date**: ${artwork.certificate.issuanceDate}
- **Guarantee**: Singular original archive piece accompanied by a physical serialized Certificate of Authenticity.

## Packaging & International Freight
- **Packaging Specification**: Custom rigid plywood skeletal crating, high-density foam corner protectors, waterproof polyethylene barrier.
- **Air Carrier**: DHL Express / FedEx Priority Air Freight.
- **Estimated Transit Time**: 5–8 business days globally.
- **Return Window**: 14-day collector return policy with full transit insurance.

## Karigari Ki Kahani • The Provenance Story
${artwork.story}

---
*Permanent URL: ${baseUrl}/art/${artwork.slug}*  
*Catalog Feed: ${baseUrl}/feed/products.json*  
*© ${new Date().getFullYear()} Craftchirp by Rachana Agarwal. All rights reserved.*
`;

  const filePath = path.join(publicArtDir, `${artwork.slug}.md`);
  fs.writeFileSync(filePath, markdownContent, 'utf8');
  console.log(`Generated: public/art/${artwork.slug}.md`);
}

// 2. Generate products.json in public/feed/
const feed = {
  version: 'https://jsonfeed.org/version/1.1',
  title: 'Craftchirp Original Art Catalog Feed',
  home_page_url: baseUrl,
  feed_url: `${baseUrl}/feed/products.json`,
  description:
    'Product catalog feed of authentic Warli and Madhubani folk art by Rachana Agarwal on purified cow-dung base.',
  author: {
    name: RACHANA_AGARWAL.name,
    url: `${baseUrl}/artists/${RACHANA_AGARWAL.slug}`,
  },
  items: ARTWORKS_SEED.map((artwork) => ({
    id: artwork.id,
    url: `${baseUrl}/art/${artwork.slug}`,
    markdown_url: `${baseUrl}/art/${artwork.slug}.md`,
    title: artwork.title,
    summary: artwork.story,
    date_published: artwork.createdAt,
    date_modified: artwork.updatedAt,
    image: `${baseUrl}${artwork.images[0].url}`,
    tags: [artwork.style, artwork.type, ...artwork.dominantColors, ...artwork.roomTags],
    _craftchirp_metadata: {
      artist: RACHANA_AGARWAL.name,
      edition: artwork.edition,
      style: artwork.style,
      medium: artwork.medium,
      materials: artwork.materials,
      dimensions: {
        cm: `${artwork.dimensions.widthCm}x${artwork.dimensions.heightCm}`,
        inches: `${artwork.dimensions.widthInches}x${artwork.dimensions.heightInches}`,
      },
      weightGrams: artwork.weightGrams,
      status: artwork.status,
      pricing: artwork.pricePerCurrency,
      hsCode: artwork.hsCode,
      certificateId: artwork.certificate.certificateId,
    },
  })),
};

fs.writeFileSync(path.join(publicFeedDir, 'products.json'), JSON.stringify(feed, null, 2), 'utf8');
console.log('Generated: public/feed/products.json');

