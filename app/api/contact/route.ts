import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = contactSchema.parse(body);

        // Save to database
        const message = await prisma.contactMessage.create({
            data: validatedData,
        });

        // Send email notification
        const emailSent = await sendContactEmail(validatedData);

        if (!emailSent) {
            console.warn('Email notification failed, but message was saved');
        }

        return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully!',
        }, { status: 201 });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 400 }
        );
    }
}
