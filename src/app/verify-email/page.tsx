'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Check if user is already verified via session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setStatus('success')
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/dashboard')
          }, 3000)
        } else {
          setStatus('error')
          setError('Unable to verify email. Please try again or contact support.')
        }
      } catch (err: any) {
        setStatus('error')
        setError(err.message || 'Failed to verify email')
      }
    }

    verifyEmail()
  }, [router, searchParams])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-surface p-8 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-foreground">Verifying your email...</h2>
            <p className="mt-2 text-sm text-muted">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-surface p-8 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-foreground">Email verified!</h2>
            <p className="mt-2 text-sm text-muted">
              Your email has been successfully verified. You can now access all features.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Redirecting to dashboard...
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-surface p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">Verification failed</h2>
          <p className="mt-2 text-sm text-muted">
            {error || 'We were unable to verify your email address.'}
          </p>
          <div className="mt-6 space-y-3">
            <Link
              href="/login"
              className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Go to Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full rounded-md border border-border bg-surfaceAlt px-4 py-2 text-center text-sm font-medium text-foreground hover:bg-surface"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
