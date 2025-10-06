# Auth Pages Quick Start Guide

Quick reference for using the authentication pages in this application.

## 🚀 Quick Links

| Page | Route | Purpose |
|------|-------|---------|
| Signup | `/signup` | New user registration |
| Login | `/login` | Existing user sign-in |
| Forgot Password | `/forgot-password` | Request password reset |
| Reset Password | `/reset-password` | Set new password |
| Email Verification | `/verify-email` | Confirm email address |
| Dashboard | `/dashboard` | Protected user area |
| Auth Callback | `/auth/callback` | OAuth handler |

## 📋 Prerequisites

Before using these pages, ensure:

1. **Environment variables are set:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Supabase is configured:**
   - Email authentication enabled
   - Google OAuth provider setup (optional)
   - Email templates configured
   - Redirect URLs whitelisted

3. **Redirect URLs in Supabase dashboard:**
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/reset-password
   https://yourdomain.com/auth/callback
   https://yourdomain.com/reset-password
   ```

## 🎨 Using the Pages

### As Templates

Copy any page to customize:

```bash
# Copy signup page as template
cp src/app/signup/page.tsx src/app/register/page.tsx

# Modify as needed for your use case
```

### As Examples

Reference the code to understand:
- Form handling patterns
- Error management
- Success states
- Loading indicators
- Supabase integration

### Navigation Links

Add to your components:

```tsx
import Link from 'next/link'

// Link to signup
<Link href="/signup">Create Account</Link>

// Link to login
<Link href="/login">Sign In</Link>

// Link to forgot password
<Link href="/forgot-password">Forgot Password?</Link>
```

## 🔧 Customization

### Change Colors

Update in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "#your-color",
    foreground: "#your-text-color",
  },
}
```

### Modify Validation

Edit validation logic in each page:

```typescript
// Example: Change password minimum length
if (password.length < 8) { // Changed from 6 to 8
  setError('Password must be at least 8 characters')
  return
}
```

### Change Redirects

Update redirect URLs in success handlers:

```typescript
// After successful signup
router.push('/welcome') // Instead of /login

// After successful login
router.push('/home') // Instead of /dashboard
```

### Update Text Content

Search and replace text in each page:

```tsx
// Change heading
<h2>Your Custom Heading</h2>

// Change button text
<button>Your Button Text</button>
```

## 🧪 Testing

### Manual Testing

1. **Test Signup:**
   ```bash
   npm run dev
   # Navigate to http://localhost:3000/signup
   # Enter email + password
   # Check email inbox
   ```

2. **Test Login:**
   ```bash
   # Navigate to http://localhost:3000/login
   # Use credentials from signup
   ```

3. **Test Password Reset:**
   ```bash
   # Navigate to http://localhost:3000/forgot-password
   # Enter email
   # Check email for reset link
   ```

### Test with Mock Data

Temporarily bypass Supabase for UI testing:

```typescript
// In component
const handleEmailSignup = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Skip API call for testing
  console.log('Would signup with:', email, password)
  setSuccess(true)
  return
  
  // ... rest of real code
}
```

## 🐛 Common Issues

### Issue: "Failed to fetch" errors

**Solution:** Check environment variables are set correctly

```bash
# Verify variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Issue: OAuth redirect fails

**Solution:** Add redirect URL to Supabase dashboard
- Go to Authentication → URL Configuration
- Add: `http://localhost:3000/auth/callback`

### Issue: Email not sending

**Solution:** Check Supabase email settings
- Verify email templates are configured
- Check SMTP settings
- Look for rate limiting

### Issue: Password reset link doesn't work

**Solution:** Verify redirect URL
- Add `/reset-password` to allowed redirects
- Check token isn't expired (1 hour default)

### Issue: "Invalid login credentials"

**Solution:** 
- Verify user exists and email is confirmed
- Check password is correct
- Look for typos in email

## 📱 Mobile Testing

Test on actual devices or emulators:

```bash
# Find your local IP
ifconfig | grep inet # On macOS/Linux
ipconfig # On Windows

# Access from mobile on same network
http://192.168.1.x:3000/signup
```

## 🔒 Security Checklist

- [ ] Environment variables not committed
- [ ] HTTPS enabled in production
- [ ] Password minimum length enforced
- [ ] Rate limiting configured in Supabase
- [ ] Email confirmation required
- [ ] OAuth state parameter validated
- [ ] Session timeout configured
- [ ] Secure cookies enabled

## 📚 Additional Resources

### Documentation
- [AUTH_PAGES_GUIDE.md](./AUTH_PAGES_GUIDE.md) - Comprehensive guide
- [AUTH_PAGES_VISUAL_GUIDE.md](./AUTH_PAGES_VISUAL_GUIDE.md) - Visual examples
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js Auth Patterns](https://nextjs.org/docs/authentication)

### Code Examples

**Protected Route Pattern:**
```typescript
// In any page.tsx
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
  
  return <div>Protected Content</div>
}
```

**Sign Out Function:**
```typescript
const handleSignOut = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
```

**Get Current User:**
```typescript
const { data: { user } } = await supabase.auth.getUser()
console.log(user?.email)
```

## 🚦 Getting Started Checklist

1. [ ] Clone repository
2. [ ] Install dependencies (`npm install`)
3. [ ] Create `.env.local` with Supabase credentials
4. [ ] Configure Supabase project
5. [ ] Add redirect URLs to Supabase
6. [ ] Start dev server (`npm run dev`)
7. [ ] Test signup flow
8. [ ] Test login flow
9. [ ] Test password reset
10. [ ] Review code and customize as needed

## 🎯 Next Steps

After setting up basic auth:

1. **Add user profile page**
   - Display user information
   - Edit profile functionality
   - Avatar upload

2. **Implement authorization**
   - User roles (admin, user, etc.)
   - Permission-based access
   - Role-based UI

3. **Add session management**
   - View active sessions
   - Logout from all devices
   - Session timeout warnings

4. **Enhance security**
   - Two-factor authentication
   - Email change confirmation
   - Password change notification

5. **Improve UX**
   - Remember me option
   - Social login expansion
   - Progressive password indicator

## 💡 Tips

- **Use the existing pages as is** - They're production-ready
- **Copy and modify** - Don't reinvent the wheel
- **Test thoroughly** - Especially email flows
- **Check Supabase logs** - For debugging issues
- **Keep it simple** - Don't over-complicate auth
- **Follow security best practices** - Auth is critical

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Users can sign up and receive confirmation emails
2. ✅ Email verification links work correctly
3. ✅ Users can log in with credentials
4. ✅ OAuth (Google) login completes successfully
5. ✅ Password reset emails are delivered
6. ✅ Reset links work and update passwords
7. ✅ Protected pages redirect to login
8. ✅ Dashboard shows after successful auth
9. ✅ Sign out works and clears session
10. ✅ No console errors during any flow

---

**Need help?** Check the comprehensive guides:
- [AUTH_PAGES_GUIDE.md](./AUTH_PAGES_GUIDE.md) for detailed documentation
- [AUTH_PAGES_VISUAL_GUIDE.md](./AUTH_PAGES_VISUAL_GUIDE.md) for visual examples
