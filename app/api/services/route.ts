import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Service from '@/lib/models/Service';
import { getCurrentUser } from '@/lib/auth';
import { serviceSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

// GET services (active for public, all for admin)
export async function GET() {
    try {
        await dbConnect();
        const user = await getCurrentUser();

        let query = { active: true };
        if (user) {
            query = {} as any; // All services for admin
        }

        const services = await Service.find(query).sort({ order: 1 });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}

// POST create service (admin only)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const validatedData = serviceSchema.parse(body);
        const service = await Service.create(validatedData);

        return NextResponse.json(service, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to create service' }, { status: 400 });
    }
}

// PUT update service (admin only)
export async function PUT(request: NextRequest) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { id, ...data } = body;
        const validatedData = serviceSchema.parse(data);

        const service = await Service.findByIdAndUpdate(id, validatedData, { new: true });
        return NextResponse.json(service);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update service' }, { status: 400 });
    }
}

// DELETE service (admin only)
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Service ID required' }, { status: 400 });

        await Service.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to delete service' }, { status: 400 });
    }
}
