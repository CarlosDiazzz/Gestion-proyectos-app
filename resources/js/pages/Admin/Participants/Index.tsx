import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Carrera {
    id: number;
    nombre: string;
}

interface Equipo {
    id: number;
    nombre: string;
}

interface Participant {
    id: number;
    no_control: string;
    nombre: string;
    correo: string;
    telefono: string;
    usuario: User;
    carrera: Carrera;
    equipos: Equipo[];
}

interface ParticipantsIndexProps {
    participants: Participant[];
}

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

export default function ParticipantsIndex({ participants }: ParticipantsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Participants" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Manage Participants</h2>

                            <div className="mt-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Control No.</TableHead>
                                            <TableHead>Career</TableHead>
                                            <TableHead>Team(s)</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {participants.map((participant) => (
                                            <TableRow key={participant.id}>
                                                <TableCell>{participant.nombre}</TableCell>
                                                <TableCell>{participant.correo}</TableCell>
                                                <TableCell>{participant.no_control}</TableCell>
                                                <TableCell>{participant.carrera?.nombre}</TableCell>
                                                <TableCell>
                                                    {participant.equipos.length > 0
                                                        ? participant.equipos.map((team) => team.nombre).join(', ')
                                                        : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <Link href={route('admin.participants.edit', participant.id)}>
                                                        <Button variant="link" size="sm">Edit</Button>
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
            </div>
        </AppLayout>
    );
}
