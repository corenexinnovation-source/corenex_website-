import { Metadata } from 'next';
import { Target, Users, Award, Rocket } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

export const metadata: Metadata = {
    title: 'About Us - CORENEX INNOVATIONS',
    description: 'Learn about CORENEX INNOVATIONS - your trusted IT solutions partner',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimationWrapper animation="fade" className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About CORENEX INNOVATIONS</h1>
                        <p className="text-xl text-purple-100">
                            Empowering businesses through innovative technology solutions since 2015
                        </p>
                    </AnimationWrapper>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimationWrapper animation="slideUp" className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                CORENEX INNOVATIONS was founded with a simple mission: to help businesses leverage technology to achieve their goals. What started as a small team of passionate developers has grown into a full-service IT company serving clients worldwide.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                We specialize in creating custom software solutions, from responsive websites and mobile applications to comprehensive IT consulting services. Our team combines technical expertise with creative thinking to deliver solutions that not only meet but exceed our clients' expectations.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                Today, we're proud to have completed over 100 successful projects, helping businesses of all sizes transform their digital presence and streamline their operations.
                            </p>
                        </div>
                    </AnimationWrapper>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <AnimationWrapper animation="slideRight" className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                            <Target className="w-12 h-12 text-primary-600 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                To deliver innovative, high-quality IT solutions that empower businesses to thrive in the digital age. We're committed to excellence, transparency, and building long-term partnerships with our clients.
                            </p>
                        </AnimationWrapper>
                        <AnimationWrapper animation="slideLeft" className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                            <Rocket className="w-12 h-12 text-secondary-600 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                To be the leading IT solutions provider, recognized for our innovation, reliability, and customer-centric approach. We envision a future where technology seamlessly enhances every aspect of business operations.
                            </p>
                        </AnimationWrapper>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimationWrapper animation="fade" className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Our Core Values</h2>
                    </AnimationWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Award,
                                title: 'Excellence',
                                description: 'We strive for excellence in every project, delivering solutions that exceed expectations.',
                            },
                            {
                                icon: Users,
                                title: 'Collaboration',
                                description: 'We work closely with our clients, fostering partnerships built on trust and communication.',
                            },
                            {
                                icon: Rocket,
                                title: 'Innovation',
                                description: 'We embrace new technologies and creative approaches to solve complex challenges.',
                            },
                        ].map((value, index) => (
                            <AnimationWrapper
                                key={index}
                                animation="scale"
                                delay={index * 0.2}
                                className="text-center p-6"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 mb-4">
                                    <value.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                            </AnimationWrapper>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
