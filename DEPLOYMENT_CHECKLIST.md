# 🚀 Riley Investment Group LLC - Deployment Checklist

**Date**: April 2, 2026  
**Status**: Ready for deployment with auth configuration

---

## ✅ COMPLETED ITEMS

### Frontend (Vercel)
- ✅ Repository: `Riley-Investment-Group-LLC/rileyinvestmentgroup`
- ✅ Domain: `https://www.rileyinvestmentgroup.com` (connected)
- ✅ All dependencies installed (package.json complete)
- ✅ NextAuth.js authentication configured
- ✅ Google OAuth setup complete
- ✅ Middleware protecting all routes
- ✅ Tailwind CSS configured
- ✅ All pages created (invoices, purchases, products, customers, reports, bank)

### Environment Variables Set in Vercel
- ✅ `NEXTAUTH_URL` = https://www.rileyinvestmentgroup.com
- ✅ `NEXTAUTH_SECRET` = (generated)
- ✅ `GOOGLE_CLIENT_ID` = (from Google Cloud Console)
- ✅ `GOOGLE_CLIENT_SECRET` = (from Google Cloud Console)
- ⚠️ `NEXT_PUBLIC_API_URL` = **NEEDS UPDATE** (currently localhost, needs DO URL)

### Google OAuth Configuration
- ✅ Project: Riley Investment Group
- ✅ OAuth consent screen configured
- ✅ Authorized JavaScript origins: `https://www.rileyinvestmentgroup.com`
- ✅ Authorized redirect URIs: `https://www.rileyinvestmentgroup.com/api/auth/callback/google`
- ✅ Credentials created and added to Vercel

---

## 🔴 CRITICAL - NEEDS IMMEDIATE ACTION

### 1. Supabase Database Setup (2 minutes)
**Status**: ❌ NOT DONE

**Action Required**:
1. Go to https://supabase.com/dashboard/projects
2. Select your project (db.fwqwuaoxcqbaagpkprua.supabase.co)
3. Click "SQL Editor" → "New Query"
4. Copy contents from `c:\Users\SethRiley\Git Repository\tarjeta\riley-investment-group-llc\shared\database-schema.sql`
5. Paste and click "Run"
6. Verify: Should see "Success. No rows returned"

**Why Critical**: Without database tables, the API will fail on every request.

---

### 2. Deploy API to Digital Ocean (10 minutes)
**Status**: ❌ NOT DONE

**Action Required**:
1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Choose "GitHub" as source
4. Authorize Digital Ocean to access `Riley-Investment-Group-LLC` organization
5. Select repository: `Riley-Investment-Group-LLC/tarjeta`
6. Branch: `master` (or `main` - check which branch exists)
7. **CRITICAL**: Set "Source Directory" to `riley-investment-group-llc/api`
8. Click "Next"

**App Configuration**:
- **App Name**: `riley-investment-group-api`
- **Region**: New York (closest to you)
- **Plan**: Basic ($5/month)
- **HTTP Port**: `8080`
- **Build Command**: `pip install -r requirements.txt`
- **Run Command**: `uvicorn main:app --host 0.0.0.0 --port 8080`

**Environment Variables to Add**:
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.fwqwuaoxcqbaagpkprua.supabase.co:5432/postgres
CORS_ORIGINS=https://www.rileyinvestmentgroup.com,http://localhost:3000
DEBUG=False
BUSINESS_NAME=Riley Investment Group LLC
BUSINESS_ADDRESS=4815 W Williamsburg Pass, New Palestine IN 46163-8567
BUSINESS_EMAIL=info@rileyinvestmentgroup.com
BUSINESS_EIN=30-1482466
INDIANA_TAX_RATE=0.07
INDIANA_TID=8001327846
INDIANA_LOCATION=001
INVOICE_PREFIX=RIG
INVOICE_DUE_DAYS=30
STORAGE_PATH=/tmp/invoices
```

**After Deployment**:
- Copy your API URL (e.g., `https://riley-investment-group-api-xxxxx.ondigitalocean.app`)
- Save it for the next step

---

### 3. Update Frontend API URL in Vercel (1 minute)
**Status**: ❌ NOT DONE (waiting for DO deployment)

**Action Required**:
1. Go to Vercel → Your project → Settings → Environment Variables
2. Find `NEXT_PUBLIC_API_URL`
3. Update value to your Digital Ocean API URL
4. Click "Save"
5. Go to Deployments → Latest deployment → "Redeploy"

