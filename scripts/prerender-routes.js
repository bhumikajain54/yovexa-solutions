import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.yovexasolutions.in';
const DIST_DIR = path.resolve(__dirname, '../dist');

const routesToPrerender = [
  {
    path: '/about',
    title: 'About Us — Software Engineering & Digital Technology Partner | Yovexa Solutions',
    description: 'Learn about Yovexa Solutions — an engineering-driven digital solutions company creating scalable web applications, REST APIs, and digital tools for businesses.',
    keywords: 'about Yovexa Solutions, software engineering company India, digital solutions partner, React Spring Boot agency',
    h1: 'Engineering Pragmatic Digital Solutions For Modern Businesses',
    bodyText: 'Yovexa Solutions is an Indian digital solutions and software development company dedicated to engineering modern, scalable, and practical digital products.'
  },
  {
    path: '/services',
    title: 'Software Engineering & Web Development Services | Yovexa Solutions',
    description: 'Explore our comprehensive software engineering services: custom website development, enterprise web applications, REST API design, and internal admin CMS.',
    keywords: 'software development services, website development, web applications, Spring Boot APIs, admin dashboard development',
    h1: 'Software Solutions Engineered for Growth',
    bodyText: 'We design and engineer bespoke, high-performance websites, reactive web applications, RESTful microservices, and bespoke CMS portals.'
  },
  {
    path: '/services/website-development',
    title: 'Website Development Services & Architecture | Yovexa Solutions',
    description: 'Modern, high-converting, responsive websites tailored to your brand identity, business goals, and lightning-fast load times with React, Vite, and Tailwind CSS.',
    keywords: 'website development India, corporate website design, React website development, high-performance websites',
    h1: 'Website Development Services',
    bodyText: 'We design and engineer bespoke, high-performance websites built with modern frontend stacks optimized for SEO visibility, sub-second load times, and fluid mobile responsiveness.'
  },
  {
    path: '/services/web-applications',
    title: 'Web Applications & SaaS Development | Yovexa Solutions',
    description: 'Scalable full-stack web applications and SaaS platforms engineered with robust Spring Boot backends and reactive React frontends.',
    keywords: 'web application development, SaaS development India, React Spring Boot full stack, enterprise portals',
    h1: 'Web Applications & SaaS Development',
    bodyText: 'We architect and deliver scalable web applications and SaaS platforms built for heavy business logic, high traffic, and mission-critical workflows.'
  },
  {
    path: '/services/rest-apis',
    title: 'REST API Design & Backend Integration Services | Yovexa Solutions',
    description: 'High-throughput, secure RESTful microservices and backend API systems for mobile apps, internal tools, and third-party systems.',
    keywords: 'REST API development, Spring Boot backend, microservices development, API integration services',
    h1: 'REST API Design & Backend Integration',
    bodyText: 'Engineered with Java Spring Boot and enterprise best practices, our REST APIs ensure strict data contract validation, rate limiting, and low latency caching.'
  },
  {
    path: '/services/admin-dashboards',
    title: 'Admin Dashboards & Internal CMS Development | Yovexa Solutions',
    description: 'Bespoke administrative portals and content management systems designed to streamline daily business operations.',
    keywords: 'admin dashboard development, internal CMS, custom backoffice software, React admin dashboards',
    h1: 'Admin Dashboards & Internal CMS',
    bodyText: 'Empower your operations team with tailored internal tools and admin portals featuring granular permissions, analytics summaries, and real-time audit trails.'
  },
  {
    path: '/portfolio',
    title: 'Software Engineering Portfolio & Client Work | Yovexa Solutions',
    description: 'Explore real-world software implementations, full-stack web applications, REST API integrations, and scalable business systems engineered by Yovexa Solutions.',
    keywords: 'software portfolio, web development projects, client case studies, full-stack implementations',
    h1: 'Engineered Portfolio & Production Showcase',
    bodyText: 'Explore our real-world software implementations, full-stack applications, and scalable business systems.'
  },
  {
    path: '/case-studies',
    title: 'Technical Case Studies & System Architecture Breakdowns | Yovexa Solutions',
    description: 'Explore in-depth engineering breakdowns of real business challenges solved, architectural decisions, and verified production outcomes.',
    keywords: 'software case studies, architecture breakdowns, engineering case studies, full stack case studies',
    h1: 'Technical Case Studies & Architecture Breakdowns',
    bodyText: 'Explore in-depth engineering breakdowns of real business challenges solved, architectural decisions, and verified production outcomes.'
  },
  {
    path: '/blog',
    title: 'Tech Insights, Engineering Blog & Perspectives | Yovexa Solutions',
    description: 'Practical engineering insights, software architecture breakdowns, and digital development methodologies from the Yovexa Solutions engineering team.',
    keywords: 'software engineering blog, tech insights, React tutorials, Spring Boot guides, web development perspectives',
    h1: 'Insights & Ideas — Yovexa Engineering Perspectives',
    bodyText: 'Practical engineering insights, software architecture breakdowns, and digital development methodologies.'
  },
  {
    path: '/contact',
    title: 'Contact Us — Start Your Software Development Project | Yovexa Solutions',
    description: 'Ready to build your digital product? Get in touch with Yovexa Solutions to discuss requirements, architecture approach, estimates, and timelines.',
    keywords: 'contact software company, hire web developers, software development inquiry, Yovexa contact',
    h1: 'Have a Project in Mind? Contact Yovexa Solutions',
    bodyText: 'Let us discuss your project requirements, technical architecture, and implementation timeline.'
  }
];

