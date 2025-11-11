import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';

interface Avance {
    id: number;
    fecha: string;
    descripcion: string;
    archivo_url: string;
}

interface Criterio {
    id: number;
    nombre: string;
    descripcion: string;
}

interface Project {
    id: number;
    nombre: string;
    avances: Avance[];
    criterios: Criterio[];
}

interface JudgeProjectsGradeProps {
    project: Project;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Judge Dashboard',
        href: route('judge.dashboard'),
    },
    {
        title: 'Grade Project',
        href: '#',
    },
];

export default function GradeProject({ project }: JudgeProjectsGradeProps) {
    const { data, setData, post, processing, errors } = useForm({
        grades: project.criterios.reduce((acc, criterio) => {
            acc[criterio.id] = ''; // Initialize grade for each criterion
            return acc;
        }, {} as Record<number, string>),
        comentarios: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('judge.projects.storeGrade', project.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Grade Project: ${project.nombre}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold leading-tight">Grade Project: {project.nombre}</h2>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                {/* Project Advances */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">Project Advances</h3>
                                {project.avances.length > 0 ? (
                                    <div className="space-y-2">
                                        {project.avances.map((avance) => (
                                            <div key={avance.id} className="p-2 border rounded-md">
                                                <p><strong>Date:</strong> {avance.fecha}</p>
                                                <p><strong>Description:</strong> {avance.descripcion}</p>
                                                <p><strong>File:</strong> <a href={avance.archivo_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View File</a></p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No advances submitted for this project.</p>
                                )}

                                {/* Grading Criteria */}
                                <h3 className="text-xl font-semibold mt-8 mb-4">Grading Criteria</h3>
                                {project.criterios.map((criterio) => (
                                    <div key={criterio.id}>
                                        <Label htmlFor={`grade-${criterio.id}`}>{criterio.nombre} ({criterio.descripcion})</Label>
                                        <Input
                                            id={`grade-${criterio.id}`}
                                            type="number"
                                            min="0"
                                            max="100" // Assuming a 0-100 scale
                                            value={data.grades[criterio.id]}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('grades', { ...data.grades, [criterio.id]: e.target.value })}
                                            required
                                        />
                                        <InputError message={errors[`grades.${criterio.id}`]} className="mt-2" />
                                    </div>
                                ))}

                                {/* Comments */}
                                <div>
                                    <Label htmlFor="comentarios">Comments</Label>
                                    <Textarea
                                        id="comentarios"
                                        name="comentarios"
                                        value={data.comentarios}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('comentarios', e.target.value)}
                                    />
                                    <InputError message={errors.comentarios} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Submit Grade</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
