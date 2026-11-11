import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.yovexasolutions.in';

const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/services', changefreq: 'weekly', priority: '0.9' },
  { url: '/services/website-development', changefreq: 'monthly', priority: '0.9' },
  { url: '/services/web-applications', changefreq: 'monthly', priority: '0.9' },
  { url: '/services/rest-apis', changefreq: 'monthly', priority: '0.9' },
  { url: '/services/admin-dashboards', changefreq: 'monthly', priority: '0.9' },
  { url: '/portfolio', changefreq: 'weekly', priority: '0.8' },
  { url: '/case-studies', changefreq: 'weekly', priority: '0.8' },
  { url: '/blog', changefreq: 'daily', priority: '0.9' },
  { url: '/careers', changefreq: 'monthly', priority: '0.8' },
  { url: '/about', changefreq: 'monthly', priority: '0.8' },
  { url: '/contact', changefreq: 'monthly', priority: '0.8' },
];

export function generateSitemapXml() {
  const today = new Date().toISOString().split('T')[0];

  const xmlUrls = staticRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlUrls}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`Generated sitemap with ${staticRoutes.length} URLs at ${sitemapPath}`);
}

generateSitemapXml();

