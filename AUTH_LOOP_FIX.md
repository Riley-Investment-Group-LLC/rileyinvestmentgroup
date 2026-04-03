# 🔧 Authentication Loop Fix

**Problem**: Login works in local dev, but loops in production  
**Cause**: NEXTAUTH_URL environment variable issue

---

## 🎯 THE FIX

### Check Your Vercel Environment Variables

Go to: https://vercel.com/dashboard  
→ Select `rileyinvestmentgroup` project  
→ Settings → Environment Variables

**Check that `NEXTAUTH_URL` is set to**:
```
NEXTAUTH_URL=https://www.rileyinvestmentgroup.com
```

**NOT**:
- ❌ `http://localhost:3000` (this is for local dev only)
- ❌ `https://rileyinvestmentgroup.com` (missing www)
- ❌ Missing entirely

---

## 🔧 HOW TO FIX

### Step 1: Update NEXTAUTH_URL in Vercel

1. Go to Vercel → Settings → Environment Variables
2. Find `NEXTAUTH_URL`
3. Make sure it's set to: `https://www.rileyinvestmentgroup.com`
4. Make sure it's enabled for: **Production** environment
5. Click "Save"

### Step 2: Redeploy

1. Go to Deployments tab
2. Find latest deployment
3. Click "..." → "Redeploy"
4. Wait 1-2 minutes

### Step 3: Test

1. Open **incognito/private window**
2. Go to: https://www.rileyinvestmentgroup.com
3. Click "Sign in with Google"
4. Sign in with your @rileyinvestmentgroup.com email
5. Should redirect to dashboard (not back to login)

---

## 🔍 VERIFICATION

### What to Check in Vercel

**Environment Variables Should Be**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXTAUTH_URL` | `https://www.rileyinvestmentgroup.com` | Production ✅ |
| `NEXTAUTH_SECRET` | (your secret) | Production ✅ |
| `GOOGLE_CLIENT_ID` | (your client ID) | Production ✅ |
| `GOOGLE_CLIENT_SECRET` | (your secret) | Production ✅ |
| `NEXT_PUBLIC_API_URL` | (your DO API URL) | Production ✅ |

**Common Mistakes**:
- ❌ NEXTAUTH_URL set to localhost
- ❌ Environment variables only set for "Preview" not "Production"
- ❌ Missing www in URL
- ❌ Using http instead of https

---

## 🐛 IF STILL NOT WORKING

### Additional Checks

**1. Clear Browser Data**:
- Clear cookies for rileyinvestmentgroup.com
- Clear cache
- Try in incognito window

**2. Check Google Cloud Console**:
- Go to: https://console.cloud.google.com/apis/credentials
- Find your OAuth client
- Verify "Authorized redirect URIs" includes:
  - `https://www.rileyinvestmentgroup.com/api/auth/callback/google`
- If missing, add it and save

**3. Check Vercel Deployment Logs**:
- Go to Deployments → Latest → "View Function Logs"
- Look for NextAuth errors
- Look for "NEXTAUTH_URL" errors

**4. Verify Latest Code is Deployed**:
- Latest commit should be: `30d48fe`
- Check Deployments tab shows this commit

---

## 💡 WHY THIS HAPPENS

### The Technical Reason

**In local dev**:
- NEXTAUTH_URL = `http://localhost:3000`
- Cookies work on localhost
- Session stored correctly

**In production**:
- NEXTAUTH_URL must be `https://www.rileyinvestmentgroup.com`
- If it's wrong, cookies don't work
- Session can't be stored
- You loop back to login

**The fix**: Make sure NEXTAUTH_URL matches your actual production URL exactly.

---

## 🚀 AFTER IT'S FIXED

Once authentication works, you'll be able to:
- ✅ Sign in with @rileyinvestmentgroup.com email
- ✅ Access dashboard
- ✅ Create customers (Wyoming, Hong Kong)
- ✅ Create invoices ($20k-$500k)
- ✅ Download professional PDFs with disclaimers
- ✅ Track payments and taxes

**Check your Vercel environment variables now!**
