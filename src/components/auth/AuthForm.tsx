'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Database } from '@/lib/database.types'

export default function AuthForm() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [redirectTo, setRedirectTo] = useState<string>()
  const searchParams = useSearchParams()
  const redirectTargetRaw = searchParams?.get('redirectedFrom') ?? '/mystable'
  const redirectTarget = redirectTargetRaw.startsWith('/') ? redirectTargetRaw : '/mystable'

  // Redirect to MyStable if already signed in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push(redirectTarget)
      }
    }
    checkUser()
  }, [redirectTarget, router, supabase])

  // Configure redirect target for OAuth flows once we have access to window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      const callbackUrl = new URL('/auth/callback', origin)
      callbackUrl.searchParams.set('redirectedFrom', redirectTarget)
      setRedirectTo(callbackUrl.toString())
    }
  }, [redirectTarget])

  // Auto-forward to MyStable after sign-in completes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_IN') {
        router.push(redirectTarget)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [redirectTarget, router, supabase])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* Radial gradient background - covers everything including NavBar */}
      <div className="fixed inset-0 bg-black" style={{
        background: 'radial-gradient(ellipse at center, #2a2a2a 0%, #1a1a1a 20%, #0a0a0a 40%, black 80%)',
        opacity: 1
      }} />
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.01) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(circle at center, black, transparent 50%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 50%)',
      }} />

      {/* Auth container */}
      <div className="relative w-full max-w-sm z-10">
        <div className="relative group">
          {/* Circular highlight effect */}
          <div className="absolute -inset-2 bg-neutral-900/80 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
               style={{
                 filter: 'blur(40px)',
                 background: 'radial-gradient(circle at center, rgba(38,38,38,0.6) 0%, rgba(0,0,0,0) 70%)'
               }} 
          />
          
          {/* Main card */}
          <div className="relative bg-[#111111] border border-neutral-800/80 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-medium tracking-wide text-neutral-100">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-neutral-400">
                Access your stable in seconds.
              </p>
            </div>

          <Auth
            supabaseClient={supabase}
            providers={['google']}
            redirectTo={redirectTo}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgba(255, 255, 255, 0.95)',
                    brandAccent: 'rgba(255, 255, 255, 0.85)',
                    brandButtonText: '#0a0a0a',
                    defaultButtonBackground: 'rgba(255, 255, 255, 0.08)',
                    defaultButtonBackgroundHover: 'rgba(255, 255, 255, 0.12)',
                    defaultButtonText: '#f5f5f5',
                    inputBackground: 'rgba(0, 0, 0, 0.2)',
                    inputBorder: 'rgba(255, 255, 255, 0.08)',
                    inputText: '#f5f5f5',
                    inputLabelText: 'rgba(245, 245, 245, 0.7)',
                    inputPlaceholder: 'rgba(245, 245, 245, 0.4)',
                    messageText: 'rgba(245, 245, 245, 0.9)',
                  },
                  radii: {
                    borderRadiusButton: '9999px',
                    inputBorderRadius: '0.75rem',
                  },
                  fonts: {
                    bodyFontFamily: 'var(--font-sans)',
                  },
                },
              },
              className: {
                container: 'text-neutral-100 space-y-4',
                anchor: 'text-neutral-400 hover:text-neutral-200 underline underline-offset-4 text-sm transition-colors',
                button:
                  'h-12 rounded-full text-[0.85rem] font-medium tracking-wide transition-all hover:shadow-lg hover:shadow-black/20',
                input:
                  'h-12 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30',
                label: 'text-xs font-medium tracking-wide text-neutral-400',
                divider: 'border-neutral-800',
                loader: 'text-neutral-100',
              },
            }}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

