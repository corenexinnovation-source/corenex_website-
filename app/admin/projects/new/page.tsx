'use client';

export default function NewProjectPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
                <p className="text-gray-600 dark:text-gray-400">Create a new portfolio project</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <p className="text-lg">Project creation form</p>
                    <p className="text-sm mt-2">Full project creation interface with image upload can be added.</p>
                    <p className="text-sm mt-1">For now, projects can be added through the database or API.</p>
                </div>
            </div>
        </div>
    );
}
