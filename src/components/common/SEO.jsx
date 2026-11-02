import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.yovexasolutions.in';
const DEFAULT_TITLE = 'Yovexa Solutions | Digital Engineering & Custom Software Development';
const DEFAULT_DESCRIPTION = 'Yovexa Solutions is an engineering-driven digital solutions company building robust websites, web applications, and custom software for growing businesses.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_KEYWORDS = 'Yovexa Solutions, software development company, web applications, custom software, Spring Boot, React, REST API, IT company India';

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = 'Yovexa Solutions - Digital Engineering & Custom Software Development',
  publishedAt,
  modifiedAt,
  author = 'Yovexa Solutions',
  schema,
  breadcrumbs,
  noindex = false,
}) {
  const fullTitle = title
    ? (title.includes('Yovexa') ? title : `${title} | Yovexa Solutions`)
    : DEFAULT_TITLE;

  const cleanCanonical = canonical
    ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`)
    : (typeof window !== 'undefined' ? `${SITE_URL}${window.location.pathname}` : SITE_URL);

  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  // Build breadcrumbs schema if provided
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': crumb.item.startsWith('http') ? crumb.item : `${SITE_URL}${crumb.item.startsWith('/') ? crumb.item : `/${crumb.item}`}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Title */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />

      {/* Description & Keywords */}
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      <meta name="author" content={author} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={cleanCanonical} />

      {/* Open Graph Tags */}
      <meta property="og:site_name" content="Yovexa Solutions" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={cleanCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:secure_url" content={fullOgImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content="en_US" />

      {ogType === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {ogType === 'article' && modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yovexasolutions" />
      <meta name="twitter:creator" content="@yovexasolutions" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Breadcrumb JSON-LD */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Page Specific Structured Data (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

