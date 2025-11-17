import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';

interface Certificate {
    project_name: string;
    team_name: string;
    puntuacion: number;
    comentarios: string;
    fecha_calificacion: string;
}

interface Project {
    id: number;
    nombre: string;
}

interface ShowProps {
    certificate: Certificate;
    project: Project;
}

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

export default function Show({ certificate, project }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Certificate for ${certificate.project_name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Certificate of Achievement</h2>
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-semibold">{certificate.project_name}</h3>
                                <p className="mt-2">This is to certify that</p>
                                <h4 className="text-2xl font-bold mt-2">{project.nombre}</h4>
                                <p className="mt-2">has successfully participated in the project</p>
                                <h3 className="text-xl font-semibold mt-2">{certificate.project_name}</h3>
                                <p className="mt-2">as part of the team</p>
                                <h4 className="text-2xl font-bold mt-2">{certificate.team_name}</h4>
                                <p className="mt-2">and achieved a score of</p>
                                <h4 className="text-3xl font-bold mt-2">{certificate.puntuacion}</h4>
                                <p className="mt-4">Date: {new Date(certificate.fecha_calificacion).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-6 flex justify-center gap-4">
                                <Button>Download PDF</Button>
                                <Button>Share QR</Button>
                            </div>
                            <div className="mt-6 text-center">
                                <Link href={route('participant.certificates.index')}>
                                    Back to Certifications
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
