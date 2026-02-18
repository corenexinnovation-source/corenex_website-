import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Admin from '@/lib/models/Admin';
import { getCurrentUser, hashPassword } from '@/lib/auth';
import { adminSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

// GET all admins (admin only)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const admins = await Admin.find({}, '-password').sort({ createdAt: -1 });
        return NextResponse.json(admins);
    } catch (error: any) {
        console.error('Fetch admins error:', error);
        return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
    }
}

// POST create new admin (admin only)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = adminSchema.parse(body);

        // Check if email already exists
        const existingAdmin = await Admin.findOne({ email: validatedData.email });
        if (existingAdmin) {
            return NextResponse.json({ error: 'Admin with this email already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await hashPassword(validatedData.password);

        // Create admin
        const newAdmin = await Admin.create({
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
        });

        // Return without password
        const { password, ...adminWithoutPassword } = newAdmin.toObject();

        return NextResponse.json(adminWithoutPassword, { status: 201 });
    } catch (error: any) {
        console.error('Create admin error:', error);
        if (error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
    }
}

// DELETE admin (admin only)
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Admin ID required' }, { status: 400 });
        }

        // Prevent self-deletion if needed, or at least ensure at least one admin remains
        const adminCount = await Admin.countDocuments();
        if (adminCount <= 1) {
            return NextResponse.json({ error: 'Cannot delete the last admin' }, { status: 400 });
        }

        await Admin.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Delete admin error:', error);
        return NextResponse.json({ error: 'Failed to delete admin' }, { status: 500 });
    }
}
