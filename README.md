# Evolution 3.0

A modern Next.js application built with TypeScript, Tailwind CSS, and Framer Motion for Evolution Stables.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Storybook** for component development and testing
- **Component library** with reusable UI components
- **Responsive design** with mobile-first approach

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Storybook Development

This project includes Storybook for component development and testing:

1. Start Storybook:
   ```bash
   npm run storybook
   ```

2. Open [http://localhost:6006](http://localhost:6006) in your browser.

3. **Dev Tip**: Click the "Login (Stories)" button in the navigation bar to quickly access Storybook from the main application.

## Development Workflow

1. **Terminal 1**: `npm run dev` (main application on port 3000)
2. **Terminal 2**: `npm run storybook` (component stories on port 6006)
3. Develop components in Storybook → Test in the main application → Instant visual feedback

## Component Stories

- **Button**: Primary, Outline, Secondary, Ghost variants with different sizes
- **Evolution Stables Branded**: Custom gold/black themed components
- **Interactive**: Test component variants before implementing in the main app

## Project Structure

```
src/
|-- app/                 # Next.js app router pages
|-- components/          # Reusable UI components
|   |-- ui/             # Basic UI components (Button, Card, etc.)
|   |-- layout/         # Layout components
|   |-- site/           # Site-specific components
|   |-- marketing/      # Marketing components
|   |-- media/          # Media components
|   `-- icons/          # Icon components
|-- lib/                # Utility libraries
|   `-- api/            # API integration layer
`-- styles/             # Global styles and themes
```

## Components

### UI Components
- `Button` - Customizable button component
- `Card` - Card layout component
- `Badge` - Label/badge component

### Layout Components
- `NavBar` - Navigation bar
- `Footer` - Site footer
- `SectionShell` - Section wrapper

### Site Components
- `Section` - Content section with image
- `ImageBand` - Full-width image banner
- `MissionCombo` - Mission statement component

## Development

To add new images, place them in the `public/images/` directory and update the asset references in `src/lib/assets.ts`.

## Build and Deploy

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_MODE=mock
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Authentication Pages

This project includes comprehensive authentication page examples powered by Supabase:

- **Signup** (`/signup`) - User registration with email/password and OAuth
- **Login** (`/login`) - Sign in with multiple authentication methods
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Reset Password** (`/reset-password`) - Set new password
- **Email Verification** (`/verify-email`) - Confirm email address
- **Dashboard** (`/dashboard`) - Protected user area

### Documentation

- [AUTH_QUICK_START.md](./AUTH_QUICK_START.md) - Quick reference guide
- [AUTH_PAGES_GUIDE.md](./AUTH_PAGES_GUIDE.md) - Comprehensive documentation
- [AUTH_PAGES_VISUAL_GUIDE.md](./AUTH_PAGES_VISUAL_GUIDE.md) - Visual examples and mockups

These pages serve as production-ready examples and can be used as-is or customized for your needs.

## License

This project is private and proprietary.
