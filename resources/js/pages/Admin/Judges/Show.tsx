import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';

interface Judge {
    id: number;
    name: string;
    email: string;
    especialidad: {
        nombre: string;
    };
}

interface ShowProps {
    judge: Judge;
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

export default function Show({ judge }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Judge: ${judge.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Judge Details</h2>
                            <div className="mt-6">
                                <p><strong>Name:</strong> {judge.name}</p>
                                <p><strong>Email:</strong> {judge.email}</p>
                                <p><strong>Specialty:</strong> {judge.especialidad.nombre}</p>
                            </div>
                            <div className="mt-6">
                                <Link href={route('admin.judges.index')}>
                                    Back to Judges
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}