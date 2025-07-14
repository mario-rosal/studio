import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This is a placeholder for a real authentication check.
// In a real app, you would check a session cookie, a JWT, or use NextAuth.js.
const isAuthenticated = (request: NextRequest) => {
  // For this demo, let's assume a user is authenticated if a specific
  // cookie is present. The login action should set this.
  // This is NOT secure for production.
  return request.cookies.has('auth_session');
}
 
export function middleware(request: NextRequest) {
  const isAuth = isAuthenticated(request);
  const { pathname } = request.nextUrl

  // If user is authenticated and tries to access login/signup, redirect to dashboard
  if (isAuth && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is not authenticated and tries to access a protected route, redirect to login
  if (!isAuth && !pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  return NextResponse.next()
}
 
export const config = {
  // Matcher to specify which routes the middleware should run on.
  // This covers all routes except for API routes, Next.js internals, and static files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
