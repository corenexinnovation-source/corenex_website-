import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = loginSchema.parse(body);

        // Find admin user
        console.log('Finding user:', validatedData.email);
        const admin = await prisma.admin.findUnique({
            where: { email: validatedData.email },
        });

        if (!admin) {
            console.log('User not found');
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        console.log('Verifying password');
        const isValid = await verifyPassword(validatedData.password, admin.password);

        if (!isValid) {
            console.log('Invalid password');
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        console.log('Generating token');
        const token = await generateToken({
            id: admin.id,
            email: admin.email,
            name: admin.name,
        });

        // Set cookie
        console.log('Setting cookie');
        await setAuthCookie(token);

        return NextResponse.json({
            success: true,
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
            },
        });
    } catch (error: any) {
        console.error('Login error detailed:', error);
        return NextResponse.json(
            { error: error.message || 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
