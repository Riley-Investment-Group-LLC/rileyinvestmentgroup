# Vercel Environment Variables Checklist

## Required Variables - Check These Are Set

Go to: https://vercel.com/riley-investment-group-llc/rileyinvestmentgroup/settings/environment-variables

You MUST have all 4 of these set:

- [ ] `NEXTAUTH_URL` = `https://www.rileyinvestmentgroup.com`
- [ ] `NEXTAUTH_SECRET` = (generate with `openssl rand -base64 32`)
- [ ] `GOOGLE_CLIENT_ID` = (from Google Cloud Console)
- [ ] `GOOGLE_CLIENT_SECRET` = (from Google Cloud Console)

## How to Verify

1. Go to Vercel project settings
2. Click "Environment Variables" in the left sidebar
3. Verify all 4 variables are listed
4. Make sure they're set for "Production" environment (or "All Environments")

## After Adding Variables

**CRITICAL**: You MUST redeploy after adding environment variables:

1. Go to "Deployments" tab
2. Find the latest deployment
3. Click the three dots (•••) on the right
4. Click "Redeploy"
5. Check "Use existing Build Cache" is UNCHECKED
6. Click "Redeploy"

## If Site Is Still Exposed

If the site is still accessible without login after redeploying:

1. Check the deployment logs for errors related to NextAuth
2. Verify the environment variables are visible in the deployment (Settings > Environment Variables)
3. Try a hard refresh in your browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Clear browser cookies for rileyinvestmentgroup.com
5. Try in an incognito/private window

## Testing

To test if authentication is working:

1. Open an incognito/private browser window
2. Go to https://www.rileyinvestmentgroup.com
3. You should be redirected to `/auth/signin`
4. Click "Sign in with Google"
5. Sign in with info@rileyinvestmentgroup.com or seth@rileyinvestmentgroup.com
6. You should be redirected to the dashboard

If you try to sign in with a non-@rileyinvestmentgroup.com email, you should see the "Access Denied" error page.
