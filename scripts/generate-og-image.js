import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Modern high-tech SVG banner card with brand colors
  const svgBanner = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#061225" />
        <stop offset="50%" stop-color="#081A33" />
        <stop offset="100%" stop-color="#0B1B3A" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <radialGradient id="glow" cx="80%" cy="20%" r="50%">
        <stop offset="0%" stop-color="#0284C7" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#061225" stop-opacity="0" />
      </radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" stroke-width="0.8" stroke-opacity="0.5" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <!-- Grid Overlay -->
    <rect width="${width}" height="${height}" fill="url(#grid)" />
    <!-- Radial Glow -->
    <rect width="${width}" height="${height}" fill="url(#glow)" />

    <!-- Top Badge -->
    <g transform="translate(100, 110)">
      <rect width="360" height="44" rx="22" fill="#0E284D" stroke="#0284C7" stroke-width="1.5" />
      <circle cx="28" cy="22" r="6" fill="#38BDF8" />
      <text x="46" y="27" font-family="'Plus Jakarta Sans', Inter, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#38BDF8" letter-spacing="1.5">
        DIGITAL ENGINEERING &amp; SOFTWARE
      </text>
    </g>

    <!-- Main Headline -->
    <text x="100" y="235" font-family="'Plus Jakarta Sans', Inter, -apple-system, sans-serif" font-size="64" font-weight="800" fill="#FFFFFF" letter-spacing="-1">
      Yovexa Solutions
    </text>

    <!-- Subtitle -->
    <text x="100" y="305" font-family="'Plus Jakarta Sans', Inter, -apple-system, sans-serif" font-size="34" font-weight="600" fill="url(#accentGrad)">
      Engineering Digital Solutions That Drive Growth
    </text>

    <!-- Paragraph / Description -->
    <text x="100" y="375" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#94A3B8">
      Custom Web Applications • Cloud Architecture • Spring Boot &amp; React
    </text>
    <text x="100" y="410" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#94A3B8">
      REST APIs • Enterprise CMS • High-Performance Digital Products
    </text>

    <!-- Footer Bar -->
    <line x1="100" y1="480" x2="1100" y2="480" stroke="#1E293B" stroke-width="2" />
    <g transform="translate(100, 520)">
      <text x="0" y="20" font-family="'Plus Jakarta Sans', Inter, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">
        yovexasolutions.in
      </text>
      <text x="1000" y="20" text-anchor="end" font-family="Inter, -apple-system, sans-serif" font-size="18" font-weight="500" fill="#38BDF8">
        India · Serving Clients Globally
      </text>
    </g>
  </svg>
  `;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const ogCardPath = path.join(publicDir, 'og-image.png');
  const ogCardPath2 = path.join(publicDir, 'yovexa-og-card.png');

  await sharp(Buffer.from(svgBanner))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(ogCardPath);

  await sharp(Buffer.from(svgBanner))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(ogCardPath2);

  console.log('Successfully generated og-image.png and yovexa-og-card.png in public directory!');
}

generateOgImage().catch(console.error);

