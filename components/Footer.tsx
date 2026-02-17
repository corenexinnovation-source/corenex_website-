import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Twitch as Tiktok } from 'lucide-react';
import Image from 'next/image';
import { PiTiktokLogoLight } from "react-icons/pi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                    {/* Brand & Socials */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold tracking-tight">
                                <span className="text-gray-900 dark:text-white">CORENEX</span>{' '}
                                <span className="text-primary-600 dark:text-primary-400">INNOVATIONS</span>
                            </span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                            Professional IT solutions for modern businesses. We deliver excellence in web development, mobile apps, design, and IT consulting to help your business grow.
                        </p>
                        <div className="flex items-center space-x-5 pt-2">
                            <a href="https://www.facebook.com/people/CoreNex-Innovation/61582778909243/#" target="_blank" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/corenex-innovations/" target="_blank" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/corenexinnovations?igsh=dnA0dXhpNjZ3NGZi" target="_blank" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.tiktok.com/@corenex.innovatio?_r=1&_t=ZS-93u5q4pSF2A" target="_blank" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-all">
                                <PiTiktokLogoLight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-primary-50 dark:bg-white/5 text-primary-600 dark:text-primary-400">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">+92 (312) 7002606</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Support Number</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-primary-50 dark:bg-white/5 text-primary-600 dark:text-primary-400">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">corenexinnovation@gmail.com</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Support Email</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-primary-50 dark:bg-white/5 text-primary-600 dark:text-primary-400">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">Lahore, Pakistan</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Address</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:pl-10">
                        <h4 className="text-xl font-bold mb-8 text-gray-900 dark:text-white">Pages</h4>
                        <ul className="grid grid-cols-1 gap-4">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'About Us', href: '/about' },
                                { name: 'Services', href: '/services' },
                                { name: 'Portfolio', href: '/portfolio' },
                                { name: 'Contact', href: '/contact' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors duration-200 text-lg flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary-600 dark:bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 mt-16 pt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-500 text-sm font-medium tracking-wide">
                        &copy; {currentYear}, All Rights Reserved by CORENEX INNOVATIONS
                    </p>
                </div>
            </div>
        </footer>
    );
}
