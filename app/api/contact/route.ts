import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ContactMessage from '@/lib/models/ContactMessage';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';
import { z } from 'zod';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        // Debug logging (standard console is visible in Vercel logs)
        console.log(`[${new Date().toISOString()}] Body:`, body);

        const result = contactSchema.safeParse(body);

        if (!result.success) {
            console.error('Validation failed:', result.error.format());
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: result.error.issues.map(i => ({ path: i.path, message: i.message }))
                },
                { status: 400 }
            );
        }

        const validatedData = result.data;

        // Save to database
        await ContactMessage.create(validatedData);

        // Send email notification
        const emailSent = await sendContactEmail(validatedData);

        if (!emailSent) {
            console.warn('Email notification failed, but message was saved');
        }

        return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully!',
        }, { status: 201 });
    } catch (error: any) {
        console.error('Contact form error detail:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: error.issues
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal Server Error',
                details: error.message
            },
            { status: 500 }
        );
    }
}
