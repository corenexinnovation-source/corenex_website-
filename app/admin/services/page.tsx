'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface Service {
    _id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    order: number;
    active: boolean;
}

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Code',
        features: '',
        order: 0,
        active: true,
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (service?: Service) => {
        if (service) {
            setEditingService(service);
            setFormData({
                title: service.title,
                description: service.description,
                icon: service.icon,
                features: service.features.join('\n'),
                order: service.order,
                active: service.active,
            });
        } else {
            setEditingService(null);
            setFormData({
                title: '',
                description: '',
                icon: 'Code',
                features: '',
                order: services.length + 1,
                active: true,
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            features: formData.features.split('\n').filter(sub => sub.trim() !== ''),
            id: editingService?._id,
        };

        try {
            const response = await fetch('/api/services', {
                method: editingService ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                fetchServices();
                setIsModalOpen(false);
            } else {
                const error = await response.json();
                alert(error.error || 'Operation failed');
            }
        } catch (error) {
            console.error('Error saving service:', error);
        }
    };

    const deleteService = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const response = await fetch(`/api/services?id=${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchServices();
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Services</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your business service offerings</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all shadow-md font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Service
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 flex flex-col group hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400`}>
                                    <div className="font-bold text-xs uppercase tracking-wider mb-1 opacity-50">Icon: {service.icon}</div>
                                    <span className="text-2xl">✨</span>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleOpenModal(service)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteService(service._id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                                    {service.active ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-red-500" />
                                    )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                    {service.description}
                                </p>
                                <div className="space-y-1">
                                    {service.features.slice(0, 3).map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                            <div className="w-1 h-1 rounded-full bg-primary-500"></div>
                                            {feature}
                                        </div>
                                    ))}
                                    {service.features.length > 3 && (
                                        <p className="text-[10px] text-gray-400 pl-3">+{service.features.length - 3} more...</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="text-xs font-semibold text-gray-400 uppercase">Order: {service.order}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight ${service.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {service.active ? 'Active' : 'Hidden'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                            <h2 className="text-xl font-bold">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                        placeholder="Web Development"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Icon Name (Lucide)</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                        placeholder="Code, Smartphone, Palette, etc."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder="Enter service description..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Features (one per line)</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Display Order</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-2 flex flex-col justify-end">
                                    <label className="flex items-center gap-3 cursor-pointer p-2 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent hover:border-gray-200 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={formData.active}
                                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                            className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Show on Website</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-lg font-bold"
                                >
                                    {editingService ? 'Save Changes' : 'Create Service'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all font-bold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
