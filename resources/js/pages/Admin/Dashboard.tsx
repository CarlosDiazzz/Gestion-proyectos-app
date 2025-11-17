import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Calendar } from '@/components/ui/calendar';
import { Event } from 'react-big-calendar';
import { Carousel } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
];

interface AdminDashboardProps {
    events: Event[];
}

export default function AdminDashboard({ events }: AdminDashboardProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Admin Dashboard</h2>
                            <p className="mt-4">Welcome, {auth.user?.name}!</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl font-semibold leading-tight">Events Calendar</h3>
                            <Calendar events={events} style={{ height: 600 }} />
                        </div>
                    </div>

                    <div className="mt-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl font-semibold leading-tight">Current Events Carousel</h3>
                            <div className="mt-4">
                                <Carousel
                                    items={events.map((event) => (
                                        <Card key={event.title as string}>
                                            <CardHeader>
                                                <CardTitle>{event.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>Starts: {new Date(event.start as Date).toLocaleDateString()}</p>
                                                <p>Ends: {new Date(event.end as Date).toLocaleDateString()}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
