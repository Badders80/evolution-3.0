#!/bin/bash

# =====================================================
# Security Verification Script
# =====================================================
# Run this to verify your security setup is complete
# =====================================================

echo "🔒 Evolution Stables - Security Verification"
echo "=============================================="
echo ""

# Check 1: Environment variables
echo "✓ Checking environment variables..."
if [ -f ".env.local" ]; then
  if grep -q "SUPABASE_SERVICE_ROLE_KEY=sb_secret" .env.local 2>/dev/null; then
    echo "  ✅ .env.local exists with new service role key format"
  elif grep -q "SUPABASE_SERVICE_ROLE_KEY=ey" .env.local 2>/dev/null; then
    echo "  ⚠️  .env.local has OLD key format - rotate your keys!"
  else
    echo "  ⚠️  .env.local exists but service role key not found"
  fi
else
  echo "  ❌ .env.local not found - create this file!"
fi
echo ""

# Check 2: Hardcoded keys in scripts (skip the verify script itself)
echo "✓ Checking for hardcoded keys in scripts..."
HARDCODED=$(grep -r "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" scripts/*.js 2>/dev/null | wc -l)
if [ "$HARDCODED" -eq 0 ]; then
  echo "  ✅ No hardcoded keys found in scripts"
else
  echo "  ❌ Found $HARDCODED hardcoded key(s) in scripts!"
  grep -r "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" scripts/*.js
fi
echo ""

# Check 3: Middleware exists
echo "✓ Checking middleware..."
if [ -f "middleware.ts" ]; then
  if grep -q "isAdminPath" middleware.ts; then
    echo "  ✅ Middleware has admin route protection"
  else
    echo "  ⚠️  Middleware exists but missing admin checks"
  fi
else
  echo "  ❌ middleware.ts not found"
fi
echo ""

# Check 4: RLS policies file
echo "✓ Checking RLS policies..."
if [ -f "supabase/RLS_POLICIES.sql" ]; then
  echo "  ✅ RLS policies file exists"
  echo "  ⚠️  Remember to apply in Supabase SQL Editor!"
else
  echo "  ❌ RLS policies file not found"
fi
echo ""

# Check 5: Profiles table setup
echo "✓ Checking profiles table setup..."
if [ -f "supabase/CREATE_PROFILES_TABLE.sql" ]; then
  echo "  ✅ Profiles table SQL exists"
  echo "  ⚠️  Remember to apply in Supabase SQL Editor!"
else
  echo "  ❌ Profiles table SQL not found"
fi
echo ""

# Check 6: Git status
echo "✓ Checking git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
  if git ls-files .env.local > /dev/null 2>&1; then
    echo "  ❌ .env.local is tracked by git! Run: git rm --cached .env.local"
  else
    echo "  ✅ .env.local not tracked by git"
  fi
else
  echo "  ℹ️  Not a git repository"
fi
echo ""

# Summary
echo "=============================================="
echo "📋 NEXT STEPS:"
echo "=============================================="
echo ""
echo "1. ⚠️  ROTATE your Supabase service role key:"
echo "   https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/settings/api"
echo ""
echo "2. 📝 Apply profiles table:"
echo "   Run: supabase/CREATE_PROFILES_TABLE.sql"
echo ""
echo "3. 🛡️  Apply RLS policies:"
echo "   Run: supabase/RLS_POLICIES.sql"
echo ""
echo "4. 👤 Make yourself admin:"
echo "   UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';"
echo ""
echo "5. ✅ Test access:"
echo "   - Try /admin without auth (should block)"
echo "   - Try /admin as regular user (should block)"
echo "   - Try /admin as admin (should work)"
echo ""
echo "📖 Full instructions: SECURITY_LOCKDOWN.md"
echo ""
