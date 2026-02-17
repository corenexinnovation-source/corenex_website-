export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ContactMessage from '@/lib/models/ContactMessage';
import { getCurrentUser } from '@/lib/auth';

// GET all contact messages (admin only)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const messages = await ContactMessage.find().sort({ createdAt: -1 });

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
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id, read } = await request.json();
        console.log('Updating message:', id, { read });

        const message = await ContactMessage.findByIdAndUpdate(
            id,
            { read },
            { new: true }
        );

        if (!message) {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(message);
    } catch (error: any) {
        console.error('Update message error:', error);
        return NextResponse.json(
            { error: 'Failed to update message', details: error.message },
            { status: 400 }
        );
    }
}

// DELETE message (admin only)
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
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

        console.log('Deleting message:', id);
        const deletedMessage = await ContactMessage.findByIdAndDelete(id);

        if (!deletedMessage) {
            return NextResponse.json(
                { error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Delete message error:', error);
        return NextResponse.json(
            { error: 'Failed to delete message', details: error.message },
            { status: 400 }
        );
    }
}
