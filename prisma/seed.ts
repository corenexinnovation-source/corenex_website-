import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@corenexinnovations.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.admin.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedPassword,
        },
        create: {
            email: adminEmail,
            password: hashedPassword,
            name: 'Admin User',
        },
    });

    console.log('✅ Created admin user:', admin.email);

    // Create default services
    const services = [
        {
            title: 'Web Development',
            description: 'Custom web applications built with modern technologies. We create responsive, fast, and user-friendly websites that drive business growth.',
            icon: 'Code',
            features: [
                'Responsive Design',
                'Modern Frameworks (React, Next.js)',
                'E-commerce Solutions',
                'CMS Integration',
                'Performance Optimization',
            ],
            order: 1,
        },
        {
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications for iOS and Android. Beautiful, intuitive apps that users love.',
            icon: 'Smartphone',
            features: [
                'iOS & Android Development',
                'React Native & Flutter',
                'UI/UX Design',
                'API Integration',
                'App Store Deployment',
            ],
            order: 2,
        },
        {
            title: 'Graphic Design',
            description: 'Professional graphic design services including branding, logos, marketing materials, and visual identity.',
            icon: 'Palette',
            features: [
                'Logo Design',
                'Brand Identity',
                'Marketing Materials',
                'UI/UX Design',
                'Social Media Graphics',
            ],
            order: 3,
        },
        {
            title: 'IT Consulting',
            description: 'Strategic IT consulting to help businesses leverage technology for growth. From infrastructure to digital transformation.',
            icon: 'Lightbulb',
            features: [
                'Technology Strategy',
                'Digital Transformation',
                'Cloud Solutions',
                'Security Consulting',
                'IT Infrastructure',
            ],
            order: 4,
        },
    ];

    for (const service of services) {
        await prisma.service.upsert({
            where: { id: service.title.toLowerCase().replace(/\s+/g, '-') },
            update: {},
            create: service,
        });
    }

    console.log('✅ Created default services');

    // Create sample projects
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform with payment integration, inventory management, and customer analytics. Built with Next.js and Stripe.',
            images: ['/images/projects/ecommerce.jpg'],
            technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
            clientName: 'TechStore Inc.',
            projectLink: 'https://example.com',
            category: 'Web Development',
            featured: true,
        },
        {
            title: 'Healthcare Mobile App',
            description: 'Mobile application for healthcare providers to manage patient appointments, medical records, and telemedicine consultations.',
            images: ['/images/projects/healthcare.jpg'],
            technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
            clientName: 'HealthCare Plus',
            category: 'Mobile App',
            featured: true,
        },
        {
            title: 'Corporate Branding',
            description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines for a fintech startup.',
            images: ['/images/projects/branding.jpg'],
            technologies: ['Adobe Illustrator', 'Figma', 'Photoshop'],
            clientName: 'FinTech Solutions',
            category: 'Design',
            featured: false,
        },
    ];

    for (const project of projects) {
        await prisma.project.create({
            data: project,
        });
    }

    console.log('✅ Created sample projects');
    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
