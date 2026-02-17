'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FolderKanban, Mail, Briefcase, MailOpen, ArrowRight, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

interface Stats {
    totalProjects: number;
    totalMessages: number;
    unreadMessages: number;
    totalServices: number;
    categories: Array<{ name: string, value: number }>;
    trendData: Array<{ name: string, messages: number, projects: number }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalProjects: 0,
        totalMessages: 0,
        unreadMessages: 0,
        totalServices: 0,
        categories: [],
        trendData: [],
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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-gray-600 dark:text-gray-400">Real-time performance metrics and activity</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live Data
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                </div>
            ) : (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((card, index) => (
                            <Link
                                key={index}
                                href={card.href}
                                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md p-6 transition-all transform hover:-translate-y-1 group border border-gray-100 dark:border-gray-800"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg shadow-blue-500/20`}>
                                        <card.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                                </div>
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
                                <p className="text-3xl font-bold tracking-tight">{card.value}</p>
                            </Link>
                        ))}
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Bar Chart - Activity Trend */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <TrendingUp className="w-5 h-5 text-primary-500" />
                                <h2 className="text-lg font-bold">Activity Trends</h2>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.trendData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            cursor={{ fill: '#f3f4f6', radius: 8 }}
                                        />
                                        <Bar dataKey="messages" name="Messages" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={20} />
                                        <Bar dataKey="projects" name="Projects" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pie Chart - Project Categories */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <PieIcon className="w-5 h-5 text-primary-500" />
                                <h2 className="text-lg font-bold">Project Mix</h2>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.categories && stats.categories.length > 0 ? stats.categories : [{ name: 'Empty', value: 1 }]}
                                            cx="50%"
                                            cy="45%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {(stats.categories || []).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                            {(!stats.categories || stats.categories.length === 0) && <Cell fill="#f3f4f6" />}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
                        <h2 className="text-xl font-bold mb-6">Operations Center</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'Manage Projects', desc: 'Add or showcase your work', href: '/admin/projects', icon: FolderKanban, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
                                { title: 'View Messages', desc: 'Check customer inquiries', href: '/admin/messages', icon: Mail, color: 'bg-green-50 text-green-600 dark:bg-green-900/20' },
                                { title: 'Manage Services', desc: 'Update business offerings', href: '/admin/services', icon: Briefcase, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    className="group p-6 border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-lg transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                        <action.icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{action.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
