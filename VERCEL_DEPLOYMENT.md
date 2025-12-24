# Vercel Deployment Guide

This guide will help you deploy your FocusMall Clone project to Vercel.

## Prerequisites

- A GitHub account with your repository pushed
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Supabase project credentials
- Cloudinary account credentials

## Step 1: Prepare Your Repository

Your code is already pushed to GitHub at: `https://github.com/ikhlasx/focusmall-clone-project`

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `ikhlasx/focusmall-clone-project`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   Click "Environment Variables" and add the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   **Important Notes:**
   - Replace the placeholder values with your actual credentials
   - Make sure to add these for all environments (Production, Preview, Development)
   - `NEXT_PUBLIC_*` variables are exposed to the browser, so use the anon key, not the service role key

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at a URL like: `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Add environment variables when prompted

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 3: Configure Environment Variables

### Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Getting Cloudinary Credentials

1. Go to your Cloudinary dashboard
2. Navigate to Settings → Product Environment Credentials
3. Copy:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

### Adding Variables in Vercel

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable:
   - Variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Value (your actual credential)
   - Select environments (Production, Preview, Development)
   - Click "Save"

## Step 4: Verify Deployment

1. Visit your deployment URL
2. Check that:
   - Pages load correctly
   - Images are loading (Cloudinary)
   - Database connections work (Supabase)
   - API routes are functioning

## Step 5: Set Up Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions
5. Vercel will automatically provision SSL certificates

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` has correct build scripts
- Check that all dependencies are listed in `package.json`

### Environment Variables Not Working

- Ensure variables are added for the correct environment (Production/Preview/Development)
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)
- For `NEXT_PUBLIC_*` variables, rebuild is required

### Database Connection Issues

- Verify Supabase URL and keys are correct
- Check Supabase project is active
- Ensure Row Level Security (RLS) policies are configured
- Check Supabase project region matches your Vercel region

### Image Upload Issues

- Verify Cloudinary credentials are correct
- Check Cloudinary account is active
- Ensure API key has upload permissions

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review Next.js build output
3. Verify all environment variables are set correctly
4. Check Supabase and Cloudinary dashboards for service status

