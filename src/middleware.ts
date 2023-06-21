// eslint-disable-next-line no-restricted-exports
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/trips/:path*',
    '/favorites/:path*',
    '/reservations/:path*',
    '/properties/:path*',
  ],
};
