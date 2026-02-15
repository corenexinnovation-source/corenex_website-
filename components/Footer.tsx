import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Twitch as Tiktok } from 'lucide-react';
import Image from 'next/image';
import { PiTiktokLogoLight } from "react-icons/pi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="relative w-40 h-40 -ml-4 mb-2">
                            <Image
                                src="/images/icon.png"
                                alt="CORENEX INNOVATIONS"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Professional IT solutions for modern businesses. We deliver excellence in web development, mobile apps, design, and IT consulting.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/people/CoreNex-Innovation/61582778909243/#" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                <Facebook className="w-7 h-7" />
                            </a>
                            <a href="https://www.linkedin.com/company/corenex-innovations/" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                <Linkedin className="w-7 h-7" />
                            </a>
                            <a href="https://www.instagram.com/corenexinnovations?igsh=dnA0dXhpNjZ3NGZi" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                <Instagram className="w-7 h-7" />
                            </a>
                            <a href="https://www.tiktok.com/@corenex.innovatio?_r=1&_t=ZS-93u5q4pSF2A" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                <PiTiktokLogoLight className="w-7 h-7" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="group relative text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit block">
                                    <span>Home</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="group relative text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit block">
                                    <span>About Us</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="group relative text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit block">
                                    <span>Services</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="group relative text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit block">
                                    <span>Portfolio</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="group relative text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit block">
                                    <span>Contact</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <Link href="mailto:[EMAIL_ADDRESS]" className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">corenexinnovation@gmail.com</span>
                            </Link>
                            <Link href="tel:+923127002606" className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">+92 (312) 7002606</span>
                            </Link>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>&copy; {currentYear} CORENEX INNOVATIONS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
