export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Project from '@/lib/models/Project';
import ContactMessage from '@/lib/models/ContactMessage';
import Service from '@/lib/models/Service';
import { getCurrentUser } from '@/lib/auth';

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

        const [totalProjects, totalMessages, unreadMessages, totalServices, projectsByCategory] = await Promise.all([
            Project.countDocuments(),
            ContactMessage.countDocuments(),
            ContactMessage.countDocuments({ read: false }),
            Service.countDocuments({ active: true }),
            Project.aggregate([
                { $group: { _id: '$category', count: { $sum: 1 } } }
            ]),
        ]);

        // Simple monthly message history (last 6 months)
        const categories = projectsByCategory.map(c => ({ name: c._id || 'Uncategorized', value: c.count }));

        return NextResponse.json({
            totalProjects,
            totalMessages,
            unreadMessages,
            totalServices,
            categories,
            // Sample trend data for charts
            trendData: [
                { name: 'Jan', messages: 4, projects: 1 },
                { name: 'Feb', messages: 7, projects: 2 },
                { name: 'Mar', messages: 5, projects: 3 },
                { name: 'Apr', messages: 12, projects: 4 },
                { name: 'May', messages: totalMessages || 0, projects: totalProjects || 0 },
            ]
        });
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
