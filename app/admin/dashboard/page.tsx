'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FolderKanban, Mail, Briefcase, MailOpen, ArrowRight } from 'lucide-react';

interface Stats {
    totalProjects: number;
    totalMessages: number;
    unreadMessages: number;
    totalServices: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalProjects: 0,
        totalMessages: 0,
        unreadMessages: 0,
        totalServices: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Projects',
            value: stats.totalProjects,
            icon: FolderKanban,
            color: 'from-blue-500 to-blue-600',
            href: '/admin/projects',
        },
        {
            title: 'Total Messages',
            value: stats.totalMessages,
            icon: Mail,
            color: 'from-green-500 to-green-600',
            href: '/admin/messages',
        },
        {
            title: 'Unread Messages',
            value: stats.unreadMessages,
            icon: MailOpen,
            color: 'from-orange-500 to-orange-600',
            href: '/admin/messages',
        },
        {
            title: 'Active Services',
            value: stats.totalServices,
            icon: Briefcase,
            color: 'from-purple-500 to-purple-600',
            href: '/admin/services',
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome to CORENEX Admin Panel</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                </div>
            ) : (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((card, index) => (
                            <Link
                                key={index}
                                href={card.href}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                                        <card.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </div>
                                <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{card.title}</h3>
                                <p className="text-3xl font-bold">{card.value}</p>
                            </Link>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                href="/admin/projects"
                                className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                            >
                                <FolderKanban className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                                <h3 className="font-semibold mb-1">Manage Projects</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Add, edit, or delete projects</p>
                            </Link>
                            <Link
                                href="/admin/messages"
                                className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                            >
                                <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                                <h3 className="font-semibold mb-1">View Messages</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Check contact form submissions</p>
                            </Link>
                            <Link
                                href="/admin/services"
                                className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                            >
                                <Briefcase className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                                <h3 className="font-semibold mb-1">Manage Services</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Update service offerings</p>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
