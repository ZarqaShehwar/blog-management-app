import { NextRequest, NextResponse } from 'next/server'
const protectedRoutes = ['/dashboard']
const authBlockedRoutes = ['/login', '/signup']; 
 
export default async function proxy(req: NextRequest) {
   const { pathname } = req.nextUrl
  const isProtectedRoute = protectedRoutes.includes(pathname)
  const isAuthRoute = authBlockedRoutes.includes(pathname)
   const token = req.cookies.get('token')?.value;
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  if (
    isAuthRoute &&
    token &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return NextResponse.next()
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};