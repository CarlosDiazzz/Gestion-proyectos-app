import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Equipo {
    id: number;
    nombre: string;
}

interface Evento {
    id: number;
    nombre: string;
}

interface Avance {
    id: number;
    // Add other Avance properties if needed for display
}

interface Project {
    id: number;
    nombre: string;
    categoria: string;
    equipo: Equipo;
    evento: Evento;
    avances: Avance[]; // Add avances to Project interface
}

interface ProjectsIndexProps {
    projects: Project[];
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
];

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Manage Projects</h2>

                            <div className="mt-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Project Name</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Team</TableHead>
                                            <TableHead>Event</TableHead>
                                            <TableHead>Advances</TableHead> {/* New TableHead */}
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projects.map((project) => (
                                            <TableRow key={project.id}>
                                                <TableCell>{project.nombre}</TableCell>
                                                <TableCell>{project.categoria}</TableCell>
                                                <TableCell>{project.equipo?.nombre}</TableCell>
                                                <TableCell>{project.evento?.nombre}</TableCell>
                                                <TableCell> {/* New TableCell for Advances */}
                                                    {project.avances.length}
                                                    <Link href={route('admin.projects.advances', project.id)} className="ml-2">
                                                        <Button variant="link" size="sm">View</Button>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link href={route('admin.projects.criteria', project.id)}>
                                                        <Button variant="link" size="sm">Manage Criteria</Button>
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
