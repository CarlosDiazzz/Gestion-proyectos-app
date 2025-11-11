import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Avance {
    id: number;
    fecha: string;
    descripcion: string;
    archivo_url: string;
}

interface Project {
    id: number;
    nombre: string;
    avances: Avance[];
}

interface ProjectsAdvancesProps {
    project: Project;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Manage Projects',
        href: route('admin.projects.index'),
    },
    {
        title: 'Project Advances',
        href: '#',
    },
];

export default function ProjectAdvances({ project }: ProjectsAdvancesProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Advances for ${project.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Advances for Project: {project.nombre}</h2>

                            <div className="mt-6">
                                {project.avances.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead>File URL</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {project.avances.map((avance) => (
                                                <TableRow key={avance.id}>
                                                    <TableCell>{avance.fecha}</TableCell>
                                                    <TableCell>{avance.descripcion}</TableCell>
                                                    <TableCell>
                                                        <a href={avance.archivo_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                            View File
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p>No advances recorded for this project.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
