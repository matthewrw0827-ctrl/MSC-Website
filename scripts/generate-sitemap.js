#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator
 * This script can be run to manually generate or update the sitemap
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs')
const path = require('path')

const baseUrl = 'https://mosaicsportcapital.com' // Replace with your actual domain

// Static pages configuration
const staticPages = [
  {
    url: baseUrl,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: `${baseUrl}/#about`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/#approach`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/#contact`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9,
  },
]

// Generate XML sitemap
function generateSitemapXML(pages) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  return xml
}

// Generate and save sitemap
function generateSitemap() {
  try {
    const sitemapXML = generateSitemapXML(staticPages)
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')
    
    // Ensure public directory exists
    const publicDir = path.dirname(sitemapPath)
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }
    
    fs.writeFileSync(sitemapPath, sitemapXML)
    console.log('✅ Sitemap generated successfully at:', sitemapPath)
    console.log(`📄 Generated ${staticPages.length} URLs`)
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap()
}

module.exports = { generateSitemap, generateSitemapXML }
