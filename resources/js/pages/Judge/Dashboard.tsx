import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Especialidad {
    id: number;
    nombre: string;
}

interface Equipo {
    id: number;
    nombre: string;
}

interface Criterio {
    id: number;
    nombre: string;
}

interface Proyecto {
    id: number;
    nombre: string;
    categoria: string;
    equipo: Equipo;
    criterios: Criterio[];
}

interface Judge {
    id: number;
    no_empleado: string;
    nombre: string;
    correo: string;
    telefono: string;
    usuario: User;
    especialidad: Especialidad;
    proyectos: Proyecto[];
}

interface JudgeDashboardProps {
    judge: Judge;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Judge Dashboard',
        href: route('judge.dashboard'),
    },
];

export default function JudgeDashboard({ judge }: JudgeDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Judge Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Welcome, Judge {judge.nombre}!</h2>
                            <p className="mt-4">This is your judge dashboard.</p>

                            <div className="mt-8 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Profile</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p><strong>Name:</strong> {judge.nombre}</p>
                                        <p><strong>Email:</strong> {judge.correo}</p>
                                        <p><strong>Employee Number:</strong> {judge.no_empleado}</p>
                                        <p><strong>Specialty:</strong> {judge.especialidad?.nombre || 'N/A'}</p>
                                        <p><strong>Phone:</strong> {judge.telefono || 'N/A'}</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Assigned Projects</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {judge.proyectos && judge.proyectos.length > 0 ? (
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Project Name</TableHead>
                                                        <TableHead>Team</TableHead>
                                                        <TableHead>Category</TableHead>
                                                        <TableHead>Criteria</TableHead>
                                                        <TableHead>Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {judge.proyectos.map((project) => (
                                                        <TableRow key={project.id}>
                                                            <TableCell>{project.nombre}</TableCell>
                                                            <TableCell>{project.equipo?.nombre}</TableCell>
                                                            <TableCell>{project.categoria}</TableCell>
                                                            <TableCell>
                                                                {project.criterios.map(c => c.nombre).join(', ')}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Link href={route('judge.projects.grade', project.id)}>
                                                                    <Button variant="outline" size="sm">Grade Project</Button>
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        ) : (
                                            <p>No projects assigned to you yet.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
