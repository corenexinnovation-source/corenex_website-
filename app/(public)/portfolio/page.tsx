'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink, X } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';

interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    technologies: string[];
    clientName?: string;
    projectLink?: string;
    category: string;
    featured: boolean;
    createdAt: string;
}

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Web Development', 'Mobile App', 'Design', 'IT Consulting'];

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            if (Array.isArray(data)) {
                setProjects(data);
            } else {
                console.error('Projects data is not an array:', data);
                setProjects([]);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimationWrapper animation="fade" className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
                        <p className="text-xl text-purple-100">
                            Explore our latest projects and success stories
                        </p>
                    </AnimationWrapper>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimationWrapper animation="slideUp" duration={0.3} className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </AnimationWrapper>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-600 dark:text-gray-400">No projects found in this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <AnimationWrapper
                                    key={project.id}
                                    animation="scale"
                                    delay={index * 0.1}
                                    className="h-full"
                                >
                                    <div
                                        onClick={() => setSelectedProject(project)}
                                        className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 duration-300 h-full"
                                    >
                                        <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500">
                                            {project.images[0] && (
                                                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
                                                    {project.title.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                                                    {project.category}
                                                </span>
                                                {project.featured && (
                                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 3).map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                                        +{project.technologies.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </AnimationWrapper>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75" onClick={() => setSelectedProject(null)}>
                    <AnimationWrapper animation="scale" duration={0.3} className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" >
                        <div onClick={(e) => e.stopPropagation()}>
                            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="mb-6">
                                    <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                                        {selectedProject.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedProject.description}</p>

                                {selectedProject.clientName && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold mb-2">Client</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{selectedProject.clientName}</p>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <h3 className="font-semibold mb-2">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {selectedProject.projectLink && (
                                    <a
                                        href={selectedProject.projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                    >
                                        View Project
                                        <ExternalLink className="ml-2 w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </AnimationWrapper>
                </div>
            )}
        </div>
    );
}
