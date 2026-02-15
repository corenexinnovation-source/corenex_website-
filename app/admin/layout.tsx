'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    FolderKanban,
    Briefcase,
    Mail,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have utility for class merging, otherwise I can use template literals

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
        { name: 'Services', href: '/admin/services', icon: Briefcase },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            {/* Sidebar */}
            {pathname !== '/admin/login' && (
                <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 
                border-r border-gray-200 dark:border-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0
            `}>
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
                            <Link href="/admin/dashboard" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    C
                                </div>
                                <span className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                    CORENEX
                                </span>
                            </Link>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                            <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Menu
                            </div>
                            {navigation.map((item) => {
                                const isActive = pathname === item.href; // Exact match might need adjustment for sub-routes
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)} // Close on mobile click
                                        className={`
                                        group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                        ${isActive
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                                            }
                                    `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'}`} />
                                            <span>{item.name}</span>
                                        </div>
                                        {isActive && <ChevronRight className="w-4 h-4 text-primary-500" />}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Footer / User Profile */}
                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                            >
                                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Mobile Header */}
                {pathname !== '/admin/login' && (
                    <header className="md:hidden h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sticky top-0 z-30">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 -ml-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-semibold text-gray-800 dark:text-white">Dashboard</span>
                        <div className="w-10" /> {/* Spacer for centering if needed */}
                    </header>
                )}

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 dark:bg-gray-950 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto animate-fadeIn">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
