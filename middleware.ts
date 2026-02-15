import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect admin routes (except login page)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('auth-token');

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token.value, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Redirect to dashboard if already logged in and accessing login page
    if (pathname === '/admin/login') {
        const token = request.cookies.get('auth-token');

        if (token) {
            try {
                await jwtVerify(token.value, JWT_SECRET);
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            } catch (error) {
                // Token invalid, continue to login
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
