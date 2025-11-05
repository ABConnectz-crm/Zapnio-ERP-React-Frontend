# Zapnio ERP - Modern UI Specification
## Salesforce/Linear-Level Interface Redesign

This document specifies the complete modern UI redesign to match enterprise CRM standards.

---

## ✅ Already Completed

- ✅ Advanced UI libraries installed (framer-motion, cmdk, next-themes, radix-ui, sonner)
- ✅ Dark mode configured in Tailwind (class-based)
- ✅ Enhanced animations (20+ custom animations)
- ✅ Glassmorphism shadows and effects
- ✅ Dark mode CSS variables and transitions
- ✅ Theme Provider component created

---

## 🎯 Core Modern Features to Implement

### 1. **Collapsible Sidebar with 3-Level Navigation**

**Design Inspiration**: Linear's sidebar

**Features**:
- Icon-only collapsed state (60px width)
- Expanded state (240px width)
- Smooth slide animation
- 3-level menu hierarchy:
  - Level 1: Main sections (Dashboard, CRM, Sales)
  - Level 2: Subsections (Leads, Contacts, Deals)
  - Level 3: Filters/Views (My Leads, Team Leads, All Leads)

**Structure**:
```typescript
const navigationStructure = [
  {
    section: "Dashboard",
    icon: <HomeIcon />,
    href: "/dashboard"
  },
  {
    section: "CRM",
    icon: <UsersIcon />,
    subsections: [
      {
        name: "Leads",
        href: "/leads",
        subItems: [
          { name: "My Leads", href: "/leads?view=my" },
          { name: "Team Leads", href: "/leads?view=team" },
          { name: "All Leads", href: "/leads?view=all" }
        ]
      },
      {
        name: "Contacts",
        href: "/contacts"
      },
      {
        name: "Companies",
        href: "/companies"
      }
    ]
  },
  {
    section: "Sales",
    icon: <ChartBarIcon />,
    subsections: [
      {
        name: "Pipeline",
        href: "/pipeline"
      },
      {
        name: "Deals",
        href: "/deals"
      },
      {
        name: "Forecasts",
        href: "/forecasts"
      }
    ]
  }
];
```

**Component Structure**:
```
components/layout/ModernSidebar.tsx
├── SidebarHeader (logo + collapse button)
├── SidebarNav (navigation items)
│   ├── NavSection (Level 1)
│   ├── NavSubsection (Level 2)
│   └── NavSubItem (Level 3)
├── SidebarFooter (user profile + dark mode toggle)
```

**Animations**:
- Sidebar width: `transition-all duration-300 ease-in-out`
- Menu expand/collapse: framer-motion `AnimatePresence`
- Icon rotation on expand: `transform rotate-90`
- Hover effects: `hover:bg-neutral-100 dark:hover:bg-neutral-800`

---

### 2. **Command Palette (Cmd+K)**

**Design Inspiration**: Linear, Notion

**Features**:
- Global search (Cmd+K or Ctrl+K)
- Fuzzy search across:
  - Pages/navigation
  - Leads/contacts
  - Recent items
  - Actions (Create Lead, New Deal)
- Keyboard navigation
- Search history
- Quick actions

**Library**: `cmdk` by Paco Coursey

**Component**:
```typescript
// components/command/CommandPalette.tsx
'use client';

import { Command } from 'cmdk';
import { useEffect, useState } from 'react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <Command.Input placeholder="Search or jump to..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Pages">
          <Command.Item>Dashboard</Command.Item>
          <Command.Item>Leads</Command.Item>
          <Command.Item>Pipeline</Command.Item>
        </Command.Group>

        <Command.Group heading="Actions">
          <Command.Item>Create New Lead</Command.Item>
          <Command.Item>New Deal</Command.Item>
          <Command.Item>Send Email</Command.Item>
        </Command.Group>

        <Command.Group heading="Recent">
          <Command.Item>Sarah Johnson</Command.Item>
          <Command.Item>TechCorp Inc Deal</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
```

**Styling**: Glassmorphism dialog with blur backdrop

---

### 3. **Dark Mode Toggle**

**Implementation**:
- Using `next-themes`
- Toggle in sidebar footer
- Smooth transition (300ms)
- System preference detection
- Persistent (localStorage)

