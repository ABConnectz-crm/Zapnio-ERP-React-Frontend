# Zapnio ERP - Frontend

A modern, enterprise-grade ERP platform frontend built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Dashboard**: Beautiful analytics dashboard with KPI cards and charts
- **Lead Management**: Comprehensive CRM with advanced filtering and bulk actions
- **Sales Pipeline**: Visual Kanban board for tracking deals through sales stages
- **Responsive Design**: Fully responsive UI that works on all devices
- **Component Library**: Reusable UI components built with Tailwind CSS
- **Type-Safe**: Full TypeScript support for better developer experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Custom component library
- **Icons**: Heroicons
- **State Management**: React Hooks (Redux integration ready)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/          # Dashboard pages
│   ├── leads/              # Lead management
│   ├── pipeline/           # Sales pipeline
│   ├── login/              # Authentication
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Layout components
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#5b7aff to #4c5cf5)
- **Secondary**: Purple gradient (#a855f7 to #9333ea)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### Typography

- **Font Family**: Inter (sans-serif), Lexend (display)
- **Font Sizes**: xs (0.75rem) to 5xl (3rem)

## 📱 Pages

- `/` - Redirects to dashboard
- `/dashboard` - Main analytics dashboard
- `/leads` - Lead list with filters and actions
- `/leads/create` - Create new lead form
- `/pipeline` - Kanban board sales pipeline
- `/login` - Authentication page

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `.env.example` for all available environment variables.

## 🚀 Deploy to Vercel

### Quick Deploy

The fastest way to deploy is using the Vercel Platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ABConnectz-crm/Zapnio-ERP-React-Frontend)

### Manual Deployment

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy to Preview**:
```bash
vercel
```

4. **Deploy to Production**:
```bash
vercel --prod
```

### Configuration

The project includes a `vercel.json` configuration file with optimized settings:
- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next`
- Region: `iad1` (US East)

### Environment Variables on Vercel

Set these environment variables in your Vercel project settings:

1. Go to your Vercel project → Settings → Environment Variables
2. Add the following:

```
NEXT_PUBLIC_APP_NAME=Zapnio ERP
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Custom Domain

To add a custom domain:

1. Go to your Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

### Preview Deployments

Every push to a branch creates a preview deployment:
- Branch URL: `your-project-git-branch-name.vercel.app`
- Commit URL: `your-project-git-commit-hash.vercel.app`

### Production Deployment

Push to the main branch or run:
```bash
vercel --prod
```

Your app will be live at: `https://your-project.vercel.app`

## 🎯 Roadmap

- [x] Dashboard with analytics
- [x] Lead management
- [x] Sales pipeline
- [x] Authentication UI
- [ ] Campaign management
- [ ] Form builder
- [ ] Settings pages
- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced reporting

## 📄 License

Copyright © 2024 Zapnio ERP. All rights reserved.

## 🤝 Contributing

This is a proprietary project. Contact the team for contribution guidelines.

---

Built with ❤️ by the Zapnio team
