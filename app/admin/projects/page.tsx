'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Project {
    _id: string;
    title: string;
    description: string;
    category: string;
    featured: boolean;
    technologies: string[];
    images: string[];
    createdAt: string;
}

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProjects(projects.filter(p => p._id !== id));
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Projects</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your portfolio projects</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Project
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Technologies</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {projects.map((project: any) => (
                                    <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {project.images && project.images[0] && (
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                                        <img
                                                            src={project.images[0]}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white">{project.title}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">
                                                        {project.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.slice(0, 2).map((tech: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 2 && (
                                                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">
                                                        +{project.technologies.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.featured ? (
                                                <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Regular</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={`/admin/projects/${project._id}/edit`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
