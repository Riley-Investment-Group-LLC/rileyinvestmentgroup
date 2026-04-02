# ⚡ COMPLETE THIS NOW - 3 Steps to Launch

**Time Required**: 15 minutes  
**Current Status**: Everything is ready, just need to execute these 3 steps

---

## 🎯 STEP 1: SUPABASE DATABASE (2 minutes)

### What You're Doing
Creating the database tables that store all your business data (customers, invoices, products, etc.)

### Instructions

1. **Open**: https://supabase.com/dashboard/projects

2. **Select your project**: 
   - Look for: `db.fwqwuaoxcqbaagpkprua.supabase.co`
   - Click on it

3. **Open SQL Editor**:
   - Click "SQL Editor" in the left sidebar (looks like a document icon)
   - Click "New Query" button

4. **Get the SQL**:
   - Open this file on your computer: 
     ```
     C:\Users\SethRiley\Git Repository\tarjeta\riley-investment-group-llc\shared\database-schema.sql
     ```
   - Select ALL (Ctrl+A)
   - Copy (Ctrl+C)

5. **Run the SQL**:
   - Paste into Supabase SQL editor (Ctrl+V)
   - Click "Run" button (or press Ctrl+Enter)
   - Wait 2-3 seconds

6. **Verify Success**:
   - Should see: "Success. No rows returned"
   - If you see errors, copy them and let me know

### What This Creates
- 7 tables: customers, products, invoices, invoice_items, purchases, purchase_items, bank_transactions
- 4 views: monthly_sales_summary, product_profitability, unreconciled_transactions, st103_monthly_report
- 2 sequences: invoice_number_seq, purchase_number_seq
- Indexes and triggers for performance

---

## 🎯 STEP 2: DIGITAL OCEAN API (10 minutes)

### What You're Doing
Deploying your FastAPI backend so your frontend can communicate with it

### Instructions

1. **Open**: https://cloud.digitalocean.com/apps

2. **Create App**:
   - Click "Create App" button (blue, top right)

3. **Connect GitHub**:
   - Choose: "GitHub"
   - Click "Manage Access" (if first time)
   - Authorize Digital Ocean to access: `Riley-Investment-Group-LLC` organization
   - Click "Install & Authorize"

4. **Select Repository**:
   - Repository: `Riley-Investment-Group-LLC/tarjeta`
   - Branch: `master` (or `main` - it will show which exists)
   - Autodeploy: ✅ Enabled
   - Click "Next"

5. **Configure Service** (CRITICAL STEP):
   - Click "Edit" on the detected web service
   
   **Source Settings**:
   - Source Directory: `riley-investment-group-llc/api` ⚠️ MUST SET THIS!
   
   **Build Settings**:
   - Build Command: `pip install -r requirements.txt`
   - Run Command: `uvicorn main:app --host 0.0.0.0 --port 8080`
   
   **HTTP Settings**:
   - HTTP Port: `8080`
   
   - Click "Save"

6. **Select Region**:
   - Choose: "New York" (NYC)
   - Click "Next"

7. **Select Plan**:
   - Plan: "Basic"
   - Size: "$5/mo" (512 MB RAM, 1 vCPU)
   - Click "Next"

8. **Add Environment Variables** (IMPORTANT):
   - Click "Add Variable" for each one below
   - Copy/paste exactly as shown:

   ```
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

9. **Review and Create**:
   - Click "Next"
   - Review summary
   - Click "Create Resources"

10. **Wait for Deployment** (5-8 minutes):
    - You'll see build logs in real-time
    - Status will change from "Building" → "Deploying" → "Deployed"
    - Don't close the page!

11. **Copy Your API URL**:
    - Once deployed, you'll see a URL like:
      ```
      https://riley-investment-group-api-xxxxx.ondigitalocean.app
      ```
    - **COPY THIS URL** - you need it for Step 3!

12. **Test Your API**:
    - Visit: `https://your-api-url.ondigitalocean.app/health`
    - Should see: `{"status": "healthy"}`
    - Visit: `https://your-api-url.ondigitalocean.app/docs`
    - Should see: FastAPI documentation page

---

## 🎯 STEP 3: CONNECT FRONTEND TO API (1 minute)

### What You're Doing
Telling your frontend where to find your API

### Instructions

1. **Open**: https://vercel.com/dashboard

2. **Select Project**:
   - Click on: `rileyinvestmentgroup`

