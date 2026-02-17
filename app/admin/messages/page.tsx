'use client';

import { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, CheckCircle, Clock } from 'lucide-react';

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

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

    const toggleReadStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await fetch('/api/admin/messages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, read: !currentStatus }),
            });

            if (response.ok) {
                setMessages(messages.map(msg =>
                    msg._id === id ? { ...msg, read: !currentStatus } : msg
                ));
                if (selectedMessage?._id === id) {
                    setSelectedMessage({ ...selectedMessage, read: !currentStatus });
                }
            }
        } catch (error) {
            console.error('Error updating message:', error);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const response = await fetch(`/api/admin/messages?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessages(messages.filter(msg => msg._id !== id));
                if (selectedMessage?._id === id) {
                    setSelectedMessage(null);
                }
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Messages</h1>
                <p className="text-gray-600 dark:text-gray-400">View and manage contact form submissions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Messages List */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                        <h2 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
                            <Mail className="w-5 h-5 text-primary-500" />
                            Recent Inbox
                        </h2>
                    </div>
                    <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                        {loading ? (
                            <div className="p-8 text-center animate-pulse">
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mx-auto mb-4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto"></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                No messages found.
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {messages.map((msg) => (
                                    <button
                                        key={msg._id}
                                        onClick={() => setSelectedMessage(msg)}
                                        className={`w-full text-left p-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none ${selectedMessage?._id === msg._id
                                                ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
                                                : !msg.read ? 'bg-white dark:bg-gray-900 font-bold border-l-4 border-transparent' : 'bg-white dark:bg-gray-900 border-l-4 border-transparent'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-sm ${!msg.read ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                                                {msg.name}
                                            </span>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className={`text-xs truncate ${!msg.read ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {msg.subject}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Content */}
                <div className="lg:col-span-2 space-y-4">
                    {selectedMessage ? (
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 animate-fadeIn">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{selectedMessage.subject}</h2>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300">
                                            {selectedMessage.name}
                                            <span className="font-normal text-gray-400">&lt;{selectedMessage.email}&gt;</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {formatDate(selectedMessage.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleReadStatus(selectedMessage._id, selectedMessage.read)}
                                        className={`p-2 rounded-lg transition-colors ${selectedMessage.read
                                                ? 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100'
                                                : 'text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100'
                                            }`}
                                        title={selectedMessage.read ? "Mark as unread" : "Mark as read"}
                                    >
                                        {selectedMessage.read ? <Mail size={20} /> : <CheckCircle size={20} />}
                                    </button>
                                    <button
                                        onClick={() => deleteMessage(selectedMessage._id)}
                                        className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 transition-colors"
                                        title="Delete message"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-8">
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed italic border-l-4 border-gray-100 dark:border-gray-800 pl-6 py-2 bg-gray-50/50 dark:bg-gray-800/30 rounded-r-lg">
                                        "{selectedMessage.message}"
                                    </p>
                                </div>

                                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-medium"
                                    >
                                        <Mail size={18} />
                                        Reply to {selectedMessage.name.split(' ')[0]}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-dashed border-gray-200 dark:border-gray-800 p-12 text-center h-full flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6">
                                <MailOpen className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2">No message selected</h2>
                            <p className="text-gray-400 dark:text-gray-600 max-w-xs mx-auto text-sm">Select a message from the list on the left to view its details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
