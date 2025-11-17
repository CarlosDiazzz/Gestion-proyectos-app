import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participant Dashboard',
        href: route('participant.dashboard'),
    },
    {
        title: 'Events',
        href: route('participant.events.index'),
    },
];

interface Event {
    id: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
}

interface IndexProps {
    events: Event[];
}

export default function Index({ events }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Events</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event Name</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {events.map((event) => (
                                        <TableRow key={event.id}>
                                            <TableCell>{event.nombre}</TableCell>
                                            <TableCell>{new Date(event.fecha_inicio).toLocaleDateString()}</TableCell>
                                            <TableCell>{new Date(event.fecha_fin).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
