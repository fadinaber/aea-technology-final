# FAQ Fix Instructions

## ✅ What I've Done

I've created a migration script (`scripts/fix-faq-answers.mjs`) that will automatically fix all your FAQs by converting string answers to the correct block format that Sanity expects.

## 🔧 What You Need to Do

The script needs a Sanity API token with **write permissions**. Here's how to fix the FAQs:

### Step 1: Get a Sanity API Token with Write Permissions

1. Go to: https://sanity.io/manage
2. Select your project (jvtqk7fd)
3. Go to **API** → **Tokens**
4. Click **"Add API token"**
5. Give it a name like "FAQ Migration"
6. Set permissions to **"Editor"** (full read/write access)
7. Copy the token

### Step 2: Add Token to .env.local

Add or update this line in your `.env.local` file:

```
SANITY_API_TOKEN=your-token-here
```

Replace `your-token-here` with the token you copied.

### Step 3: Run the Fix Script

```bash
npm run fix-faqs
```

**OR** directly:

```bash
node scripts/fix-faq-answers.mjs
```

### Step 4: Verify in Sanity Studio

1. Open Sanity Studio
2. Go to FAQs section
3. Check that the error is gone
4. The answers should now be editable as rich text blocks

---

## 🔍 Test First (Dry Run)

To see what will be fixed without making changes:

```bash
npm run fix-faqs:dry
```

This will show you which FAQs need fixing without actually updating them.

---

## 📋 What the Script Does

The script:
1. Fetches all FAQs from Sanity
2. Identifies FAQs with string answers (the problem)
3. Converts strings to portable text blocks (the correct format)
4. Updates all FAQs in Sanity

**All 4 FAQs** currently have this issue and will be fixed.

---

## ✅ Quick Commands

```bash
# Test what will be fixed (dry run)
npm run fix-faqs:dry

# Actually fix all FAQs
npm run fix-faqs
```

---

That's it! Once you run the script with a proper API token, all your FAQs will be fixed! 🎉

