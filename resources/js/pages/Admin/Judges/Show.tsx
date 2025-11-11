import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface JudgesShowProps {
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
    {
        title: 'Judge Profile',
        href: '#',
    },
];

export default function ShowJudge({ judge }: JudgesShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Judge: ${judge.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Judge Profile: {judge.nombre}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                                <p className="text-lg font-semibold">{judge.nombre}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                                <p className="text-lg font-semibold">{judge.correo}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee Number</p>
                                <p className="text-lg font-semibold">{judge.no_empleado}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                                <p className="text-lg font-semibold">{judge.telefono || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Specialty</p>
                                <p className="text-lg font-semibold">{judge.especialidad?.nombre || 'N/A'}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
