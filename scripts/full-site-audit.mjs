#!/usr/bin/env node
/**
 * Full Site Audit Script
 * Checks code, Sanity data, configuration, and functionality
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

console.log('🔍 FULL SITE AUDIT\n')
console.log('='.repeat(60))

const issues = []
const warnings = []
const checks = []

// ============================================================
// 1. SANITY DATA INTEGRITY
// ============================================================
console.log('\n📊 SANITY DATA INTEGRITY\n')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jvtqk7fd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function checkSanityData() {
  try {
    // Check homepage
    const homepage = await client.fetch('*[_type == "homepage"][0]')
    if (homepage) {
      const heroHeadline = homepage?.hero?.headline
      const expectedHeadline = {
        line1: "Professional RF",
        line2: "Testing Equipment",
        line3: "Products & Support"
      }
      
      if (JSON.stringify(heroHeadline) === JSON.stringify(expectedHeadline)) {
        console.log('  ✅ Homepage hero headline: CORRECT')
        checks.push({ category: 'Sanity', item: 'Homepage hero', status: 'ok' })
      } else {
        console.log('  ❌ Homepage hero headline: WRONG')
        console.log('     Expected:', JSON.stringify(expectedHeadline))
        console.log('     Got:', JSON.stringify(heroHeadline))
        issues.push('Sanity: Homepage hero headline is incorrect')
        checks.push({ category: 'Sanity', item: 'Homepage hero', status: 'error' })
      }
    } else {
      console.log('  ⚠️  Homepage: NOT FOUND in Sanity')
      warnings.push('Sanity: Homepage document missing')
      checks.push({ category: 'Sanity', item: 'Homepage', status: 'warning' })
    }

    // Check document counts
    const [products, press, resources, distributors, faqs, team] = await Promise.all([
      client.fetch('count(*[_type == "product"])'),
      client.fetch('count(*[_type == "pressRelease"])'),
      client.fetch('count(*[_type == "resource"])'),
      client.fetch('count(*[_type == "distributor"])'),
      client.fetch('count(*[_type == "faq"])'),
      client.fetch('count(*[_type == "teamMember"])'),
    ])

    console.log('\n  Document Counts:')
    console.log(`    Products: ${products}`)
    console.log(`    Press Releases: ${press}`)
    console.log(`    Resources: ${resources}`)
    console.log(`    Distributors: ${distributors}`)
    console.log(`    FAQs: ${faqs}`)
    console.log(`    Team Members: ${team}`)

    const expectedCounts = {
      products: 7,
      press: 7,
      resources: 55,
      distributors: 47,
      faqs: 4,
      team: 1
    }

    const counts = { products, press, resources, distributors, faqs, team }
    const countNames = { products: 'Products', press: 'Press Releases', resources: 'Resources', distributors: 'Distributors', faqs: 'FAQs', team: 'Team Members' }

    Object.entries(expectedCounts).forEach(([key, expected]) => {
      const actual = counts[key]
      if (actual >= expected) {
        console.log(`    ✅ ${countNames[key]}: ${actual} (expected ${expected}+)`)
        checks.push({ category: 'Sanity', item: countNames[key], status: 'ok' })
      } else {
        console.log(`    ⚠️  ${countNames[key]}: ${actual} (expected ${expected})`)
        warnings.push(`Sanity: ${countNames[key]} count is low (${actual} vs ${expected})`)
        checks.push({ category: 'Sanity', item: countNames[key], status: 'warning' })
      }
    })

  } catch (error) {
    console.log('  ❌ Error checking Sanity:', error.message)
    issues.push(`Sanity: Connection error - ${error.message}`)
    checks.push({ category: 'Sanity', item: 'Connection', status: 'error' })
  }
}

// ============================================================
// 2. CONFIGURATION FILES
// ============================================================
console.log('\n⚙️  CONFIGURATION FILES\n')

function checkConfigFiles() {
  const configFiles = [
    'package.json',
    'next.config.mjs',
    'tsconfig.json',
    '.env.local',
    'app/layout.tsx',
    'app/page.tsx'
  ]

  configFiles.forEach(file => {
    const path = join(rootDir, file)
    if (existsSync(path)) {
      console.log(`  ✅ ${file}: EXISTS`)
      checks.push({ category: 'Config', item: file, status: 'ok' })
    } else {
      console.log(`  ❌ ${file}: MISSING`)
      issues.push(`Config: ${file} is missing`)
      checks.push({ category: 'Config', item: file, status: 'error' })
    }
  })

  // Check package.json for critical dependencies
  try {
    const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'))
    const criticalDeps = ['next', 'react', 'react-dom', '@vercel/analytics', '@vercel/speed-insights']
    
    console.log('\n  Critical Dependencies:')
    criticalDeps.forEach(dep => {
      if (pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]) {
        console.log(`    ✅ ${dep}: INSTALLED`)
        checks.push({ category: 'Dependencies', item: dep, status: 'ok' })
      } else {
        console.log(`    ❌ ${dep}: MISSING`)
        issues.push(`Dependencies: ${dep} is not installed`)
        checks.push({ category: 'Dependencies', item: dep, status: 'error' })
      }
    })
  } catch (e) {
    console.log('  ⚠️  Could not check package.json')
  }
}

// ============================================================
// 3. CODE INTEGRITY
// ============================================================
console.log('\n💻 CODE INTEGRITY\n')

function checkCodeIntegrity() {
  // Check critical files exist
  const criticalFiles = [
    'app/page.tsx',
    'app/layout.tsx',
    'app/api/contact/route.ts',
    'components/hero.tsx',
    'data/homepage.ts',
    'sanity/lib/client.ts'
  ]

  criticalFiles.forEach(file => {
    const path = join(rootDir, file)
    if (existsSync(path)) {
      console.log(`  ✅ ${file}: EXISTS`)
      checks.push({ category: 'Code', item: file, status: 'ok' })
    } else {
      console.log(`  ❌ ${file}: MISSING`)
      issues.push(`Code: ${file} is missing`)
      checks.push({ category: 'Code', item: file, status: 'error' })
    }
  })

  // Check for Analytics in layout
  try {
    const layoutContent = readFileSync(join(rootDir, 'app/layout.tsx'), 'utf-8')
    const hasAnalytics = layoutContent.includes('@vercel/analytics') && layoutContent.includes('<Analytics')
    const hasSpeedInsights = layoutContent.includes('@vercel/speed-insights') && layoutContent.includes('<SpeedInsights')
    
    console.log('\n  Analytics Setup:')
    if (hasAnalytics) {
      console.log('    ✅ Vercel Analytics: CONFIGURED')
      checks.push({ category: 'Analytics', item: 'Vercel Analytics', status: 'ok' })
    } else {
      console.log('    ❌ Vercel Analytics: NOT CONFIGURED')
      issues.push('Analytics: Vercel Analytics not configured')
      checks.push({ category: 'Analytics', item: 'Vercel Analytics', status: 'error' })
    }
    
    if (hasSpeedInsights) {
      console.log('    ✅ Speed Insights: CONFIGURED')
      checks.push({ category: 'Analytics', item: 'Speed Insights', status: 'ok' })
    } else {
      console.log('    ❌ Speed Insights: NOT CONFIGURED')
      issues.push('Analytics: Speed Insights not configured')
      checks.push({ category: 'Analytics', item: 'Speed Insights', status: 'error' })
    }
  } catch (e) {
    console.log('    ⚠️  Could not check layout.tsx')
  }

  // Check hero content fallbacks
  try {
    const pageContent = readFileSync(join(rootDir, 'app/page.tsx'), 'utf-8')
    const hasCorrectFallback = pageContent.includes('"Professional RF"') && 
                                pageContent.includes('"Testing Equipment"') &&
                                pageContent.includes('"Products & Support"')
    
    if (hasCorrectFallback) {
      console.log('    ✅ Hero fallbacks: CORRECT')
      checks.push({ category: 'Code', item: 'Hero fallbacks', status: 'ok' })
    } else {
      console.log('    ❌ Hero fallbacks: INCORRECT')
      issues.push('Code: Hero content fallbacks are incorrect')
      checks.push({ category: 'Code', item: 'Hero fallbacks', status: 'error' })
    }
  } catch (e) {
    console.log('    ⚠️  Could not check page.tsx')
  }
}

// ============================================================
// 4. SEO CONFIGURATION
// ============================================================
console.log('\n🔍 SEO CONFIGURATION\n')

function checkSEO() {
  try {
    const privacyContent = readFileSync(join(rootDir, 'app/privacy-policy/page.tsx'), 'utf-8')
    const hasCanonical = privacyContent.includes('canonical') && privacyContent.includes('privacy-policy')
    
    if (hasCanonical) {
      console.log('  ✅ Privacy Policy canonical: CONFIGURED')
      checks.push({ category: 'SEO', item: 'Privacy canonical', status: 'ok' })
    } else {
      console.log('  ❌ Privacy Policy canonical: MISSING')
      issues.push('SEO: Privacy Policy missing canonical tag')
      checks.push({ category: 'SEO', item: 'Privacy canonical', status: 'error' })
    }

    const nextConfig = readFileSync(join(rootDir, 'next.config.mjs'), 'utf-8')
    const hasNoindex = nextConfig.includes('X-Robots-Tag') && nextConfig.includes('noindex')
    
    if (hasNoindex) {
      console.log('  ✅ Static assets noindex: CONFIGURED')
      checks.push({ category: 'SEO', item: 'Noindex headers', status: 'ok' })
    } else {
      console.log('  ⚠️  Static assets noindex: NOT CONFIGURED')
      warnings.push('SEO: Noindex headers not configured for static assets')
      checks.push({ category: 'SEO', item: 'Noindex headers', status: 'warning' })
    }

    const robotsExists = existsSync(join(rootDir, 'public/robots.txt'))
    const sitemapExists = existsSync(join(rootDir, 'app/sitemap.ts'))
    
    console.log(`  ${robotsExists ? '✅' : '❌'} robots.txt: ${robotsExists ? 'EXISTS' : 'MISSING'}`)
    console.log(`  ${sitemapExists ? '✅' : '❌'} sitemap.ts: ${sitemapExists ? 'EXISTS' : 'MISSING'}`)
    
    checks.push({ category: 'SEO', item: 'robots.txt', status: robotsExists ? 'ok' : 'error' })
    checks.push({ category: 'SEO', item: 'sitemap.ts', status: sitemapExists ? 'ok' : 'error' })
  } catch (e) {
    console.log('  ⚠️  Could not check SEO files')
  }
}

// ============================================================
// 5. EMAIL CONFIGURATION
// ============================================================
console.log('\n📧 EMAIL CONFIGURATION\n')

function checkEmail() {
  try {
    const emailRoute = readFileSync(join(rootDir, 'app/api/contact/route.ts'), 'utf-8')
    
    const hasReplyTo = emailRoute.includes('replyTo: email')
    const hasHeaders = emailRoute.includes('X-Entity-Ref-ID') && emailRoute.includes('Precedence')
    const noMailto = !emailRoute.includes('mailto:') || emailRoute.match(/mailto:/g)?.length === 0
    
    console.log(`  ${hasReplyTo ? '✅' : '❌'} ReplyTo: ${hasReplyTo ? 'USES SUBMITTER EMAIL' : 'NOT CONFIGURED'}`)
    console.log(`  ${hasHeaders ? '✅' : '⚠️ '} Email headers: ${hasHeaders ? 'CONFIGURED' : 'MISSING'}`)
    console.log(`  ${noMailto ? '✅' : '❌'} No mailto links: ${noMailto ? 'CLEAN' : 'FOUND MAILTO LINKS'}`)
    
    checks.push({ category: 'Email', item: 'ReplyTo', status: hasReplyTo ? 'ok' : 'error' })
    checks.push({ category: 'Email', item: 'Headers', status: hasHeaders ? 'ok' : 'warning' })
    checks.push({ category: 'Email', item: 'No mailto', status: noMailto ? 'ok' : 'error' })
  } catch (e) {
    console.log('  ⚠️  Could not check email route')
  }
}

// ============================================================
// RUN ALL CHECKS
// ============================================================
async function runAudit() {
  await checkSanityData()
  checkConfigFiles()
  checkCodeIntegrity()
  checkSEO()
  checkEmail()

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 AUDIT SUMMARY\n')

  const totalChecks = checks.length
  const passed = checks.filter(c => c.status === 'ok').length
  const warningsCount = checks.filter(c => c.status === 'warning').length
  const failed = checks.filter(c => c.status === 'error').length

  console.log(`Total Checks: ${totalChecks}`)
  console.log(`✅ Passed: ${passed}`)
  console.log(`⚠️  Warnings: ${warningsCount}`)
  console.log(`❌ Failed: ${failed}`)

  if (issues.length > 0) {
    console.log('\n❌ CRITICAL ISSUES:')
    issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue}`)
    })
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:')
    warnings.forEach((warning, i) => {
      console.log(`  ${i + 1}. ${warning}`)
    })
  }

  if (issues.length === 0 && warnings.length === 0) {
    console.log('\n🎉 All checks passed! Site is healthy.')
  } else if (issues.length === 0) {
    console.log('\n✅ No critical issues. Site is functional with minor warnings.')
  } else {
    console.log('\n⚠️  Site has issues that need attention.')
  }

  // Export detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: totalChecks,
      passed,
      warnings: warningsCount,
      failed
    },
    issues,
    warnings,
    checks: checks.reduce((acc, check) => {
      if (!acc[check.category]) acc[check.category] = []
      acc[check.category].push({ item: check.item, status: check.status })
      return acc
    }, {})
  }

  console.log('\n📄 Detailed report saved to: site-audit-report.json')
  const fs = await import('fs')
  fs.writeFileSync(
    join(rootDir, 'site-audit-report.json'),
    JSON.stringify(report, null, 2)
  )

  process.exit(issues.length > 0 ? 1 : 0)
}

runAudit().catch(console.error)

