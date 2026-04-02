# 🚀 Digital Ocean API Deployment - Quick Start Guide

**For**: Riley Investment Group LLC API  
**Time Required**: 10 minutes  
**Cost**: $5/month

---

## 📋 BEFORE YOU START

Make sure you have:
- ✅ Digital Ocean account with billing set up
- ✅ GitHub account with access to `Riley-Investment-Group-LLC/tarjeta` repo
- ✅ Supabase database connection string
- ✅ All environment variables from `tarjeta/riley-investment-group-llc/api/.env`

---

## 🎯 STEP-BY-STEP DEPLOYMENT

### Step 1: Create New App (2 minutes)

1. **Go to**: https://cloud.digitalocean.com/apps

2. **Click**: "Create App" button (blue button, top right)

3. **Select Source**:
   - Choose: **"GitHub"**
   - Click: "Manage Access" (if first time)
   - Authorize Digital Ocean to access your GitHub organization: `Riley-Investment-Group-LLC`
   - Click: "Install & Authorize"

4. **Select Repository**:
   - Repository: **`Riley-Investment-Group-LLC/tarjeta`**
   - Branch: **`master`** (or `main` - check which one exists)
   - Click: "Next"

---

### Step 2: Configure App Settings (3 minutes)

#### Basic Settings

1. **Edit the detected service** (click "Edit" button):
   
   **Resources**:
   - Type: **Web Service**
   - Name: **`riley-investment-group-api`**
   
   **Source**:
   - Source Directory: **`riley-investment-group-llc/api`** ⚠️ CRITICAL - Must set this!
   - Autodeploy: **✅ Enabled** (deploys on git push)
   
   **Build Settings**:
   - Build Command: **`pip install -r requirements.txt`**
   - Run Command: **`uvicorn main:app --host 0.0.0.0 --port 8080`**
   
   **HTTP Settings**:
   - HTTP Port: **`8080`**
   - HTTP Request Routes: **`/`**
   
   Click: **"Save"**

2. **Select Region**:
   - Choose: **New York (NYC)** (closest to Indiana)
   - Click: "Next"

3. **Select Plan**:
   - Plan: **Basic**
   - Size: **$5/mo** (512 MB RAM, 1 vCPU)
   - Click: "Next"

---

### Step 3: Add Environment Variables (4 minutes)

Click on **"Environment Variables"** section, then add each of these:

#### Required Variables (Copy from your .env file):

```bash
DATABASE_URL
postgresql://postgres:PWidoBs6Yag8xyZr@db.fwqwuaoxcqbaagpkprua.supabase.co:5432/postgres

CORS_ORIGINS
http://localhost:3000,https://www.rileyinvestmentgroup.com,https://rileyinvestmentgroup.com

DEBUG
False

BUSINESS_NAME
Riley Investment Group LLC

BUSINESS_ADDRESS
4815 W Williamsburg Pass, New Palestine IN 46163-8567

BUSINESS_EMAIL
info@rileyinvestmentgroup.com

BUSINESS_PHONE
317-951-6411

BUSINESS_EIN
30-1482466

INDIANA_TAX_RATE
0.07

INDIANA_TID
8001327846

INDIANA_LOCATION
001

INVOICE_PREFIX
RIG

INVOICE_DUE_DAYS
30

STORAGE_PATH
/tmp/invoices
```

**Important Notes**:
- ⚠️ Use `/tmp/invoices` for STORAGE_PATH (not `./invoices`) - DO needs absolute path
- ⚠️ Set `DEBUG=False` for production
- ⚠️ Make sure DATABASE_URL includes your actual password

---

### Step 4: Review and Deploy (1 minute)

1. **Review Summary**:
   - App Name: `riley-investment-group-api`
   - Region: New York
   - Plan: $5/month
   - Source: `riley-investment-group-llc/api` folder
   - Environment variables: 15 variables set

2. **Click**: "Create Resources"

3. **Wait for Deployment** (5-8 minutes):
   - Digital Ocean will:
     - Clone your repo
     - Install Python dependencies
     - Start the FastAPI server
     - Assign a public URL
   
4. **Monitor Progress**:
   - You'll see build logs in real-time
   - Wait for status to change to "Deployed"

---

### Step 5: Get Your API URL (30 seconds)

1. Once deployed, you'll see your app in the dashboard

2. **Copy the URL** - it will look like:
   ```
   https://riley-investment-group-api-xxxxx.ondigitalocean.app
   ```

3. **Test it immediately**:
   - Visit: `https://your-api-url.ondigitalocean.app/health`
   - Should see: `{"status": "healthy"}`
   
   - Visit: `https://your-api-url.ondigitalocean.app/docs`
   - Should see: FastAPI interactive documentation

---

## ✅ VERIFICATION CHECKLIST

After deployment, verify these endpoints work:

- [ ] **Health Check**: `/health` returns `{"status": "healthy"}`
- [ ] **Root**: `/` returns API information
- [ ] **Docs**: `/docs` shows FastAPI documentation
- [ ] **CORS**: Frontend can make requests (test after connecting)

---

## 🔗 CONNECT FRONTEND TO API

### Step 1: Add API URL to Vercel (1 minute)

