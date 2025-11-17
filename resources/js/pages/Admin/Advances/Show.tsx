import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';

interface Advance {
    id: number;
    descripcion: string;
    fecha_de_avance: string;
}

interface Project {
    id: number;
    nombre: string;
    avances: Advance[];
}

interface ShowProps {
    project: Project;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Project Advances',
        href: route('admin.advances.index'),
    },
];

export default function Show({ project }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Advances for ${project.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Advances for {project.nombre}</h2>
                            <div className="mt-6">
                                {project.avances.map((advance) => (
                                    <div key={advance.id} className="mb-4">
                                        <p><strong>Date:</strong> {new Date(advance.fecha_de_avance).toLocaleDateString()}</p>
                                        <p><strong>Description:</strong> {advance.descripcion}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <Link href={route('admin.advances.index')}>
                                    Back to Project Advances
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
