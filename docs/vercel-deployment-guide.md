# Vercel Deployment Guide - AEA Technology Site

## Step 1: Push to GitHub

Make sure all code is committed and pushed:

```powershell
git status
git add .
git commit -m "Pre-launch final updates"
git push origin main
```

## Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

## Step 3: Deploy Website

1. In Vercel dashboard, click **"Add New..." → "Project"**
2. Find `aea-technology-final` repo
3. Click **"Import"**
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Leave empty
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
5. **Don't click Deploy yet!** First add environment variables

## Step 4: Add Environment Variables

1. Before deploying, click **"Environment Variables"** (or go to Settings after deploy)
2. Add these 5 variables (click "Add" for each):

```
NEXT_PUBLIC_SANITY_PROJECT_ID = jvtqk7fd
```

```
NEXT_PUBLIC_SANITY_DATASET = production
```

```
SANITY_API_TOKEN = [paste from your .env.local file]
```

```
RESEND_API_KEY = [paste from your .env.local file]
```

```
RESEND_TEST_TO_EMAIL = fadiwnaber@gmail.com
```

**Important**: For each variable, check all three boxes:
- ☑ Production
- ☑ Preview  
- ☑ Development

Then click **"Save"**

## Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-5 minutes for build
3. You'll get a URL like: `https://aea-technology-final.vercel.app`

## Step 6: Test Staging Site

1. Open your Vercel URL
2. Test key pages load
3. Run redirect test:
   ```powershell
   .\scripts\test-redirects.ps1 -BaseUrl "https://your-vercel-url.vercel.app"
   ```

## Step 7: Deploy Sanity Studio (Separate Project)

1. In Vercel, click **"Add New..." → "Project"** again
2. Import same repo: `aea-technology-final`
3. **Change Root Directory to**: `studio`
4. Build Command: `npm run build` (or default)
5. Output Directory: `dist` (or default)
6. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `jvtqk7fd`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
7. Click **"Deploy"**

## Step 8: Add Domain (Before DNS Cutover)

1. In website Vercel project → **Settings → Domains**
2. Click **"Add Domain"**
3. Enter: `aeatechnology.com`
4. Enter: `www.aeatechnology.com`
5. Vercel will show DNS records to add (see `docs/dns-records.md`)

## Troubleshooting

**Build fails?**
- Check build logs in Vercel
- Usually missing environment variable

**Site loads but shows errors?**
- Verify all environment variables are set
- Make sure they're applied to all environments (Production, Preview, Development)

**Can't find repo?**
- Make sure GitHub account is connected
- Try refreshing the import page

