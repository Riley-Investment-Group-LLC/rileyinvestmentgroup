export { default } from 'next-auth/middleware'

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
