import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify, type JWTPayload as JoseJWTPayload } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export interface JWTPayload extends JoseJWTPayload {
    id: string;
    email: string;
    name: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export async function generateToken(payload: JWTPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as JWTPayload;
    } catch (error) {
        return null;
    }
}

// Get current user from cookie
export async function getCurrentUser(): Promise<JWTPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
        return null;
    }

    return verifyToken(token.value);
}

// Set auth cookie
export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

// Clear auth cookie
export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
}
