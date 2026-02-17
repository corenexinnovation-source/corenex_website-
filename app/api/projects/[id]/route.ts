import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Project from '@/lib/models/Project';
import { getCurrentUser } from '@/lib/auth';
import { projectSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

// GET single project
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const project = await Project.findById(id);

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}

// PUT update project (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const validatedData = projectSchema.parse(body);

        const project = await Project.findByIdAndUpdate(
            id,
            validatedData,
            { new: true }
        );

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 400 }
        );
    }
}

// DELETE project (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        await Project.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 400 }
        );
    }
}
