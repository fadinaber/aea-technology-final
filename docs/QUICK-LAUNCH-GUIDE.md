# Quick Launch Guide - Go Live Before 8pm

## Right Now (Do These First)

### 1. Push to GitHub (2 minutes)
```powershell
git status
git add .
git commit -m "Pre-launch ready"
git push origin main
```

### 2. Deploy to Vercel (15 minutes)
Follow: `docs/vercel-deployment-guide.md`

**Quick version:**
1. Go to vercel.com → Sign up with GitHub
2. Import `aea-technology-final` repo
3. Add environment variables (see guide)
4. Deploy
5. Get staging URL

### 3. Test Staging (5 minutes)
```powershell
# Test redirects
.\scripts\test-redirects.ps1 -BaseUrl "https://your-vercel-url.vercel.app"

# Manually test:
# - Homepage loads
# - /products works
# - /contact works
# - /privacy-policy loads
```

### 4. Add Domain in Vercel (2 minutes)
1. Vercel project → Settings → Domains
2. Add: `aeatechnology.com`
3. Add: `www.aeatechnology.com`
4. Copy DNS records Vercel shows you

### 5. DNS Cutover (10 minutes)
1. Go to GoDaddy/NameSecure
2. Add DNS records (see `docs/dns-records.md` or what Vercel shows)
3. Wait 5-10 minutes
4. Test: `https://aeatechnology.com` loads new site

## Total Time: ~35 minutes

## After DNS Cutover

1. Test live site:
   - Homepage: `https://aeatechnology.com`
   - Redirect: `https://aeatechnology.com/press-releases` → `/press`
   - Sitemap: `https://aeatechnology.com/sitemap.xml`
   - Robots: `https://aeatechnology.com/robots.txt`

2. Submit to Google Search Console:
   - Submit sitemap: `https://aeatechnology.com/sitemap.xml`
   - Request indexing for homepage

3. Monitor next 24 hours:
   - Check Vercel analytics
   - Check Google Search Console for errors

## If Something Breaks

**Site won't load?**
- Check DNS records are correct
- Check Vercel deployment is successful
- Check environment variables are set

**Redirects not working?**
- Run test script: `.\scripts\test-redirects.ps1`
- Check `next.config.mjs` has redirects

**404 errors?**
- Add missing redirects to `next.config.mjs`
- Commit and push → Vercel auto-deploys

## Files You Need

- `docs/vercel-deployment-guide.md` - Step-by-step Vercel setup
- `docs/dns-records.md` - DNS record values
- `docs/pre-launch-checklist.md` - Full checklist
- `scripts/test-redirects.ps1` - Redirect testing script

## Ready to Launch Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Staging site tested
- [ ] Domain added in Vercel
- [ ] DNS records ready
- [ ] GoDaddy/NameSecure access confirmed

**If all checked → You're ready to go live!**

