# Pre-Launch Checklist - AEA Technology Site

## Before DNS Cutover

### Code & Deployment
- [ ] All code pushed to GitHub (`git push origin main`)
- [ ] Website deployed to Vercel
- [ ] Sanity Studio deployed to Vercel (separate project)
- [ ] Environment variables set in Vercel (all 5):
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `SANITY_API_TOKEN`
  - [ ] `RESEND_API_KEY`
  - [ ] `RESEND_TEST_TO_EMAIL`

### Staging Testing
- [ ] Staging URL works: `https://[project-name].vercel.app`
- [ ] Homepage loads correctly
- [ ] Key pages load:
  - [ ] `/products`
  - [ ] `/about`
  - [ ] `/contact`
  - [ ] `/resources`
  - [ ] `/press`
  - [ ] `/privacy-policy`
- [ ] Redirects work (run `scripts/test-redirects.ps1` against staging)
- [ ] `robots.txt` accessible: `https://[staging-url]/robots.txt`
- [ ] `sitemap.xml` accessible: `https://[staging-url]/sitemap.xml`
- [ ] Contact form submits (test with your email)

### SEO Files
- [ ] `robots.txt` has correct sitemap URL
- [ ] `sitemap.xml` includes all important pages
- [ ] No broken internal links
- [ ] Meta tags present (check page source)

### DNS Preparation
- [ ] Domain added in Vercel: `aeatechnology.com`
- [ ] Domain added in Vercel: `www.aeatechnology.com`
- [ ] DNS records documented (see `docs/dns-records.md`)
- [ ] Access to GoDaddy/NameSecure confirmed

### Google Tracking (Optional - can add later)
- [ ] Google Analytics ID received (or using placeholder)
- [ ] Google Ads ID received (or using placeholder)
- [ ] Tracking code updated in `app/layout.tsx` (if IDs received)

## During DNS Cutover

- [ ] Add A record for `aeatechnology.com` in GoDaddy/NameSecure
- [ ] Add CNAME record for `www` in GoDaddy/NameSecure
- [ ] Wait 5-10 minutes for DNS propagation
- [ ] Test `https://aeatechnology.com` loads new site
- [ ] Test `https://www.aeatechnology.com` redirects correctly

## Immediately After Launch

- [ ] Homepage loads: `https://aeatechnology.com`
- [ ] Test 3-5 old URLs redirect correctly:
  - [ ] `/press-releases` → `/press`
  - [ ] `/contact-us` → `/contact`
  - [ ] `/avionics-kits` → `/products/e20-20-avionics`
- [ ] `robots.txt` works: `https://aeatechnology.com/robots.txt`
- [ ] `sitemap.xml` works: `https://aeatechnology.com/sitemap.xml`
- [ ] Contact form works (submit test)
- [ ] No console errors in browser
- [ ] Mobile responsive (quick check)

## Post-Launch (Next 24-48 Hours)

- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Google Search Console for 404 errors
- [ ] Check Vercel analytics for traffic
- [ ] Verify redirects in Google Search Console (should show as "Page with redirect")
- [ ] Update Google IDs in code if received (if using placeholders)

## Critical Issues to Watch For

**If you see these, fix immediately:**
- 404 errors for important pages
- Contact form not working
- Site not loading at all
- Redirect chains (301 → 301 → 200 instead of direct 301 → 200)

**Can wait 24-48 hours:**
- Minor styling tweaks
- Content updates
- Google IDs (if using placeholders)

