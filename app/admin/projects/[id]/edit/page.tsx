'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X, Plus, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Web Development',
        technologies: [] as string[],
        images: [] as string[],
        clientName: '',
        projectLink: '',
        featured: false,
    });

    const [newTech, setNewTech] = useState('');
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/projects/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    title: data.title,
                    description: data.description,
                    category: data.category || 'Web Development',
                    technologies: data.technologies || [],
                    images: data.images || [],
                    clientName: data.clientName || '',
                    projectLink: data.projectLink || '',
                    featured: data.featured || false,
                });
            } else {
                alert('Failed to fetch project details');
                router.push('/admin/projects');
            }
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTech = () => {
        if (newTech && !formData.technologies.includes(newTech)) {
            setFormData({ ...formData, technologies: [...formData.technologies, newTech] });
            setNewTech('');
        }
    };

    const removeTech = (tech: string) => {
        setFormData({ ...formData, technologies: formData.technologies.filter(t => t !== tech) });
    };

    const addImage = () => {
        if (newImage && !formData.images.includes(newImage)) {
            setFormData({ ...formData, images: [...formData.images, newImage] });
            setNewImage('');
        }
    };

    const removeImage = (url: string) => {
        setFormData({ ...formData, images: formData.images.filter(i => i !== url) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/admin/projects');
                router.refresh();
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to update project');
            }
        } catch (error) {
            console.error('Error updating project:', error);
            alert('An unexpected error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/projects"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Projects
                    </Link>
                    <h1 className="text-3xl font-bold">Edit Project</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 space-y-6">
                    {/* Same form grid as NewProjectPage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Project Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:border-primary-500 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:border-primary-500 focus:outline-none transition-all"
                            >
                                <option>Web Development</option>
                                <option>Mobile App</option>
                                <option>UI/UX Design</option>
                                <option>Graphic Design</option>
                                <option>IT Consulting</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:border-primary-500 focus:outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Client Name</label>
                            <input
                                type="text"
                                value={formData.clientName}
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:border-primary-500 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Project Link</label>
                            <input
                                type="url"
                                value={formData.projectLink}
                                onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:border-primary-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Technologies</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:border-primary-500 focus:outline-none transition-all"
                                placeholder="Add technology..."
                            />
                            <button
                                type="button"
                                onClick={addTech}
                                className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.technologies.map((tech) => (
                                <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium">
                                    {tech}
                                    <button type="button" onClick={() => removeTech(tech)} className="ml-2 hover:text-red-500">
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Project Images</label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:border-primary-500 focus:outline-none transition-all"
                                placeholder="Paste image URL..."
                            />
                            <button
                                type="button"
                                onClick={addImage}
                                className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                <Plus size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.images.map((url) => (
                                <div key={url} className="relative group aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                                    <img src={url} alt="Project Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(url)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary-400 transition-all">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="featured" className="font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                            Mark as Featured Project
                        </label>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : (
                            <>
                                <Save className="w-5 h-5 mr-2" />
                                Update Project
                            </>
                        )}
                    </button>
                    <Link
                        href="/admin/projects"
                        className="px-8 py-4 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
