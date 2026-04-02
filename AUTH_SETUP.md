# Authentication Setup Guide

This application uses NextAuth.js with Google OAuth, restricted to `@rileyinvestmentgroup.com` email addresses only.

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or select existing one)
3. Enable the **Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: **Web application**
   - Name: `Riley Investment Group - Production`
   
5. Add authorized redirect URIs:
   ```
   https://www.rileyinvestmentgroup.com/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   ```

6. Copy your **Client ID** and **Client Secret**

## Step 2: Configure Environment Variables

### For Vercel (Production):

Go to your Vercel project settings and add these environment variables:

```
NEXTAUTH_URL=https://www.rileyinvestmentgroup.com
NEXTAUTH_SECRET=<generate-with-command-below>
GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<your-client-secret>
NEXT_PUBLIC_API_URL=<your-digital-ocean-api-url>
```

To generate `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

### For Local Development:

Create `.env.local` in the frontend root:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your values:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<your-client-secret>
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Step 3: Redeploy

After adding the environment variables to Vercel:

1. Go to your Vercel project
2. Click "Deployments"
3. Click the three dots on the latest deployment
4. Click "Redeploy"

Or simply push a new commit to trigger automatic deployment.

## How It Works

- **Domain Restriction**: Only emails ending with `@rileyinvestmentgroup.com` can sign in
- **Protected Routes**: All pages except `/auth/signin` and `/auth/error` require authentication
- **Session Management**: NextAuth handles sessions with secure cookies
- **Sign Out**: Click the logout icon in the top right corner

## Authorized Emails

Currently authorized:
- info@rileyinvestmentgroup.com
- seth@rileyinvestmentgroup.com
- Any other @rileyinvestmentgroup.com aliases

## Troubleshooting

### "Access Denied" error
- Verify you're using an @rileyinvestmentgroup.com email
- Check that the Google OAuth app is not in testing mode (or add your email as a test user)

### "Configuration error"
- Verify all environment variables are set in Vercel
- Ensure `NEXTAUTH_SECRET` is set and not empty
- Check that redirect URIs match exactly in Google Console

### Redirect URI mismatch
- Ensure you added both production and localhost URLs to Google Console
- URIs must match exactly (including https/http and trailing slashes)
