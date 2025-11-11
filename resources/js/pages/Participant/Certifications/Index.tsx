import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Certification {
    project_name: string;
    team_name: string;
    puntuacion: number;
    comentarios: string;
    fecha_calificacion: string;
}

interface ParticipantCertificationsIndexProps {
    certifications: Certification[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participant Dashboard',
        href: route('participant.dashboard'),
    },
    {
        title: 'Certifications',
        href: route('participant.certifications.index'),
    },
];

export default function ParticipantCertificationsIndex({ certifications }: ParticipantCertificationsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participant Certifications" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">My Certifications</h2>

                            <div className="mt-6">
                                {certifications.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Project Name</TableHead>
                                                <TableHead>Team Name</TableHead>
                                                <TableHead>Score</TableHead>
                                                <TableHead>Comments</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {certifications.map((cert, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{cert.project_name}</TableCell>
                                                    <TableCell>{cert.team_name}</TableCell>
                                                    <TableCell>{cert.puntuacion}</TableCell>
                                                    <TableCell>{cert.comentarios}</TableCell>
                                                    <TableCell>{cert.fecha_calificacion}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p>No certifications available yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
