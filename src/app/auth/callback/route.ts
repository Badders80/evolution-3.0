import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStorePromise = cookies();
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const redirectCookie = (await cookieStorePromise).get('auth_redirect_path')?.value;
  const redirectedFrom = requestUrl.searchParams.get('redirectedFrom') ?? redirectCookie;
  const safeRedirectPath =
    redirectedFrom && redirectedFrom.startsWith('/') ? redirectedFrom : '/mystable';

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
      const supabase = createRouteHandlerClient({ cookies: () => cookieStorePromise });
      
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
  const response = NextResponse.redirect(new URL(safeRedirectPath, requestUrl.origin));
  response.cookies.delete('auth_redirect_path');
  return response;
}
