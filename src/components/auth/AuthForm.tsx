'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
export default function AuthForm() {
  console.log('AuthForm component rendering')
  const supabase = createClientComponentClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectTo, setRedirectTo] = useState<string>()

  const redirectTargetRaw = searchParams?.get('redirectedFrom') ?? '/mystable'
  const redirectTarget = redirectTargetRaw.startsWith('/') ? redirectTargetRaw : '/mystable'

  useEffect(() => {
    console.log('Running checkSession effect')
    const checkSession = async () => {
      console.log('Checking session...')
      try {
        const { data, error } = await supabase.auth.getSession()
        console.log('Session data:', data)
        if (error) console.error('Session error:', error)
        if (data?.session) {
          console.log('Session found, redirecting to:', redirectTarget)
          router.replace(redirectTarget)
        }
      } catch (error) {
        console.error('Error in checkSession:', error)
      }
    }

    checkSession()
  }, [redirectTarget, router, supabase])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      const callbackUrl = new URL('/auth/callback', origin)
      callbackUrl.searchParams.set('redirectedFrom', redirectTarget)
      setRedirectTo(callbackUrl.toString())
    }
  }, [redirectTarget])

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_IN') {
        router.replace(redirectTarget)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [redirectTarget, router, supabase])

  console.log('Rendering Auth component with redirectTo:', redirectTo)
  
  if (!redirectTo) {
    console.log('Waiting for redirect URL to be set...')
    return <div className="text-center p-8">Loading authentication...</div>
  }

  return (
    <div className="w-full max-w-md space-y-12 text-white lg:max-w-[17rem] xl:max-w-[18.5rem] 2xl:max-w-[20rem]">
      <div className="space-y-2 text-center lg:text-left">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Evolution Stables</p>
        <h1 className="text-3xl font-semibold tracking-[0.12em]">Welcome Back</h1>
        <p className="text-sm text-white/60">Sign in to manage your stable, positions, and updates.</p>
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
                brand: 'rgba(255,255,255,0.08)',
                brandAccent: 'rgba(255,255,255,0.12)',
                brandButtonText: '#ffffff',
                defaultButtonBackground: 'rgba(255,255,255,0.08)',
                defaultButtonBackgroundHover: 'rgba(255,255,255,0.12)',
                defaultButtonText: '#ffffff',
                inputBackground: 'rgba(255,255,255,0.04)',
                inputBorder: 'rgba(255,255,255,0.08)',
                inputText: '#ffffff',
                inputLabelText: 'rgba(255,255,255,0.6)',
                inputPlaceholder: 'rgba(255,255,255,0.35)',
                messageText: '#ffffff',
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
            container: 'space-y-6 text-white',
            anchor: 'text-white/70 hover:text-white underline underline-offset-4',
            button:
              'h-12 rounded-full text-sm font-semibold tracking-[0.18em] uppercase transition-shadow hover:shadow-[0_10px_35px_rgba(0,0,0,0.35)]',
            input:
              'h-12 rounded-2xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-white/40 focus:border-[#D4AF37]/70 focus:ring-2 focus:ring-[#D4AF37]/40',
            label: 'text-xs uppercase tracking-[0.3em] text-white/50',
            divider: 'border-white/10 my-10',
            loader: 'text-white/60',
          },
        }}
      />
    </div>
  )
}

