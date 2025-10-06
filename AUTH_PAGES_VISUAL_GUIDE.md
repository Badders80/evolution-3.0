# Authentication Pages Visual Guide

This guide provides visual mockups and descriptions of each authentication page in the application.

## Page Layouts and Features

### 1. Signup Page (`/signup`)

**Route:** `http://localhost:3000/signup`

**Visual Description:**
- Dark themed page with centered card layout
- Card has rounded corners (`rounded-xl`) with shadow
- Header: "Create your account" in large bold text
- Subtext with link to login page
- Three input fields stacked vertically:
  - Email address (with placeholder: "you@example.com")
  - Password (with placeholder: "At least 6 characters")
  - Confirm password (with placeholder: "Confirm your password")
- Primary action button: "Create account" (gold/primary color)
- Horizontal divider with "Or continue with" text
- Google OAuth button with Google logo
- Footer text with links to Terms of Service and Privacy Policy

**Success State:**
- Shows green checkmark icon
- Title: "Check your email!"
- Message explaining confirmation email was sent
- Automatically redirects after 3 seconds

**Key Features:**
- Real-time password validation
- Password match checking
- Clear error messages in red alert box
- Loading states ("Creating account...")
- Responsive design for mobile

---

### 2. Login Page (`/login`)

**Route:** `http://localhost:3000/login`

**Visual Description:**
- Similar dark themed layout as signup
- Header: "Welcome back" in large bold text
- Subtext with link to signup page
- Two input fields:
  - Email address (with placeholder: "you@example.com")
  - Password (with placeholder: "Enter your password")
  - "Forgot password?" link aligned right on password label
- Primary action button: "Sign in" (gold/primary color)
- Horizontal divider with "Or continue with" text
- Google OAuth button with colored Google logo
- Clean, focused interface for returning users

**Key Features:**
- Remember email via browser autocomplete
- Password visibility toggle (native browser)
- Direct link to password recovery
- OAuth alternative for quick login
- Error messages displayed prominently

---

### 3. Forgot Password Page (`/forgot-password`)

**Route:** `http://localhost:3000/forgot-password`

**Visual Description:**
- Same dark theme and card layout
- Header: "Forgot password?" 
- Subtext: "No worries! Enter your email and we'll send you a reset link."
- Single email input field
- Primary button: "Send reset link"
- "Back to sign in" link at bottom

**Success State:**
- Green email icon in circle
- Title: "Check your email"
- Message with user's email address highlighted
- Instructions to click the link
- "Back to sign in" link

**Key Features:**
- Single-step process
- Clear feedback on success
- Easy navigation back to login
- Professional messaging

---

### 4. Reset Password Page (`/reset-password`)

**Route:** `http://localhost:3000/reset-password` (accessed via email link)

**Visual Description:**
- Dark themed card layout
- Header: "Reset your password"
- Subtext: "Enter your new password below"
- Two password input fields:
  - New password (with placeholder: "At least 6 characters")
  - Confirm new password (with placeholder: "Confirm your password")
- Primary button: "Reset password"
- "Back to sign in" link at bottom

**Success State:**
- Green checkmark icon
- Title: "Password reset successful!"
- Confirmation message
- Auto-redirect to login page after 2 seconds

**Key Features:**
- Password strength validation
- Match confirmation
- Token-based authentication from email
- Automatic redirect on success

---

### 5. Email Verification Page (`/verify-email`)

**Route:** `http://localhost:3000/verify-email` (accessed via email link)

**Visual Description:**

**Loading State:**
- Animated spinner (primary color)
- Title: "Verifying your email..."
- "Please wait..." message

**Success State:**
- Green checkmark icon
- Title: "Email verified!"
- Success message
- "Go to Dashboard" button
- Auto-redirect after showing success

**Error State:**
- Red X icon in circle
- Title: "Verification failed"
- Error message with explanation
- Two action buttons:
  - "Go to Sign In" (primary)
  - "Create New Account" (secondary)

**Key Features:**
- Automatic verification on page load
- Clear status indicators
- Multiple recovery options on error
- Seamless flow to dashboard on success

---

### 6. Dashboard Page (`/dashboard`)

