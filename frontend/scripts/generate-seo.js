#!/usr/bin/env node
/*
 * Post build step: turns the single CRA build/index.html into one static HTML
 * file per route, each carrying its own title, description, canonical URL,
 * Open Graph and Twitter tags, JSON-LD, and a plain HTML fallback body.
 *
 * Why this exists: the app renders entirely on the client, so the HTML that
 * crawlers download is an empty <div id="root">. Search engines and most AI
 * crawlers do not run JavaScript, so they saw nothing. These generated files
 * give them real markup without changing how the app itself works.
 *
 * `serve -s build` (see Dockerfile) resolves a real file before falling back to
 * index.html, so build/<route>/index.html is what gets served at /<route>.
 *
 * Runs in plain Node with no dependencies. Invoked from the "build" script.
 */

const fs = require('fs');
const path = require('path');
const { site, routes } = require('./seo.config');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const TEMPLATE = path.join(BUILD_DIR, 'index.html');

/** Strip the trailing slash so origin + basePath + '/foo' concatenates cleanly. */
const trimSlash = (s) => s.replace(/\/+$/, '');
const BASE = trimSlash(site.origin) + trimSlash(site.basePath);

/** Absolute public URL for a router path such as '/' or '/faqs'. */
function absUrl(routePath) {
  return routePath === '/' ? BASE + '/' : BASE + routePath;
}

/** Absolute URL for a file living in public/. */
function assetUrl(publicPath) {
  return BASE + publicPath;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** JSON-LD is embedded in a <script>, so only '<' needs neutralising. */
function escapeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function buildHead(route) {
  const url = absUrl(route.path);
  const image = assetUrl(route.image || site.defaultImage);
  const isHome = route.path === '/';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isHome ? 'WebSite' : 'WebPage',
    name: route.title,
    description: route.description,
    url,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: site.name, url: BASE + '/' },
    publisher: {
      '@type': 'Organization',
      name: site.organization,
      url: trimSlash(site.origin) + '/',
      logo: { '@type': 'ImageObject', url: assetUrl(site.logo) },
    },
  };

  const tags = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}"/>`,
    `<link rel="canonical" href="${escapeHtml(url)}"/>`,
    `<meta name="robots" content="index, follow, max-image-preview:large"/>`,

    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}"/>`,
    `<meta property="og:locale" content="${escapeHtml(site.locale)}"/>`,
    `<meta property="og:title" content="${escapeHtml(route.title)}"/>`,
    `<meta property="og:description" content="${escapeHtml(route.description)}"/>`,
    `<meta property="og:url" content="${escapeHtml(url)}"/>`,
    `<meta property="og:image" content="${escapeHtml(image)}"/>`,

    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}"/>`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}"/>`,
    `<meta name="twitter:image" content="${escapeHtml(image)}"/>`,

    `<script type="application/ld+json">${escapeJsonLd(jsonLd)}</script>`,
  ];

  return tags.join('');
}

/*
 * Fallback markup placed inside <div id="root">. React clears the container on
 * mount, so a visitor with JavaScript never sees this, while a crawler that
 * does not execute scripts gets readable text plus links to every other route.
 */
function buildFallback(route) {
  const links = routes
    .filter((r) => r.path !== route.path)
    .map(
      (r) =>
        `<li><a href="${escapeHtml(absUrl(r.path))}">${escapeHtml(r.name)}</a></li>`
    )
    .join('');

  return [
    '<div id="seo-fallback">',
    `<h1>${escapeHtml(route.name)}</h1>`,
    `<p>${escapeHtml(route.blurb)}</p>`,
    `<p>${escapeHtml(site.name)}</p>`,
    '<nav aria-label="Site"><h2>All pages</h2><ul>',
    `<li><a href="${escapeHtml(absUrl('/'))}">Home</a></li>`,
    links,
    '</ul></nav>',
    '</div>',
  ].join('');
}

function renderRoute(template, route) {
  let html = template;

  // Drop whatever CRA inlined from public/index.html so the per route tags below
  // are the only title/description/canonical present.
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '');
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  html = html.replace(/<meta\s+(?:property|name)="(?:og|twitter):[^"]*"[^>]*>/gi, '');

  if (!/<\/head>/i.test(html)) {
    throw new Error('build/index.html has no </head>; cannot inject metadata.');
  }
  html = html.replace(/<\/head>/i, buildHead(route) + '</head>');

  const rootDiv = /<div id="root">\s*<\/div>/i;
  if (!rootDiv.test(html)) {
    throw new Error('build/index.html has no empty <div id="root"></div>.');
  }
  html = html.replace(rootDiv, `<div id="root">${buildFallback(route)}</div>`);

  return html;
}

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) =>
      [
        '  <url>',
        `    <loc>${escapeHtml(absUrl(r.path))}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>monthly</changefreq>`,
        `    <priority>${r.path === '/' ? '1.0' : '0.7'}</priority>`,
        '  </url>',
      ].join('\n')
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), xml, 'utf8');
}

function writeRobots() {
  const txt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`;
  fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), txt, 'utf8');
}

function main() {
  if (!fs.existsSync(TEMPLATE)) {
    console.error(`[seo] ${TEMPLATE} not found. Run the build first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE, 'utf8');

  for (const route of routes) {
    const html = renderRoute(template, route);
    const outFile =
      route.path === '/'
        ? TEMPLATE
        : path.join(BUILD_DIR, route.path.replace(/^\//, ''), 'index.html');

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html, 'utf8');
  }

  writeSitemap();
  writeRobots();

  console.log(
    `[seo] wrote ${routes.length} HTML files, sitemap.xml and robots.txt to build/`
  );
}

main();
