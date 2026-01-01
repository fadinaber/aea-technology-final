# CMS Access Setup Guide

## Quick Setup for Client Access

This guide will help you deploy the CMS and give your client access.

---

## Step 1: Deploy Sanity Studio (One-Time Setup)

The CMS needs to be deployed online so your client can access it from anywhere.

### Run this command:

```bash
cd studio
npm run deploy
```

**OR** use the deploy script:

```bash
cd studio
node deploy.js
```

**What happens:**
- The Studio will be deployed to: `https://aeatechnology.sanity.studio`
- It will be accessible 24/7 from anywhere in the world
- **Note:** You may need to log in to Sanity first with `npx sanity login`

---

## Step 2: Invite Your Client

You have **two options** to add your client:

### Option A: Using the Script (Easiest)

```bash
cd studio
node invite-user.js client@example.com editor
```

Replace `client@example.com` with your client's actual email address.

**Available roles:**
- `editor` - Can create, edit, and delete content (recommended)
- `viewer` - Can only view content (read-only)
- `contributor` - Can create and edit but not delete
- `administrator` - Full access (use with caution)

### Option B: Using Sanity CLI Directly

```bash
cd studio
npx sanity users invite client@example.com --role editor
```

### Option C: Using Sanity Web Interface

1. Go to: https://sanity.io/manage
2. Select your project
3. Click "Members" or "Users"
4. Click "Invite member"
5. Enter your client's email
6. Select role: **Editor** (recommended)
7. Click "Send invitation"

---

## Step 3: What Your Client Needs to Do

After you send the invitation:

1. Your client will receive an email from Sanity
2. They click the link in the email
3. They create a Sanity account (or log in if they have one)
4. They can now access the CMS at: `https://aeatechnology.sanity.studio`

**Important:** Your client must use the same email and login method (Google, email, etc.) that they used to accept the invitation.

---

## Quick Reference

**CMS URL:** https://aeatechnology.sanity.studio

**To deploy:**
```bash
cd studio && npm run deploy
```

**To invite a user:**
```bash
cd studio && node invite-user.js email@example.com editor
```

**To check if you're logged in:**
```bash
cd studio && npx sanity login
```

---

## Troubleshooting

**Deployment fails:**
- Make sure you're logged in: `npx sanity login`
- Make sure you're in the `studio` folder

**Client can't access:**
- Check that the invitation email was sent (check spam folder)
- Verify they used the same email/account to log in
- Make sure Studio is deployed: `https://aeatechnology.sanity.studio`

**Client can log in but can't edit:**
- Check their role - they need at least "editor" role
- Re-invite them with editor role if needed

---

## Security Notes

- The CMS URL is public, but only invited users can log in
- Each user needs their own invitation
- You can remove users at any time from https://sanity.io/manage
- Roles control what users can do - "editor" is usually sufficient for content management

