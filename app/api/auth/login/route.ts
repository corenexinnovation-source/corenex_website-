import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Admin from '@/lib/models/Admin';
import { z } from 'zod';
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        console.log('Login request body:', body);

        // Validate input
        const result = loginSchema.safeParse(body);
        if (!result.success) {
            console.error('Login validation failed:', result.error.format());
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: result.error.issues.map(i => ({ path: i.path, message: i.message }))
                },
                { status: 400 }
            );
        }
        const validatedData = result.data;

        // Find admin user
        console.log('Finding user:', validatedData.email);
        const admin = await Admin.findOne({ email: validatedData.email });

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
            id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
        });

        // Set cookie
        console.log('Setting cookie');
        await setAuthCookie(token);

        return NextResponse.json({
            success: true,
            user: {
                id: admin._id.toString(),
                email: admin.email,
                name: admin.name,
            },
        });
    } catch (error: any) {
        console.error('Login error detailed:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0]?.message || 'Invalid input data' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal Server Error',
                details: error.message
            },
            { status: 500 }
        );
    }
}
