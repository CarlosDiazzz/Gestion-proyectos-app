import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { route } from 'ziggy-js';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Especialidad {
    id: number;
    nombre: string;
}

interface Judge {
    id: number;
    no_empleado: string;
    nombre: string;
    correo: string;
    telefono: string;
    usuario: User;
    especialidad: Especialidad;
}

interface JudgesIndexProps {
    judges: Judge[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Manage Judges',
        href: route('admin.judges.index'),
    },
];

export default function JudgesIndex({ judges }: JudgesIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Judges" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Manage Judges</h2>

                            <div className="mt-6">
                                {judges.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Employee No.</TableHead>
                                                <TableHead>Specialty</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {judges.map((judge) => (
                                                <TableRow key={judge.id}>
                                                    <TableCell>{judge.nombre}</TableCell>
                                                    <TableCell>{judge.correo}</TableCell>
                                                    <TableCell>{judge.no_empleado}</TableCell>
                                                    <TableCell>{judge.especialidad?.nombre || 'N/A'}</TableCell>
                                                    <TableCell>
                                                        <Link href={route('admin.judges.show', judge.id)}>
                                                            <Button variant="link" size="sm">View Profile</Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p>No judges found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
