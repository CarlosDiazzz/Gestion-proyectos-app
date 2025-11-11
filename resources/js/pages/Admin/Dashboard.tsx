import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
];

export default function AdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Admin Dashboard</h2>
                            <p className="mt-4">Welcome, Administrator!</p>

                            <div className="mt-6 space-y-4">
                                <Link href={route('admin.users.create')}>
                                    <Button>Create New User</Button>
                                </Link>
                                <Link href={route('admin.teams.create')}>
                                    <Button>Create New Team</Button>
                                </Link>
                                <Link href={route('admin.participants.index')}>
                                    <Button>Manage Participants</Button>
                                </Link>
                                <Link href={route('admin.teams.index')}>
                                    <Button>Manage Teams</Button>
                                </Link>
                                <Link href={route('admin.projects.index')}>
                                    <Button>Manage Projects</Button>
                                </Link>
                                <Link href={route('admin.judges.index')}>
                                    <Button>Manage Judges</Button>
                                </Link>
                                <Link href={route('admin.events.index')}>
                                    <Button>Manage Events</Button>
                                </Link>
                                {/* Add other admin links here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
