import { z } from 'zod';

// Login validation
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Contact form validation
export const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(2, 'Subject must be at least 2 characters').max(200),
    message: z.string().min(5, 'Message must be at least 5 characters').max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Project validation
export const projectSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
    technologies: z.array(z.string()).min(1, 'At least one technology is required'),
    clientName: z.string().optional(),
    projectLink: z.string().url().optional().or(z.literal('')),
    category: z.string().min(1, 'Category is required'),
    featured: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// Service validation
export const serviceSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    icon: z.string().min(1, 'Icon is required'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    active: z.boolean().default(true),
    order: z.number().int().min(0).default(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

// Sanitize HTML to prevent XSS
export function sanitizeHtml(text: string): string {
    return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}
