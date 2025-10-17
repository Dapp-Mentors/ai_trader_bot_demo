import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  '/dashboard': ['user', 'admin'],
} as const

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Get raw cookie value
  const bot_user = request.cookies.get('bot_user')?.value || ''

  // Check if the route needs role-based protection
  const requiredRoles =
    PROTECTED_ROUTES[pathname as keyof typeof PROTECTED_ROUTES]

  if (requiredRoles) {
    if (!bot_user) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    try {
      // Parse the cookie to extract role
      const userData = JSON.parse(bot_user)
      const userRole = userData?.role

      // Ensure the user has one of the required roles for the route
      if (!requiredRoles.includes(userRole)) {
        // Redirect to a "unauthorized" page or home; adjust as needed
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch (error) {
      console.error('Middleware cookie parse error:', error) // Use error for prod logging
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// Static config - no more dynamic Object.keys
export const config = {
  matcher: '/dashboard', // Or ['/dashboard/:path*'] if you want subroutes
}
