'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, User, Mail, X, Loader2 } from 'lucide-react';

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
}

export default function AdminsPage() {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDev, setIsDev] = useState(false);

    // Form state
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch('/api/admin/users');
            if (response.ok) {
                const data = await response.json();
                setAdmins(data);
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setAdmins([data, ...admins]);
                setShowModal(false);
                setName('');
                setEmail('');
                setPassword('');
            } else {
                setError(data.error || 'Failed to create admin');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string, adminEmail: string) => {
        if (!confirm(`Are you sure you want to remove ${adminEmail} from admins?`)) return;

        try {
            const response = await fetch(`/api/admin/users?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAdmins(admins.filter(a => a._id !== id));
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete admin');
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Shield className="w-8 h-8 text-primary-600" />
                        Admin Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage system administrators and their access.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary-600/20 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    New Admin
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Loading administrators...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {admins.map((admin) => (
                        <div
                            key={admin._id}
                            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 shrink-0">
                                    <User className="w-6 h-6" />
                                </div>
                                <button
                                    onClick={() => handleDelete(admin._id, admin.email)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{admin.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Mail className="w-4 h-4" />
                                    {admin.email}
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
                                <span>Joined {new Date(admin.createdAt).toLocaleDateString()}</span>
                                <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md font-bold uppercase tracking-wider">
                                    Active
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Administrator</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/30">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none transition-all dark:text-white"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none transition-all dark:text-white"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    minLength={8}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none transition-all dark:text-white"
                                />
                                <p className="text-[10px] text-gray-400 mt-1 ml-1 px-1">Must be at least 8 characters long.</p>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        'Create Administrator'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
