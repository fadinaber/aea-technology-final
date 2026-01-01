# Quick Start: Give Your Client CMS Access

## ✅ What I've Done Automatically

1. ✅ Created an invite script (`studio/invite-user.js`) to easily add users
2. ✅ Added documentation (`CMS-ACCESS-SETUP.md`)
3. ✅ Updated package.json with invite script shortcut

## 🔧 What YOU Need to Do (2 Steps)

### Step 1: Deploy the CMS (One Time)

Open terminal in your project folder and run:

```bash
cd studio
npm run deploy
```

**OR** if you prefer the deploy script:

```bash
cd studio
node deploy.js
```

**This will:**
- Deploy your CMS to: `https://aeatechnology.sanity.studio`
- Make it accessible from anywhere in the world
- **Note:** You may need to login first: `npx sanity login`

---

### Step 2: Add Your Client's Email

**Option A: Using the Script I Created** (Easiest!)

```bash
cd studio
node invite-user.js your-client@email.com editor
```

Replace `your-client@email.com` with their actual email.

**Option B: Direct CLI Command**

```bash
cd studio
npx sanity users invite your-client@email.com --role editor
```

**Option C: Web Interface** (Easiest for non-technical users)

1. Go to: https://sanity.io/manage
2. Click your project
3. Click "Members" 
4. Click "Invite member"
5. Enter client's email
6. Select role: **Editor**
7. Click "Send invitation"

---

## 📧 What Happens Next

1. Your client receives an email invitation
2. They click the link and create a Sanity account (or login)
3. They can now access: `https://aeatechnology.sanity.studio`
4. They can edit all your website content!

---

## 🎯 Roles Explained

- **Editor** - Recommended! Can create, edit, delete content (full content management)
- **Viewer** - Read-only access
- **Contributor** - Can create/edit but not delete
- **Administrator** - Full access (use with caution)

---

## 📝 Quick Commands Reference

```bash
# Deploy CMS
cd studio && npm run deploy

# Invite user (using script)
cd studio && node invite-user.js email@example.com editor

# Invite user (direct CLI)
cd studio && npx sanity users invite email@example.com --role editor

# Login to Sanity (if needed)
cd studio && npx sanity login

# Check deployment status
# Just visit: https://aeatechnology.sanity.studio
```

---

## ⚠️ Important Notes

- **Yes, you can just add their email!** That's exactly what the invite commands do.
- The CMS URL will be: `https://aeatechnology.sanity.studio`
- The client can access it from anywhere - no VPN or special setup needed
- They just need internet and a web browser
- Changes appear on your website automatically (may take a few minutes)

---

## 🆘 Need Help?

- **Can't deploy?** Make sure you're logged in: `npx sanity login`
- **Client can't access?** Check spam folder for invitation email
- **Wrong role?** Re-invite them with the correct role

---

That's it! Once deployed and invited, your client has full CMS access from anywhere in the world! 🌍

