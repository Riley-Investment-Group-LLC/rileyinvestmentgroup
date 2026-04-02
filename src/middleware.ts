import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token && token.email?.endsWith('@rileyinvestmentgroup.com')
      },
    },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
    },
  }
)

export const config = {
  matcher: [
    '/',
    '/invoices/:path*',
    '/purchases/:path*',
    '/products/:path*',
    '/customers/:path*',
    '/reports/:path*',
    '/bank/:path*',
  ],
}
