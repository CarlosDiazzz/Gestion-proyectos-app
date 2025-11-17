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
        title: 'Manage Teams',
        href: route('admin.teams.index'),
    },
];

interface Team {
    id: number;
    nombre: string;
}

interface IndexProps {
    teams: Team[];
}

export default function Index({ teams }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Teams" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Manage Teams</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Team Name</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teams.map((team) => (
                                        <TableRow key={team.id}>
                                            <TableCell>{team.nombre}</TableCell>
                                            <TableCell>
                                                <Link href={route('admin.teams.edit', team.id)}>
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