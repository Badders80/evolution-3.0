# Authentication Pages Guide

This guide provides an overview of all authentication pages available in this application. These pages serve as examples and templates for implementing authentication flows using Supabase.

## Available Auth Pages

### 1. Sign Up Page (`/signup`)
**Path:** `/src/app/signup/page.tsx`

A comprehensive registration page that allows users to create an account.

**Features:**
- Email and password registration
- Password confirmation with validation
- Password strength requirements (minimum 6 characters)
- Google OAuth sign-up option
- Success message with email confirmation instructions
- Error handling with user-friendly messages
- Links to Terms of Service and Privacy Policy
- Automatic redirect to login after successful signup

**User Flow:**
1. User enters email and password (twice for confirmation)
2. System validates password strength and match
3. Creates account via Supabase
4. Shows success message asking user to check email
5. Redirects to login page after 3 seconds

### 2. Login Page (`/login`)
**Path:** `/src/app/login/page.tsx`

The main sign-in page for returning users.

**Features:**
- Email and password login
- Google OAuth sign-in option
- "Forgot password?" link
- Link to sign-up page for new users
- Error handling with detailed messages
- Loading states during authentication
- Automatic redirect to dashboard on success

**User Flow:**
1. User enters email and password
2. System authenticates via Supabase
3. On success, redirects to dashboard
4. On failure, shows error message

### 3. Forgot Password Page (`/forgot-password`)
**Path:** `/src/app/forgot-password/page.tsx`

Allows users to request a password reset link.

**Features:**
- Email input for password reset
- Sends reset link to user's email
- Success confirmation screen
- Error handling
- Link back to login page

**User Flow:**
1. User enters their email address
2. System sends password reset email via Supabase
3. Shows success message with instructions
4. User clicks link in email to proceed to reset page

### 4. Reset Password Page (`/reset-password`)
**Path:** `/src/app/reset-password/page.tsx`

Allows users to set a new password after clicking the reset link.

**Features:**
- New password input with confirmation
- Password validation (minimum 6 characters)
- Password match validation
- Success confirmation
- Automatic redirect to login page
- Error handling

**User Flow:**
1. User arrives via email link (token in URL)
2. Enters new password twice
3. System validates and updates password via Supabase
4. Shows success message
5. Redirects to login page after 2 seconds

### 5. Email Verification Page (`/verify-email`)
**Path:** `/src/app/verify-email/page.tsx`

Handles email verification after user signs up.

**Features:**
- Automatic verification using URL parameters
- Loading state while verifying
- Success confirmation with dashboard redirect
- Error handling with helpful actions
- Links to login or create new account

**User Flow:**
1. User clicks verification link from email
2. System automatically verifies the token
3. On success, shows confirmation and redirects to dashboard
4. On failure, shows error with options to sign in or create new account

### 6. Dashboard Page (`/dashboard`)
**Path:** `/src/app/dashboard/page.tsx`

Protected page that requires authentication.

**Features:**
- Displays user email
- Sign-out functionality
- Redirects to login if not authenticated
- Listens for auth state changes

**User Flow:**
1. System checks authentication status
2. If not authenticated, redirects to login
3. If authenticated, shows dashboard with user info
4. User can sign out, which redirects to login

### 7. Auth Callback Route (`/auth/callback`)
**Path:** `/src/app/auth/callback/route.ts`

Server-side route that handles OAuth callbacks.

**Features:**
- Exchanges OAuth code for session
- Handles authentication errors
- Redirects to home page on success
- Error logging and redirection

## Design System

All auth pages follow a consistent design system:

