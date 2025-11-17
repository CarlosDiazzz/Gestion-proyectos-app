import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react'; // Import useForm
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { route } from 'ziggy-js';

interface Event {
    id: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    descripcion: string;
}

interface EventsIndexProps {
    events: Event[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Manage Events',
        href: route('admin.events.index'),
    },
];

export default function EventsIndex({ events }: EventsIndexProps) {
    const { delete: destroy } = useForm(); // Destructure delete as destroy to avoid conflict

    const handleDelete = (eventId: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            destroy(route('admin.events.destroy', eventId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Events" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Manage Events</h2>

                            <div className="mt-6 flex justify-end mb-4">
                                <Link href={route('admin.events.create')}>
                                    <Button>Create New Event</Button>
                                </Link>
                            </div>

                            <div className="mt-6">
                                {events.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Start Date</TableHead>
                                                <TableHead>End Date</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {events.map((event) => (
                                                <TableRow key={event.id}>
                                                    <TableCell>{event.nombre}</TableCell>
                                                    <TableCell>{event.fecha_inicio}</TableCell>
                                                    <TableCell>{event.fecha_fin}</TableCell>
                                                    <TableCell>{event.descripcion}</TableCell>
                                                    <TableCell>
                                                        <Link href={route('admin.events.edit', event.id)}>
                                                            <Button variant="link" size="sm">Edit</Button>
                                                        </Link>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(event.id)}
                                                            className="ml-2"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p>No events found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
