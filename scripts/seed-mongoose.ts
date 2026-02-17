import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config(); // Fallback to .env

const MONGODB_URI = process.env.DATABASE_URL!;

if (!MONGODB_URI) {
    console.error('❌ Error: DATABASE_URL not found in environment variables');
    process.exit(1);
}

// Define Schemas directly in seed script to avoid complex imports if needed, 
// but using the existing models is better if they are compatible with tsx.
import Admin from '../lib/models/Admin';
import Project from '../lib/models/Project';
import Service from '../lib/models/Service';

async function main() {
    console.log('🌱 Starting database seed with Mongoose...');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Create admin user
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@corenexinnovations.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

        const hashedPassword = await bcrypt.hash(adminPassword, 12);

        await Admin.findOneAndUpdate(
            { email: adminEmail },
            {
                email: adminEmail,
                password: hashedPassword,
                name: 'Admin User',
            },
            { upsert: true, new: true }
        );

        console.log('✅ Created/Updated admin user:', adminEmail);

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

        for (const serviceData of services) {
            await Service.findOneAndUpdate(
                { title: serviceData.title },
                serviceData,
                { upsert: true, new: true }
            );
        }

        console.log('✅ Created/Updated default services');

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

        for (const projectData of projects) {
            await Project.findOneAndUpdate(
                { title: projectData.title },
                projectData,
                { upsert: true, new: true }
            );
        }

        console.log('✅ Created/Updated sample projects');
        console.log('🎉 Database seeded successfully with Mongoose!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
    }
}

main();