export function prerenderRoutes() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found! Run vite build first.');
    return;
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  for (const route of routesToPrerender) {
    const fullUrl = `${BASE_URL}${route.path}`;
    let modifiedHtml = baseHtml;

    // 1. Update Title tag
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    );

    // 2. Update Meta Title & Description
    modifiedHtml = modifiedHtml.replace(
      /<meta name="title" content=".*?" \/>/,
      `<meta name="title" content="${route.title}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${route.description}" />`
    );

    // 3. Update Keywords if present
    if (route.keywords) {
      modifiedHtml = modifiedHtml.replace(
        /<meta name="keywords" content=".*?" \/>/,
        `<meta name="keywords" content="${route.keywords}" />`
      );
    }

    // 4. Update Canonical
    modifiedHtml = modifiedHtml.replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="${fullUrl}" />`
    );

    // 5. Update Open Graph tags
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${fullUrl}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${route.title}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${route.description}" />`
    );

    // 6. Update Twitter Card tags
    modifiedHtml = modifiedHtml.replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta name="twitter:description" content=".*?" \/>/,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // 7. Inject Noscript / Fallback Content for Crawlers
    const noscriptContent = `
    <noscript>
      <div style="padding: 24px; font-family: sans-serif; background-color: #061225; color: #ffffff; text-align: center;">
        <h1 style="font-size: 24px; margin-bottom: 12px;">${route.h1}</h1>
        <p style="max-width: 700px; margin: 0 auto 16px auto; line-height: 1.6; color: #cbd5e1;">${route.bodyText}</p>
        <nav style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="/about" style="color: #38bdf8; text-decoration: underline;">About Us</a>
          <a href="/services" style="color: #38bdf8; text-decoration: underline;">Services</a>
          <a href="/portfolio" style="color: #38bdf8; text-decoration: underline;">Portfolio</a>
          <a href="/case-studies" style="color: #38bdf8; text-decoration: underline;">Case Studies</a>
          <a href="/blog" style="color: #38bdf8; text-decoration: underline;">Blog &amp; Insights</a>
          <a href="/contact" style="color: #38bdf8; text-decoration: underline;">Contact</a>
        </nav>
      </div>
    </noscript>`;

    modifiedHtml = modifiedHtml.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptContent);

    // Write file into dist/<route>/index.html
    const targetDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, modifiedHtml, 'utf-8');
    console.log(`Prerendered: ${route.path} -> ${targetFile}`);
  }

  console.log(`Successfully pre-rendered ${routesToPrerender.length} static SEO routes!`);
}

prerenderRoutes();

