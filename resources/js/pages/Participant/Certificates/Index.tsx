import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participant Dashboard',
        href: route('participant.dashboard'),
    },
    {
        title: 'My Certifications',
        href: route('participant.certificates.index'),
    },
];

interface Certificate {
    project_name: string;
    team_name: string;
    puntuacion: number;
    comentarios: string;
    fecha_calificacion: string;
}

interface IndexProps {
    certifications: Certificate[];
}

export default function Index({ certifications }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Certifications" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">My Certifications</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Project</TableHead>
                                        <TableHead>Team</TableHead>
                                        <TableHead>Score</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {certifications.map((certificate) => (
                                        <TableRow key={certificate.project_name}>
                                            <TableCell>{certificate.project_name}</TableCell>
                                            <TableCell>{certificate.team_name}</TableCell>
                                            <TableCell>{certificate.puntuacion}</TableCell>
                                            <TableCell>
                                                <Link href={route('participant.certificates.show', certificate.project_name)}>
                                                    View Certificate
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
