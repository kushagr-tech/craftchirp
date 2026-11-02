/**
 * Certificate of Authenticity (CoA) Generator
 * Creates verifiable, serialized Certificate records for Rachana Agarwal's original works.
 */

import { Artwork, Order } from '../../types/models';

export interface GeneratedCertificate {
  certificateId: string;
  orderNumber: string;
  artworkTitle: string;
  artistName: string;
  medium: string;
  materials: string[];
  dimensionsString: string;
  year: number;
  issuanceDate: string;
  verificationHash: string;
  downloadUrl?: string;
}

export class CertificateGenerator {
  public static generate(artwork: Artwork, orderNumber: string): GeneratedCertificate {
    const issuanceDate = new Date().toISOString().split('T')[0];
    const prefix = artwork.type === 'painting' ? 'WAR' : 'JWL';
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const certificateId = `CC-${new Date().getFullYear()}-${prefix}-${randomHex}`;

    // Cryptographic-style verification token
    const verificationString = `${certificateId}|${artwork.id}|${orderNumber}|${issuanceDate}`;
    let hash = 0;
    for (let i = 0; i < verificationString.length; i++) {
      hash = (hash << 5) - hash + verificationString.charCodeAt(i);
      hash |= 0;
    }
    const verificationHash = Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();

    return {
      certificateId,
      orderNumber,
      artworkTitle: artwork.title,
      artistName: 'Rachana Agarwal',
      medium: artwork.medium,
      materials: artwork.materials,
      dimensionsString: `${artwork.dimensions.widthCm} × ${artwork.dimensions.heightCm} cm (${artwork.dimensions.widthInches} × ${artwork.dimensions.heightInches} in)`,
      year: artwork.year,
      issuanceDate,
      verificationHash,
    };
  }
}

