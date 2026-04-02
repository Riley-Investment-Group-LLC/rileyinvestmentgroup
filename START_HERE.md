# 🚀 START HERE - Riley Investment Group LLC

**Welcome!** This is your complete business management system.

---

## ⚡ QUICK STATUS

### What You Have
✅ **Frontend**: Next.js app with authentication  
✅ **Backend**: FastAPI with all business logic  
✅ **Database**: PostgreSQL schema ready  
✅ **Domain**: rileyinvestmentgroup.com connected  
✅ **Authentication**: Google OAuth configured  

### What You Need to Do (15 minutes total)
❌ **1. Initialize Database** (2 min) - Run SQL in Supabase  
❌ **2. Deploy API** (10 min) - Create Digital Ocean app  
❌ **3. Connect Frontend** (1 min) - Add API URL to Vercel  

---

## 🎯 YOUR 3-STEP LAUNCH PLAN

### Step 1: Database Setup (2 minutes)

**Go to**: https://supabase.com/dashboard/projects

1. Select your project (db.fwqwuaoxcqbaagpkprua...)
2. Click "SQL Editor" (left sidebar)
3. Click "New Query"
4. Open file: `C:\Users\SethRiley\Git Repository\tarjeta\riley-investment-group-llc\shared\database-schema.sql`
5. Copy ALL contents (232 lines)
6. Paste into Supabase SQL editor
7. Click "Run" or press Ctrl+Enter
8. Should see: "Success. No rows returned"

**What this does**: Creates 7 tables, 4 views, indexes, and triggers for your business data.

---

### Step 2: Deploy API (10 minutes)

**Go to**: https://cloud.digitalocean.com/apps

1. Click "Create App"
2. Choose "GitHub" as source
3. Select: `Riley-Investment-Group-LLC/tarjeta`
4. Branch: `master`
5. Click "Next"

**Configure the app**:
- Click "Edit" on the detected service
- **Source Directory**: `riley-investment-group-llc/api` ⚠️ CRITICAL!
- **Build Command**: `pip install -r requirements.txt`
- **Run Command**: `uvicorn main:app --host 0.0.0.0 --port 8080`
- **HTTP Port**: `8080`
- Click "Save"

**Select plan**:
- Plan: Basic ($5/month)
- Click "Next"

**Add Environment Variables** (click "Add Variable" for each):

```
DATABASE_URL = postgresql://postgres:PWidoBs6Yag8xyZr@db.fwqwuaoxcqbaagpkprua.supabase.co:5432/postgres
CORS_ORIGINS = http://localhost:3000,https://www.rileyinvestmentgroup.com,https://rileyinvestmentgroup.com
DEBUG = False
BUSINESS_NAME = Riley Investment Group LLC
BUSINESS_ADDRESS = 4815 W Williamsburg Pass, New Palestine IN 46163-8567
BUSINESS_EMAIL = info@rileyinvestmentgroup.com
BUSINESS_PHONE = 317-951-6411
BUSINESS_EIN = 30-1482466
INDIANA_TAX_RATE = 0.07
INDIANA_TID = 8001327846
INDIANA_LOCATION = 001
INVOICE_PREFIX = RIG
INVOICE_DUE_DAYS = 30
STORAGE_PATH = /tmp/invoices
```

**Deploy**:
- Click "Create Resources"
- Wait 5-8 minutes for deployment
- **Copy your API URL** when done (e.g., `https://riley-investment-group-api-xxxxx.ondigitalocean.app`)

---

### Step 3: Connect Frontend to API (1 minute)

**Go to**: https://vercel.com/dashboard

1. Select your `rileyinvestmentgroup` project
2. Go to: Settings → Environment Variables
3. Find or add: `NEXT_PUBLIC_API_URL`
4. Set value to your Digital Ocean API URL (from Step 2)
5. Click "Save"
6. Go to: Deployments → Latest → "..." → "Redeploy"

---

## ✅ VERIFICATION

### Test Your API
Visit: `https://your-api-url.ondigitalocean.app/health`  
Should see: `{"status": "healthy"}`

Visit: `https://your-api-url.ondigitalocean.app/docs`  
Should see: FastAPI interactive documentation

### Test Your Frontend
Visit: `https://www.rileyinvestmentgroup.com` (in incognito window)  
Should see: Google sign-in page  
Sign in with: `info@rileyinvestmentgroup.com` or `seth@rileyinvestmentgroup.com`  
Should see: Dashboard with stats

### Create Your First Invoice
1. Click "Customers" → Add a test customer
2. Click "Products" → Add a test product
3. Click "Invoices" → "New Invoice"
4. Fill out the form
5. Click "Create Invoice"
6. Download the PDF
7. Verify it looks professional!

---

## 📚 DETAILED DOCUMENTATION

If you need more details, read these in order:

1. **REPOSITORY_SCAN_REPORT.md** - Complete analysis of your system
2. **DEPLOYMENT_CHECKLIST.md** - Detailed deployment verification
3. **DIGITAL_OCEAN_SETUP.md** - Step-by-step DO deployment guide
4. **tarjeta/riley-investment-group-llc/QUICKSTART.md** - Local development guide

---

## 🎉 WHAT YOU'VE BUILT

### A Complete Business Management System

**Features**:
- 📄 Professional PDF invoice generation
- 💰 Purchase tracking with cost basis
- 📊 Automatic profit margin calculations
- 🏦 Chase bank CSV import and reconciliation
- 📈 Financial reports and dashboards
- 🧾 Indiana ST-103 tax reporting
- 👥 Customer and product management
- 🔒 Secure authentication (Google OAuth)

**Cost**: $5/month (vs $115/month for QuickBooks)  
**Savings**: $1,320/year!

**Perfect for**:
- B2B bulk sales with tight margins
- Tracking tax-exempt purchases (ST-105)
- Generating professional invoices
- Monthly tax filing (ST-103)
- Understanding true profitability

---

## 🆘 NEED HELP?

### Common Issues

**"Site still not requiring login"**:
- Wait for latest Vercel deployment to finish
- Test in incognito/private window
- Hard refresh (Ctrl+Shift+R)

**"API returns 500 errors"**:
- Check you ran the database schema in Supabase
- Verify DATABASE_URL is correct in DO
- Check DO app logs for errors

**"Cannot create invoice"**:
- Verify API is deployed and accessible
- Check NEXT_PUBLIC_API_URL is set in Vercel
- Check CORS_ORIGINS includes your domain in DO

### Where to Get Help
- Check Digital Ocean app logs
- Check Vercel deployment logs
- Check Supabase database logs
- Review error messages in browser console (F12)

---

## 🎯 AFTER LAUNCH

### Daily Operations
- Create invoices as you make sales
- Record purchases as you buy inventory
- Review profit margins regularly
- Reconcile bank transactions weekly

### Monthly Tasks
- Generate ST-103 report for tax filing
- Review financial reports
- Check for low-margin products
- Reconcile all bank transactions

### Growth Path
- System handles 1000s of invoices
- Can upgrade DO plan if needed ($12/mo for 2x capacity)
- Can add team members (just add their @rileyinvestmentgroup.com emails)
- Can integrate with other tools via API

---

## 🏆 SUCCESS!

You now have a professional, automated business management system that:
- Saves you $1,320/year
- Tracks every penny of profit
- Generates professional invoices
- Handles Indiana tax compliance
- Scales with your business

**You're ready to run Riley Investment Group LLC like a pro!**

---

**Next Step**: Complete the 3-step launch plan above ⬆️

**Questions?** Check the detailed documentation files in this repository.

**Ready to launch?** Start with Step 1 (Supabase database setup).