### Color Scheme
- **Background:** Dark mode with `bg-background` (#000000)
- **Surface:** Card backgrounds with `bg-surface` (#111113)
- **Primary:** Brand gold `bg-primary` (#d4a964)
- **Text:** Light foreground `text-foreground` (#e5e7eb)
- **Muted:** Secondary text `text-muted` (#9ca3af)
- **Error:** Red tones for error messages
- **Success:** Green tones for success messages

### Layout
- Centered layout with max-width container
- Rounded corners (`rounded-xl`)
- Shadow effects for depth
- Responsive padding for mobile devices
- Consistent spacing using Tailwind's space utilities

### Form Elements
- Rounded inputs with border
- Focus states with primary color ring
- Disabled states with opacity
- Clear labels and placeholders
- Consistent spacing between fields

### Buttons
- Primary buttons: Gold background with dark text
- Secondary buttons: Border with transparent background
- Loading states with disabled styling
- Hover effects for better UX

### Icons
- Success: Green checkmark in circle
- Error: Red X in circle
- Loading: Animated spinner
- Email: Envelope icon

## Authentication Flow

### Email/Password Registration
```
Signup → Email Confirmation → Verify Email → Dashboard
```

### Email/Password Login
```
Login → Dashboard
```

### OAuth (Google) Flow
```
Click Google Button → OAuth Consent → Callback Handler → Dashboard
```

### Password Reset Flow
```
Forgot Password → Email Link → Reset Password → Login
```

## Configuration

These pages use Supabase for authentication. Ensure you have:

1. **Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

2. **Supabase Configuration:**
   - Email templates configured
   - OAuth providers enabled (e.g., Google)
   - Redirect URLs whitelisted in Supabase dashboard
   - Email confirmation enabled (optional)

3. **Redirect URLs to Whitelist:**
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)
   - `http://localhost:3000/reset-password` (development)
   - `https://yourdomain.com/reset-password` (production)

## Error Handling

All pages implement comprehensive error handling:

- Network errors
- Invalid credentials
- Password mismatch
- Weak passwords
- Email already exists
- Invalid or expired tokens
- Rate limiting

Errors are displayed in a consistent red alert box at the top of forms.

## Security Features

- Password minimum length enforcement
- Password confirmation requirement
- Secure password reset flow with tokens
- OAuth state parameter validation
- PKCE flow for OAuth
- Session management via Supabase
- Automatic token refresh
- Protected routes with authentication checks

## Customization

To customize these pages:

1. **Styling:** Modify Tailwind classes in each component
2. **Validation:** Update validation logic in form handlers
3. **Redirects:** Change redirect URLs in success handlers
4. **Messages:** Update text content for your brand voice
5. **Additional Fields:** Add more form fields as needed
6. **OAuth Providers:** Add more providers in login/signup pages

## Testing

To test these pages:

1. **Sign Up:**
   - Test with valid/invalid emails
   - Test password validation
   - Test password mismatch
   - Check email confirmation flow

2. **Login:**
   - Test with valid/invalid credentials
   - Test OAuth flow
   - Test "forgot password" link

3. **Password Reset:**
   - Request reset email
   - Click email link
   - Set new password
   - Verify you can login with new password

4. **Email Verification:**
   - Sign up with new account
   - Click verification link in email
   - Verify redirect to dashboard

## Accessibility

All pages include:
- Semantic HTML elements
- Proper form labels
- ARIA attributes where needed
- Keyboard navigation support
- Focus states for interactive elements
- Clear error messages
- Loading indicators

## Mobile Responsiveness

All pages are fully responsive:
- Flexible layouts with `flex` and `grid`
- Responsive padding (`px-4`)
- Maximum width constraints (`max-w-md`)
- Touch-friendly button sizes
- Readable font sizes on small screens

## Future Enhancements

Potential improvements:
- Two-factor authentication (2FA)
- Social login with more providers (GitHub, Facebook, etc.)
- Magic link authentication
- Remember me functionality
- Session timeout warnings
- Account lockout after failed attempts
- Progressive password strength indicator
- Captcha for bot prevention

## Support

For issues or questions about these authentication pages:
1. Check Supabase documentation
2. Review Next.js authentication patterns
3. Inspect browser console for errors
4. Check Supabase dashboard for logs
5. Verify environment variables are set correctly
