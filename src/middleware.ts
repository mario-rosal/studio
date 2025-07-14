import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const isAuthenticated = (request: NextRequest) => {
  return request.cookies.has('auth_session');
}
 
export function middleware(request: NextRequest) {
  const isAuth = isAuthenticated(request);
  const { pathname } = request.nextUrl

  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If the user is authenticated and trying to access a public route (like login),
  // redirect them to the dashboard.
  if (isAuth && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If the user is not authenticated and trying to access a protected route,
  // redirect them to the login page.
  if (!isAuth && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  // Otherwise, allow the request to proceed.
  return NextResponse.next()
}
 
export const config = {
  // Match all routes except for API routes, static files, and images.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sql).*)'],
}