**Route:** `http://localhost:3000/dashboard` (protected route)

**Visual Description:**
- Light gray background
- White navigation bar at top with:
  - "Dashboard" heading
  - User email display on right
  - "Sign out" button (indigo color)
- Main content area with dashed border placeholder
- Welcome message: "Welcome to your dashboard!"

**Key Features:**
- Authentication required (redirects to login if not authenticated)
- Displays user's email
- Sign out functionality
- Loading spinner while checking auth status
- Real-time auth state monitoring

---

## Design System Details

### Color Palette
```css
Background: #000000 (black)
Surface: #111113 (dark gray)
Surface Alt: #16161a (slightly lighter)
Primary: #d4a964 (gold)
Primary Foreground: #111113 (dark text on gold)
Foreground: #e5e7eb (light gray text)
Muted: #9ca3af (muted text)
Border: #27272a (subtle borders)
Error: Red tones (#dc2626)
Success: Green tones (#059669)
```

### Typography
- **Headings:** 3xl (2.25rem) bold, tight line-height
- **Body:** sm to base (0.875rem - 1rem)
- **Labels:** sm (0.875rem) medium weight
- **Links:** medium weight with hover states

### Spacing
- **Card padding:** p-8 (2rem)
- **Form spacing:** space-y-4 to space-y-6
- **Input padding:** px-3 py-2

### Components

**Input Fields:**
```
- Full width
- Rounded corners (rounded-md)
- Dark background with subtle border
- Focus: Primary color ring
- Placeholder: Muted text color
```

**Buttons:**
```
Primary:
- Gold background (#d4a964)
- Dark text
- Rounded corners
- Hover: Slightly darker (90% opacity)
- Disabled: 50% opacity

Secondary/OAuth:
- Border style
- Dark background
- Light text
- Hover: Surface color
```

**Error Messages:**
```
- Red background (10% opacity)
- Red border (20% opacity)
- Red icon
- Red text (lighter shade)
- Rounded corners
- Padding: p-4
```

**Success Messages:**
```
- Green icon in circle
- Large heading
- Clear description
- Often includes auto-redirect message
```

### Icons
All icons use heroicons (outline or solid):
- Checkmark: Success states
- X mark: Error states
- Email: Email-related messages
- Spinner: Loading states

### Responsive Behavior
- **Mobile:** Single column, reduced padding
- **Desktop:** Centered with max-width (max-w-md)
- **Padding:** px-4 for mobile safety margins
- **Touch targets:** Adequate button sizing

---

## User Flow Diagrams

### New User Registration Flow
```
1. Visit /signup
2. Enter email + password (×2)
3. Click "Create account"
4. See success message
5. Check email for confirmation
6. Click link → /verify-email
7. See verification success
8. Auto-redirect → /dashboard
```

### Existing User Login Flow
```
1. Visit /login
2. Enter email + password
3. Click "Sign in"
4. Auto-redirect → /dashboard
```

### Password Reset Flow
```
1. Visit /login
2. Click "Forgot password?"
3. Enter email on /forgot-password
4. Click "Send reset link"
5. Check email for reset link
6. Click link → /reset-password
7. Enter new password (×2)
8. See success message
9. Auto-redirect → /login
10. Sign in with new password
```

### OAuth Flow (Google)
```
1. Visit /login or /signup
2. Click "Sign in/up with Google"
3. Redirected to Google consent
4. Approve access
5. Redirected back → /auth/callback
6. Processed by server
7. Auto-redirect → /dashboard
```

---

## Accessibility Features

### Keyboard Navigation
- All form fields are keyboard accessible
- Tab order follows logical flow
- Enter key submits forms
- Escape key could close modals (if added)

### Screen Readers
- Proper label associations (htmlFor attributes)
- Semantic HTML (form, button, label elements)
- ARIA attributes where needed
- Alt text for icons (via SVG paths)

### Visual Accessibility
- High contrast text on dark backgrounds
- Large, readable font sizes
- Clear focus indicators
- Error messages clearly associated with fields
- Color not the only indicator (icons + text)

---

## Animation and Transitions

