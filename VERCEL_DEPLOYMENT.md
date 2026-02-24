# Vercel Deployment Guide for LexiCipher.org

## Project Structure

This project uses a monorepo structure:
```
LexiCipher-org/
├── app/              ← Next.js application (main web app)
├── extension/        ← Browser extension
├── fonts/            ← Font sources and outputs
└── vercel.json       ← Vercel configuration
```

## Deployment Configuration

### 1. Vercel Project Settings

**IMPORTANT**: You must configure the Root Directory in your Vercel project settings:

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings** → **General**
3. Scroll down to **Root Directory**
4. Click **Edit** and set it to: `app`
5. Click **Save**

This tells Vercel that your Next.js application lives in the `app/` subdirectory.

### 2. Build Configuration

The `vercel.json` file is configured to work with the `app` root directory:

```json
{
    "buildCommand": "npm run build",
    "installCommand": "npm install",
    "framework": "nextjs",
    "outputDirectory": ".next"
}
```

Since the Root Directory is set to `app`, these commands will automatically run from the `app/` directory.

### 3. Framework Detection

Vercel will now correctly detect Next.js because it will find the `package.json` in the `app/` directory which includes Next.js in its dependencies.

## Deployment Steps

1. **First-time setup**:
   - Connect your GitHub repository to Vercel
   - Set Root Directory to `app` (see above)
   - Deploy

2. **Subsequent deployments (main branch)**:
   - Push to `main` branch
   - Vercel will automatically build and deploy

3. **Deploying the `dev` branch**:
   - Vercel only auto-deploys `main` by default
   - `dev` branch must be triggered manually via the deploy hook (see below)

## Dev Branch Deployment (Deploy Hook)

The `dev` branch has a Vercel deploy hook. To trigger a deployment after pushing to `dev`:

```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_DvKPFVBrERjOlyqAp9tPsY1P77NN/BOYR99PlWV"
```

This can be combined with a push in one command:
```bash
git push origin dev && curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_DvKPFVBrERjOlyqAp9tPsY1P77NN/BOYR99PlWV"
```

### Automating with GitHub Actions (future)
A GitHub Actions workflow file exists at `.github/workflows/deploy-dev.yml` that would automate this on every push to `dev`. However, pushing workflow files requires the GitHub Personal Access Token to have the **`workflow` scope**.

To enable:
1. Go to github.com → Profile → **Settings** → **Developer settings** → **Personal access tokens**
2. Edit your token and check the **`workflow`** checkbox
3. Push the workflow file: `git add .github/workflows/deploy-dev.yml && git commit -m "ci: add deploy hook workflow" && git push origin dev`

## Next.js Static Export

Your Next.js app is configured for static export (`output: 'export'` in `next.config.ts`), which means:
- The site is fully static HTML/CSS/JS
- No server-side functions
- Perfect for hosting on Vercel's edge network
- Fast global performance

## Troubleshooting

### Error: "No Next.js version detected"
- **Cause**: Root Directory not set to `app`
- **Solution**: Update Root Directory in Vercel settings to `app`

### Build fails with module errors
- **Cause**: Missing dependencies
- **Solution**: Ensure `app/package.json` has all required dependencies

### Static export warnings
- **Cause**: Using features incompatible with static export
- **Solution**: Check Next.js docs for static export limitations

## Environment Variables

If you need environment variables:
1. Go to **Settings** → **Environment Variables** in Vercel
2. Add your variables
3. Redeploy

## Custom Domain Configuration

### Adding lexicipher.org to Vercel

Follow these steps to configure your lexicipher.org domain:

#### Step 1: Add Domain in Vercel Dashboard

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain: `lexicipher.org`
5. Also add the www subdomain: `www.lexicipher.org`
6. Click **Add**

#### Step 2: Configure DNS Records

Vercel will provide you with DNS configuration instructions. You'll need to add these records at your domain registrar (where you bought lexicipher.org):

**Option A: Using Vercel Nameservers (Recommended - Easiest)**

1. In Vercel, go to **Domains** → **lexicipher.org** → **Nameservers**
2. Vercel will show you nameservers like:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
3. Go to your domain registrar's control panel
4. Update the nameservers to the ones Vercel provided
5. Save changes (DNS propagation can take up to 48 hours, usually much faster)

**Option B: Using A Records (If you can't change nameservers)**

1. Go to your domain registrar's DNS settings
2. Add the following DNS records:

   **For lexicipher.org (apex domain):**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 76.76.21.21
   TTL: 3600 (or default)
   ```

   **For www.lexicipher.org:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600 (or default)
   ```

3. Save the DNS records
4. Wait for DNS propagation (usually 10 minutes to 24 hours)

#### Step 3: Verify Domain Configuration

After configuring DNS:

1. Return to Vercel dashboard → **Domains**
2. Wait for the status to change from "Pending" to "Valid"
3. Vercel will automatically provision SSL certificates (this is automatic and free)
4. Your site will be accessible at:
   - `https://lexicipher.org`
   - `https://www.lexicipher.org`

#### Step 4: Set Primary Domain (Optional)

If you want to redirect all traffic to one canonical URL:

1. Go to **Settings** → **Domains**
2. Click the three dots next to your preferred domain
3. Select **Make Primary**
4. All other domains will redirect to this one (good for SEO)

**Recommendation:** Make `lexicipher.org` (without www) your primary domain for simplicity.

### Domain Verification Tips

**Check DNS Propagation:**
```bash
# Check if DNS records are updated
dig lexicipher.org
dig www.lexicipher.org

# Or use online tools like:
# https://dnschecker.org
```

**Common Issues:**

- **Domain still showing "Pending"**: DNS hasn't propagated yet. Wait a few hours.
- **Certificate errors**: Vercel is still provisioning SSL. Usually resolves within 10 minutes.
- **404 errors**: Check that Root Directory is set to `app` in Vercel settings.
- **Old site showing**: Clear browser cache or wait for DNS to fully propagate.

### SSL/HTTPS

Vercel automatically:
- ✅ Provisions Let's Encrypt SSL certificates
- ✅ Auto-renews certificates before expiry
- ✅ Forces HTTPS redirect (HTTP → HTTPS)
- ✅ Supports HTTP/2 and HTTP/3

No configuration needed on your part!

### Multiple Domains

You can add multiple domains to the same project:
- `lexicipher.org` (primary)
- `www.lexicipher.org` (auto-redirect)
- `lexisolve.org` (if you own it)
- Any other aliases

Each domain can be configured independently in the Domains section.
