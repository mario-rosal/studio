import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// IMPORTANT: Hardcoding the secret for debugging.
// This is NOT recommended for production.
const SECRET_KEY = "e9b7a3e7-3e6e-4f7a-8f4b-2d3e1c5f7a9d";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
     // If user is authenticated and tries to access login/signup, redirect to dashboard
    if (sessionCookie) {
      try {
        const key = new TextEncoder().encode(SECRET_KEY);
        await jwtVerify(sessionCookie, key);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (error) {
        // Invalid token, allow access to public route
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Protected routes require a valid session
  if (sessionCookie === undefined) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const key = new TextEncoder().encode(SECRET_KEY);
    await jwtVerify(sessionCookie, key);
    // If token is valid, continue to the requested page
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    console.error('Invalid session token:', error);
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session'); // Clear the invalid cookie
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
