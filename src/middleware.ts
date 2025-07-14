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

  if (isAuth && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!isAuth && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
