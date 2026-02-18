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

        // Calculate real trend data for the last 6 months
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const trendData = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const month = date.getMonth();
            const year = date.getFullYear();

            const startOfMonth = new Date(year, month, 1);
            const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

            const [mCount, pCount] = await Promise.all([
                ContactMessage.countDocuments({ createdAt: { $gte: startOfMonth, $lte: endOfMonth } }),
                Project.countDocuments({ createdAt: { $gte: startOfMonth, $lte: endOfMonth } })
            ]);

            trendData.push({
                name: monthNames[month],
                messages: mCount,
                projects: pCount
            });
        }

        const categories = projectsByCategory.map(c => ({ name: c._id || 'Uncategorized', value: c.count }));

        return NextResponse.json({
            totalProjects,
            totalMessages,
            unreadMessages,
            totalServices,
            categories,
            trendData
        });
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
