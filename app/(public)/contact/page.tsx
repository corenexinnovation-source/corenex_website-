'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Link from 'next/link';
import AnimationWrapper from '@/components/AnimationWrapper';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                if (data.details && Array.isArray(data.details)) {
                    const messages = data.details.map((d: any) => `${d.path.join('.')}: ${d.message}`).join(', ');
                    setError(`Validation failed: ${messages}`);
                } else {
                    setError(data.error || data.message || 'Failed to send message');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimationWrapper animation="fade" className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
                        <p className="text-xl text-purple-100">
                            Have a project in mind? Let's discuss how we can help
                        </p>
                    </AnimationWrapper>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <AnimationWrapper animation="slideRight">
                            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Feel free to reach out to us through any of the following channels. We're here to help!
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Email</h3>
                                        <Link href="mailto:corenexinnovation@gmail.com">
                                            <p className="text-gray-600 dark:text-gray-400">corenexinnovation@gmail.com</p>
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Phone</h3>
                                        <Link href="tel:+923127002606">
                                            <p className="text-gray-600 dark:text-gray-400">+92 (312) 700-2606</p>
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Office</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Lahore, Pakistan
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-xl">
                                <h3 className="font-semibold mb-2">Business Hours</h3>
                                <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-600 dark:text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                                <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                            </div>
                        </AnimationWrapper>

                        {/* Contact Form */}
                        <AnimationWrapper animation="slideLeft">
                            <div className="bg-gray-50 dark:bg-gray-950 p-8 rounded-xl">
                                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                                {success && (
                                    <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
                                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                                    </div>
                                )}

                                {error && (
                                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="ml-2 w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </AnimationWrapper>
                    </div>
                </div>
            </section>
        </div>
    );
}
