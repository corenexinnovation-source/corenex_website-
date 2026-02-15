import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const [totalProjects, totalMessages, unreadMessages, totalServices] = await Promise.all([
            prisma.project.count(),
            prisma.contactMessage.count(),
            prisma.contactMessage.count({ where: { read: false } }),
            prisma.service.count({ where: { active: true } }),
        ]);

        return NextResponse.json({
            totalProjects,
            totalMessages,
            unreadMessages,
            totalServices,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
