# Riley Investment Group LLC - Business Management System

Professional invoice generation, purchase tracking, and financial reporting system.

---

## 🚀 Quick Start

**New here?** Read **[START_HERE.md](START_HERE.md)** for the 3-step launch plan (15 minutes).

---

## 📋 What This System Does

### Core Features
- **Invoice Generation**: Professional PDF invoices with your LLC branding
- **Purchase Tracking**: Track wholesale purchases and cost basis
- **Margin Analysis**: Automatic profit calculations (critical for 10% margins)
- **Bank Reconciliation**: Import and match Chase bank transactions
- **Tax Reporting**: Indiana ST-103 monthly sales tax reports
- **Customer Management**: Track B2B customers and their purchase history
- **Product Catalog**: SKU tracking, inventory, and profitability analysis

### Built For
- B2B bulk sales with tight margins
- Indiana sales tax compliance (ST-103/ST-105)
- One-person LLC operations
- Programmatic automation
- Professional business operations

---

## 🏗️ Architecture

### Frontend (This Repository)
- **Framework**: Next.js 14 with TypeScript
- **Authentication**: Google OAuth (NextAuth.js)
- **UI**: Tailwind CSS
- **Deployment**: Vercel
- **Domain**: https://www.rileyinvestmentgroup.com

### Backend API
- **Location**: `Riley-Investment-Group-LLC/tarjeta` repo
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Digital Ocean App Platform
- **Cost**: $5/month

---

## 📚 Documentation

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[START_HERE.md](START_HERE.md)** | Quick launch guide | First time setup |
| **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** | Deployment verification | Before going live |
| **[DIGITAL_OCEAN_SETUP.md](DIGITAL_OCEAN_SETUP.md)** | API deployment guide | Deploying backend |
| **[REPOSITORY_SCAN_REPORT.md](REPOSITORY_SCAN_REPORT.md)** | Complete system analysis | Understanding the system |

---

## 🔒 Security

### Authentication
- Google OAuth with domain restriction
- Only `@rileyinvestmentgroup.com` emails can access
- Session-based authentication
- All routes protected by middleware

### Data Protection
- HTTPS enforced on all services
- Environment variables for secrets
- Database credentials never exposed
- `.env` files excluded from git

---

## 💰 Cost Breakdown

| Service | Cost | Purpose |
|---------|------|---------|
| Vercel | $0/month | Frontend hosting |
| Digital Ocean | $5/month | API hosting |
| Supabase | $0/month | Database (free tier) |
| **Total** | **$5/month** | Full system |

**Comparison**: QuickBooks Plus costs $115/month  
**Savings**: $1,320/year (2,200% cheaper!)

---

## 🎯 Current Status

### Completed ✅
- ✅ Frontend code complete
- ✅ Backend API complete
- ✅ Database schema ready
- ✅ Authentication configured
- ✅ Google OAuth credentials created
- ✅ Domain connected (rileyinvestmentgroup.com)
- ✅ All dependencies installed
- ✅ Documentation complete

### Remaining Setup (15 minutes)
- ❌ Run database schema in Supabase (2 min)
- ❌ Deploy API to Digital Ocean (10 min)
- ❌ Connect frontend to API (1 min)

**See [START_HERE.md](START_HERE.md) for step-by-step instructions.**

---

## 🛠️ Development

### Local Development

```bash
# Frontend
npm install
npm run dev
# Visit: http://localhost:3000

# Backend (in tarjeta repo)
cd riley-investment-group-llc/api
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
# Visit: http://localhost:8000/docs
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:
- `NEXT_PUBLIC_API_URL` - Your API URL
- `NEXTAUTH_URL` - Your frontend URL
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

---

## 📊 Features in Detail

### Invoice Generation
- Automatic invoice numbering (RIG-1000, RIG-1001, etc.)
- Professional PDF generation with LLC branding
- Line items with quantities and prices
- Indiana sales tax calculation (7%)
- Due date tracking
- Payment status tracking

### Purchase Tracking
- Record wholesale purchases
- Track cost basis per product
- Flag tax-exempt purchases (ST-105)
- Link purchases to products
- Supplier management

### Margin Analysis
- Automatic profit calculation per sale
- Margin percentage tracking
- Low-margin alerts (configurable threshold)
- Product profitability reports
- Critical for 10% margin business

### Bank Reconciliation
- Import Chase CSV files
- Auto-match transactions to invoices/purchases
- Track unreconciled transactions
- Monthly reconciliation reports

### Tax Reporting
- Monthly ST-103 reports (Indiana sales tax)
- Track tax collected vs. tax-exempt sales
- Export data for tax filing
- TID: 8001327846, Location: 001

---

## 🎓 Usage Examples

### Create an Invoice
1. Add customer (if new): Customers → "Add Customer"
2. Add products (if new): Products → "Add Product"
3. Create invoice: Invoices → "New Invoice"
4. Select customer and add line items
5. Review totals (tax calculated automatically)
6. Click "Create Invoice"
7. Download PDF

### Record a Purchase
1. Purchases → "New Purchase"
2. Enter supplier and date
3. Add line items (products purchased)
4. Flag if you used ST-105 resale certificate (tax-exempt)
5. Enter payment details
6. Click "Save"

### Reconcile Bank Transactions
1. Export CSV from Chase Business account
2. Bank → "Import CSV"
3. Upload file
4. System auto-matches transactions
5. Review and confirm matches
6. Mark as reconciled

### Generate Tax Report
1. Reports → "ST-103 Tax Report"
2. Select month
3. View total taxable sales and tax collected
4. Export for filing with Indiana DOR

---

## 🔧 Maintenance

### Regular Tasks
- **Daily**: Create invoices as sales happen
- **Weekly**: Reconcile bank transactions
- **Monthly**: Generate ST-103 tax report
- **Quarterly**: Review profit margins by product

### Monitoring
- Check Vercel deployment status
- Monitor Digital Ocean app health
- Review Supabase database usage
- Check for low-margin products

---

## 📈 Scaling

### Current Capacity
- Handles 1000s of invoices/purchases
- 500MB database (Supabase free tier)
- 100k API requests/month (DO Basic plan)

### When to Upgrade
- **Database**: Upgrade Supabase when you hit 400MB
- **API**: Upgrade DO when response times slow
- **Frontend**: Vercel free tier handles 100GB bandwidth

### Cost at Scale
- Supabase Pro: $25/month (8GB database)
- Digital Ocean: $12/month (2x capacity)
- Vercel Pro: $20/month (unlimited bandwidth)
- **Total at scale**: ~$60/month (still cheaper than QuickBooks!)

---

## 🆘 Support

### Documentation
- All guides are in this repository
- API documentation: Visit `/docs` endpoint
- Check deployment logs for errors

### Common Issues
- **Auth not working**: Test in incognito, check environment variables
- **API errors**: Verify database schema is initialized
- **Build failures**: Check Vercel/DO logs for specific errors

### Contact
- **Email**: info@rileyinvestmentgroup.com
- **Business**: Riley Investment Group LLC
- **EIN**: 30-1482466

---

## 📜 License

Proprietary - Riley Investment Group LLC  
All rights reserved.

---

## 🎉 About This System

Built specifically for Riley Investment Group LLC to handle:
- B2B bulk sales with 10% margins
- Indiana sales tax compliance
- Tax-exempt wholesale purchases
- Professional invoicing for small-scale operations
- Automated financial tracking

**Result**: Professional business management system for $5/month instead of $115/month.

---

**Ready to launch?** Read **[START_HERE.md](START_HERE.md)** now.
