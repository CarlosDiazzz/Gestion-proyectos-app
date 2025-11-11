import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Carrera {
    id: number;
    nombre: string;
}

interface Proyecto {
    id: number;
    nombre: string;
}

interface Equipo {
    id: number;
    nombre: string;
    codigo_registro: string;
    proyectos: Proyecto[];
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

interface ParticipantDashboardProps {
    participant: Participant;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participant Dashboard',
        href: route('participant.dashboard'),
    },
];

export default function ParticipantDashboard({ participant }: ParticipantDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participant Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Welcome, {participant.nombre}!</h2>
                            <p className="mt-4">This is your participant dashboard.</p>

                            <div className="mt-8 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Profile</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p><strong>Name:</strong> {participant.nombre}</p>
                                        <p><strong>Email:</strong> {participant.correo}</p>
                                        <p><strong>Control Number:</strong> {participant.no_control}</p>
                                        <p><strong>Career:</strong> {participant.carrera?.nombre || 'N/A'}</p>
                                        <p><strong>Phone:</strong> {participant.telefono || 'N/A'}</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Team(s)</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {participant.equipos && participant.equipos.length > 0 ? (
                                            participant.equipos.map((team) => (
                                                <div key={team.id} className="border p-4 rounded-md">
                                                    <p><strong>Team Name:</strong> {team.nombre}</p>
                                                    <p><strong>Registration Code:</strong> {team.codigo_registro}</p>
                                                    <h4 className="font-semibold mt-2">Assigned Projects:</h4>
                                                    {team.proyectos && team.proyectos.length > 0 ? (
                                                        <ul className="list-disc list-inside ml-4">
                                                            {team.proyectos.map((project) => (
                                                            <li key={project.id} className="flex items-center justify-between">
                                                                {project.nombre}
                                                                <Link href={route('participant.projects.advances.create', project.id)}>
                                                                    <Button variant="outline" size="sm">Upload Advance</Button>
                                                                </Link>
                                                            </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="ml-4">No projects assigned to this team yet.</p>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p>You are not currently assigned to any team.</p>
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
