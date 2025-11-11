import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Event {
    id: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    descripcion: string;
}

interface ParticipantEventsIndexProps {
    events: Event[];
}

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

export default function ParticipantEventsIndex({ events }: ParticipantEventsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participant Events" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Upcoming Events</h2>

                            <div className="mt-6">
                                {events.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Start Date</TableHead>
                                                <TableHead>End Date</TableHead>
                                                <TableHead>Description</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {events.map((event) => (
                                                <TableRow key={event.id}>
                                                    <TableCell>{event.nombre}</TableCell>
                                                    <TableCell>{event.fecha_inicio}</TableCell>
                                                    <TableCell>{event.fecha_fin}</TableCell>
                                                    <TableCell>{event.descripcion}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p>No upcoming events.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