1. **Go to**: https://vercel.com/dashboard
2. **Select**: Your `rileyinvestmentgroup` project
3. **Go to**: Settings → Environment Variables
4. **Find**: `NEXT_PUBLIC_API_URL`
5. **Update** (or add if missing):
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-actual-api-url.ondigitalocean.app` (paste your DO URL)
   - Environment: **Production, Preview, Development** (select all)
6. **Click**: "Save"

### Step 2: Redeploy Frontend (1 minute)

1. **Go to**: Deployments tab
2. **Find**: Latest deployment
3. **Click**: Three dots (...) → "Redeploy"
4. **Wait**: 1-2 minutes for rebuild

### Step 3: Test Connection (1 minute)

1. **Visit**: https://www.rileyinvestmentgroup.com
2. **Sign in**: with your @rileyinvestmentgroup.com email
3. **Dashboard should load** with stats (will be zeros initially)
4. **Try creating**: a test customer or product

---

## 🐛 TROUBLESHOOTING

### Issue: Build Fails with "pip: command not found"
**Solution**: Digital Ocean should auto-detect Python. If not:
- Edit app settings
- Set "Environment": **Python**
- Set "Python Version": **3.11**

### Issue: App Crashes on Start
**Check**:
1. Verify `requirements.txt` is in `riley-investment-group-llc/api/` folder
2. Check build logs for missing dependencies
3. Verify `main.py` exists in source directory

### Issue: Database Connection Fails
**Check**:
1. Verify `DATABASE_URL` environment variable is set correctly
2. Check Supabase project is active
3. Verify database schema has been run
4. Test connection from DO console

### Issue: CORS Errors from Frontend
**Solution**:
1. Verify `CORS_ORIGINS` includes your Vercel domain
2. Make sure it's: `https://www.rileyinvestmentgroup.com` (with https)
3. Redeploy API after changing CORS_ORIGINS

### Issue: 502 Bad Gateway
**Possible Causes**:
1. App is still starting up (wait 30 seconds)
2. Port mismatch (should be 8080)
3. Run command incorrect

**Fix**:
- Check run command is: `uvicorn main:app --host 0.0.0.0 --port 8080`
- Check HTTP port is set to: `8080`

---

## 💡 PRO TIPS

### Tip 1: Use App Platform Logs
- Click your app → "Runtime Logs"
- See real-time API requests and errors
- Great for debugging

### Tip 2: Enable Metrics
- Digital Ocean shows CPU, memory, bandwidth usage
- Monitor to see if you need to upgrade plan

### Tip 3: Set Up Alerts
- Settings → Alerts
- Get notified if app goes down
- Free monitoring

### Tip 4: Custom Domain (Optional)
- You can add `api.rileyinvestmentgroup.com` later
- Makes API URL cleaner
- Requires DNS configuration

---

## 📸 VISUAL GUIDE

### What You'll See in Digital Ocean:

**Step 1 - Create App**:
```
┌─────────────────────────────────────┐
│  Create App                         │
│  ┌───────────────────────────────┐  │
│  │ Choose Source                 │  │
│  │  ○ GitHub                     │  │
│  │  ○ GitLab                     │  │
│  │  ○ Container Registry         │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Step 2 - Configure**:
```
┌─────────────────────────────────────┐
│  Configure Your App                 │
│  ┌───────────────────────────────┐  │
│  │ Source Directory:             │  │
│  │ riley-investment-group-llc/api│  │
│  │                               │  │
│  │ Build Command:                │  │
│  │ pip install -r requirements.txt│ │
│  │                               │  │
│  │ Run Command:                  │  │
│  │ uvicorn main:app --host...    │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Step 3 - Environment Variables**:
```
┌─────────────────────────────────────┐
│  Environment Variables              │
│  ┌───────────────────────────────┐  │
│  │ DATABASE_URL = postgresql://...│ │
│  │ CORS_ORIGINS = https://...    │  │
│  │ DEBUG = False                 │  │
│  │ ... (12 more variables)       │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## ⏱️ DEPLOYMENT TIMELINE

| Step | Duration | Status |
|------|----------|--------|
| Create app & connect GitHub | 2 min | ⏳ Pending |
| Configure settings | 3 min | ⏳ Pending |
| Add environment variables | 4 min | ⏳ Pending |
| Initial deployment | 5-8 min | ⏳ Pending |
| **Total** | **15-20 min** | ⏳ **Ready to start** |

---

## 🎯 SUCCESS CRITERIA

You'll know it's working when:

1. ✅ Digital Ocean shows "Deployed" status (green)
2. ✅ `/health` endpoint returns `{"status": "healthy"}`
3. ✅ `/docs` endpoint shows FastAPI documentation
4. ✅ Frontend can fetch data from API
5. ✅ You can create your first invoice!

---

## 📞 NEED HELP?

If you get stuck:
1. Check the build logs in Digital Ocean
2. Verify all environment variables are set
3. Make sure source directory is correct: `riley-investment-group-llc/api`
4. Confirm database schema has been run in Supabase

---

**Ready to deploy? Let's do this!** 🚀

Start at: https://cloud.digitalocean.com/apps
