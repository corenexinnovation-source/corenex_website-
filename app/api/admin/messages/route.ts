import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// GET all contact messages (admin only)
export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}

// PUT mark message as read (admin only)
export async function PUT(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id, read } = await request.json();

        const message = await prisma.contactMessage.update({
            where: { id },
            data: { read },
        });

        return NextResponse.json(message);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update message' },
            { status: 400 }
        );
    }
}

// DELETE message (admin only)
export async function DELETE(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Message ID required' },
                { status: 400 }
            );
        }

        await prisma.contactMessage.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 400 }
        );
    }
}
