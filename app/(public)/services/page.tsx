import { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import AnimationWrapper from '@/components/AnimationWrapper';

export const metadata: Metadata = {
    title: 'Our Services - CORENEX INNOVATIONS',
    description: 'Professional IT services including web development, mobile apps, graphic design, and IT consulting',
};

const services = [
    {
        image: '/images/web-development.jpg',
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js. We create responsive, fast, and user-friendly websites that drive business growth.',
        features: [
            'Responsive Design',
            'E-commerce Solutions',
            'CMS Integration',
            'Progressive Web Apps',
            'Performance Optimization',
            'SEO Best Practices',
        ],
    },
    {
        image: '/images/app-development.jpg',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android. Beautiful, intuitive apps that users love, built with React Native, Flutter, or native technologies.',
        features: [
            'iOS & Android Development',
            'React Native & Flutter',
            'UI/UX Design',
            'API Integration',
            'App Store Deployment',
            'Maintenance & Support',
        ],
    },
    {
        image: '/images/-graphic-design.jpg',
        title: 'Graphic Design',
        description: 'Professional graphic design services including branding, logos, marketing materials, and visual identity. We bring your brand vision to life with creative designs.',
        features: [
            'Logo Design',
            'Brand Identity',
            'Marketing Materials',
            'UI/UX Design',
            'Social Media Graphics',
            'Print Design',
        ],
    },
    {
        image: '/images/it-consulting.jpg',
        title: 'IT Consulting',
        description: 'Strategic IT consulting to help businesses leverage technology for growth. From infrastructure to digital transformation, we provide expert guidance.',
        features: [
            'Technology Strategy',
            'Digital Transformation',
            'Cloud Solutions',
            'Security Consulting',
            'IT Infrastructure',
            'Process Optimization',
        ],
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimationWrapper animation="fade" className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                        <p className="text-xl text-purple-100">
                            Comprehensive IT solutions tailored to your business needs
                        </p>
                    </AnimationWrapper>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-20">
                        {services.map((service, index) => (
                            <AnimationWrapper
                                key={index}
                                animation={index % 2 === 0 ? "slideRight" : "slideLeft"}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`relative h-64 lg:h-96 rounded-xl overflow-hidden shadow-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </AnimationWrapper>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <AnimationWrapper animation="scale">
                        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                            Let's discuss how our services can help your business grow
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all transform hover:scale-105"
                        >
                            Contact Us Today
                        </a>
                    </AnimationWrapper>
                </div>
            </section>
        </div>
    );
}
