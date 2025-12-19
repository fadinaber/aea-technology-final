# DNS Records for AEA Technology Site Launch

## Vercel Domain Setup

After deploying to Vercel, you'll need to add these DNS records in GoDaddy/NameSecure.

### Step 1: Add Domain in Vercel

1. Go to your Vercel project → **Settings → Domains**
2. Click **"Add Domain"**
3. Enter: `aeatechnology.com`
4. Enter: `www.aeatechnology.com`
5. Vercel will show you the exact DNS records to add

### Step 2: DNS Records to Add (GoDaddy/NameSecure)

**Record Type: A (for apex domain)**
- **Name/Host**: `@` or `aeatechnology.com` (leave blank in some systems)
- **Value/IP**: [Vercel will provide this - usually starts with `76.76.21.`]
- **TTL**: 3600 (or default)

**Record Type: CNAME (for www subdomain)**
- **Name/Host**: `www`
- **Value/Target**: [Vercel will provide this - usually `cname.vercel-dns.com.`]
- **TTL**: 3600 (or default)

### Step 3: Verify DNS Propagation

After adding records, wait 5-10 minutes, then check:
- `https://aeatechnology.com` loads your new site
- `https://www.aeatechnology.com` redirects to `https://aeatechnology.com`

### Important Notes

- **Don't delete old DNS records until new ones are verified working**
- DNS changes can take up to 48 hours to fully propagate, but usually work within 10-30 minutes
- Vercel will automatically handle SSL certificates once DNS is configured
- The `www` → non-www redirect is handled by Vercel automatically

## Sanity Studio Domain (Optional - for later)

If you want the CMS at `cms.aeatechnology.com`:

1. In your Sanity Studio Vercel project → **Settings → Domains**
2. Add: `cms.aeatechnology.com`
3. Add DNS record in GoDaddy/NameSecure:
   - **Type**: CNAME
   - **Name**: `cms`
   - **Value**: [Vercel provides this]
   - **TTL**: 3600

