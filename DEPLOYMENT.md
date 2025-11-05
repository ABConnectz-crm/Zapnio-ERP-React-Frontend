# Zapnio ERP - Deployment Guide

Complete guide for deploying Zapnio ERP Frontend to Vercel.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository access
- Vercel account (free tier works fine)
- GitHub/GitLab/Bitbucket account (for automatic deployments)

---

## 🚀 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Import Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository:
   - **GitHub**: Select `ABConnectz-crm/Zapnio-ERP-React-Frontend`
   - **GitLab/Bitbucket**: Connect your account and select repo

### Step 2: Configure Project

Vercel will auto-detect Next.js settings:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3: Environment Variables

Add these in the Vercel dashboard (optional for initial deployment):

```
NEXT_PUBLIC_APP_NAME=Zapnio ERP
NEXT_PUBLIC_APP_VERSION=1.0.0
```

For production, also add:
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://your-project-name.vercel.app`

---

## 🖥️ Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate via email or GitHub.

### Step 3: Navigate to Project

```bash
cd /path/to/Zapnio-ERP-React-Frontend
```

### Step 4: Deploy to Preview

```bash
vercel
```

You'll be asked:
- Set up and deploy? **Y**
- Which scope? Select your account/team
- Link to existing project? **N** (first time) or **Y** (subsequent)
- Project name? **zapnio-erp** (or custom name)
- Directory? **./** (press Enter)

### Step 5: Deploy to Production

```bash
vercel --prod
```

Your production URL: `https://zapnio-erp.vercel.app`

---

## 🔧 Advanced Configuration

### Custom vercel.json

The project includes optimized `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Performance Optimizations

Already configured:
- ✅ Image optimization (Next.js Image component)
- ✅ Font optimization (Google Fonts)
- ✅ Code splitting (automatic with Next.js)
- ✅ Compression (Gzip/Brotli via Vercel)
- ✅ Edge caching (CDN)

### Security Headers

Add to `vercel.json` for enhanced security:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 🌍 Custom Domain Setup

### Step 1: Add Domain in Vercel

1. Go to Project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain: `app.zapnio.com`
4. Click **"Add"**

### Step 2: Configure DNS

Add these DNS records at your domain registrar:

**For root domain (zapnio.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For subdomain (app.zapnio.com):**
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

### Step 3: Wait for Propagation

- DNS propagation: 5-60 minutes
- SSL certificate: Automatic (Let's Encrypt)
- HTTPS: Enabled by default

### Step 4: Update Environment Variable

```
NEXT_PUBLIC_APP_URL=https://app.zapnio.com
```

---

## 🔄 Automatic Deployments

### GitHub Integration

Once connected, Vercel automatically:
- ✅ Deploys every push to `main` → Production
- ✅ Deploys every PR → Preview URL
- ✅ Deploys every branch → Branch preview URL

### Preview URLs

Each deployment gets unique URLs:
- Production: `https://zapnio-erp.vercel.app`
- Branch: `https://zapnio-erp-git-feature-branch.vercel.app`
- Commit: `https://zapnio-erp-abc1234.vercel.app`

### Deployment Notifications

Enable notifications in Vercel:
1. Project → **Settings** → **Git**
2. Enable **"Comments on Pull Requests"**
3. Enable **"Deployment Status Checks"**

---

## 📊 Monitoring & Analytics

### Vercel Analytics

Enable in dashboard:
1. Go to **Analytics** tab
2. Click **"Enable Analytics"**
3. View real-time metrics:
   - Page views
   - Unique visitors
   - Performance metrics
   - Geographic data

### Vercel Speed Insights

Enable in dashboard:
1. Go to **Speed Insights** tab
2. Click **"Enable Speed Insights"**
3. Monitor:
   - Core Web Vitals
   - Real User Monitoring (RUM)
   - Performance scores

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
vercel --prod
```

**Error: "Out of memory"**
- Increase Node.js memory in `vercel.json`:
```json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max_old_space_size=4096"
    }
  }
}
```

### Deployment Issues

**Preview URL not updating:**
```bash
# Force new deployment
vercel --force
```

**Environment variables not working:**
- Redeploy after changing env vars
- Check variable names (must start with `NEXT_PUBLIC_` for client-side)

### Performance Issues

**Slow page loads:**
1. Check **Analytics** tab in Vercel
2. Enable **Speed Insights**
3. Review **Function Logs** for errors
4. Check **Edge Network** status

---

## 🔒 Environment Variables Reference

### Required (Production)

```bash
NEXT_PUBLIC_APP_NAME="Zapnio ERP"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Optional (API Integration)

```bash
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
NEXT_PUBLIC_API_TIMEOUT="30000"
```

### Optional (Features)

```bash
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
NEXT_PUBLIC_ENABLE_NOTIFICATIONS="true"
```

### Optional (Auth - Future)

```bash
NEXT_PUBLIC_AUTH_PROVIDER="local"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-client-id"
```

---

## 📈 Post-Deployment Checklist

- [ ] Verify production URL is accessible
- [ ] Test all pages (Dashboard, Leads, Pipeline, Login)
- [ ] Check responsive design on mobile
- [ ] Verify favicon and metadata
- [ ] Test form submissions
- [ ] Check browser console for errors
- [ ] Verify SSL certificate (HTTPS)
- [ ] Test navigation and links
- [ ] Enable Vercel Analytics
- [ ] Set up custom domain (if applicable)
- [ ] Configure environment variables
- [ ] Enable deployment notifications

---

## 🆘 Support

If you encounter issues:

1. **Check Vercel Logs**: Project → Deployments → Click deployment → View logs
2. **Vercel Status**: https://www.vercel-status.com/
3. **Documentation**: https://vercel.com/docs
4. **Community**: https://github.com/vercel/vercel/discussions

---

## 📝 Notes

- **Build time**: ~2-3 minutes
- **Cache**: Vercel caches dependencies (faster rebuilds)
- **Regions**: Deployed globally via Edge Network
- **SSL**: Free automatic SSL certificates
- **Bandwidth**: 100GB/month on free tier
- **Builds**: 6,000 minutes/month on free tier

---

**Deployment Date**: {{ deployment_date }}
**Version**: 1.0.0
**Status**: ✅ Production Ready
