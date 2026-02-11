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

2. **Subsequent deployments**:
   - Push to your main branch
   - Vercel will automatically build and deploy

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

## Custom Domain

To add a custom domain:
1. Go to **Settings** → **Domains**
2. Add your domain
3. Configure DNS according to Vercel's instructions
