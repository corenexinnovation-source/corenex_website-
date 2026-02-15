'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';
import { Mail, MailOpen, Trash2 } from 'lucide-react';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/admin/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string, read: boolean) => {
        try {
            await fetch('/api/admin/messages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, read }),
            });

            setMessages(messages.map(m => m.id === id ? { ...m, read } : m));
        } catch (error) {
            console.error('Error updating message:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const response = await fetch(`/api/admin/messages?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessages(messages.filter(m => m.id !== id));
                if (selectedMessage?.id === id) {
                    setSelectedMessage(null);
                }
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
                <p className="text-gray-600 dark:text-gray-400">View and manage contact form submissions</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Messages List */}
                    <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                            <h2 className="font-semibold">All Messages ({messages.length})</h2>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-800 max-h-[600px] overflow-y-auto">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        if (!message.read) {
                                            markAsRead(message.id, true);
                                        }
                                    }}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selectedMessage?.id === message.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            {message.read ? (
                                                <MailOpen className="w-4 h-4 text-gray-400" />
                                            ) : (
                                                <Mail className="w-4 h-4 text-primary-600" />
                                            )}
                                            <span className={`font-medium text-sm ${!message.read ? 'text-primary-600' : ''}`}>
                                                {message.name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500">{formatDate(message.createdAt)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{message.subject}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                        {selectedMessage ? (
                            <div>
                                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                <span>From: {selectedMessage.name}</span>
                                                <span>•</span>
                                                <span>{selectedMessage.email}</span>
                                                <span>•</span>
                                                <span>{formatDate(selectedMessage.createdAt)}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(selectedMessage.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                                <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                    >
                                        <Mail className="w-5 h-5 mr-2" />
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full p-20 text-gray-400">
                                <div className="text-center">
                                    <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Select a message to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
