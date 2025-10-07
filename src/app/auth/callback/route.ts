import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const redirectedFrom = requestUrl.searchParams.get('redirectedFrom');
  const safeRedirectPath =
    redirectedFrom && redirectedFrom.startsWith('/') ? redirectedFrom : '/dashboard';

  // If there's an error, redirect to home with error message
  if (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=${encodeURIComponent('Authentication failed')}`
    );
  }

  // If there's a code, exchange it for a session
  if (code) {
    try {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      
      console.log('Exchanging code for session...');
      const { data, error: authError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (authError) {
        console.error('Error exchanging code for session:', authError);
        throw authError;
      }
      
      console.log('Session exchange successful');
    } catch (error) {
      console.error('Error in auth callback:', error);
      return NextResponse.redirect(
        `${requestUrl.origin}/?error=${encodeURIComponent('Authentication error')}`
      );
    }
  }

  // Redirect to home page after successful sign-in
  return NextResponse.redirect(new URL(safeRedirectPath, requestUrl.origin));
}