---

### 4. Test Authentication (2 minutes)
**Status**: ⚠️ NEEDS VERIFICATION

**Current Issue**: Site is accessible without login

**Possible Causes**:
1. Vercel deployment hasn't picked up latest code (commit `ba356be`)
2. Environment variables not applied to latest deployment
3. Browser caching

**Action Required**:
1. Wait for latest deployment (commit `851b95e`) to finish
2. Open site in **incognito/private window**
3. Should redirect to `/auth/signin`
4. Try logging in with `info@rileyinvestmentgroup.com`
5. Should see dashboard after successful login
6. Try logging in with a non-@rileyinvestmentgroup.com email
7. Should see "Access Denied" error

**If Still Not Working**:
- Check Vercel deployment logs
- Verify environment variables are set for "Production" environment
- Check that latest commit is deployed
- Clear browser cache completely

---

## 📋 VERIFICATION CHECKLIST

### Frontend Verification
- [ ] Latest commit deployed (check Vercel deployments page)
- [ ] Site redirects to `/auth/signin` when not logged in
- [ ] Can log in with `@rileyinvestmentgroup.com` email
- [ ] Cannot log in with other email domains
- [ ] Dashboard loads after login
- [ ] All navigation links work
- [ ] Sign out button works

### API Verification (After DO Deployment)
- [ ] API is accessible at DO URL
- [ ] `/docs` endpoint shows FastAPI documentation
- [ ] `/health` endpoint returns 200 OK
- [ ] CORS allows requests from rileyinvestmentgroup.com
- [ ] Database connection works

### Database Verification
- [ ] All 7 tables created (customers, products, invoices, etc.)
- [ ] All 4 views created (monthly_sales_summary, etc.)
- [ ] Sequences created (invoice_number_seq, purchase_number_seq)
- [ ] Triggers working (updated_at auto-updates)

### End-to-End Verification
- [ ] Can create a customer
- [ ] Can create a product
- [ ] Can create a purchase
- [ ] Can create an invoice
- [ ] Can download invoice PDF
- [ ] Can import Chase CSV
- [ ] Can view reports
- [ ] Margin calculations are correct

---

## 🐛 KNOWN ISSUES

### Issue 1: Authentication Not Enforcing
**Status**: Being fixed with commit `851b95e`  
**Impact**: Site is publicly accessible  
**Fix**: Wait for deployment, test in incognito window

### Issue 2: API Not Deployed
**Status**: Waiting for DO setup  
**Impact**: Frontend will show errors when trying to fetch data  
**Fix**: Deploy to Digital Ocean (see section 2 above)

### Issue 3: Database Not Initialized
**Status**: Waiting for schema execution  
**Impact**: API will fail on all database operations  
**Fix**: Run schema in Supabase SQL Editor (see section 1 above)

---

## 📞 SUPPORT INFORMATION

### Repository Locations
- **Frontend**: https://github.com/Riley-Investment-Group-LLC/rileyinvestmentgroup
- **Backend**: https://github.com/Riley-Investment-Group-LLC/tarjeta (in `riley-investment-group-llc/api/`)

### Credentials & Access
- **Domain**: rileyinvestmentgroup.com (Vercel)
- **Database**: Supabase (db.fwqwuaoxcqbaagpkprua.supabase.co)
- **Email**: info@rileyinvestmentgroup.com
- **Google Workspace**: @rileyinvestmentgroup.com domain

### Service Dashboards
- **Vercel**: https://vercel.com/dashboard
- **Digital Ocean**: https://cloud.digitalocean.com/apps
- **Supabase**: https://supabase.com/dashboard/projects
- **Google Cloud**: https://console.cloud.google.com

---

## 🎯 NEXT STEPS (IN ORDER)

1. **RIGHT NOW**: Run Supabase database schema (2 min)
2. **THEN**: Deploy API to Digital Ocean (10 min)
3. **THEN**: Update NEXT_PUBLIC_API_URL in Vercel (1 min)
4. **THEN**: Test authentication in incognito window (2 min)
5. **THEN**: Create your first invoice!

---

## 💡 TIPS

- Always test in incognito window after deployment changes
- Check Vercel deployment logs if builds fail
- Monitor Digital Ocean app logs for API errors
- Use `/docs` endpoint on API to test endpoints
- Keep your `.env` files secure (never commit them)

---

**Last Updated**: April 2, 2026 at 3:00 PM  
**Next Review**: After all critical items are completed
