import { Suspense } from 'react'
import AuthForm from '@/components/auth/AuthForm'

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          Loading…
        </div>
      }
    >
      <AuthForm />
    </Suspense>
  )
}
