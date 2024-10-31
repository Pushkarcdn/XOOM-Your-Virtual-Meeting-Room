/* eslint-disable @typescript-eslint/no-explicit-any */
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoute = createRouteMatcher([
    '/',
    '/upcoming',
    '/meeting(.*)',
    '/previous',
    '/recordings',
    '/personal-room',
]);

export default clerkMiddleware(async (auth, req) => {
    if (protectedRoute(req)) {
        const authData = await auth()
        console.log(authData)
        if (!authData?.userId) authData?.redirectToSignIn()
    }
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
