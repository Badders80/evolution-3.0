# Auth Pages - Code Examples

Practical code examples for using and integrating the authentication pages.

## 🚀 Quick Integration

### Add Links to Your Navigation

```tsx
// In your NavBar or Header component
import Link from 'next/link'

export function Navigation() {
  return (
    <nav>
      <Link href="/signup">Sign Up</Link>
      <Link href="/login">Login</Link>
    </nav>
  )
}
```

### Protect a Page

```tsx
// In any page that requires authentication
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ProtectedPage() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      }
    }
    checkAuth()
  }, [router])

  return <div>Your protected content</div>
}
```

### Get Current User

```tsx
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>User ID: {user.id}</p>
    </div>
  )
}
```

### Sign Out Anywhere

```tsx
'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  )
}
```

## 📝 Customization Examples

### Change Button Colors

```tsx
// Original
<button className="bg-primary">Sign In</button>

// Customized
<button className="bg-blue-600 hover:bg-blue-700">Sign In</button>
```

### Add Custom Validation

```tsx
// In signup page
const handleEmailSignup = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Custom email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address')
    return
  }
  
  // Custom password requirements
  if (password.length < 8) {
    setError('Password must be at least 8 characters')
    return
  }
  
  if (!/[A-Z]/.test(password)) {
    setError('Password must contain an uppercase letter')
    return
  }
  
  if (!/[0-9]/.test(password)) {
    setError('Password must contain a number')
    return
  }
  
  // Continue with signup...
}
```

### Custom Redirect After Login

```tsx
// In login page
const handleEmailLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  // ... authentication code ...
  
  // Custom redirect based on user role
  if (data.user.user_metadata.role === 'admin') {
    router.push('/admin/dashboard')
  } else {
    router.push('/user/profile')
  }
}
```

### Add Remember Me

```tsx
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginWithRememberMe() {
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Configure session persistence
    await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        // If remember me is checked, use local storage (persists)
        // Otherwise use session storage (clears on browser close)
        persistSession: rememberMe
      }
    })
  }

  return (
    <form onSubmit={handleLogin}>
      {/* ... email/password inputs ... */}
      
      <div className="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      
      <button type="submit">Sign In</button>
    </form>
  )
}
```

## 🎨 Styling Examples

### Light Theme Variant

```tsx
// Replace dark theme classes
<div className="bg-white"> {/* was: bg-background */}
  <div className="bg-gray-50 text-gray-900"> {/* was: bg-surface text-foreground */}
    <input className="bg-white border-gray-300 text-gray-900" /> {/* was: bg-surfaceAlt border-border text-foreground */}
  </div>
</div>
```

### Custom Brand Colors

```tsx
// In tailwind.config.ts
colors: {
  primary: {
    DEFAULT: "#3b82f6", // Blue instead of gold
    foreground: "#ffffff",
  },
}

// Then use in components
<button className="bg-primary text-primary-foreground">
  Sign In
</button>
```

### Add Loading Spinner

```tsx
function LoadingSpinner() {
  return (
    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Use in button
<button disabled={loading}>
  {loading ? <LoadingSpinner /> : 'Sign In'}
</button>
```

## 🔐 Advanced Integration

### Session Listener

```tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function AuthListener() {
  const router = useRouter()

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event)
        
        if (event === 'SIGNED_IN') {
          router.push('/dashboard')
        } else if (event === 'SIGNED_OUT') {
          router.push('/login')
        } else if (event === 'PASSWORD_RECOVERY') {
          router.push('/reset-password')
        } else if (event === 'USER_UPDATED') {
          router.refresh()
        }
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [router])

  return null
}
```

### Middleware for Route Protection

```tsx
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect authenticated users from auth pages
  if (
    (req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/signup')) &&
    session
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}
```

### Email Templates

Configure in Supabase Dashboard → Authentication → Email Templates:

**Confirmation Email:**
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

**Reset Password Email:**
```html
<h2>Reset Password</h2>
<p>Follow this link to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
```

### Role-Based Access Control

```tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Check user role from metadata
      const role = user.user_metadata.role
      
      if (role !== 'admin') {
        router.push('/dashboard') // Redirect non-admins
        return
      }

      setIsAdmin(true)
    }

    checkRole()
  }, [router])

  if (!isAdmin) {
    return <div>Checking permissions...</div>
  }

  return <div>Admin Content</div>
}
```

### Social Login (Multiple Providers)

```tsx
'use client'
import { supabase } from '@/lib/supabase'

export function SocialLogin() {
  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="space-y-2">
      <button onClick={() => handleSocialLogin('google')}>
        Continue with Google
      </button>
      <button onClick={() => handleSocialLogin('github')}>
        Continue with GitHub
      </button>
      <button onClick={() => handleSocialLogin('facebook')}>
        Continue with Facebook
      </button>
    </div>
  )
}
```

## 🧪 Testing Examples

### Test with Mock Supabase

```tsx
// For UI testing without real auth
const mockSupabase = {
  auth: {
    signInWithPassword: async ({ email, password }) => {
      console.log('Mock sign in:', email)
      return { data: { user: { email } }, error: null }
    },
    signUp: async ({ email, password }) => {
      console.log('Mock sign up:', email)
      return { data: { user: { email } }, error: null }
    },
  },
}

// Use in development
const supabase = process.env.NODE_ENV === 'test' 
  ? mockSupabase 
  : realSupabase
```

### Test Form Validation

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import SignupPage from './page'

test('shows error when passwords do not match', async () => {
  render(<SignupPage />)
  
  const emailInput = screen.getByLabelText('Email address')
  const passwordInput = screen.getByLabelText('Password')
  const confirmInput = screen.getByLabelText('Confirm password')
  const submitButton = screen.getByText('Create account')

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  fireEvent.change(passwordInput, { target: { value: 'password123' } })
  fireEvent.change(confirmInput, { target: { value: 'different' } })
  fireEvent.click(submitButton)

  expect(await screen.findByText('Passwords do not match')).toBeInTheDocument()
})
```

## 📱 Mobile Examples

### Touch-Friendly Buttons

```tsx
// Increase button size for mobile
<button className="py-3 px-6 text-base md:py-2 md:px-4 md:text-sm">
  Sign In
</button>
```

### Mobile-Specific Layout

```tsx
<div className="min-h-screen px-4 py-8 md:px-6 md:py-12">
  <div className="max-w-md mx-auto space-y-6 md:space-y-8">
    {/* Content */}
  </div>
</div>
```

## 🎯 Production Tips

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Error Logging

```tsx
const handleEmailSignup = async (e: React.FormEvent) => {
  try {
    // ... signup code ...
  } catch (error: any) {
    // Log to your error tracking service
    console.error('Signup error:', {
      message: error.message,
      code: error.code,
      email: email, // Don't log passwords!
    })
    
    // Send to error tracking (Sentry, LogRocket, etc.)
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error)
    }
    
    setError(error.message)
  }
}
```

### Rate Limiting

Configure in Supabase Dashboard:
- Max signup attempts per hour
- Max password reset requests
- Max login attempts before lockout

---

## 📚 More Resources

- [AUTH_QUICK_START.md](./AUTH_QUICK_START.md)
- [AUTH_PAGES_GUIDE.md](./AUTH_PAGES_GUIDE.md)
- [AUTH_PAGES_VISUAL_GUIDE.md](./AUTH_PAGES_VISUAL_GUIDE.md)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Documentation](https://nextjs.org/docs)