### Spinners
- Rotating border animation
- Primary color
- Used during: verification, loading, auth checks

### Auto-redirects
- Success messages show for 2-3 seconds
- Countdown text when redirecting
- Smooth page transitions via Next.js

### Hover States
- Buttons: Opacity change (90%)
- Links: Color shift
- Inputs: Border color to primary

---

## Error States and Messages

### Common Errors and Their Display

**Invalid Credentials:**
```
"Failed to sign in" or specific Supabase error
Displayed in red alert box at top of form
```

**Password Mismatch:**
```
"Passwords do not match"
Shows immediately on form submit
```

**Weak Password:**
```
"Password must be at least 6 characters"
Validated before submission
```

**Network Errors:**
```
Generic error message with retry option
"Failed to [action]" format
```

**Email Already Exists:**
```
Supabase error message displayed
Suggestion to use login instead
```

---

## Mobile Responsive Examples

### Mobile Adaptations (< 768px)
- Card takes full width with px-4 margins
- Inputs stack vertically (already default)
- Buttons remain full width
- Text remains readable
- Touch-friendly button sizes (py-2 = 0.5rem top/bottom)
- Google logo properly sized

### Tablet (768px - 1024px)
- Card remains centered
- Max width maintained (max-w-md)
- Comfortable reading distance

### Desktop (> 1024px)
- Card centered in viewport
- Background visible around card
- Optimal form field widths

---

## Implementation Notes

### Dependencies
- Next.js 15.5.4
- React 18
- Supabase JS 2.58.0
- Tailwind CSS 3.4.1

### File Structure
```
src/app/
├── signup/
│   └── page.tsx
├── login/
│   └── page.tsx
├── forgot-password/
│   └── page.tsx
├── reset-password/
│   └── page.tsx
├── verify-email/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
└── auth/
    └── callback/
        └── route.ts
```

### State Management
- Local component state (useState)
- Supabase session management
- No global state library needed
- React context for Supabase provider

---

## Testing Checklist

### Visual Testing
- [ ] All pages render correctly
- [ ] Dark theme applied consistently
- [ ] Responsive on mobile, tablet, desktop
- [ ] Icons display properly
- [ ] Buttons have correct colors
- [ ] Loading states show correctly
- [ ] Error messages styled properly

### Functional Testing
- [ ] Signup creates new user
- [ ] Login authenticates existing user
- [ ] Forgot password sends email
- [ ] Reset password updates credential
- [ ] Email verification works
- [ ] OAuth flow completes
- [ ] Redirects work correctly
- [ ] Error handling catches issues

### User Experience Testing
- [ ] Clear instructions on each page
- [ ] Helpful error messages
- [ ] Success feedback visible
- [ ] Links work correctly
- [ ] Auto-redirects have countdown
- [ ] Loading states prevent confusion
- [ ] Forms validate properly

---

## Future Enhancement Ideas

1. **Password Strength Indicator**
   - Visual bar showing password strength
   - Color-coded: red (weak) to green (strong)
   - Real-time feedback as user types

2. **Two-Factor Authentication**
   - SMS or authenticator app codes
   - Setup page after initial signup
   - Verification page during login

3. **Social Login Options**
   - GitHub OAuth
   - Facebook login
   - Apple Sign In
   - Microsoft account

4. **Remember Me**
   - Checkbox on login page
   - Extended session duration
   - Secure cookie management

5. **Account Recovery**
   - Security questions
   - Backup email
   - Phone number verification

6. **Progressive Web App**
   - Install prompt
   - Offline support
   - Push notifications

7. **Biometric Auth**
   - Fingerprint on mobile
   - Face ID support
   - WebAuthn implementation

8. **Session Management**
   - View active sessions
   - Remote logout capability
   - Device tracking

---

## Conclusion

These authentication pages provide a complete, production-ready auth system with:
- ✅ Modern, clean design
- ✅ Comprehensive error handling
- ✅ Secure authentication flows
- ✅ Mobile-responsive layouts
- ✅ Accessible components
- ✅ Clear user feedback
- ✅ Professional polish

All pages follow Next.js best practices and integrate seamlessly with Supabase authentication services.
