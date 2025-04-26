import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Redirect root path to /management/dashboard
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/management/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/management/:path*'], // Apply middleware to these routes
}
