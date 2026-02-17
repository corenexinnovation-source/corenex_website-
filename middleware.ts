import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Handle CORS preflight requests
    if (pathname.startsWith('/api')) {
        if (request.method === 'OPTIONS') {
            const response = new NextResponse(null, { status: 204 });
            const origin = request.headers.get('origin');
            if (origin) {
                response.headers.set('Access-Control-Allow-Origin', origin);
            } else {
                response.headers.set('Access-Control-Allow-Origin', '*');
            }
            response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            response.headers.set('Access-Control-Allow-Credentials', 'true');
            response.headers.set('Access-Control-Max-Age', '86400');
            return response;
        }
    }

    // Protect admin routes (except login page)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('auth-token');

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token.value, JWT_SECRET);
            // Allow normalized response below
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

    const response = NextResponse.next();

    // Add CORS headers to all API responses
    if (pathname.startsWith('/api')) {
        const origin = request.headers.get('origin');
        if (origin) {
            response.headers.set('Access-Control-Allow-Origin', origin);
        } else {
            response.headers.set('Access-Control-Allow-Origin', '*');
        }
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};
