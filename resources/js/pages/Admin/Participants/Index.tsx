import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Manage Participants',
        href: route('admin.participants.index'),
    },
];

interface Participant {
    id: number;
    name: string;
    email: string;
    carrera: string;
}

interface IndexProps {
    participants: Participant[];
}

export default function Index({ participants }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Participants" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Manage Participants</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Carrera</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {participants.map((participant) => (
                                        <TableRow key={participant.id}>
                                            <TableCell>{participant.name}</TableCell>
                                            <TableCell>{participant.email}</TableCell>
                                            <TableCell>{participant.carrera}</TableCell>
                                            <TableCell>
                                                <Link href={route('admin.participants.edit', participant.id)}>
                                                    Edit
                                                </Link>
                                            </TableCell>
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