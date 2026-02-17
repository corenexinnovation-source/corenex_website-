import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Project from '@/lib/models/Project';
import { getCurrentUser } from '@/lib/auth';
import { projectSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

// GET all projects (public)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const query = category ? { category } : {};
        const projects = await Project.find(query)
            .sort({ featured: -1, createdAt: -1 });

        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST create project (admin only)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        // Check authentication
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedData = projectSchema.parse(body);

        const project = await Project.create(validatedData);

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 400 }
        );
    }
}
