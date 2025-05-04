import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const token = request.cookies.get('token')?.value

  // 🔐 Protect management routes: if no token, redirect to sign-in
  if (url.pathname.startsWith('/management') && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // 🔁 If at root path, redirect based on token presence
  if (url.pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/management/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  // ✅ Allow other routes to continue
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/management/:path*'], // Apply middleware to root and all /management/* routes
}