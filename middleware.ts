import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
export default auth((req) => {
  const { userId } = req.auth;
  const isPublicRoute = ['/', '/sign-in(.*)', '/sign-up(.*)'].some(
    (path) => new RegExp(`^${path}$`).test(req.nextUrl.pathname)
  );

  // If the user is not signed in and the current path is not public, redirect to sign-in
  if (!userId && !isPublicRoute) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
