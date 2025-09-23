# Evolution 3.0

A modern Next.js application built with TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Mock/Real API switching** for development flexibility
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

## API Mode Switching

The application supports switching between mock and real APIs:

- **URL Parameter**: Add `?apiMode=real` or `?apiMode=mock` to any URL
- **Environment Variable**: Set `NEXT_PUBLIC_API_MODE=real` in your `.env.local`
- **Default**: Mock mode for development

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   ├── layout/         # Layout components
│   ├── site/           # Site-specific components
│   ├── marketing/      # Marketing components
│   ├── media/          # Media components
│   └── icons/          # Icon components
├── content/            # Static content (JSON)
├── lib/                # Utility libraries
│   └── api/           # API integration layer
└── styles/            # Global styles and themes
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
- `NavFadeIn` - Animated navigation wrapper

### Site Components
- `Section` - Content section with image
- `ImageBand` - Full-width image banner
- `MissionCombo` - Mission statement component

## Development

To add new images, place them in the `public/images/content/` directory and update the asset references in `src/lib/assets.ts`.

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
```

## License

This project is private and proprietary.