**Component**:
```typescript
// components/ui/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
}
```

---

### 4. **Advanced Card Components**

**Types**:

**A) Gradient Card**:
```typescript
// components/ui/GradientCard.tsx
interface GradientCardProps {
  gradient: 'blue' | 'purple' | 'green' | 'orange';
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; direction: 'up' | 'down' };
}

// Usage:
<GradientCard
  gradient="blue"
  title="Total Revenue"
  value="$458.2K"
  icon={<ChartBarIcon />}
  trend={{ value: 12.5, direction: 'up' }}
/>
```

**Styling**:
- Background: `bg-gradient-to-br from-blue-500 to-purple-600`
- Text: White with semi-transparent backgrounds
- Shadow: `shadow-xl hover:shadow-2xl`
- Animation: `hover:scale-105 transition-transform`

**B) Image Card (for team members, products)**:
```typescript
<ImageCard
  image="/team/john.jpg"
  title="John Doe"
  subtitle="Sales Manager"
  badge="Online"
/>
```

**C) Glass Card (for overlays)**:
```typescript
<GlassCard>
  <h3>Quick Stats</h3>
  <Stats />
</GlassCard>
```

Styling: `.glass-card` utility class

---

### 5. **Notification System**

**Components**:
- Notification Center (dropdown in header)
- Toast Notifications (using `sonner`)

**A) Notification Dropdown**:
```typescript
// Using Radix UI Popover
<Popover>
  <PopoverTrigger>
    <BellIcon className="w-6 h-6" />
    <Badge>3</Badge>
  </PopoverTrigger>
  <PopoverContent className="glass-strong w-96">
    <NotificationList />
  </PopoverContent>
</Popover>
```

**B) Toast System**:
```typescript
import { toast } from 'sonner';

// Usage:
toast.success('Lead created successfully');
toast.error('Failed to save changes');
toast.loading('Saving...');
```

**Provider in layout**:
```typescript
import { Toaster } from 'sonner';

<Toaster position="top-right" richColors />
```

---

### 6. **Floating Action Button (FAB)**

**Position**: Fixed bottom-right
**Actions**: Quick create menu

```typescript
<FAB>
  <FABTrigger>
    <PlusIcon />
  </FABTrigger>
  <FABMenu>
    <FABAction icon={<UserIcon />}>New Lead</FABAction>
    <FABAction icon={<BuildingIcon />}>New Company</FABAction>
    <FABAction icon={<EnvelopeIcon />}>Send Email</FABAction>
  </FABMenu>
</FAB>
```

**Styling**: Primary gradient, shadow-glow, scale animation

---

### 7. **Modern Dashboard Redesign**

**Layout**:
```
┌─────────────────────────────────────────────────┐
│  Header (with search, notifications, dark mode) │
├──────┬──────────────────────────────────────────┤
│      │  Welcome Back, John 👋                   │
│      │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ Side │  │ Stat │ │ Stat │ │ Stat │ │ Stat │   │
│ bar  │  │ Card │ │ Card │ │ Card │ │ Card │   │
│      │  └──────┘ └──────┘ └──────┘ └──────┘   │
│      │                                          │
│  60px│  ┌────────────────┐ ┌──────────────┐   │
│  or  │  │  Pipeline      │ │  Activity    │   │
│ 240px│  │  Chart         │ │  Feed        │   │
│      │  │  (Glass Card)  │ │  (Glass)     │   │
│      │  └────────────────┘ └──────────────┘   │
│      │                                          │
│      │  ┌─────────────────────────────────┐   │
│      │  │  Recent Leads (Modern Table)    │   │
│      │  └─────────────────────────────────┘   │
└──────┴──────────────────────────────────────────┘
```

**Features**:
- Glassmorphism cards
- Gradient stat cards
- Animated counters (framer-motion)
- Skeleton loading states
- Micro-interactions on hover
- Smooth page transitions

---

### 8. **Animation System**

**Using framer-motion**:

**A) Page Transitions**:
```typescript
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  );
}
```

**B) Staggered List Animation**:
```typescript
<motion.ul
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
      }}
    >
      {item}
    </motion.li>
  ))}
</motion.ul>
```