3. **Go to Settings**:
   - Click "Settings" tab
   - Click "Environment Variables" in left sidebar

4. **Update API URL**:
   - Find: `NEXT_PUBLIC_API_URL` (or click "Add" if missing)
   - Value: Paste your Digital Ocean API URL from Step 2
   - Example: `https://riley-investment-group-api-xxxxx.ondigitalocean.app`
   - Environment: Select all (Production, Preview, Development)
   - Click "Save"

5. **Redeploy**:
   - Click "Deployments" tab
   - Find the latest deployment
   - Click three dots (...) → "Redeploy"
   - Wait 1-2 minutes

6. **Test**:
   - Open incognito window
   - Visit: https://www.rileyinvestmentgroup.com
   - Should redirect to sign-in
   - Sign in with: `info@rileyinvestmentgroup.com`
   - Should see dashboard!

---

## ✅ VERIFICATION

### After All 3 Steps Are Done

**Test Authentication**:
- [ ] Visit site in incognito window
- [ ] Redirects to sign-in page
- [ ] Can sign in with @rileyinvestmentgroup.com email
- [ ] Cannot sign in with other emails
- [ ] Dashboard loads after login

**Test API Connection**:
- [ ] Dashboard shows stats (even if zeros)
- [ ] Can navigate to all pages
- [ ] No console errors (press F12 to check)

**Test Core Features**:
- [ ] Can create a customer
- [ ] Can create a product
- [ ] Can create an invoice
- [ ] Can download invoice PDF
- [ ] PDF shows correct LLC information

---

## 🐛 TROUBLESHOOTING

### "Supabase SQL fails with errors"
**Check**:
- Did you copy the ENTIRE file? (232 lines)
- Are you in the correct project?
- Try running again (it's safe to run multiple times)

### "Digital Ocean build fails"
**Check**:
- Source Directory is set to: `riley-investment-group-llc/api`
- Build command is: `pip install -r requirements.txt`
- Run command is: `uvicorn main:app --host 0.0.0.0 --port 8080`
- HTTP Port is: `8080`

### "Frontend still shows errors"
**Check**:
- NEXT_PUBLIC_API_URL is set in Vercel
- You redeployed after adding the variable
- API is actually deployed and accessible
- Try hard refresh (Ctrl+Shift+R)

### "Authentication still not working"
**Check**:
- Latest deployment is live (commit `7315e7e`)
- Test in incognito/private window
- Environment variables are set for "Production"
- Clear browser cookies

---

## 📞 NEED HELP?

### If Something Goes Wrong

**Supabase Issues**:
- Check Supabase logs: Dashboard → Logs
- Verify connection string is correct
- Make sure project is active

**Digital Ocean Issues**:
- Check build logs in DO dashboard
- Verify all 14 environment variables are set
- Check source directory is correct
- Try redeploying

**Vercel Issues**:
- Check deployment logs
- Verify environment variables
- Check that latest commit is deployed
- Try redeploying

**Still Stuck?**:
- Check browser console (F12) for errors
- Review error messages carefully
- Check all 3 services are active

---

## 🎉 AFTER LAUNCH

### Your First Actions

1. **Create a test customer**:
   - Customers → "Add Customer"
   - Name: "Test Customer"
   - Email: test@example.com

2. **Create a test product**:
   - Products → "Add Product"
   - SKU: TEST-001
   - Name: "Test Product"
   - Price: $100
   - Cost: $90 (10% margin)

3. **Create your first invoice**:
   - Invoices → "New Invoice"
   - Select test customer
   - Add test product
   - Quantity: 1
   - Review totals
   - Create invoice
   - Download PDF!

4. **Verify the PDF**:
   - Should show: Riley Investment Group LLC
   - Should show: Your address and EIN
   - Should show: Invoice number (RIG-1000)
   - Should show: Tax calculation (7%)
   - Should look professional!

---

## 🏆 SUCCESS!

Once you complete these 3 steps, you'll have:

- ✅ Professional business management system
- ✅ Automated invoice generation
- ✅ Margin tracking for your 10% margins
- ✅ Indiana tax compliance
- ✅ Bank reconciliation
- ✅ Secure authentication
- ✅ All for $5/month!

**You're ready to run Riley Investment Group LLC like a pro!**

---

**Start with Step 1 now** ⬆️

**Time to completion**: 15 minutes

**Questions?** Check the other documentation files in this repository.
