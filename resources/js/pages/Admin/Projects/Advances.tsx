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
        title: 'Project Advances',
        href: route('admin.projects.index'),
    },
];

interface Project {
    id: number;
    nombre: string;
}

interface AdvancesProps {
    projects: Project[];
}

export default function Advances({ projects }: AdvancesProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Advances" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Project Advances</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Project Name</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {projects.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell>{project.nombre}</TableCell>
                                            <TableCell>
                                                <Link href={route('admin.projects.advances', project.id)}>
                                                    View Advances
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