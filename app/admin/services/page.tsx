'use client';

export default function AdminServicesPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Services</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your service offerings</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <p className="text-lg">Services management interface</p>
                    <p className="text-sm mt-2">Services are currently managed through the database seed file.</p>
                    <p className="text-sm mt-1">Full CRUD interface can be added in future updates.</p>
                </div>
            </div>
        </div>
    );
}
