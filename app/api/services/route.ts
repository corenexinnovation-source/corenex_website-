import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { serviceSchema } from '@/lib/validation';

// GET all services (public - only active ones)
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        });

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
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedData = serviceSchema.parse(body);

        const service = await prisma.service.create({
            data: validatedData,
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 400 }
        );
    }
}

// PUT update service (admin only)
export async function PUT(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { id, ...data } = body;
        const validatedData = serviceSchema.parse(data);

        const service = await prisma.service.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 400 }
        );
    }
}