**C) Hover Animations**:
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  <Card />
</motion.div>
```

---

### 9. **Advanced Search & Filters**

**Features**:
- Filter chips (removable)
- Date range picker
- Multi-select dropdowns
- Save filter presets
- Recent searches

**UI**:
```
┌────────────────────────────────────────────┐
│ [Search...]           [Filter ▼] [Sort ▼] │
├────────────────────────────────────────────┤
│ Active Filters:                            │
│ [Status: Qualified ×] [Source: Web ×]      │
└────────────────────────────────────────────┘
```

---

### 10. **Responsive Design**

**Breakpoints**:
- Mobile: < 640px (Sidebar hidden, hamburger menu)
- Tablet: 640px - 1024px (Icon-only sidebar)
- Desktop: > 1024px (Full sidebar)

**Mobile Optimizations**:
- Bottom navigation bar
- Swipe gestures
- Simplified cards
- Stack layouts

---

## 🎨 Design System

### Colors (Dark Mode)
```css
:root {
  --bg-primary: #fafafa;      /* Light mode */
  --bg-secondary: #ffffff;
  --text-primary: #171717;
}

.dark {
  --bg-primary: #0a0a0a;      /* Dark mode */
  --bg-secondary: #171717;
  --text-primary: #fafafa;
}
```

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass {
  background: rgba(23, 23, 23, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Shadows
- Soft: Subtle elevation
- Glass: Frosted glass effect
- Glow: Primary color glow on hover
- Elegant: Professional depth

---

## 📁 File Structure

```
app/
├── layout.tsx (with ThemeProvider + Toaster)
├── dashboard/
│   └── page.tsx (MODERN REDESIGN)
├── leads/
│   └── page.tsx (to be updated)
└── pipeline/
    └── page.tsx (to be updated)

components/
├── providers/
│   └── ThemeProvider.tsx ✅
├── layout/
│   ├── ModernSidebar.tsx (NEW - collapsible 3-level)
│   ├── ModernHeader.tsx (NEW - with command palette trigger)
│   └── ModernLayout.tsx (NEW - combines sidebar + header)
├── command/
│   └── CommandPalette.tsx (NEW - Cmd+K)
├── ui/
│   ├── GradientCard.tsx (NEW)
│   ├── GlassCard.tsx (NEW)
│   ├── ImageCard.tsx (NEW)
│   ├── ThemeToggle.tsx (NEW)
│   ├── FAB.tsx (NEW - Floating Action Button)
│   └── NotificationCenter.tsx (NEW)
└── animations/
    ├── PageTransition.tsx (NEW)
    └── StaggerList.tsx (NEW)
```

---

## ⚡ Performance

- Code splitting per route
- Lazy load modals/dialogs
- Virtualized long lists (react-window)
- Optimistic UI updates
- Skeleton loading states

---

## 🚀 Implementation Priority

**Phase 1** (Core Infrastructure):
1. ✅ Theme Provider setup
2. Modern Sidebar with collapse
3. Command Palette
4. Dark mode toggle

**Phase 2** (Visual Polish):
5. Gradient & Glass cards
6. Animations with framer-motion
7. Notification system
8. FAB

**Phase 3** (Dashboard Showcase):
9. Redesign Dashboard page with all features
10. Advanced filters/search
11. Responsive design

**Phase 4** (Apply to All Pages):
12. Update Leads page
13. Update Pipeline page
14. Update all other pages

---

## 📸 Reference Screenshots

**Salesforce Lightning**:
- Collapsible sidebar with icons
- Dark mode with high contrast
- Glassmorphic cards
- Smooth transitions

**Linear**:
- Command palette (Cmd+K)
- Icon-only sidebar
- Clean minimalist design
- Micro-animations

**HubSpot**:
- Modern cards with gradients
- Advanced filters
- Notification center
- Quick actions

---

## ✅ Definition of Done

A page is "modernized" when it has:
- [ ] Glassmorphism effects
- [ ] Dark mode support
- [ ] Smooth animations (entrance, hover, exit)
- [ ] Responsive design
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

---

**Ready to implement? Approve this spec and I'll build it all!**
