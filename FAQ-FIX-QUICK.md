# Quick Fix for FAQ Errors

Your FAQs have string answers but Sanity expects block format. Here are **2 easy ways** to fix it:

---

## Option 1: Get Write Token (Then Run Script - 2 minutes)

1. Go to: https://sanity.io/manage → Your Project → **API** → **Tokens**
2. Click **"Add API token"**
3. Name: "FAQ Fix"
4. Permission: **Editor** (read/write)
5. Copy token
6. Update `.env.local` - replace the existing `SANITY_API_TOKEN=...` line with the new token
7. Run: `npm run fix-faqs`

Done! All 4 FAQs fixed automatically.

---

## Option 2: Fix Manually in Studio (5 minutes)

1. Open Sanity Studio: http://localhost:3333/studio (or https://aeatechnology.sanity.studio)
2. Go to **FAQs** section
3. Click each FAQ (there are 4)
4. For each one:
   - Click in the "Answer" field
   - **Delete** the text that's there (the string)
   - **Type it again** - it will automatically save as block format
   - Click "Publish"
5. Repeat for all 4 FAQs

That's it! The error goes away once you re-enter the text.

---

**Recommendation:** Option 1 is faster if you want to fix all 4 at once. Option 2 works if you prefer clicking through the UI.

