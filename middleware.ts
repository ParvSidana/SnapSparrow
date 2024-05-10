import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
 
const isProtectedRoute = createRouteMatcher([
  '/',
  '/dashboard(.*)',
  '/forum(.*)',
]);

const isPublicRoute = (path: string) => path === '/api/webhooks/(.*)';

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req) && !isPublicRoute(req.url)) {
    auth().protect();
  }
});
 
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
