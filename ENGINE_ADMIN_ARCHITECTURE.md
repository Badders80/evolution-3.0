# Engine/Admin Split Architecture

## Overview

Evolution Stables now uses a **dual-environment architecture** that separates syndicator-facing tools (Engine) from internal management tools (Admin). This design pattern is common in enterprise SaaS platforms and provides clear separation of concerns.

## Architecture

### 🟨 Top-Level Environment Toggle

Located in the navigation bar, users can switch between two modes:

```
[ Engine ]   [ Admin ]          Hi, Alex   |   Sign Out
```

**Color Logic:**
- **Gold (#D4AF37)**: Active environment with gold text, gold background, and gold border
- **Grey (white/40)**: Inactive environment with grey text, no background

**Component:** `src/components/layout/EnvironmentToggle.tsx`

### 🟦 Engine Mode (Syndicator-Facing)

**URL Pattern:** `/engine/*`

**Navigation:**
```
Studio | Valuation | Registration | Syndicators | Horses | Term Sheets
```

**Purpose:**
- Public-facing tools for syndicators
- Content creation and investor updates
- Horse registration and onboarding
- Term sheet generation
- Valuation modeling

**Key Routes:**
- `/engine` - Engine home with all modules
- `/engine/studio` - Content studio
- `/engine/valuation` - Financial modeling
- `/engine/registration` - SR16 compliance
- `/engine/owners/profile/create` - Syndicator profiles
- `/engine/horses/profile/create` - Horse registration
- `/engine/owners/term-sheet/lease` - Term sheet generation

**Layout:** `src/app/engine/layout.tsx`

### 🟩 Admin Mode (Internal Management)

**URL Pattern:** `/admin/*`

**Navigation:**
```
Dashboard | Syndicators | Horses | Term Sheets
```

**Purpose:**
- Internal oversight and management
- Compliance review
- Data verification
- System administration

**Key Routes:**
- `/admin` - Admin dashboard with stats
- `/admin/syndicators` - Syndicator list and management
- `/admin/horses` - Horse list and management
- `/admin/term-sheets` - Term sheet review

**Layout:** `src/app/admin/layout.tsx`

### 🟪 Breadcrumb System

Environment-aware breadcrumbs show the current location:

**Engine Examples:**
```
Engine /
Engine / Syndicators
Engine / Syndicators / Profile
Engine / Horses / Create
```

**Admin Examples:**
```
Admin /
Admin / Horses
Admin / Horses / First Gear
Admin / Term Sheets
```

**Component:** `src/components/layout/Breadcrumbs.tsx`

**Features:**
- Automatic path parsing
- Environment prefix (Engine/Admin) in gold
- Current page highlighted in white
- Intermediate pages as clickable links

## Code Structure

### Layout Hierarchy

```
src/app/
├── layout.tsx              # Root layout (NavBar, providers)
├── engine/
│   ├── layout.tsx          # Engine environment layout
│   ├── page.tsx            # Engine home page
│   ├── studio/
│   ├── valuation/
│   ├── registration/
│   ├── owners/
│   └── horses/
└── admin/
    ├── layout.tsx          # Admin environment layout
    ├── page.tsx            # Admin dashboard
    ├── syndicators/
    ├── horses/
    └── term-sheets/
```

### Shared Components

```
src/components/layout/
├── EnvironmentToggle.tsx   # Engine/Admin switcher
└── Breadcrumbs.tsx         # Environment-aware breadcrumbs
```

## Benefits

### ✅ Separation of Concerns
- Engine = syndicator workflows
- Admin = internal management
- No mixing of public and private interfaces

### ✅ Scalability
Easy to add new modules to either environment:

**Future Engine Modules:**
- Horse modeling 2.0
- Lease valuation tools
- Syndicator KYC
- Document uploads
- Marketplace listing

**Future Admin Modules:**
- Tokinvest issuance controls
- Transaction monitoring
- Compliance review
- NZTR audit logs
- Racing manager access
- Token mint tracking
- Report generation
- Billing & reconciliation

### ✅ Security Ready
Prepared for role-based access control:

```typescript
// Future: Add RLS policies
role: "admin" | "syndicator" | "tokeninvest" | "racing_manager"
```

- Admin routes can be locked with auth checks
- Supabase RLS policies per role
- Server-side auth validation

### ✅ Clear Mental Models
Users always know which environment they're in:
- URL shows `/engine` or `/admin`
- Environment toggle shows active mode
- Breadcrumbs show environment prefix
- Navigation shows appropriate modules

## Navigation Flow

### Switching Environments

**From Engine to Admin:**
1. Click "Admin" in environment toggle
2. Redirects to `/admin` (dashboard)
3. Shows admin navigation and breadcrumbs

**From Admin to Engine:**
1. Click "Engine" in environment toggle
2. Redirects to `/engine` (home page)
3. Shows engine navigation and breadcrumbs

### Within an Environment

**Engine:**
- Navigate between Studio, Valuation, Registration, etc.
- Breadcrumbs update automatically
- Active tab highlighted in navigation

**Admin:**
- Navigate between Dashboard, Syndicators, Horses, Term Sheets
- Breadcrumbs show admin context
- Active tab highlighted in navigation

## Styling

### Color Palette

**Active State:**
- Text: `#D4AF37` (Evolution Gold)
- Background: `rgba(212, 175, 55, 0.1)`
- Border: `rgba(212, 175, 55, 0.2)`

**Inactive State:**
- Text: `rgba(255, 255, 255, 0.4)`
- Hover: `rgba(255, 255, 255, 0.6)`

**Navigation:**
- Active tab: `bg-white/5` with `font-medium`
- Hover: `bg-white/5` with `text-white`

## Testing

Visit these URLs to test:

**Engine:**
- http://localhost:3001/engine
- http://localhost:3001/engine/studio
- http://localhost:3001/engine/owners/profile/create

**Admin:**
- http://localhost:3001/admin
- http://localhost:3001/admin/syndicators
- http://localhost:3001/admin/horses

**Verify:**
- ✅ Environment toggle highlights correct mode
- ✅ Breadcrumbs show correct prefix
- ✅ Navigation shows correct tabs
- ✅ Switching environments works smoothly
- ✅ Active navigation state updates correctly

## Implementation Notes

### TypeScript Safety
All components use TypeScript with proper typing:
- `usePathname()` for client-side routing detection
- Proper null checks for pathname
- Type-safe props for layouts

### Server Components
- Admin dashboard fetches data server-side
- Engine home is client-rendered for interactivity
- Layouts are client components for navigation state

### Performance
- Sticky navigation at `top-20`
- Backdrop blur for glass morphism effect
- Smooth transitions on all hover states
- No layout shift when switching environments

## Future Enhancements

### Phase 1: Current State ✅
- Dual environment toggle
- Separate navigation per environment
- Environment-aware breadcrumbs
- Admin dashboard with stats

### Phase 2: Role-Based Access
- Supabase auth integration
- RLS policies per role
- Redirect non-admin users from /admin
- Permission checks on API routes

### Phase 3: Advanced Features
- User role badges in navbar
- Activity logs per environment
- Environment-specific settings
- Custom navigation per role

## Summary

The Engine/Admin split provides:
- **Clear separation** between public and private tools
- **Scalable architecture** for future growth
- **Professional UX** matching enterprise standards
- **Security-ready** structure for role-based access
- **Easy maintenance** with dedicated layouts

This architecture sets Evolution Stables up for 12-24 months of product growth with a clean, maintainable codebase.
